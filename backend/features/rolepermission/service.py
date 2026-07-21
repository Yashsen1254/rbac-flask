from models.RolePermissionModel import RolePermissionModel
from models.RoleModel import RoleModel
from models.PageModel import PageModel
from config.db import db

def add_rolepermission(Role_Id, Page_Id, AddPermission, EditPermission, DeletePermission, ViewPermission):
    rolepermission = RolePermissionModel.query.filter_by(Role_Id=Role_Id, Page_Id=Page_Id).first()

    if rolepermission:
        return False, "RolePermission for this module already exists"

    rolepermission = RolePermissionModel(
        Role_Id=Role_Id,
        Page_Id=Page_Id,
        AddPermission=AddPermission,
        EditPermission=EditPermission,
        DeletePermission=DeletePermission,
        ViewPermission=ViewPermission
    )

    db.session.add(rolepermission)
    db.session.commit()

    return True, "RolePermission added successfully"

def display_rolepermission():
    rolepermissions = db.session.query(RolePermissionModel, RoleModel, PageModel).join(
        RoleModel, RolePermissionModel.Role_Id == RoleModel.Role_Id
    ).join(
        PageModel, RolePermissionModel.Page_Id == PageModel.Page_Id
    ).all()
    return rolepermissions

def get_rolepermission_by_id(rolepermission_id):
    rolepermission = db.session.query(RolePermissionModel, RoleModel, PageModel).join(
        RoleModel, RolePermissionModel.Role_Id == RoleModel.Role_Id
    ).join(
        PageModel, RolePermissionModel.Page_Id == PageModel.Page_Id
    ).filter(RolePermissionModel.RolePermission_Id == rolepermission_id).first()
    return rolepermission

def update_rolepermission(rolepermission_id, Role_Id, Page_Id, AddPermission, EditPermission, DeletePermission, ViewPermission):
    rolepermission = RolePermissionModel.query.get(rolepermission_id)

    if not rolepermission:
        return False, "RolePermission not found"

    rolepermission.Role_Id = Role_Id
    rolepermission.Page_Id = Page_Id
    rolepermission.AddPermission = AddPermission
    rolepermission.EditPermission = EditPermission
    rolepermission.DeletePermission = DeletePermission
    rolepermission.ViewPermission = ViewPermission

    db.session.commit()

    return True, "RolePermission updated successfully"

def delete_rolepermission(rolepermission_id):
    rolepermission = RolePermissionModel.query.get(rolepermission_id)

    if not rolepermission:
        return False, "RolePermission not found"

    db.session.delete(rolepermission)
    db.session.commit()

    return True, "RolePermission deleted successfully"