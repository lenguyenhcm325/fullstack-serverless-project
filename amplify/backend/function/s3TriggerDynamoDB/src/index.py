import json
import boto3


def handler(event, context):
    s3_client = boto3.client("s3")
    dynamodb = boto3.client("dynamodb")
    print("that's the event")
    print('received event:')
    print(event)

    bucket_name = event["Records"][0]["s3"]["bucket"]["name"]
    object_key = event["Records"][0]["s3"]["object"]["key"]

    print(f'{bucket_name} {object_key}')
    event_name = event["Records"][0]["eventName"]
    response = s3_client.head_object(Bucket=bucket_name, Key=object_key)
    metadata = response.get("Metadata", {})
    if event_name == "ObjectCreated:Put":
        last_modified = event["Records"][0]["eventTime"]
        size = event["Records"][0]["s3"]["object"]["size"]

        print("This is the metadata that youve got")
        print(metadata)
        objectUrl = f'https://{bucket_name}.s3.eu-central-1.amazonaws.com/{object_key}'
        dynamodb.put_item(
            TableName="profilePicsMetadata-dev",
            Item={
                "userId": {
                    "S": metadata["userid"]
                },
                "fullSizeUrl": {
                    "S": objectUrl
                },
                "lastModified": {
                    "S": last_modified
                },
                "size": {
                    "N": str(size)
                }



            }
        )

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps('Entry added to DynamoDB')
        }
    elif event_name == "ObjectRemoved:DeleteMarkerCreated":
        dynamodb.delete_item(
            TableName="profilePicsMetadata-dev",
            Key={
                "userId": {
                    "S": metadata["userid"]
                },
            }
        )
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps('Entry deleted from DynamoDB')
        }
    else:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps('Bad request!')
        }
