from config.db import db
from datetime import datetime

class LoggerModel(db.Model):
    __tablename__ = "Logs"

    Log_Id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    User_Id = db.Column(db.Integer, db.ForeignKey("User.User_Id"), nullable=True)
    Module = db.Column(db.String(100), nullable=False)
    Action = db.Column(db.String(100), nullable=False)
    Method = db.Column(db.String(10))
    Url = db.Column(db.String(255))
    UserAgent = db.Column(db.Text)
    Status = db.Column(db.String(20), nullable=False)
    CreatedAt = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    User = db.relationship("UserModel", backref="Logs")