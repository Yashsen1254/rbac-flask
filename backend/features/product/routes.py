from flask import Blueprint
from features.product.controller import add_product_controller, display_product_controller, update_product_controller, delete_product_controller

product_bp = Blueprint("product", __name__)

product_bp.route("/product/add", methods=["POST"])(add_product_controller)
product_bp.route("/product/display", methods=["GET"])(display_product_controller)
product_bp.route("/product/update/<int:product_id>", methods=["PUT"])(update_product_controller)
product_bp.route("/product/delete/<int:product_id>", methods=["DELETE"])(delete_product_controller)