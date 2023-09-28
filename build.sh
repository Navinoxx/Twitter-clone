#!/usr/bin/env bash
# exit on error
set -o errexit

# Instalar dependencias de Python
pip install -r requirements.txt

# Ejecutar migraciones de Django
python manage.py migrate

# Recopilar archivos estáticos
python manage.py collectstatic --no-input

# Iniciar tu servidor ASGI 
daphne -b 0.0.0.0 -p 8000 backend.asgi:application

# Mantén este script en ejecución para que el servidor permanezca activo
tail -f /dev/null
