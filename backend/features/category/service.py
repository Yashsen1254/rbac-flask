from models.CategoryModel import CategoryModel
from config.db import db

def add_category(Name):
    category = CategoryModel.query.filter_by(Name=Name).first()

    if category:
        return False, "Category already exists"

    category = CategoryModel(Name=Name)

    db.session.add(category)
    db.session.commit()

    return True, "Category added successfully"

def display_category():
    categories = CategoryModel.query.all()
    return categories

def delete_category(category_id):
    category = CategoryModel.query.get(category_id)
    if not category:
        return False, "Category not found"

    db.session.delete(category)
    db.session.commit()

    return True, "Category deleted successfully"

def update_category(category_id, Name):
    category = CategoryModel.query.get(category_id)

    if not category:
        return False, "Category not found"

    category.Name = Name
    db.session.commit()

    return True, "Category updated successfully"