from flask import Blueprint
from features.rolepermission.controller import add_rolepermission_controller, display_rolepermission_controller, update_rolepermission_controller, delete_rolepermission_controller

rolepermission_bp = Blueprint("rolepermission", __name__)

rolepermission_bp.route("/rolepermission/add", methods=["POST"])(add_rolepermission_controller)
rolepermission_bp.route("/rolepermission/display", methods=["GET"])(display_rolepermission_controller)
rolepermission_bp.route("/rolepermission/update/<int:rolepermission_id>", methods=["PUT"])(update_rolepermission_controller)
rolepermission_bp.route("/rolepermission/delete/<int:rolepermission_id>", methods=["DELETE"])(delete_rolepermission_controller)