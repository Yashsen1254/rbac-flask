from models.PermissionModel import PermissionModel
from config.db import db

def add_permission(AddPermission, EditPermission, DeletePermission, ViewPermission):

    permission = PermissionModel(
        AddPermission=AddPermission,
        EditPermission=EditPermission,
        DeletePermission=DeletePermission,
        ViewPermission=ViewPermission
    )

    db.session.add(permission)
    db.session.commit()

    return True, "Permission added successfully"

def display_permission():
    permissions = PermissionModel.query.all()
    return permissions

def update_permission(permission_id, AddPermission, EditPermission, DeletePermission, ViewPermission):
    permission = PermissionModel.query.get(permission_id)

    if not permission:
        return False, "Permission not found"

    permission.AddPermission = AddPermission
    permission.EditPermission = EditPermission
    permission.DeletePermission = DeletePermission
    permission.ViewPermission = ViewPermission

    db.session.commit()

    return True, "Permission updated successfully"


def delete_permission(permission_id):
    permission = PermissionModel.query.get(permission_id)

    if not permission:
        return False, "Permission not found"

    db.session.delete(permission)
    db.session.commit()

    return True, "Permission deleted successfully"