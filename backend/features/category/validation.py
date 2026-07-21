def categoryValidation(data):
    Name = data.get("Category_Name")

    if not Name:
        return False, "Category_Name is required"

    validate_data = {
        "Category_Name": Name
    }

    return True, validate_data