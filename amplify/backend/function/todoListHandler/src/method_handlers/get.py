import json
import boto3
from boto3.dynamodb.conditions import Attr


def handle_get_request(user_id):
    dynamodb = boto3.resource("dynamodb")
    table_name = "listsTable-dev"
    table = dynamodb.Table(table_name)

    try:
        response = table.scan(
            FilterExpression=Attr('ownerId').eq(user_id)
        )
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
            'body': json.dumps(e)
        }
