#!/bin/sh
set -e

echo "Waiting for MySQL..."

python -c "
import os
import time
from sqlalchemy import create_engine

db_url = 'mysql+pymysql://{}:{}@{}:{}/{}'.format(
    os.environ['DB_USERNAME'],
    os.environ['DB_PASSWORD'],
    os.environ['DB_HOST'],
    os.environ['DB_PORT'],
    os.environ['DB_NAME']
)

engine = create_engine(db_url)

while True:
    try:
        with engine.connect():
            print('✅ MySQL is ready.')
            break
    except Exception as e:
        print(f'⏳ MySQL not ready: {e}')
        time.sleep(2)
"

echo "Running migrations..."
flask db upgrade

echo "Running seed..."
python seed.py

echo "Starting Flask..."
exec python app.py