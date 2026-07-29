from io import BytesIO
from flask import send_file
from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (SimpleDocTemplate, Table, TableStyle, Paragraph)

def export_logs_pdf(logs):
    buffer = BytesIO()
    document = SimpleDocTemplate(buffer, pagesize=landscape(A4))
    styles = getSampleStyleSheet()
    elements = []   
    elements.append(
        Paragraph(
            "<b>Activity Logs Report</b>",
            styles["Title"]
        )
    )

    data = [[
        "ID",
        "Date",
        "User",
        "Email",
        "Module",
        "Action",
        "Method",
        "Status"
    ]]

    for log in logs:
        data.append([
            log.Log_Id,
            log.CreatedAt.strftime("%d-%m-%Y %H:%M:%S"),
            log.User.Name if log.User else "",
            log.User.Email if log.User else "",
            log.Module,
            log.Action,
            log.Method,
            log.Status
        ])

    table = Table(data)

    table.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
        ])
    )

    elements.append(table)
    document.build(elements)
    buffer.seek(0)

    return send_file(
        buffer,
        download_name="activity_logs.pdf",
        as_attachment=True,
        mimetype="application/pdf"
    )