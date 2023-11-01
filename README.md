# Serverless Application

## :star: [Click here for the Live Version](https://main.d24dk6m4m6f1zu.amplifyapp.com/) :star:

For the best experience, please use in full-screen mode as the web application is more optimized for larger displays.  
Test login credentials:

- Email:
- Password:

## Features

### Deployed using Amplify CLI and hosted on Amplify Hosting, completely serverless

- The backend consists of:

1. **Lambda** functions handle all CRUD requests
2. **API Gateway** acts as RESTful API
3. **Dynamodb** tables serves as the persistent layer
4. **Amazon Cognito** fully manages authentication
5. **CloudWatch** facilitates logs centralization
   (Dev resources are not Prod resources)

- The frontend consists of:

1. **React.js** is developed locally and goes live in seconds with `amplify publish`

- The deployment is seamless as with just the command `amplify push` all the changes are propagated online. Adding infrastructures such as authorization service or databases are also straightforward with `amplify add function`, `amplify add add auth`, `amplify add api`.

- IAM Roles or Environment Variables can be modified programmatically without resorting to AWS Console.

- Every git commit serves as a checkpoint for rollback in case there are errors or failed deployment.

### JWT Token-Based User Authorization for DynamoDB Access - [Code for JWT Token Handling](https://github.com/lenguyenhcm325/fullstack-serverless-project/blob/main/amplify/backend/function/tasksHandler/src/method_handlers/utilities.py)

- Upon receiving a JWT Token inside a request's header, the backend AWS Lambda will verify it. Data access is permitted only if the JWT's UID claim is the same with the DynamoDB's partition or primary key. Unauthorized access attempts are blocked.

- Below is a code snippet illustrating how a request to retrieve user information is authenticated. If there's a user ID mismatch, the Lambda function responds with `401 Unauthorized`.

```javascript
// index.py snippet
    claim = None
    result = handle_claim(event)
    if result["error"]:
        return result["return_value"]
    else:
        claim = result["return_value"]

    user_id = claim["sub"]
    // ...

    // get.py snippet
def handle_get_request(event, user_id):
    user_id_from_url = event["pathParameters"]["userId"]
    if user_id != user_id_from_url:
        return {
            'statusCode': 401,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps("Unauthorized!")
        }
    //  ...
```

### Different DynamoDB tables and Cognito User Pools for `dev` and `prod` - **merge with the first idea!**

- Utilizing environments of Amplify, two environments for development and production are created, (provide 1 2 benefits)

![dev DynamoDB tables](./readme_images/dynamodb_tables_dev1.jpg)

![main (prod) DynamoDB tables](./readme_images/dynamodb_tables_main1.jpg)

### Event-driven Lambda triggers

- On each Cognito user registration, a post-confirmation Lambda is triggered, creating a unique entry in the `userIdToInfo` table for storing user details.

- When a user uploads a new profile image to S3, an associated Lambda function is invoked by the S3 event, saving the image metadata to the `profilePicsMetadata` table.

### DynamoDB Table design

- `listsTableV2` with `listId` as partition key and `userId` as sort key allow efficient query for all users (collaborators or owner) of a certain list. This table also has an index with `userId - listId` as composite key, which allows to fetch all lists that a user is either a collaborator or owner efficiently.

- `userIdToInfo` with `userId` as primary key, this allows efficient lookup for personal information related to the user such as `dateJoined`, `email`

- `tasksTable` with `listId` as the partition key and `taskId` as the sort key, as the application always fetch all tasks belonging to a list, this design really help fast querying. This is also the most important table of all, it stores all information related to a task (`createdTime`, `note`, `status` of _todo_, _doing_ or _done_ `userId` of the user created the task).

- Lastly, `profilePicsMetadata` is being added or modified whenever a user upload a new profile picture using the UI to S3, a Lambda is automatically invoked by **S3 Event Notification** to store image's URL and other attributes.

### Many users can work on one list, users can add others as collaborators

- The `listsTableV2` and `tasksTable` facilitates efficient data fetching which also improves latency when fetching (write this again but uses other words to sound smoother). One a user is added to a list as a collaborator, they can view all those lists in their [`profile`](./src/routes/profile/profile.component.jsx) page.

### Modularized Lambda Handlers for Each HTTP Method - [Code for all Lambda functions MOVE THIS UP!](https://github.com/lenguyenhcm325/fullstack-serverless-project/tree/main/amplify/backend/function)

- For better maintainability, each HTTP method of each Lambda function has its dedicated module. This ensures cleaner code structure and easier debugging.
  ```python
  def handler(event, context):
    # ...
    if event["httpMethod"] == "DELETE":
        return handle_delete_request(event)
    if event["httpMethod"] == "GET":
        return handle_get_request(event, user_id, email)
    if event["httpMethod"] == "POST":
        return handle_post_request(event, user_id, email)
    if event["httpMethod"] == "OPTIONS":
        return handle_options_request()
    if event["httpMethod"] == "PUT":
        return handle_put_request(event, user_id)
  ```

![Lambda code structure](./readme_images/lambda_code_structure1.png)

### API Gateway using Lambda Proxy Integration and Handling CORS

- With Lambda Proxy Integration, Lambda functions must return appropriate HTTP response structures, as their outputs are directly returned to the API callers. The functions must additionally include CORS headers in its response.

  ![API Gateway With Lambda Integration](./readme_images/api_gateway_lambda1.png)

- Example Lambda's return statement:

  ```javascript
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: json.dumps(items),
  };
  ```
