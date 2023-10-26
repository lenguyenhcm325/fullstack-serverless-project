import json
import boto3
import time
import urllib.request
from jose import jwk, jwt
from jose.utils import base64url_decode

# "X-Access-Key-ID": creds.accessKeyId,
# "X-Secret-Access-Key": creds.secretAccessKey,
# "X-Session-Token": creds.sessionToken

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
    global claim
    print("below the event object")
    print(event)
    print("below the context")
    print(context)
    claim = None
    bearerToken = event.get("headers", None).get("Authorization", None)
    token = bearerToken.split("Bearer ")[1]
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
    dynamodb = boto3.client("dynamodb")
    table_name = "userIdToInfo-dev"
    primary_key = {"userId": {"S": claim["sub"]}}

    try:
        response = dynamodb.get_item(TableName=table_name, Key=primary_key)
        item = response.get('Item')
        if item:
            print("there is item!")
            print(item)
            return {
                "statusCode": 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                "body": json.dumps(item)
            }

        else:
            print("item not found")
            return {
                "statusCode": 404,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                "body": json.dumps("item not found")
            }

    except Exception as e:
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

    # access_key_id = event.get("headers", None).get("x-access-key-id", None)
    # secret_access_key = event.get("headers", None).get(
    #     "x-secret-access-key", None)
    # session_token = event.get("headers", None).get("x-session-token", None)
    # userId = event["pathParameters"]["userId"]
    # print(f'this is access key id {access_key_id}')
    # print(f'this is secret access key {secret_access_key}')
    # print(f'this is session token {session_token}')
    # if not access_key_id or not secret_access_key or not session_token:
    #     print("there isn't enough credential")
    #     return {
    #         'statusCode': 401,
    #         'headers': {
    #             'Access-Control-Allow-Headers': '*',
    #             'Access-Control-Allow-Origin': '*',
    #             'Access-Control-Allow-Methods': '*'
    #         },
    #         'body': 'Unauthorized'
    #     }

    # if not sub:
    #     print("there is no sub")
    #     return {
    #         'statusCode': 401,
    #         'headers': {
    #             'Access-Control-Allow-Headers': '*',
    #             'Access-Control-Allow-Origin': '*',
    #             'Access-Control-Allow-Methods': '*'
    #         },
    #         'body': 'Unauthorized'
    #     }

    # dynamodb = boto3.client(
    #     'dynamodb',
    #     # aws_access_key_id=access_key_id,
    #     # aws_secret_access_key=secret_access_key,
    #     # aws_session_token=session_token
    # )
    # table_name = "usersTable-dev"
    # primary_key = {"userId": {"S": userId}}

    # return {
    #     'statusCode': 200,

    #     'body': json.dumps('Hello from your new Amplify Python lambda 123!')
    # }
