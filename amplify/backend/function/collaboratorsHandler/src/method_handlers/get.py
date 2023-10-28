import json
import boto3
import os
from boto3.dynamodb.conditions import Key
import pytz
import datetime
import uuid


env = os.environ["ENV"]


def handle_get_request(event):
    try:

        list_id = event["queryStringParameters"]["listId"]

    except Exception as e:
        print("Missing required attribute(s)!")
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

    dynamodb = boto3.client("dynamodb")
    dynamodb_resource = boto3.resource("dynamodb")
    lookup_table_name = "listsTableV2-" + env
    lookup_partition_key = 'listId'
    # here we check whether the user is authorized to do so

    try:
        table = dynamodb_resource.Table(lookup_table_name)
        response = table.query(
            KeyConditionExpression=Key(lookup_partition_key).eq(list_id)
        )
        print(response)
        items = response["Items"] if response["Items"] else None
        if not items:
            print("Bad request! No list with the given ID found!")
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                'body': json.dumps("Bad request!")
            }
        else:
            users_with_role = []
            user_id_to_email = {}
            for item in items:
                user_id_from_item = item.get("userId")
                if user_id_to_email.get(user_id_from_item):
                    pass
                else:
                    response = dynamodb.get_item(
                        TableName="userIdToInfo-" + env,
                        Key={
                            "userId": {
                                "S": user_id_from_item
                            }
                        }
                    )
                    user_info = response.get("Item")
                    user_email = user_info.get("email").get("S")
                    user_id_to_email[user_id_from_item] = user_email
                users_with_role.append({
                    "email": user_id_to_email.get(user_id_from_item),
                    "role": item.get("role")
                })
            print(
                "here is the user list with role"
            )
            print(user_id_to_email)
            print(
                users_with_role
            )

            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                'body': json.dumps(users_with_role)
            }

    except Exception as e:
        print("there is an error GET collaboratorsHandler")
        print(e)

        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps("there is an error getting the list of collaborators")
        }
