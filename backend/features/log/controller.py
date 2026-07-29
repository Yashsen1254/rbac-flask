from flask import request, jsonify
from features.log.service import get_logs
from middleware.auth_middleware import authentication_required
from flask_jwt_extended import get_jwt_identity
from models.RoleUserModel import RoleUserModel
from models.RoleModel import RoleModel

@authentication_required
def display_logs_controller():
    user_id = get_jwt_identity()
    
    # Check if user has Admin role
    role_user = RoleUserModel.query.filter_by(User_Id=user_id).first()
    if not role_user:
        return jsonify({"message": "Access Denied. Role not assigned."}), 403
        
    role = RoleModel.query.filter_by(Role_Id=role_user.Role_Id).first()
    if not role or role.Name != "Admin":
        return jsonify({"message": "Access Denied. Admin privileges required."}), 403
        
    logs = get_logs()
    
    return jsonify([
        {
            "Log_Id": log.Log_Id,
            "User_Name": log.User.Name if log.User else "Unknown",
            "User_Email": log.User.Email if log.User else "Unknown",
            "Module": log.Module,
            "Action": log.Action,
            "Method": log.Method,
            "Url": log.Url,
            "Status": log.Status,
            "CreatedAt": log.CreatedAt.isoformat()
        }
        for log in logs
    ]), 200
