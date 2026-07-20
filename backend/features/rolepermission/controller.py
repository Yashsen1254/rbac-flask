from flask import request, jsonify
from features.rolepermission.service import add_rolepermission, display_rolepermission, update_rolepermission, delete_rolepermission
from features.rolepermission.validation import rolepermissionValidation
from middleware.auth_middleware import authentication_required
from middleware.permission_middleware import permission_required

@authentication_required
@permission_required("AddPermission")
def add_rolepermission_controller():
    data = request.get_json()

    is_valid, result = rolepermissionValidation(data)

    if not is_valid:
        return jsonify({"message": result}), 400

    status, message = add_rolepermission(
        result["Role_Id"],
        result["Permission_Id"]
    )

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200

@authentication_required
@permission_required("ViewPermission")
def display_rolepermission_controller():
    rolepermissions = display_rolepermission()

    return jsonify([
        {
            "RolePermission_Id": rolepermission.RolePermission_Id,
            "Role_Id": rolepermission.Role_Id,
            "Permission_Id": rolepermission.Permission_Id
        }
        for rolepermission in rolepermissions
    ]), 200

@authentication_required
@permission_required("EditPermission")
def update_rolepermission_controller(rolepermission_id):
    data = request.get_json()

    is_valid, result = rolepermissionValidation(data)

    if not is_valid:
        return jsonify({"message": result}), 400

    status, message = update_rolepermission(
        rolepermission_id,
        result["Role_Id"],
        result["Permission_Id"]
    )

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200


@authentication_required
@permission_required("DeletePermission")
def delete_rolepermission_controller(rolepermission_id):
    status, message = delete_rolepermission(rolepermission_id)

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200