from functools import wraps
from flask import request
from flask_jwt_extended import get_jwt_identity
from config.db import db
from models.LoggerModel import LoggerModel

def log_activity(module, action, status="Success"):
    user_id = None

    try:
        user_id = get_jwt_identity()
    except:
        pass

    if not user_id and module == "Auth":
        try:
            data = request.get_json(silent=True)
            if data and "Email" in data:
                from models.UserModel import UserModel
                user = UserModel.query.filter_by(Email=data["Email"]).first()
                if user:
                    user_id = user.User_Id
        except:
            pass

    log = LoggerModel(User_Id=user_id, Module=module, Action=action, Method=request.method, Url=request.path, UserAgent=request.user_agent.string, Status=status)

    db.session.add(log)
    db.session.commit()


def activity_log(module, action):
    def decorator(function):
        @wraps(function)
        def wrapper(*args, **kwargs):
            try:
                result = function(*args, **kwargs)
                log_activity(module=module, action=action, status="Success")
                return result

            except Exception as e:
                log_activity( module=module, action=action, status="Failed" )
                raise
        return wrapper
    return decorator