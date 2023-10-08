// // This file is used to override the REST API resources configuration
// import { AmplifyApiRestResourceStackTemplate, AmplifyProjectInfo } from '@aws-amplify/cli-extensibility-helper';

// export function override(resources: AmplifyApiRestResourceStackTemplate) {
//     resources.restApi.body = {
//       openapi: "3.0.1",
//       info: {
//         title: "items-api",
//         version: "1.0.0-oas3",
//       },
//       paths: {
//         "/profile/{userId}": {
//           get: {
//             summary: "Get user profile",
//             description: "Get user profile",
//             responses: {
//               "200": {
//                 description: "Get user profile Successfully",
//                 content: {
//                   "application/json": {
//                     schema: {
//                       type: "array",
//                       items: {
//                         $ref: "#/components/schemas/User",
//                       },
//                     },
//                   },
//                 },
//               },
//               "500": {
//                 description: "Internal Server Error",
//                 content: {},
//               },
//             },
//             "x-amazon-apigateway-integration": {
//               uri: "arn:aws:apigateway:eu-central-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-central-1:312290079196:function:getUserProfile-dev/invocations",
//               responses: {
//                 default: {
//                   statusCode: "200",
//                 },
//               },
//               passthroughBehavior: "when_no_match",
//               httpMethod: "POST",
//               contentHandling: "CONVERT_TO_TEXT",
//               type: "aws_proxy",
//             },
//           },
//           post: {
//             summary: "Create or Update user profile",
//             description: "Create or Update a user profile",
//             requestBody: {
//                 required: true,
//                 content: {
//                     "application/json": {
//                         schema: {
//                             $ref: "#/components/schemas/User",
//                         },
//                     },
//                 },
//             },
//             responses: {
//                 "201": {
//                     description: "Profile Created Successfully",
//                     content: {
//                         "application/json": {
//                             schema: {
//                                 $ref: "#/components/schemas/User",
//                             },
//                         },
//                     },
//                 },
//                 "200": {
//                     description: "Profile Updated Successfully",
//                     content: {
//                         "application/json": {
//                             schema: {
//                                 $ref: "#/components/schemas/User",
//                             },
//                         },
//                     },
//                 },
//                 "400": {
//                     description: "Bad Request",
//                     content: {},
//                 },
//                 "500": {
//                     description: "Internal Server Error",
//                     content: {},
//                 },
//             },
//             "x-amazon-apigateway-integration": {
//                 uri: "arn:aws:apigateway:eu-central-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-central-1:312290079196:function:updateUserProfile-dev/invocations",
//                 responses: {
//                     default: {
//                         statusCode: "200",
//                     },
//                 },
//                 passthroughBehavior: "when_no_match",
//                 httpMethod: "POST",
//                 contentHandling: "CONVERT_TO_TEXT",
//                 type: "aws_proxy",
//             },
//           }, 
//           options: {
//             "summary": "CORS support",
//             "description": "Enable CORS by returning correct headers",
//             "responses": {
//                 "200": {
//                     "description": "Default response for CORS method",
//                     "headers": {
//                         "Access-Control-Allow-Origin": {
//                           "schema": {
//                             "type": "string"
//                           }
//                         },
//                         "Access-Control-Allow-Methods": {
//                           "schema": {
//                             "type": "string"
//                           }
//                         },
//                         "Access-Control-Allow-Headers": {
//                           "schema": {
//                             "type": "string"
//                           }
//                         }
//                     }
//                 }
//             },
//             "x-amazon-apigateway-integration": {
//                 "type": "mock",
//                 "requestTemplates": {
//                     "application/json": "{\"statusCode\" : 200}"
//                 },
//                 "responses": {
//                     "default": {
//                         "statusCode": "200",
//                         "responseTemplates": {
//                             "application/json": "{}"
//                         },
//                         "responseParameters": {
//                             // "method": {
//                             //   "response": {
//                             //     "header": {
//                             //       "Access-Control-Allow-Methods": "'GET,POST,OPTIONS'",
//                             //       "Access-Control-Allow-Origin": "'*'",
//                             //       "Access-Control-Allow-Headers": "'*'",
//                             //     }
//                             //   }
//                             // }
//                             "method.response.header.Access-Control-Allow-Methods": "'*'",
//                             "method.response.header.Access-Control-Allow-Origin": "'*'",
//                             "method.response.header.Access-Control-Allow-Headers": "'*'",

//                         }
//                     }
//                 }
//             }
//           }
//         },
//         "/lists": {
//           get: {
//             summary: "Get user's to-do list",
//             description: "Get user's to-do list",
//             responses: {
//               "200": {
//                 description: "Get user's todo list Successfully",
//                 content: {
//                   "application/json": {
//                     schema: {
//                       type: "array",
//                       items: {
//                         $ref: "#/components/schemas/TodoList", 
//                       },
//                     },
//                   },
//                 },
//               },
//               "500": {
//                 description: "Internal Server Error",
//                 content: {},
//               },
//             },
//             "x-amazon-apigateway-integration": {
//               uri: "arn:aws:apigateway:eu-central-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-central-1:312290079196:function:getTodoList-dev/invocations",
//               responses: {
//                 default: {
//                   statusCode: "200",
//                 },
//               },
//               passthroughBehavior: "when_no_match",
//               httpMethod: "POST",
//               contentHandling: "CONVERT_TO_TEXT",
//               type: "aws_proxy",
//             },
//           },
//           post: {
//             summary: "Create a to-do list for user",
//             description: "Create a to-do list for user",
//             requestBody: {
//                 required: true,
//                 content: {
//                     "application/json": {
//                         schema: {
//                             $ref: "#/components/schemas/TodoList",
//                         },
//                     },
//                 },
//             },
//             responses: {
//                 "201": {
//                     description: "Todo-list Created Successfully",
//                     content: {
//                         "application/json": {
//                             schema: {
//                                 $ref: "#/components/schemas/TodoList",
//                             },
//                         },
//                     },
//                 },
//                 // "200": {
//                 //     description: "Profile Updated Successfully",
//                 //     content: {
//                 //         "application/json": {
//                 //             schema: {
//                 //                 $ref: "#/components/schemas/User",
//                 //             },
//                 //         },
//                 //     },
//                 // },
//                 "400": {
//                     description: "Bad Request ",
//                     content: {},
//                 },
//                 "500": {
//                     description: "Internal Server Error",
//                     content: {},
//                 },
//             },
//             "x-amazon-apigateway-integration": {
//                 uri: "arn:aws:apigateway:eu-central-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-central-1:312290079196:function:createTodoList-dev/invocations",
//                 responses: {
//                     default: {
//                         statusCode: "500",
//                     },
//                 },
//                 passthroughBehavior: "when_no_match",
//                 httpMethod: "POST",
//                 contentHandling: "CONVERT_TO_TEXT",
//                 type: "aws_proxy",
//             },
//           }, 
//           options: {
//             "summary": "CORS support",
//             "description": "Enable CORS by returning correct headers",
//             "responses": {
//                 "200": {
//                     "description": "Default response for CORS method",
//                     "headers": {
//                         "Access-Control-Allow-Origin": {
//                           "schema": {
//                             "type": "string"
//                           }
//                         },
//                         "Access-Control-Allow-Methods": {
//                           "schema": {
//                             "type": "string"
//                           }
//                         },
//                         "Access-Control-Allow-Headers": {
//                           "schema": {
//                             "type": "string"
//                           }
//                         }
//                     }
//                 }
//             },
//             "x-amazon-apigateway-integration": {
//                 "type": "mock",
//                 "requestTemplates": {
//                     "application/json": "{\"statusCode\" : 200}"
//                 },
//                 "responses": {
//                     "default": {
//                         "statusCode": "200",
//                         "responseTemplates": {
//                             "application/json": "{}"
//                         },
//                         "responseParameters": {
//                             // "method": {
//                             //   "response": {
//                             //     "header": {
//                             //       "Access-Control-Allow-Methods": "'GET,POST,OPTIONS'",
//                             //       "Access-Control-Allow-Origin": "'*'",
//                             //       "Access-Control-Allow-Headers": "'*'",
//                             //     }
//                             //   }
//                             // }
//                             "method.response.header.Access-Control-Allow-Methods": "'*'",
//                             "method.response.header.Access-Control-Allow-Origin": "'*'",
//                             "method.response.header.Access-Control-Allow-Headers": "'*'",

//                         }
//                     }
//                 }
//             }
//           }
//         },
//         "/lists/{listId}": {
//           get: {
//             summary: "Get task from a certain to-do list ",
//             description: "Get task from a certain to-do list ",
//             responses: {
//               "200": {
//                 description: "Get task from a todo list Successfully",
//                 content: {
//                   "application/json": {
//                     schema: {
//                       type: "array",
//                       items: {
//                         $ref: "#/components/schemas/Task", 
//                       },
//                     },
//                   },
//                 },
//               },
//               "500": {
//                 description: "Internal Server Error",
//                 content: {},
//               },
//             },
//             "x-amazon-apigateway-integration": {
//               uri: "arn:aws:apigateway:eu-central-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-central-1:312290079196:function:fetchTasksFromTodoList-dev/invocations",
//               responses: {
//                 default: {
//                   statusCode: "200",
//                 },
//               },
//               passthroughBehavior: "when_no_match",
//               httpMethod: "POST",
//               contentHandling: "CONVERT_TO_TEXT",
//               type: "aws_proxy",
//             },
//           },
//           post: {
//             summary: "Add task to a certain todo list  ",
//             description: "Add task to a certain todo list  ",
//             requestBody: {
//                 required: true,
//                 content: {
//                     "application/json": {
//                         schema: {
//                             $ref: "#/components/schemas/Task",
//                         },
//                     },
//                 },
//             },
//             responses: {
//                 "201": {
//                     description: "Todo-list Created Successfully",
//                     content: {
//                         "application/json": {
//                             schema: {
//                                 $ref: "#/components/schemas/Task",
//                             },
//                         },
//                     },
//                 },
//                 // "200": {
//                 //     description: "Profile Updated Successfully",
//                 //     content: {
//                 //         "application/json": {
//                 //             schema: {
//                 //                 $ref: "#/components/schemas/User",
//                 //             },
//                 //         },
//                 //     },
//                 // },
//                 "400": {
//                     description: "Bad Request ",
//                     content: {},
//                 },
//                 "500": {
//                     description: "Internal Server Error ",
//                     content: {},
//                 },
//             },
//             "x-amazon-apigateway-integration": {
//                 uri: "arn:aws:apigateway:eu-central-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-central-1:312290079196:function:createTaskFromTodoList-dev/invocations",
//                 responses: {
//                     default: {
//                         statusCode: "500",
//                     },
//                 },
//                 passthroughBehavior: "when_no_match",
//                 httpMethod: "POST",
//                 contentHandling: "CONVERT_TO_TEXT",
//                 type: "aws_proxy",
//             },
//           }, 
//           options: {
//             "summary": "CORS support",
//             "description": "Enable CORS by returning correct headers",
//             "responses": {
//                 "200": {
//                     "description": "Default response for CORS method",
//                     "headers": {
//                         "Access-Control-Allow-Origin": {
//                           "schema": {
//                             "type": "string"
//                           }
//                         },
//                         "Access-Control-Allow-Methods": {
//                           "schema": {
//                             "type": "string"
//                           }
//                         },
//                         "Access-Control-Allow-Headers": {
//                           "schema": {
//                             "type": "string"
//                           }
//                         }
//                     }
//                 }
//             },
//             "x-amazon-apigateway-integration": {
//                 "type": "mock",
//                 "requestTemplates": {
//                     "application/json": "{\"statusCode\" : 200}"
//                 },
//                 "responses": {
//                     "default": {
//                         "statusCode": "200",
//                         "responseTemplates": {
//                             "application/json": "{}"
//                         },
//                         "responseParameters": {
//                             // "method": {
//                             //   "response": {
//                             //     "header": {
//                             //       "Access-Control-Allow-Methods": "'GET,POST,OPTIONS'",
//                             //       "Access-Control-Allow-Origin": "'*'",
//                             //       "Access-Control-Allow-Headers": "'*'",
//                             //     }
//                             //   }
//                             // }
//                             "method.response.header.Access-Control-Allow-Methods": "'*'",
//                             "method.response.header.Access-Control-Allow-Origin": "'*'",
//                             "method.response.header.Access-Control-Allow-Headers": "'*'",

//                         }
//                     }
//                 }
//             }
//           }
//         },
//       }, //path close brackets
//       components: {
//         schemas: {
//           User: {
//             type: "object",
//             properties: {
//               userId: {
//                 type: "string",
//               },
//               email: {
//                 type: "string"
//               },
//               firstName: {
//                 type: "string",
//               },
//               lastName: {
//                 type: "string",
//               },
//               dateJoined: {
//                 type: "string",
//               },
//             },
//           },
//           TodoList: {
//             type: "object",
//             properties: {
//               userId: {
//                 type: "string",
//               },
//               title: {
//                 type: "string"
//               },
//             },
//           },
//           Task: {
//             type: "object",
//             properties: {
//               listId: {
//                 type: "string",
//               },
//               taskId: {
//                 type: "string",
//               },
//               title: {
//                 type: "string",
//               },
//               creatorId: {
//                 type: "string"
//               },
//               creatorEmail: {
//                 type: "string"
//               },
//               creatorThumbnailUrl: {
//                 type: "string"
//               }
//             }
//           }

//         },
//       },
//     };
//   }
