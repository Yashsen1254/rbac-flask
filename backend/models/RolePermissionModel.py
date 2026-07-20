from config.db import db

class RolePermissionModel(db.Model):
    __tablename__ = "RolePermission"

    RolePermission_Id = db.Column(db.Integer, primary_key=True)
    Role_Id = db.Column(db.Integer, db.ForeignKey('Role.Role_Id'))
    Permission_Id = db.Column(db.Integer, db.ForeignKey('Permission.Permission_Id'))
    
    Role = db.relationship('RoleModel' , backref=db.backref('RolePermissions', lazy=True))
    Permission = db.relationship('PermissionModel' , backref=db.backref('RolePermissions', lazy=True))