#!/bin/bash

echo "Waiting for the database to be ready"
while ! nc -z db 5432; do
  sleep 1
done
echo "Database is ready!"

echo "Running Alembic migrations"
alembic revision --autogenerate -m "created tables"
alembic upgrade head

echo "Running dbfeeder to populate the database"
python -m dbfeeder


