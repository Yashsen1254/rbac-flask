from flask import request, jsonify
from features.product.service import add_product, display_product, update_product, delete_product
from features.product.validation import productValidation
from middleware.auth_middleware import authentication_required
from middleware.permission_middleware import permission_required

@authentication_required
@permission_required("Product", "AddPermission")
def add_product_controller():
    data = request.get_json()

    is_valid, validate_data = productValidation(data)

    if not is_valid:
        return jsonify({"message": validate_data}), 400

    status, message = add_product(
        validate_data["Name"],
        validate_data["Price"],
        validate_data["Category_Id"]
    )

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200

@authentication_required
@permission_required("Product", "ViewPermission")
def display_product_controller():
    products = display_product()

    return jsonify([
        {
            "Product_Id": product.Product_Id,
            "Name": product.Name,
            "Price": product.Price,
            "Category_Id": product.Category_Id
        }
        for product in products
    ]), 200

@authentication_required
@permission_required("Product", "EditPermission")
def update_product_controller(product_id):
    data = request.get_json()

    is_valid, validate_data = productValidation(data)

    if not is_valid:
        return jsonify({"message": validate_data}), 400

    status, message = update_product(
        product_id,
        validate_data["Name"],
        validate_data["Price"],
        validate_data["Category_Id"]
    )

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200

@authentication_required
@permission_required("Product", "DeletePermission")
def delete_product_controller(product_id):

    status, message = delete_product(product_id)

    if not status:
        return jsonify({"message": message}), 400

    return jsonify({"message": message}), 200