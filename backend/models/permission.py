from core.extensions import db
from models.base import BaseModel


class Permission(BaseModel):
    __tablename__ = "permissions"

    menu_id = db.Column(
        db.BigInteger,
        db.ForeignKey("menus.id"),
        nullable=False
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    code = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    description = db.Column(
        db.String(255)
    )

    menu = db.relationship(
        "Menu",
        back_populates="permissions"
    )

    roles = db.relationship(
        "RolePermission",
        back_populates="permission",
        cascade="all, delete-orphan"
    )