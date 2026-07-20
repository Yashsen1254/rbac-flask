from models.RoleUserModel import RoleUserModel
from config.db import db

def add_userrole(User_Id, Role_Id):
    roleuser = RoleUserModel.query.filter_by(User_Id=User_Id, Role_Id=Role_Id).first()

    if roleuser:
        return False, "RoleUser already exists"

    roleuser = RoleUserModel(User_Id=User_Id, Role_Id=Role_Id)

    db.session.add(roleuser)
    db.session.commit()

    return True, "RoleUser added successfully"

def delete_userrole(roleuser_id):
    roleuser = RoleUserModel.query.get(roleuser_id)

    if not roleuser:
        return False, "RoleUser not found"

    db.session.delete(roleuser)
    db.session.commit()

    return True, "RoleUser deleted successfully"

def display_userrole():
    roleuser = RoleUserModel.query.all()
    return roleuser

def update_userrole(roleuser_id, User_Id, Role_Id):
    roleuser = RoleUserModel.query.get(roleuser_id)

    if not roleuser:
        return False, "RoleUser not found"

    roleuser.User_Id = User_Id
    roleuser.Role_Id = Role_Id

    db.session.commit()

    return True, "RoleUser updated successfully"