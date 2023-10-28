import json
import boto3
import os
from boto3.dynamodb.conditions import Key
import pytz
import datetime
import uuid

env = os.environ["ENV"]


def handle_post_request(event, user_id, email):
    try:
        body = event["body"]
        body_data = json.loads(body)
        collaborator_email = body_data["email"]
        list_id = body_data["listId"]

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

    dynamodb = boto3.client("dynamodb")
    dynamodb_resource = boto3.resource("dynamodb")
    lookup_table_name = "userIdToInfo-" + env
    lookup_index_name = "emailToUserIdIndex"

    # here we check whether the user is authorized to do so

    try:
        table = dynamodb_resource.Table(lookup_table_name)
        response = table.query(
            IndexName=lookup_index_name,
            KeyConditionExpression=Key('email').eq(collaborator_email)
        )
        print(response)
        item = response["Items"][0] if response["Items"] else None
        if not item:
            print("Bad request! User with the provided email not found!")
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
            print("this is the collaborator_id! IMPORTANT!")
            collaborator_id = item["userId"]
            print(collaborator_id)
            lists_table_name = "listsTableV2-" + env
            owner_lists_primary_key = {
                "userId": {"S": user_id},
                "listId": {"S": list_id}
            }
            response = dynamodb.get_item(
                TableName=lists_table_name, Key=owner_lists_primary_key
            )
            print(response)
            item = response.get("Item")
            if not item:
                print(
                    "Bad request! The list that you are interacting with might not be yours or it doesn't exist")
                return {
                    'statusCode': 400,
                    'headers': {
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': '*'
                    },
                    'body': json.dumps("Bad request!")
                }
            item_without_owner_id = {k: v for k,
                                     v in item.items() if k != "userId"}

            # collaborator_lists_primary_key = {
            #     "userId": {"S": collaborator_id},
            #     "listId": {"S": list_id}
            # }
            response = dynamodb.put_item(
                TableName=lists_table_name,
                Item={
                    **item_without_owner_id,
                    "userId": {
                        "S": collaborator_id
                    },
                    "role": {
                        "S": "collaborator"
                    }
                }
            )
            print(response)
            print(
                f"added collaborator with id {collaborator_id} and email {collaborator_email} to list {list_id} succesfully")
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                'body': json.dumps(f"collaborator with id {collaborator_id} and {collaborator_email} to list {list_id} added succesfully")
            }

    except Exception as e:
        print("there is an error POST collaboratorsHandler")
        print(e)

        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps("Something went wrong")
        }
