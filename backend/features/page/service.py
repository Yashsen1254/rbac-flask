from models.PageModel import PageModel

def display_pages():
    pages = PageModel.query.all()
    return pages
