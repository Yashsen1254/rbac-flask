from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from models.RoleUserModel import RoleUserModel
from models.RolePermissionModel import RolePermissionModel
from models.PageModel import PageModel

def permission_required(page_name, permission_name):
    def decorator(function):
        @wraps(function)
        def wrapper(*args, **kwargs):
            user_id = int(get_jwt_identity())
            role_user = RoleUserModel.query.filter_by(User_Id=user_id).first()

            if not role_user:
                return jsonify({
                    "message": "Role not assigned."
                }), 403

            page = PageModel.query.filter_by(PageName=page_name).first()
            if not page:
                return jsonify({
                    "message": f"Page '{page_name}' not found."
                }), 404

            role_permission = RolePermissionModel.query.filter_by(
                Role_Id=role_user.Role_Id,
                Page_Id=page.Page_Id
            ).first()

            if not role_permission:
                return jsonify({
                    "message": f"Permission not assigned for {page_name}."
                }), 403

            if not getattr(role_permission, permission_name):
                return jsonify({
                    "message": "Access Denied."
                }), 403

            return function(*args, **kwargs)

        return wrapper

    return decorator