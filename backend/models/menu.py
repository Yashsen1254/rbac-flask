from core.extensions import db
from models.base import BaseModel


class Menu(BaseModel):
    __tablename__ = "menus"

    name = db.Column(
        db.String(100),
        nullable=False
    )

    path = db.Column(
        db.String(255),
        nullable=False
    )

    icon = db.Column(
        db.String(100)
    )

    parent_id = db.Column(
        db.BigInteger,
        db.ForeignKey("menus.id"),
        nullable=True
    )

    sort_order = db.Column(
        db.Integer,
        default=0
    )

    permissions = db.relationship(
        "Permission",
        back_populates="menu",
        cascade="all, delete-orphan"
    )

    children = db.relationship(
        "Menu",
        backref=db.backref(
            "parent",
            remote_side="Menu.id"
        )
    )