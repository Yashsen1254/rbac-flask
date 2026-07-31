from app import app
from config.db import db
from models.RoleModel import RoleModel
from models.UserModel import UserModel
from models.RoleUserModel import RoleUserModel
from models.PageModel import PageModel
from models.RolePermissionModel import RolePermissionModel

def seed_data():
    with app.app_context():
        admin_role = RoleModel.query.filter_by(Name='Admin').first()
        if not admin_role:
            admin_role = RoleModel(Name='Admin')
            db.session.add(admin_role)
            print("Added 'Admin' role.")

        user_role = RoleModel.query.filter_by(Name='User').first()
        if not user_role:
            user_role = RoleModel(Name='User')
            db.session.add(user_role)
            print("Added 'User' role.")

        db.session.commit()

        admin_user = UserModel.query.filter_by(Email='admin@example.com').first()
        if not admin_user:
            admin_user = UserModel(
                Name='Admin User',
                Email='admin@example.com',
                Password='adminpassword',
                IsVerified=True
            )
            db.session.add(admin_user)
            print("Added admin user (admin@example.com).")

        normal_user = UserModel.query.filter_by(Email='user@example.com').first()
        if not normal_user:
            normal_user = UserModel(
                Name='Normal User',
                Email='user@example.com',
                Password='userpassword',
                IsVerified=True
            )
            db.session.add(normal_user)
            print("Added normal user (user@example.com).")

        db.session.commit()

        admin_user_role = RoleUserModel.query.filter_by(User_Id=admin_user.User_Id, Role_Id=admin_role.Role_Id).first()
        if not admin_user_role:
            admin_user_role = RoleUserModel(User_Id=admin_user.User_Id, Role_Id=admin_role.Role_Id)
            db.session.add(admin_user_role)
            print("Assigned 'Admin' role to admin user.")

        normal_user_role = RoleUserModel.query.filter_by(User_Id=normal_user.User_Id, Role_Id=user_role.Role_Id).first()
        if not normal_user_role:
            normal_user_role = RoleUserModel(User_Id=normal_user.User_Id, Role_Id=user_role.Role_Id)
            db.session.add(normal_user_role)
            print("Assigned 'User' role to normal user.")

        db.session.commit()

        # Seed Pages
        page_names = ['Category', 'Product', 'Role', 'User', 'Page', 'RolePermission', 'UserRole']
        pages = []
        for p_name in page_names:
            page = PageModel.query.filter_by(PageName=p_name).first()
            if not page:
                page = PageModel(PageName=p_name)
                db.session.add(page)
                print(f"Added page: {p_name}")
            pages.append(page)
        
        db.session.commit()

        # Seed Role Permissions
        for page in pages:
            # Admin gets all permissions for all pages
            admin_perm = RolePermissionModel.query.filter_by(Role_Id=admin_role.Role_Id, Page_Id=page.Page_Id).first()
            if not admin_perm:
                admin_perm = RolePermissionModel(
                    Role_Id=admin_role.Role_Id, 
                    Page_Id=page.Page_Id,
                    AddPermission=True,
                    EditPermission=True,
                    DeletePermission=True,
                    ViewPermission=True
                )
                db.session.add(admin_perm)
            else:
                admin_perm.AddPermission = True
                admin_perm.EditPermission = True
                admin_perm.DeletePermission = True
                admin_perm.ViewPermission = True
            
            # User gets all permissions ONLY for 'Category' page
            user_perm = RolePermissionModel.query.filter_by(Role_Id=user_role.Role_Id, Page_Id=page.Page_Id).first()
            is_category = (page.PageName.lower() == 'category')
            if not user_perm:
                user_perm = RolePermissionModel(
                    Role_Id=user_role.Role_Id, 
                    Page_Id=page.Page_Id,
                    AddPermission=is_category,
                    EditPermission=is_category,
                    DeletePermission=is_category,
                    ViewPermission=is_category
                )
                db.session.add(user_perm)
            else:
                user_perm.AddPermission = is_category
                user_perm.EditPermission = is_category
                user_perm.DeletePermission = is_category
                user_perm.ViewPermission = is_category

        db.session.commit()
        print("Database seeded successfully with Roles, Users, Pages, and Permissions!")

if __name__ == '__main__':
    seed_data()
