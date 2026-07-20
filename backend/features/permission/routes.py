from flask import Blueprint

from features.permission.controller import add_permission_controller, display_permission_controller, update_permission_controller, delete_permission_controller
permission_bp = Blueprint("permission", __name__)

permission_bp.route("/permission/add", methods=["POST"])(add_permission_controller)
permission_bp.route("/permission/display", methods=["GET"])(display_permission_controller)
permission_bp.route("/permission/update/<int:permission_id>", methods=["PUT"])(update_permission_controller)
permission_bp.route("/permission/delete/<int:permission_id>", methods=["DELETE"])(delete_permission_controller)