from flask import request, jsonify
from features.auth.validation import loginValidation
from features.auth.service import login_user

def login_controller():
    data = request.get_json()

    is_valid, validate_data = loginValidation(data)

    if not is_valid:
        return jsonify({"message": validate_data}), 400

    status, result = login_user(
        validate_data["Email"],
        validate_data["Password"]
    )

    if not status:
        return jsonify({"message": result}), 400

    return jsonify({"message": result}), 200