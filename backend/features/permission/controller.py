from flask import request, jsonify
from features.permission.validation import permissionValidation
from features.permission.service import ( add_permission, display_permission, update_permission, delete_permission )
from middleware.auth_middleware import authentication_required
from middleware.permission_middleware import permission_required

@authentication_required
@permission_required("AddPermission")
def add_permission_controller():
    data = request.get_json()

    is_valid, validate_data = permissionValidation(data)

    if not is_valid:
        return jsonify({"message": validate_data}), 400

    status, message = add_permission(
        validate_data["AddPermission"],
        validate_data["EditPermission"],
        validate_data["DeletePermission"],
        validate_data["ViewPermission"]
    )

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200


@authentication_required
@permission_required("ViewPermission")
def display_permission_controller():
    permissions = display_permission()

    return jsonify([
        {
            "Permission_Id": permission.Permission_Id,
            "AddPermission": permission.AddPermission,
            "EditPermission": permission.EditPermission,
            "DeletePermission": permission.DeletePermission,
            "ViewPermission": permission.ViewPermission
        }
        for permission in permissions
    ]), 200


@authentication_required
@permission_required("EditPermission")
def update_permission_controller(permission_id):
    data = request.get_json()

    is_valid, validate_data = permissionValidation(data)

    if not is_valid:
        return jsonify({"message": validate_data}), 400

    status, message = update_permission(
        permission_id,
        validate_data["AddPermission"],
        validate_data["EditPermission"],
        validate_data["DeletePermission"],
        validate_data["ViewPermission"]
    )

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200


@authentication_required
@permission_required("DeletePermission")
def delete_permission_controller(permission_id):

    status, message = delete_permission(permission_id)

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200