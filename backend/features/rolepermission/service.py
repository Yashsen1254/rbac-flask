from models.RolePermissionModel import RolePermissionModel
from config.db import db

def add_rolepermission(Role_Id, Permission_Id):
    rolepermission = RolePermissionModel.query.filter_by( Role_Id=Role_Id, Permission_Id=Permission_Id ).first()

    if rolepermission:
        return False, "RolePermission already exists"

    rolepermission = RolePermissionModel( Role_Id=Role_Id, Permission_Id=Permission_Id )

    db.session.add(rolepermission)
    db.session.commit()

    return True, "RolePermission added successfully"

def display_rolepermission():
    rolepermissions = RolePermissionModel.query.all()
    return rolepermissions

def update_rolepermission(rolepermission_id, Role_Id, Permission_Id):
    rolepermission = RolePermissionModel.query.get(rolepermission_id)

    if not rolepermission:
        return False, "RolePermission not found"

    rolepermission.Role_Id = Role_Id
    rolepermission.Permission_Id = Permission_Id

    db.session.commit()

    return True, "RolePermission updated successfully"

def delete_rolepermission(rolepermission_id):
    rolepermission = RolePermissionModel.query.get(rolepermission_id)

    if not rolepermission:
        return False, "RolePermission not found"

    db.session.delete(rolepermission)
    db.session.commit()

    return True, "RolePermission deleted successfully"