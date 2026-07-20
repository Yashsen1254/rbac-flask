def roleValidation(data):
    Name = data.get("Name")

    if not Name:
        return False, "Name is required"
    
    validate_data = {"Name": Name}

    return True, validate_data