#!/bin/sh

# This script allows you to register a new number with signal-cli.
# Make sure you've followed the instructions in ./config.sh.example first
echo "Running register.sh"

# Import your $BOT_NUMBER and other variables
. ./config.sh

# Run this one first, and it will tell you how to get a CAPTCHA code:
npx signal-cli -a $BOT_NUMBER register

# Once you have that, save it to a variable in ./config.sh and run this one:
# npx signal-cli -a $BOT_NUMBER register --captcha $CAPTCHA

# Then you should be texted your verification code, save that to ./config.sh then run this:
# npx signal-cli -a $BOT_NUMBER verify $VERIFICATION_CODE

