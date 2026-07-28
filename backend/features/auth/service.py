from datetime import datetime, timedelta
import random

from flask_mail import Message

from config.db import db, mail
from models.UserModel import UserModel
from models.RoleUserModel import RoleUserModel
from models.RolePermissionModel import RolePermissionModel
from models.PageModel import PageModel
from models.EmailOTPModel import EmailOTPModel
from utils.jwt import generate_token
from datetime import datetime
from models.EmailOTPModel import EmailOTPModel
from models.UserModel import UserModel

def login_user(Email, Password):
    user = UserModel.query.filter_by(Email=Email).first()

    if not user:
        return False, "User not found"

    if user.Password != Password:
        return False, "Invalid password"

    if not user.IsVerified:
        return False, "Please verify your email before logging in."

    access_token = generate_token(user.User_Id)

    return True, access_token

def register_user(Name, Email, Password):

    existing_user = UserModel.query.filter_by(
        Email=Email
    ).first()

    if existing_user:
        return False, "Email already exists"

    user = UserModel(
        Name=Name,
        Email=Email,
        Password=Password,
        IsVerified=False
    )

    db.session.add(user)
    db.session.commit()

    create_and_send_otp(user)

    return True, {
        "message": "Registration successful. Please verify your email.",
        "Email": user.Email
    }


def get_my_permissions(user_id):
    role_user = RoleUserModel.query.filter_by(User_Id=user_id).first()

    if not role_user:
        return {}

    role_permissions = RolePermissionModel.query.filter_by(
        Role_Id=role_user.Role_Id
    ).all()

    permissions_map = {}

    for rp in role_permissions:
        page = PageModel.query.get(rp.Page_Id)

        if page:
            permissions_map[page.PageName] = {
                "AddPermission": rp.AddPermission,
                "EditPermission": rp.EditPermission,
                "DeletePermission": rp.DeletePermission,
                "ViewPermission": rp.ViewPermission
            }

    return permissions_map


def generate_otp():
    return str(random.randint(100000, 999999))


def send_otp_email(email, otp):
    msg = Message(
        subject="Email Verification",
        recipients=[email]
    )

    msg.body = f"""
Hello,

Welcome!

Your email verification OTP is:

{otp}

This OTP will expire in 60 seconds.

Thank You.
"""

    try:
        mail.send(msg)
        print("✅ Email sent successfully")
    except Exception as e:
        print("❌ Email Error:", e)


def create_and_send_otp(user):
    EmailOTPModel.query.filter_by(User_Id=user.User_Id).delete()
    otp = generate_otp()
    email_otp = EmailOTPModel(
        User_Id=user.User_Id,
        OTP=otp,
        CreatedAt=datetime.utcnow(),
        ExpireyAt=datetime.utcnow() + timedelta(seconds=60)
    )

    db.session.add(email_otp)
    db.session.commit()

    send_otp_email(user.Email, otp)

    return otp


def verify_otp(Email, OTP):

    user = UserModel.query.filter_by(
        Email=Email
    ).first()

    if not user:
        return False, "User not found"

    email_otp = EmailOTPModel.query.filter_by(
        User_Id=user.User_Id,
        OTP=OTP
    ).first()

    if not email_otp:
        return False, "Invalid OTP"

    if datetime.utcnow() > email_otp.ExpireyAt:
        db.session.delete(email_otp)
        db.session.commit()

        return False, "OTP has expired"

    user.IsVerified = True

    db.session.delete(email_otp)

    db.session.commit()

    return True, "Email verified successfully"