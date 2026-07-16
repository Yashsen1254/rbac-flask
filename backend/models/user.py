from core.extensions import db
from models.base import BaseModel


class User(BaseModel):
    __tablename__ = "users"

    full_name = db.Column(
        db.String(150),
        nullable=False
    )

    email = db.Column(
        db.String(150),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    roles = db.relationship(
        "UserRole",
        back_populates="user",
        cascade="all, delete-orphan"
    )