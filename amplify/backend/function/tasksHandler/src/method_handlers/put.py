import json
import boto3
from .utilities import construct_update_expression


def handle_put_request(event):
    try:
        body = event["body"]
        print(body)
        body_data = json.loads(body)
        keys_to_remove = ["taskId"]
        body_data_without_task_id = {
            k: v for k, v in body_data.items() if k not in keys_to_remove}
        print("body_data_without_task_id")
        print(body_data_without_task_id)

        update_expr, expr_attr_names, expr_attr_values = construct_update_expression(
            body_data_without_task_id)
        # These three must be passed to the backend
        task_id = body_data["taskId"]
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
    print({"list_id": list_id, "task_id": task_id})
    tasks_table_name = "tasksTable-dev"
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
            'body': json.dumps(e)
        }
