# 🗣️ Release notification

Send a notification when a new release is published. Keep your team in the loop!

## Usage

Add this action to your release workflow

```yml
# release.yml

on:
  release:
    types: [published]

jobs:
  notification:
    runs-on: ubuntu-latest
    steps:
      - name: Release notification
        uses: stormwarning/action-release-notification@v1
        with:
          channel: releases
          message: A new version is out!
          actions: '[{"text": "View changelog 🎉", "url": "CHANGELOG.md"},{"text": "View docs 📚", "url": "https://foo.com"}]'
        env:
          SLACKBOT_TOKEN: ${{ secrets.SLACKBOT_TOKEN }}
```

The `actions` key is optional. It should be a JSON string with an array of 
objects containing a `text` key and either a `url` or `action` key (GitHub
action config currently only allows for string options, not arrays).
