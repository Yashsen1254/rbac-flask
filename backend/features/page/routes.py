from flask import Blueprint
from features.page.controller import display_page_controller

page_bp = Blueprint("page", __name__)

page_bp.route("/page/display", methods=["GET"])(display_page_controller)
