import json
import boto3
from boto3.dynamodb.conditions import Key
import os

env = os.environ["ENV"]


def handle_get_request(user_id):
    dynamodb = boto3.resource("dynamodb")
    table_name = "listsTableV2-" + env
    table = dynamodb.Table(table_name)

    try:
        response = table.query(
            IndexName="listsTableV2GSI",
            KeyConditionExpression=Key('userId').eq(user_id)
        )
        print(response)
        items = response["Items"]
        print("items found!!!")
        print(items)
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
            'body': json.dumps("Something went wrong")
        }
