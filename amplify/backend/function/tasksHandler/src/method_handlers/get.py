import json
import boto3
from boto3.dynamodb.conditions import Key


def handle_get_request(event, user_id, email):
    list_id = event["pathParameters"]["listId"]
    dynamodb_client = boto3.client("dynamodb")

    lists_table_name = "listsTable-dev"

    lists_primary_key = {"listId": {"S": list_id}}

    try:
        response = dynamodb_client.get_item(
            TableName=lists_table_name, Key=lists_primary_key)
        item = response.get("Item")
        if item:
            print("there is a list with the same list id! ")
            print(item)
            collaborator_emails_list = item.get("collaborators", None)
            if item["ownerId"]["S"] != user_id:
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

        profile_pic_urls_cache = {}
        profile_pics_table_name = "profilePicsMetadata-dev"

        dynamodb_resource = boto3.resource("dynamodb")
        table = dynamodb_resource.Table(tasks_table_name)
        partition_key_name = "listId"
        partition_key_value = list_id

        response = table.query(
            KeyConditionExpression=Key(
                partition_key_name).eq(partition_key_value)
        )

        items = response["Items"]
        print("there are items inside this list already!")
        print(items)
        for item in items:

            if item["userId"] in profile_pic_urls_cache:
                pass
            else:
                response = dynamodb_client.get_item(
                    TableName=profile_pics_table_name,
                    Key={
                        "userId": {
                            "S": item["userId"]
                        }
                    }
                )
                profile_pic_metadata = response.get("Item")
                if not profile_pic_metadata:
                    profile_pic_urls_cache[item["userId"]] = None
                else:
                    profile_pic_url = profile_pic_metadata["fullsizeUrl"]["S"]
                    profile_pic_urls_cache[item["userId"]] = profile_pic_url

            # Fix this later!
            item["thumbnailUrl"] = profile_pic_urls_cache[item["userId"]]

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
