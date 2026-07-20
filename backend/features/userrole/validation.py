def roleuserValidation(data):
    User_Id = data.get("User_Id")
    Role_Id = data.get("Role_Id")

    if not User_Id:
        return False, "User_Id is required"

    if not Role_Id:
        return False, "Role_Id is required"

    validate_data = {
        "User_Id": User_Id,
        "Role_Id": Role_Id
    }

    return True, validate_data