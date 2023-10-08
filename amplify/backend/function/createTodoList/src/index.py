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
    try:
        body = event["body"]
        body_data = json.loads(body)
        title = body_data["title"]

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

    dynamodb = boto3.client("dynamodb")
    table_name = "listsTable-dev"
    try:
        userId = claim["sub"]
        generated_uuid = str(uuid.uuid4())

        print(f'This is the generated uuid: {generated_uuid}')
        utc_now = datetime.datetime.now(pytz.utc)
        formatted_date = utc_now.isoformat()
        print(f"time iso 8601 {formatted_date}")
        ItemObject = {
            "listId": {
                "S": generated_uuid
            },
            "ownerId": {
                "S": userId
            },
            "title": {
                "S": title
            },
            "createdTime": {
                "S": formatted_date
            },
            "lastModifiedTime": {
                "S": formatted_date
            }
        }
        print("below is the put_item Item")
        print(ItemObject)
        dynamodb.put_item(
            TableName=table_name,
            Item=ItemObject
        )
        print(f"Todo-list for user {userId} created!")
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
