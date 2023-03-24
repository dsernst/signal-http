#!/bin/sh

# Import config variables
. ./config.sh

# Test sending a message
./signal-cli -a $BOT_NUMBER send -m "This is a message" $TEST_RECIPIENT

# Test checking for new messages
# ./signal-cli -a $BOT_NUMBER receive

# Test running the daemon to receive new messages
# ./signal-cli -a $BOT_NUMBER daemon --dbus