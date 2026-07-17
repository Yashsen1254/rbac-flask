from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.db import db

class PermissionModel(db.Model):
    __tablename__ = "Permission"

    Permission_Id = db.Column(db.Integer, primary_key=True)
    AddPermission = db.Column(db.boolean, nullable=False)
    EditPermission = db.Column(db.boolean, nullable=False)
    DeletePermission = db.Column(db.boolean, nullable=False)
    ViewPermission = db.Column(db.boolean, nullable=False)