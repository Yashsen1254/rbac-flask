from flask import Blueprint
from features.auth.controller import login_controller, me_controller, register_controller, verify_otp_controller

auth_bp = Blueprint("auth", __name__)

auth_bp.route("/auth/login", methods=["POST"])(login_controller)
auth_bp.route("/auth/me", methods=["GET"])(me_controller)
auth_bp.route("/auth/register", methods=["POST"])(register_controller)
auth_bp.route("/auth/verify-otp", methods=["POST"])(verify_otp_controller)