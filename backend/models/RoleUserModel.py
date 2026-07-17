from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.db import db

class RoleUserModel(db.Model):
    __tablename__ = "RoleUser"

    RoleUser_Id = db.Column(db.Integer, primary_key=True)
    Role_Id = db.Column(db.Integer, db.ForeignKey('Role.Role_Id'))
    User_Id = db.Column(db.Integer, db.ForeignKey('User.User_Id'))

    Role = db.relationship('User' , backref=db.backref('RoleUser', lazy=True))
    User = db.relationship('Role' , backref=db.backref('RoleUser', lazy=True))