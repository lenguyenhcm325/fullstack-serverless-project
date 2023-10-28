import json
import boto3
from .utilities import construct_update_expression
import os


env = os.environ["ENV"]


def handle_put_request(event, user_id):
    try:
        body = event["body"]
        print(body)
        body_data = json.loads(body)
        keys_to_remove = ["taskId", "listId"]
        task_id = event["pathParameters"]["taskId"]
        list_id = body_data["listId"]
        body_data_without_task_id = {
            k: v for k, v in body_data.items() if k not in keys_to_remove}
        print("body_data_without_task_id")
        print(body_data_without_task_id)

        update_expr, expr_attr_names, expr_attr_values = construct_update_expression(
            body_data_without_task_id)
        # These three must be passed to the backend

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

    lists_table_name = "listsTableV2-" + env

    lists_primary_key = {"listId": {"S": list_id},
                         "userId": {"S": user_id}}

    # here we check whether the user is authorized to do so
    try:
        response = dynamodb.get_item(
            TableName=lists_table_name, Key=lists_primary_key)
        print(response)
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

    dynamodb = boto3.client("dynamodb")
    print({"list_id": list_id, "task_id": task_id})
    tasks_table_name = "tasksTable-" + env
    tasks_primary_key = {
        "listId": list_id,
        "taskId": task_id

    }
    try:
        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table(tasks_table_name)
        response = table.update_item(
            Key=tasks_primary_key,
            UpdateExpression=update_expr,
            ExpressionAttributeNames=expr_attr_names,
            ExpressionAttributeValues=expr_attr_values,
            ReturnValues="UPDATED_NEW"
        )
        print("executed update status complete!")
        print(response)
        status_after_update = response["Attributes"]
        # print(status_after_update)
        print(
            f'changed the status of task ${task_id} to ${status_after_update} successfully!')
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(f'changed the status of task ${task_id} to ${status_after_update} successfully!')
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
            'body': json.dumps("Something went wrong")
        }
