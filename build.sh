#!/usr/bin/env bash
# exit on error
set -o errexit

export DJANGO_SETTINGS_MODULE=backend.settings

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
