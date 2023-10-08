import json
import boto3
import time
import pytz
import datetime
import uuid
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
    try:
        body = event["body"]
        body_data = json.loads(body)

        # DEAL WITH THIS
        title = body_data["title"]
        # It is path param, isn't it?!
        list_id = event["pathParameters"]["listId"]
        # actually you can get this from the JWT Token

    except Exception as e:
        print(e)
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps("Missing required attribute(s)!")
        }
    global claim
    print("below the event object")
    print(event)
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

    # here we check whether the user is authorized to do so
    try:
        response = dynamodb.get_item(
            TableName=lists_table_name, Key=lists_primary_key)
        item = response.get("Item")
        if item:
            print("there is a list with the same list id!")
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

        generated_uuid = str(uuid.uuid4())

        print(f'This is the generated uuid: {generated_uuid}')
        utc_now = datetime.datetime.now(pytz.utc)
        formatted_date = utc_now.isoformat()
        print(f"time iso 8601 {formatted_date}")
        ItemObject = {
            "taskId": {
                "S": generated_uuid
            },
            "listId": {
                "S": list_id
            },
            "userId": {
                "S": user_id
            },
            "title": {
                "S": title
            },
            "createdTime": {
                "S": formatted_date
            },
            "lastModifiedTime": {
                "S": formatted_date
            },
            "email": {
                "S": email
            }
        }
        print("below is the put_item Item")
        print(ItemObject)
        dynamodb.put_item(
            TableName=tasks_table_name,
            Item=ItemObject
        )
        print(f"Task for user {user_id} in list {list_id} created!")
        return {
            'statusCode': 201,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps("Todo-list for user created!")
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
