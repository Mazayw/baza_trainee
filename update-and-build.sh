#!/bin/bash

cd /app/baza/baza_trainee_back

git fetch

if git diff --quiet origin/dev; then
  echo "No changes on the remote branch."
else
  git pull origin dev

cd /app/baza/baza_trainee_back
make build
fi