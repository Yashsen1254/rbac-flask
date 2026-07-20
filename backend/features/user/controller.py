from flask import request, jsonify
from features.user.service import add_users, display_user, update_user, delete_user
from features.user.validation import userValidation
from middleware.auth_middleware import authentication_required

def add_user_controller():
    data = request.get_json()

    is_valid, validated_data = userValidation(data)

    if not is_valid:
        return jsonify({"message": validated_data}), 400

    status, message = add_users(
        validated_data["Name"],
        validated_data["Email"],
        validated_data["Password"]
    )

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200


@authentication_required
def display_user_controller():
    users = display_user()
    return jsonify(users), 200

def update_user_controller(user_id):
    data = request.get_json()

    is_valid, validated_data = userValidation(data)

    if not is_valid:
        return jsonify({"message": validated_data}), 400

    status, message = update_user(
        user_id,
        validated_data["Name"],
        validated_data["Email"],
        validated_data["Password"]
    )

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200


def delete_user_controller(user_id):
    status, message = delete_user(user_id)

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200