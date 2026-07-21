from config.db import db

class RolePermissionModel(db.Model):
    __tablename__ = "RolePermission"

    RolePermission_Id = db.Column(db.Integer, primary_key=True)
    
    Role_Id = db.Column(db.Integer, db.ForeignKey("Role.Role_Id"),nullable=False)
    ModuleName = db.Column(db.String(100), nullable=False)
    AddPermission = db.Column(db.Boolean, default=False, nullable=False)
    EditPermission = db.Column(db.Boolean, default=False, nullable=False)
    DeletePermission = db.Column(db.Boolean, default=False, nullable=False)
    ViewPermission = db.Column(db.Boolean, default=False, nullable=False)

    Role = db.relationship("RoleModel", backref=db.backref("RolePermissions", lazy=True))