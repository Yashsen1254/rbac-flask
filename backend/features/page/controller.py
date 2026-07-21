from flask import jsonify
from features.page.service import display_pages
from middleware.auth_middleware import authentication_required

@authentication_required
def display_page_controller():
    pages = display_pages()
    return jsonify([
        {
            "Page_Id": p.Page_Id,
            "PageName": p.PageName
        }
        for p in pages
    ]), 200
