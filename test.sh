#!/bin/sh

# Import config variables
. ./config.sh

./signal-cli -a $BOT_NUMBER send -m "This is a message" $TEST_RECIPIENT
