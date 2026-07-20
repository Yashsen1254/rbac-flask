def permissionValidation(data):
    AddPermission = data.get("AddPermission", False)
    EditPermission = data.get("EditPermission", False)
    DeletePermission = data.get("DeletePermission", False)
    ViewPermission = data.get("ViewPermission", False)

    validate_data = {
        "AddPermission": AddPermission,
        "EditPermission": EditPermission,
        "DeletePermission": DeletePermission,
        "ViewPermission": ViewPermission
    }

    return True, validate_data