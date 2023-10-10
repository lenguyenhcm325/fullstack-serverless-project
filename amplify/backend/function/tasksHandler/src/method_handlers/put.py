import json
import boto3


def handle_put_request(event):
    try:
        body = event["body"]
        body_data = json.loads(body)

        # These three must be passed to the backend
        task_id = body_data["taskId"]
        status = body_data["status"]
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
    print({"list_id": list_id, "task_id": task_id, "status": status})
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
            UpdateExpression="SET #statusAttribute = :statusValue",
            ExpressionAttributeNames={
                "#statusAttribute": "status"
            },
            ExpressionAttributeValues={
                ":statusValue": status
            },
            ReturnValues="UPDATED_NEW"
        )
        print("executed update status complete!")
        print(response)
        status_after_update = response["Attributes"]["status"]
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
