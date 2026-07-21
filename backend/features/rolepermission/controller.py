from flask import request, jsonify
from features.rolepermission.service import add_rolepermission, display_rolepermission, get_rolepermission_by_id, update_rolepermission, delete_rolepermission
from features.rolepermission.validation import rolepermissionValidation
from middleware.auth_middleware import authentication_required
from middleware.permission_middleware import permission_required

@authentication_required
@permission_required("RolePermission", "AddPermission")
def add_rolepermission_controller():
    data = request.get_json()

    is_valid, result = rolepermissionValidation(data)

    if not is_valid:
        return jsonify({"message": result}), 400

    status, message = add_rolepermission(
        result["Role_Id"],
        result["Page_Id"],
        result["AddPermission"],
        result["EditPermission"],
        result["DeletePermission"],
        result["ViewPermission"]
    )

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200

@authentication_required
@permission_required("RolePermission", "ViewPermission")
def display_rolepermission_controller():
    rolepermissions = display_rolepermission()

    return jsonify([
        {
            "RolePermission_Id": rp.RolePermissionModel.RolePermission_Id,
            "Role_Id": rp.RolePermissionModel.Role_Id,
            "Role_Name": rp.RoleModel.Name,
            "Page_Id": rp.RolePermissionModel.Page_Id,
            "PageName": rp.PageModel.PageName,
            "AddPermission": rp.RolePermissionModel.AddPermission,
            "EditPermission": rp.RolePermissionModel.EditPermission,
            "DeletePermission": rp.RolePermissionModel.DeletePermission,
            "ViewPermission": rp.RolePermissionModel.ViewPermission
        }
        for rp in rolepermissions
    ]), 200

@authentication_required
@permission_required("RolePermission", "ViewPermission")
def display_rolepermission_by_id_controller(rolepermission_id):
    rp = get_rolepermission_by_id(rolepermission_id)
    if not rp:
        return jsonify({"message": "Not found"}), 404
        
    return jsonify({
        "RolePermission_Id": rp.RolePermissionModel.RolePermission_Id,
        "Role_Id": rp.RolePermissionModel.Role_Id,
        "Role_Name": rp.RoleModel.Name,
        "Page_Id": rp.RolePermissionModel.Page_Id,
        "PageName": rp.PageModel.PageName,
        "AddPermission": rp.RolePermissionModel.AddPermission,
        "EditPermission": rp.RolePermissionModel.EditPermission,
        "DeletePermission": rp.RolePermissionModel.DeletePermission,
        "ViewPermission": rp.RolePermissionModel.ViewPermission
    }), 200

@authentication_required
@permission_required("RolePermission", "EditPermission")
def update_rolepermission_controller(rolepermission_id):
    data = request.get_json()

    is_valid, result = rolepermissionValidation(data)

    if not is_valid:
        return jsonify({"message": result}), 400

    status, message = update_rolepermission(
        rolepermission_id,
        result["Role_Id"],
        result["Page_Id"],
        result["AddPermission"],
        result["EditPermission"],
        result["DeletePermission"],
        result["ViewPermission"]
    )

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200


@authentication_required
@permission_required("RolePermission", "DeletePermission")
def delete_rolepermission_controller(rolepermission_id):
    status, message = delete_rolepermission(rolepermission_id)

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200