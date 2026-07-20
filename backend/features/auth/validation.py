def loginValidation(data):
    Email = data.get("Email")
    Password = data.get("Password")

    if not Email:
        return False, "Email is required"
    
    if not Password:
        return False, "Password is required"
    
    validate_data = { "Email": Email, "Password": Password }

    return True, validate_data