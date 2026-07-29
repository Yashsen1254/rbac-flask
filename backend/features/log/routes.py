from flask import Blueprint
from features.log.controller import export_logs_csv_controller, display_logs_controller, export_logs_pdf_controller

log_bp = Blueprint("log", __name__)

log_bp.route("/logs/display", methods=["GET"])(display_logs_controller)
log_bp.route("/logs/export/csv", methods=["GET"])(export_logs_csv_controller)
log_bp.route("/logs/export/pdf", methods=["GET"])(export_logs_pdf_controller)