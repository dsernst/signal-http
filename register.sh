#!/bin/sh

# This script allows you to register a new number with signal-cli.
# Make sure you've followed the instructions in ./env.example first
echo "Running register.sh"

# TODO: Convert to use .env instead
# Import your $BOT_NUMBER and other variables
# . ./config.sh

# Run this one first, and it will tell you how to get a CAPTCHA code:
npx signal-cli -a $BOT_NUMBER register

# Once you have that, save it to a variable in ./.env and run this one:
# npx signal-cli -a $BOT_NUMBER register --captcha $CAPTCHA

# Then you should be texted your verification code, save that to ./.env then run this:
# npx signal-cli -a $BOT_NUMBER verify $VERIFICATION_CODE
