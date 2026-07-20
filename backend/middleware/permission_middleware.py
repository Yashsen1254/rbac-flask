from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from models.RoleUserModel import RoleUserModel
from models.RolePermissionModel import RolePermissionModel
from models.PermissionModel import PermissionModel

def permission_required(permission_name):
    def decorator(function):
        @wraps(function)
        def wrapper(*args, **kwargs):
            user_id = int(get_jwt_identity())

            role_user = RoleUserModel.query.filter_by(User_Id=user_id).first()

            if not role_user:
                return jsonify({
                    "message": "Role not assigned."
                }), 403

            role_permission = RolePermissionModel.query.filter_by(
                Role_Id=role_user.Role_Id
            ).first()

            if not role_permission:
                return jsonify({
                    "message": "Permission not assigned."
                }), 403

            permission = PermissionModel.query.filter_by(
                Permission_Id=role_permission.Permission_Id
            ).first()

            if not permission:
                return jsonify({
                    "message": "Permission not found."
                }), 403

            if not getattr(permission, permission_name):
                return jsonify({
                    "message": "Access Denied."
                }), 403

            return function(*args, **kwargs)

        return wrapper

    return decorator