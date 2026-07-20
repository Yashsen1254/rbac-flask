from config.db import db

class RoleUserModel(db.Model):
    __tablename__ = "RoleUser"

    RoleUser_Id = db.Column(db.Integer, primary_key=True)
    Role_Id = db.Column(db.Integer, db.ForeignKey('Role.Role_Id'))
    User_Id = db.Column(db.Integer, db.ForeignKey('User.User_Id'))

    Role = db.relationship('RoleModel' , backref=db.backref('RoleUsers', lazy=True))
    User = db.relationship('UserModel' , backref=db.backref('RoleUsers', lazy=True))