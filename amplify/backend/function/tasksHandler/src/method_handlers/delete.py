import json
import boto3


def handle_delete_request(event):
    try:

        list_id = event["queryStringParameters"]["listId"]
        task_id = event["queryStringParameters"]["taskId"]
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
    dynamodb = boto3.resource("dynamodb")
    table_name = "tasksTable-dev"
    table = dynamodb.Table(table_name)
    try:
        response = table.delete_item(
            Key={
                "listId": list_id,
                "taskId": task_id
            }
        )
        print(response)
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(f"Task {task_id} from {list_id} deleted successfully!")
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
            'body': json.dumps("Something went wrong!")
        }
