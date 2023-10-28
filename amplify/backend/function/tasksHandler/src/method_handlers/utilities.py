import json
import time
import os
import urllib.request
from jose import jwk, jwt
from jose.utils import base64url_decode

region = os.environ["REGION"]
userpool_id = os.environ["COGNITO_USERPOOL_ID"]
app_client_id = os.environ["COGNITO_APP_CLIENT_ID"]
keys_url = 'https://cognito-idp.{}.amazonaws.com/{}/.well-known/jwks.json'.format(
    region, userpool_id)
with urllib.request.urlopen(keys_url) as f:
    response = f.read()
keys = json.loads(response.decode('utf-8'))['keys']


def get_claim(token):
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


def extract_token_from_event(event):
    bearer_token = event.get("headers", None).get("Authorization", None)
    token = bearer_token.split("Bearer ")[1]
    return token


def handle_claim(event):
    claim = None
    token = extract_token_from_event(event)
    try:
        claim = get_claim(token)
    except Exception as e:
        print(e)
        print("error inside the getClaim()")
        return {
            "error": True,
            "return_value": {
                'statusCode': 401,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                'body': json.dumps("Unauthorized!")
            }
        }

    if not claim:
        print(f'there isnt any claim here')
        return {
            "error": True,
            "return_value": {
                'statusCode': 401,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                'body': json.dumps("Unauthorized!")
            }
        }

    print(f'there is claim!!!')
    return {
        "error": False,
        "return_value": claim
    }


def construct_update_expression(attributes_to_update):
    """
    Constructs the UpdateExpression, ExpressionAttributeNames, and ExpressionAttributeValues
    based on the attributes_to_update dictionary.
    """

    update_expr_parts = []
    expr_attr_names = {}
    expr_attr_values = {}

    for attr, value in attributes_to_update.items():
        placeholder = ":" + attr
        attr_name = "#" + attr
        update_expr_parts.append(f"{attr_name} = {placeholder}")
        expr_attr_names[attr_name] = attr
        expr_attr_values[placeholder] = value

    update_expr = "SET " + ", ".join(update_expr_parts)
    print("Output of construct_update_expression")
    print({
        "update_expr": update_expr,
        "expr_attr_names": expr_attr_names,
        "expr_attr_values": expr_attr_values
    })
    return update_expr, expr_attr_names, expr_attr_values
