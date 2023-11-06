import json
import boto3
import os
from botocore.exceptions import ClientError

env = os.environ["ENV"]
bucket_name = os.environ["S3_PROFILE_PICS_BUCKET"]


def handle_get_request(user_id):
    s3_client = boto3.client("s3")
    client_method = "put_object"
    method_parameters = {
        "Key": f"fullsize/{user_id}.jpg",
        "Bucket": bucket_name,
        "ContentType": "image/*",
        "Metadata": {
            "userid": user_id
        }
    }
    expires_in = 60 * 60
    try:
        url = s3_client.generate_presigned_url(
            ClientMethod=client_method, Params=method_parameters, ExpiresIn=expires_in
        )
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps({"url": url})
        }
    except ClientError:
        print(
            f"Couldn't get a presigned URL for client method '{client_method}'.",
        )
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps("Internal Server Error")
        }
