from config.db import db

class UserModel(db.Model):
    __tablename__ = "User"

    User_Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100), nullable=False)
    Email = db.Column(db.String(100), nullable=False)
    Password = db.Column(db.String(100), nullable=False)