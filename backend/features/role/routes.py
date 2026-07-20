from flask import Blueprint
from features.role.controller import add_role_controller, display_role_controller, update_role_controller, delete_role_controller

role_bp = Blueprint("role", __name__)

role_bp.route("/role/add", methods=["POST"])(add_role_controller)
role_bp.route("/role/display", methods=["GET"])(display_role_controller)
role_bp.route("/role/update/<int:role_id>", methods=["PUT"])(update_role_controller)
role_bp.route("/role/delete/<int:role_id>", methods=["DELETE"])(delete_role_controller)