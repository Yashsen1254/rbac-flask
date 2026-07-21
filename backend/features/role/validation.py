def roleValidation(data):
    Name = data.get("Role_Name")

    if not Name:
        return False, "Role_Name is required"
    
    validate_data = {"Role_Name": Name}

    return True, validate_data