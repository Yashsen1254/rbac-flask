from config.db import db

class PermissionModel(db.Model):
    __tablename__ = "Permission"

    Permission_Id = db.Column(db.Integer, primary_key=True)
    AddPermission = db.Column(db.Boolean, default=False, nullable=False)
    EditPermission = db.Column(db.Boolean, default=False, nullable=False)
    DeletePermission = db.Column(db.Boolean, default=False, nullable=False)
    ViewPermission = db.Column(db.Boolean, default=False, nullable=False)