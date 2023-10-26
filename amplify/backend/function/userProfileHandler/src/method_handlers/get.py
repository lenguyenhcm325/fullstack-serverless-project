import json
import boto3
import time
import urllib.request
from jose import jwk, jwt
from jose.utils import base64url_decode


def handle_get_request(event, user_id):
    user_id_from_url = event["pathParameters"]["userId"]
    dynamodb = boto3.client("dynamodb")
    table_name = "userIdToInfo-dev"
    primary_key = {"userId": {"S": user_id}}

    if user_id != user_id_from_url:
        return {
            'statusCode': 401,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps("Unauthorized!")
        }

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
