#!/bin/sh

echo "Running migrations..."
python manage.py migrate

echo "Starting Django server..."
gunicorn serverDjango.wsgi:application --bind "0.0.0.0:8000" --workers 4
