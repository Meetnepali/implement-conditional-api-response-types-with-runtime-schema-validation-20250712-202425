#!/bin/bash
set -e

if ! command -v npm > /dev/null; then
  echo "npm must be installed to proceed."
  exit 1
fi

npm install
echo "Dependencies installed."
