def rolepermissionValidation(data):
    Role_Id = data.get("Role_Id")
    Page_Id = data.get("Page_Id")
    AddPermission = data.get("AddPermission", False)
    EditPermission = data.get("EditPermission", False)
    DeletePermission = data.get("DeletePermission", False)
    ViewPermission = data.get("ViewPermission", False)

    if not Role_Id:
        return False, "Role_Id is required"

    if not Page_Id:
        return False, "Page_Id is required"

    validate_data = {
        "Role_Id": Role_Id,
        "Page_Id": Page_Id,
        "AddPermission": AddPermission,
        "EditPermission": EditPermission,
        "DeletePermission": DeletePermission,
        "ViewPermission": ViewPermission
    }

    return True, validate_data