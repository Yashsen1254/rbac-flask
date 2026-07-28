def loginValidation(data):
    Email = data.get("Email")
    Password = data.get("Password")

    if not Email:
        return False, "Email is required"
    
    if not Password:
        return False, "Password is required"
    
    validate_data = { "Email": Email, "Password": Password }

    return True, validate_data

def registerValidation(data):
    Name = data.get("Name")
    Email = data.get("Email")
    Password = data.get("Password")

    if not Name:
        return False, "Name is required"

    if not Email:
        return False, "Email is required"

    if not Password:
        return False, "Password is required"

    validate_data = {
        "Name": Name,
        "Email": Email,
        "Password": Password
    }

    return True, validate_data

def verifyOTPValidation(data):
    Email = data.get("Email")
    OTP = data.get("OTP")

    if not Email:
        return False, "Email is required"

    if not OTP:
        return False, "OTP is required"

    validate_data = {
        "Email": Email,
        "OTP": OTP
    }

    return True, validate_data