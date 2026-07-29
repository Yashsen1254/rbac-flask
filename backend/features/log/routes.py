from flask import Blueprint

from features.log.controller import display_logs_controller

log_bp = Blueprint("log", __name__)

log_bp.route("/logs/display", methods=["GET"])(display_logs_controller)
