import json
import boto3
from boto3.dynamodb.conditions import Key
import time
import urllib.request
from jose import jwk, jwt
from jose.utils import base64url_decode

region = "eu-central-1"
userpool_id = "eu-central-1_Azvfs3sCu"
app_client_id = "3gs68n5j8qf28dag3didqedgpl"
keys_url = 'https://cognito-idp.{}.amazonaws.com/{}/.well-known/jwks.json'.format(
    region, userpool_id)
with urllib.request.urlopen(keys_url) as f:
    response = f.read()
keys = json.loads(response.decode('utf-8'))['keys']


def getClaim(token):
    headers = jwt.get_unverified_headers(token)
    kid = headers['kid']
    key_index = -1
    for i in range(len(keys)):
        if kid == keys[i]['kid']:
            key_index = i
            break
    if key_index == -1:
        print('Public key not found in jwks.json')
        return False

    public_key = jwk.construct(keys[key_index])
    message, encoded_signature = str(token).rsplit('.', 1)
    decoded_signature = base64url_decode(encoded_signature.encode('utf-8'))
    if not public_key.verify(message.encode("utf8"), decoded_signature):
        print('Signature verification failed')
        return False
    print('Signature successfully verified')

    claims = jwt.get_unverified_claims(token)
    if time.time() > claims['exp']:
        print('Token is expired')
        return False
    print(f'this is the aud: {claims["aud"]}')
    if claims['aud'] != app_client_id:
        print('Token was not issued for this audience')
        return False
    print(claims)
    return claims


def handler(event, context):
    print('received event createTaskFromTodoList:')
    print(event)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('Hello from your new Amplify Python lambda!')
    }


def handler(event, context):
    print('received event fetchTasksFromTodoList:')
    print(event)
    list_id = event["pathParameters"]["listId"]
    global claim
    claim = None
    bearer_token = event.get("headers", None).get("Authorization", None)
    token = bearer_token.split("Bearer ")[1]
    print(f'test if it returns the token {token}')
    try:
        claim = getClaim(token)
    except Exception as e:
        print(e)
        print("error inside the getClaim()")
        return {
            'statusCode': 401,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps("Unauthorized!")
        }

    if not claim:
        print(f'there isnt any claim here')
        return {
            'statusCode': 401,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps("Unauthorized!")
        }

    print(f'there is claim!!!')
    print(claim)

    email = claim["email"]
    user_id = claim["sub"]

    dynamodb = boto3.client("dynamodb")

    lists_table_name = "listsTable-dev"

    lists_primary_key = {"listId": {"S": list_id}}

    try:
        response = dynamodb.get_item(
            TableName=lists_table_name, Key=lists_primary_key)
        item = response.get("Item")
        if item:
            print("there is a list with the same list id! ")
            print(item)
            collaborator_emails_list = item.get("collaborators", None)
            if item["ownerId"] != user_id:
                print("user is not the owner")
                if not collaborator_emails_list or email not in collaborator_emails_list:
                    return {
                        'statusCode': 401,
                        'headers': {
                            'Access-Control-Allow-Headers': '*',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': '*'
                        },
                        'body': json.dumps("Unauthorized!")
                    }
            print("User is authorized to add task to this list!")

    except Exception as e:
        print("there is an error")
        print(e)

        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(e)
        }

    tasks_table_name = "tasksTable-dev"
    try:

        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table(tasks_table_name)
        partition_key_name = "listId"
        partition_key_value = list_id

        response = table.query(
            KeyConditionExpression=Key(
                partition_key_name).eq(partition_key_value)
        )

        items = response["Items"]
        print("there are items inside this list already!")
        print(items)
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(items)
        }

    except Exception as e:
        print("there is error")
        print(e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(e)
        }
