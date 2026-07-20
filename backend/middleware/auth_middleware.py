from flask_jwt_extended import jwt_required

def authentication_required(function):
    return jwt_required()(function)