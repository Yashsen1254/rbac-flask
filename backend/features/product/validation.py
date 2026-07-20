def productValidation(data):
    Name = data.get("Name")
    Price = data.get("Price")
    Category_Id = data.get("Category_Id")

    if not Name:
        return False, "Name is required"

    if not Price:
        return False, "Price is required"

    if not Category_Id:
        return False, "Category_Id is required"

    validate_data = {
        "Name": Name,
        "Price": Price,
        "Category_Id": Category_Id
    }

    return True, validate_data