from config.db import db

class EmailOTPModel(db.Model):
    __tablename__ = "EmailOTP"

    OTP_Id = db.Column(db.Integer, primary_key=True)
    User_Id = db.Column(db.Integer, db.ForeignKey('User.User_Id'), nullable=False)
    OTP = db.Column(db.String(100), nullable=False)
    CreatedAt = db.Column(db.DateTime, nullable=False)
    ExpireyAt = db.Column(db.DateTime, nullable=False)

    User = db.relationship('UserModel' , backref=db.backref('EmailOTPs', lazy=True))