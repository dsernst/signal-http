#!/bin/sh

# This script allows you to register a new number with signal-cli.
# Make sure you've followed the instructions in ./config.sh.example first

# Import your $BOT_MUMBER
. ./config.sh

echo "Running register.sh"

## Disabling this method because it's not working right now
# # This tool comes from https://github.com/mobilecoinofficial/forest
# export CAPTCHA=signal-recaptcha-v2.6LfBXs0bAAAAAAjkDyyI1Lk5gBAUWfhI_bIyox5W.registration.$(curl -s --data-binary "https://signalcaptchas.org/registration/generate.html" https://human-after-all-21.fly.dev/6LfBXs0bAAAAAAjkDyyI1Lk5gBAUWfhI_bIyox5W | jq -r .solution.gRecaptchaResponse)
# npx signal-cli --config . -u $BOT_NUMBER register --captcha $CAPTCHA

# Run this one first, and it will tell you to get a CAPTCHA:
# npx signal-cli -a $BOT_NUMBER register

# Once you have that, save it to a variable in ./config.sh and run this one:
# npx signal-cli -a $BOT_NUMBER register --captcha $CAPTCHA

# Then you should be texted your verification code, save that to ./config.sh then run this:
npx signal-cli -a $BOT_NUMBER verify $VERIFICATION_CODE

