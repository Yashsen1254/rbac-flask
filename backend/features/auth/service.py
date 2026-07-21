from models.UserModel import UserModel
from models.RoleUserModel import RoleUserModel
from models.RolePermissionModel import RolePermissionModel
from models.PageModel import PageModel
from utils.jwt import generate_token

def login_user(Email, Password):
    user = UserModel.query.filter_by(Email=Email).first()

    if not user:
        return False, "User not found"
    
    if user.Password != Password:
        return False, "Invalid password"
    
    access_token = generate_token(user.User_Id)
    return True, access_token

def get_my_permissions(user_id):
    role_user = RoleUserModel.query.filter_by(User_Id=user_id).first()
    if not role_user:
        return {}

    role_permissions = RolePermissionModel.query.filter_by(Role_Id=role_user.Role_Id).all()
    
    permissions_map = {}
    for rp in role_permissions:
        page = PageModel.query.get(rp.Page_Id)
        if page:
            permissions_map[page.PageName] = {
                "AddPermission": rp.AddPermission,
                "EditPermission": rp.EditPermission,
                "DeletePermission": rp.DeletePermission,
                "ViewPermission": rp.ViewPermission
            }
            
    return permissions_map