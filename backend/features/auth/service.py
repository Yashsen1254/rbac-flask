from models.UserModel import UserModel
from utils.jwt import generate_token

def login_user(Email, Password):
    user = UserModel.query.filter_by(Email=Email).first()

    if not user:
        return False, "User not found"
    
    if user.Password != Password:
        return False, "Invalid password"
    
    access_token = generate_token(user.User_Id)
    return True, access_token