from core.extensions import db
from models.base import BaseModel


class Role(BaseModel):
    __tablename__ = "roles"

    name = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    description = db.Column(
        db.String(255)
    )

    users = db.relationship(
        "UserRole",
        back_populates="role",
        cascade="all, delete-orphan"
    )

    permissions = db.relationship(
        "RolePermission",
        back_populates="role",
        cascade="all, delete-orphan"
    )