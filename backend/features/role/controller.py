from flask import request, jsonify
from features.role.service import add_role, display_role, update_role, delete_role
from features.role.validation import roleValidation
from middleware.auth_middleware import authentication_required
from middleware.permission_middleware import permission_required

@authentication_required
@permission_required("Role", "AddPermission")
def add_role_controller():
    data = request.get_json()

    is_valid, validate_data = roleValidation(data)

    if not is_valid:
        return jsonify({"message": validate_data}), 400

    status, message = add_role(validate_data["Name"])

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200

@authentication_required
@permission_required("Role", "ViewPermission")
def display_role_controller():
    roles = display_role()

    return jsonify([
        {
            "Role_Id": role.Role_Id,
            "Name": role.Name
        }
        for role in roles
    ]), 200

@authentication_required
@permission_required("Role", "EditPermission")
def update_role_controller(role_id):
    data = request.get_json()

    is_valid, validate_data = roleValidation(data)

    if not is_valid:
        return jsonify({"message": validate_data}), 400

    status, message = update_role(role_id, validate_data["Name"])

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200

@authentication_required
@permission_required("Role", "DeletePermission")
def delete_role_controller(role_id):
    status, message = delete_role(role_id)

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200