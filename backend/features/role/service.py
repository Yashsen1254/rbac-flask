from models.RoleModel import RoleModel
from config.db import db

def add_role(Name):
    role = RoleModel.query.filter_by(Name=Name).first()

    if role:
        return False, "Role already exists"
    
    role = RoleModel(Name=Name)

    db.session.add(role)
    db.session.commit()

    return True, "Role added successfully"

def delete_role(role_id):
    role = RoleModel.query.get(role_id)

    if not role:
        return False, "Role not found"
    
    db.session.delete(role)
    db.session.commit()

    return True, "Role deleted successfully"

def update_role(role_id, Name):
    role = RoleModel.query.get(role_id)

    if not role:
        return False, "Role not found"
    
    role.Name = Name

    db.session.commit()

    return True, "Role updated successfully"

def display_role():
    roles = RoleModel.query.all()
    return roles