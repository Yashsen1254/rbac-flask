from flask import Flask
from flask_sqlalchemy import SQLAlchemy


class UserModel(db.Model):
    __tablename__ = "User"

    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100), nullable=False)
    Email = db.Column(db.String(100), nullable=False)
    Password = db.Column(db.String(100), nullable=False)