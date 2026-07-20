from flask import Blueprint

from features.category.controller import add_category_controller, display_category_controller, update_category_controller, delete_category_controller

category_bp = Blueprint("category", __name__)

category_bp.route("/category/add", methods=["POST"])(add_category_controller)
category_bp.route("/category/display", methods=["GET"])(display_category_controller)
category_bp.route("/category/update/<int:category_id>", methods=["PUT"])(update_category_controller)
category_bp.route("/category/delete/<int:category_id>", methods=["DELETE"])(delete_category_controller)