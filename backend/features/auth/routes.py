from flask import Blueprint
from features.auth.controller import login_controller

auth_bp = Blueprint("auth", __name__)

auth_bp.route("/auth/login", methods=["POST"])(login_controller)