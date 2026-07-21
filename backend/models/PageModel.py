from config.db import db

class PageModel(db.Model):
    __tablename__ = "Page"

    Page_Id = db.Column(db.Integer, primary_key=True)
    PageName = db.Column(db.String(100), nullable=False)