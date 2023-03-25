#!/bin/bash

# TODO: Convert to use .env instead
# Import config variables
. ./config.sh

./signal-cli updateProfile --name "$DISPLAY_NAME"

if [ -f "./avatar.png" ]; then
  ./signal-cli updateProfile --avatar ./avatar.png
else
  echo "No ./avatar.png found, skipping"
fi
