from flask import request, jsonify
from features.auth.validation import loginValidation, registerValidation, verifyOTPValidation
from features.auth.service import login_user, get_my_permissions, register_user, verify_otp
from middleware.auth_middleware import authentication_required
from middleware.activity_logger import activity_log
from flask_jwt_extended import get_jwt_identity

@activity_log(module="Auth", action="Login")
def login_controller():
    data = request.get_json()

    is_valid, validate_data = loginValidation(data)

    if not is_valid:
        return jsonify({"message": validate_data}), 400

    status, result = login_user(
        validate_data["Email"],
        validate_data["Password"]
    )

    if not status:
        return jsonify({"message": result}), 400

    return jsonify({
        "message": "Login successful",
        "access_token": result
    }), 200


@activity_log(module="Auth", action="Register")
def register_controller():
    data = request.get_json()

    is_valid, validate_data = registerValidation(data)

    if not is_valid:
        return jsonify({
            "message": validate_data
        }), 400

    status, result = register_user(
        validate_data["Name"],
        validate_data["Email"],
        validate_data["Password"]
    )

    if not status:
        return jsonify({
            "message": result
        }), 400

    return jsonify(result), 201

@authentication_required
def me_controller():
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401
    
    result = get_my_permissions(user_id)
    return jsonify(result), 200

@activity_log(module="Auth", action="VerifyOTP")
def verify_otp_controller():

    data = request.get_json()

    is_valid, validate_data = verifyOTPValidation(data)

    if not is_valid:
        return jsonify({
            "message": validate_data
        }), 400

    status, result = verify_otp(
        validate_data["Email"],
        validate_data["OTP"]
    )

    if not status:
        return jsonify({
            "message": result
        }), 400

    return jsonify({
        "message": result
    }), 200