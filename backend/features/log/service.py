from models.LoggerModel import LoggerModel
from models.UserModel import UserModel
from features.log.csv_export import export_logs_csv
from features.log.pdf_export import export_logs_pdf

def get_logs():
    logs = LoggerModel.query.order_by(LoggerModel.CreatedAt.desc()).all()
    return logs

def export_logs_csv_service():
    logs = LoggerModel.query.order_by(LoggerModel.CreatedAt.desc()).all()
    return export_logs_csv(logs)

def export_logs_pdf_service():
    logs = LoggerModel.query.order_by(LoggerModel.CreatedAt.desc()).all()
    return export_logs_pdf(logs)