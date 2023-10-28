import json
import boto3
import pytz
import datetime
import uuid
import os


env = os.environ["ENV"]


def handle_post_request(event, user_id):

    try:
        body = event["body"]
        body_data = json.loads(body)
        title = body_data["title"]

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
    table_name = "listsTableV2-" + env
    try:
        generated_uuid = str(uuid.uuid4())

        print(f'This is the generated uuid: {generated_uuid}')
        utc_now = datetime.datetime.now(pytz.utc)
        formatted_date = utc_now.isoformat()
        print(f"time iso 8601 {formatted_date}")
        ItemObject = {
            "listId": {
                "S": generated_uuid
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
            "role": {
                "S": "owner"
            }
        }
        print("below is the put_item Item")
        print(ItemObject)
        response = dynamodb.put_item(
            TableName=table_name,
            Item=ItemObject
        )
        print(response)
        print(f"Todo-list for user {user_id} created!")
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
            'body': json.dumps("Something went wrong")
        }
