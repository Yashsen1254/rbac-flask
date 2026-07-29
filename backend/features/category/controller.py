from flask import request, jsonify
from features.category.service import add_category, display_category, update_category, delete_category
from features.category.validation import categoryValidation
from middleware.auth_middleware import authentication_required
from middleware.permission_middleware import permission_required
from middleware.activity_logger import activity_log

@authentication_required
@permission_required("Category", "AddPermission")
@activity_log(module="Category", action="Add")
def add_category_controller():
    data = request.get_json()
    is_valid, result = categoryValidation(data)

    if not is_valid:
        return jsonify({"message": result}), 400

    status, message = add_category(result["Category_Name"])

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200

@authentication_required
@permission_required("Category", "ViewPermission")
def display_category_controller():
    categories = display_category()
    return jsonify([
        {
            "Category_Id": category.Category_Id,
            "Category_Name": category.Name
        }
        for category in categories
    ]), 200

@authentication_required
@permission_required("Category", "EditPermission")
@activity_log(module="Category", action="Edit")
def update_category_controller(category_id):
    data = request.get_json()
    is_valid, result = categoryValidation(data)

    if not is_valid:
        return jsonify({"message": result}), 400

    status, message = update_category(category_id, result["Category_Name"])

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200

@authentication_required
@permission_required("Category", "DeletePermission")
@activity_log(module="Category", action="Delete")
def delete_category_controller(category_id):
    status, message = delete_category(category_id)

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200