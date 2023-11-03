from method_handlers.utilities import handle_claim
from method_handlers.get import handle_get_request
from method_handlers.options import handle_options_request


def handler(event, context):
    print(event)
    claim = None
    result = handle_claim(event)
    if result["error"]:
        return result["return_value"]
    else:
        claim = result["return_value"]

    user_id = claim["sub"]

    if event["httpMethod"] == "GET":
        return handle_get_request(user_id)
    if event["httpMethod"] == "OPTIONS":
        return handle_options_request()
