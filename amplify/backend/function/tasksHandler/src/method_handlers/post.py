import json
import boto3
import pytz
import datetime
import uuid


def handle_post_request(event, user_id, email):
    try:
        body = event["body"]
        body_data = json.loads(body)

        # DEAL WITH THIS
        title = body_data["title"]
        status = body_data["status"]
        note = body_data["note"]
        # It is path param, isn't it?!
        list_id = event["pathParameters"]["listId"]

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

    lists_table_name = "listsTableV2-dev"

    lists_primary_key = {"listId": {"S": list_id},
                         "userId": {"S": user_id}}

    # here we check whether the user is authorized to do so
    try:
        response = dynamodb.get_item(
            TableName=lists_table_name, Key=lists_primary_key)
        item = response.get("Item")
        if not item:
            return {
                'statusCode': 401,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                'body': json.dumps("Unauthorized!")
            }

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
            },
            "status": {
                "S": status
            },
            "note": {
                "S": note
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

        # print("there is a list with the same list id!")
        # print(item)
        # collaborator_emails_list = item.get("collaborators", None)
        # if item["ownerId"]["S"] != user_id:
        #     print("user is not the owner")
        #     if not collaborator_emails_list or email not in collaborator_emails_list:
        #         return {
        #             'statusCode': 401,
        #             'headers': {
        #                 'Access-Control-Allow-Headers': '*',
        #                 'Access-Control-Allow-Origin': '*',
        #                 'Access-Control-Allow-Methods': '*'
        #             },
        #             'body': json.dumps("Unauthorized!")
        #         }
        # print("User is authorized to add task to this list!")
