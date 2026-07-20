def userValidation(data):
    Name = data.get("Name")
    Email = data.get("Email")
    Password = data.get("Password")

    if not Name:
        return False, "Name is required"

    if not Email:
        return False, "Email is required"

    if not Password:
        return False, "Password is required"

    validate_data = {"Name": Name, "Email": Email, "Password": Password}

    return True, validate_data