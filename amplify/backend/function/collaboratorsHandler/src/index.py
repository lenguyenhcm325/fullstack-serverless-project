from method_handlers.post import handle_post_request
from method_handlers.options import handle_options_request
from method_handlers.utilities import handle_claim


def handler(event, context):
    print("this is the event object")
    print(event)
    claim = None
    result = handle_claim(event)
    if result["error"]:
        return result["return_value"]
    else:
        claim = result["return_value"]

    user_id = claim["sub"]
    email = claim["email"]

    if event["httpMethod"] == "POST":
        return handle_post_request(event, user_id, email)
    if event["httpMethod"] == "OPTIONS":
        return handle_options_request()
