from core.extensions import db


class UserRole(db.Model):
    __tablename__ = "user_roles"

    user_id = db.Column(
        db.BigInteger,
        db.ForeignKey("users.id"),
        primary_key=True
    )

    role_id = db.Column(
        db.BigInteger,
        db.ForeignKey("roles.id"),
        primary_key=True
    )

    user = db.relationship(
        "User",
        back_populates="roles"
    )

    role = db.relationship(
        "Role",
        back_populates="users"
    )