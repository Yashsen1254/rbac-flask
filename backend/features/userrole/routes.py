from flask import Blueprint

from features.userrole.controller import add_userrole_controller, display_userrole_controller, update_userrole_controller, delete_userrole_controller

userrole_bp = Blueprint("userrole", __name__)

userrole_bp.route("/userrole/add", methods=["POST"])(add_userrole_controller)
userrole_bp.route("/userrole/display", methods=["GET"])(display_userrole_controller)
userrole_bp.route("/userrole/update/<int:userrole_id>", methods=["PUT"])(update_userrole_controller)
userrole_bp.route("/userrole/delete/<int:userrole_id>", methods=["DELETE"])(delete_userrole_controller)