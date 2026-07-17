from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.db import db

class RoleModel(db.Model):
    __tablename__ = "Role"

    Role_Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100), nullable=False)