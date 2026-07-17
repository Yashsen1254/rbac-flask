from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.db import db

class ProductModel(db.Model):
    __tablename__ = "Product"

    Product_Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100), nullable=False)
    Price = db.Column(db.Float, nullable=False)
    Category_Id = db.Column(db.Integer, db.ForeignKey('Category.Category_Id'))