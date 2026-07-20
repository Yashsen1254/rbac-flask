def rolepermissionValidation(data):
    Role_Id = data.get("Role_Id")
    Permission_Id = data.get("Permission_Id")

    if not Role_Id:
        return False, "Role_Id is required"

    if not Permission_Id:
        return False, "Permission_Id is required"

    validate_data = {
        "Role_Id": Role_Id,
        "Permission_Id": Permission_Id
    }

    return True, validate_data