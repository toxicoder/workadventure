#!/bin/bash
set -e
for dir in back uploader play map-storage; do
  echo "Cleaning and installing dependencies for $dir"
  cd $dir
  rm -rf node_modules package-lock.json
  npm cache clean --force
  npm install
  cd ..
done
