from method_handlers.get import handle_get_request
from method_handlers.post import handle_post_request
from method_handlers.options import handle_options_request
from method_handlers.utilities import handle_claim
from method_handlers.put import handle_put_request
from method_handlers.delete import handle_delete_request


def handler(event, context):
    print(event)
    claim = None
    result = handle_claim(event)
    if result["error"]:
        return result["return_value"]
    else:
        claim = result["return_value"]

    user_id = claim["sub"]
    email = claim["email"]

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
