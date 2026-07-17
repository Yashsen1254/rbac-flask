from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.db import db

class CategoryModel(db.Model):
    __tablename__ = "Category"

    Category_Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100), nullable=False)