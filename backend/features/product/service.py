from models.ProductModel import ProductModel
from config.db import db

def add_product(Name, Price, Category_Id):
    product = ProductModel.query.filter_by(Name=Name).first()

    if product:
        return False, "Product already exists"
    
    product = ProductModel(Name=Name, Price=Price, Category_Id=Category_Id)

    db.session.add(product)
    db.session.commit()

    return True, "Product added successfully"

def delete_product(product_id):
    product = ProductModel.query.get(product_id)

    if not product:
        return False, "Product not found"
    
    db.session.delete(product)
    db.session.commit()

    return True, "Product deleted successfully"

def display_product():
    products = ProductModel.query.all()
    return products

def update_product(product_id, Name, Price, Category_Id):
    product = ProductModel.query.get(product_id)

    if not product:
        return False, "Product not found"
    
    product.Name = Name
    product.Price = Price
    product.Category_Id = Category_Id

    db.session.commit()

    return True, "Product updated successfully"