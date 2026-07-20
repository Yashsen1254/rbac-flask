from flask import Blueprint
from features.user.controller import add_user_controller, display_user_controller, update_user_controller, delete_user_controller

user_bp = Blueprint("user", __name__)

user_bp.route("/user/add", methods=["POST"])(add_user_controller)
user_bp.route("/user/display", methods=["GET"])(display_user_controller)
user_bp.route("/user/update/<int:user_id>", methods=["PUT"])(update_user_controller)
user_bp.route("/user/delete/<int:user_id>", methods=["DELETE"])(delete_user_controller)