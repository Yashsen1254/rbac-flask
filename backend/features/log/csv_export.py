import csv
from io import StringIO
from flask import Response

def export_logs_csv(logs):
    output = StringIO()
    writer = csv.writer(output)

    writer.writerow([
        "Log ID",
        "Date & Time",
        "User Name",
        "Email",
        "Module",
        "Action",
        "Method",
        "URL",
        "Browser",
        "Status"
    ])

    for log in logs:

        writer.writerow([
            log.Log_Id,
            log.CreatedAt.strftime("%d-%m-%Y %H:%M:%S"),
            log.User.Name if log.User else "",
            log.User.Email if log.User else "",
            log.Module,
            log.Action,
            log.Method,
            log.Url,
            log.UserAgent,
            log.Status
        ])

    output.seek(0)

    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={
            "Content-Disposition":
            "attachment; filename=activity_logs.csv"
        }
    )