from models.LoggerModel import LoggerModel
from models.UserModel import UserModel

def get_logs():
    logs = LoggerModel.query.order_by(LoggerModel.CreatedAt.desc()).all()
    return logs
