from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.db import db

class RolePermissionModel(db.Model):
    __tablename__ = "RolePermission"

    RolePermission_Id = db.Column(db.Integer, primary_key=True)
    Role_Id = db.Column(db.Integer, db.ForeignKey('Role.Role_Id'))
    Permission_Id = db.Column(db.Integer, db.ForeignKey('Permission.Permission_Id'))
    
    Role = db.relationship('Role' , backref=db.backref('RolePermission', lazy=True))
    Permission = db.relationship('Permission' , backref=db.backref('RolePermission', lazy=True))