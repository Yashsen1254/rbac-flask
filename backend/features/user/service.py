from models.UserModel import UserModel
from config.db import db

def add_users(Name, Email, Password):
    user = UserModel.query.filter_by(Email=Email).first()

    if user:
        return False, "User already exists"
    
    user = UserModel(Name=Name, Email=Email, Password=Password)

    db.session.add(user)
    db.session.commit()

    return True, "User created successfully"

def delete_user(user_id):
    user = UserModel.query.get(user_id)

    if not user:
        return False, "User not found"
    
    db.session.delete(user)
    db.session.commit()

    return True, "User deleted successfully"

def update_user(user_id, Name, Email, Password):
    user = UserModel.query.get(user_id)

    if not user:
        return False, "User not found"
    
    user.Name = Name
    user.Email = Email
    user.Password = Password

    db.session.commit()

    return True, "User updated successfully"

def display_user():
    users = UserModel.query.all()
    return users