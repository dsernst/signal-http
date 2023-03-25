# signal-http

Access signal-cli (Signal Messenger) over http: POST to send, webhooks to receive incoming messages.

## First Time Configuration

1. Fork & clone this repo to your local machine.
2. Install all the node dependencies with `yarn` or `npm install` or equivalent.
3. Duplicate the file `./.env.example` into `./.env`, and fill in as appropriate.
4. Register your number with signal using by running the `./register.sh` script (follow the instructions within it)
5. You can test whether it worked with the `./test.sh` script
6. Save an image to `./avatar.png`, then run `./update-profile.sh` to update your signal bot's avatar and display name

## Start Server to Listen for Incoming Messages

```
yarn start
```

(or equivalent like `npm start`)
