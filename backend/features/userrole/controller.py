from flask import request, jsonify
from features.userrole.service import add_userrole, display_userrole, update_userrole, delete_userrole
from features.userrole.validation import roleuserValidation
from middleware.auth_middleware import authentication_required
from middleware.permission_middleware import permission_required
from middleware.activity_logger import activity_log

@authentication_required
@permission_required("UserRole", "AddPermission")
@activity_log(module="UserRole", action="Add")
def add_userrole_controller():
    data = request.get_json()

    is_valid, result = roleuserValidation(data)

    if not is_valid:
        return jsonify({"message": result}), 400

    status, message = add_userrole(
        result["User_Id"],
        result["Role_Id"]
    )

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200


@authentication_required
@permission_required("UserRole", "ViewPermission")
def display_userrole_controller():
    userroles = display_userrole()

    return jsonify([
        {
            "RoleUser_Id": userrole.RoleUser_Id,
            "User_Id": userrole.User_Id,
            "Role_Id": userrole.Role_Id,
            "User_Name": userrole.User.Name if userrole.User else "",
            "Role_Name": userrole.Role.Name if userrole.Role else ""
        }
        for userrole in userroles
    ]), 200


@authentication_required
@permission_required("UserRole", "EditPermission")
@activity_log(module="UserRole", action="Edit")
def update_userrole_controller(userrole_id):
    data = request.get_json()

    is_valid, result = roleuserValidation(data)

    if not is_valid:
        return jsonify({"message": result}), 400

    status, message = update_userrole(
        userrole_id,
        result["User_Id"],
        result["Role_Id"]
    )

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200


@authentication_required
@permission_required("UserRole", "DeletePermission")
@activity_log(module="UserRole", action="Delete")
def delete_userrole_controller(userrole_id):

    status, message = delete_userrole(userrole_id)

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200