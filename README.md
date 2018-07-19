# contact-form-service

This little service is meant for use in static pages. It uses Gmail API to send emails in your name.
It can accept form data (HTML post form) or JSON (an asynchronous request like ajax or fetch).

## Prerequisites

Environment variables are set on deployment machine:

| variable | purpose | Example
| - | - | -
| `GMAIL_ADDRESS` | Your gmail address | `myname@gmail.com`
| `GMAIL_PASS` | Your gmail password | `jJwSmVHRkhSbGhrZHc`
| `TOKEN` | Just a simple token that needs to be passed with the request | `2tWak5XSkhSWGxPUVE`

Optional Slack notifications will be sent if the `SLACK_WEBHOOK` variable exist

| variable | purpose | Example
| - | - | -
| `SLACK_WEBHOOK` | Web address of a defined slack hook | `https://hooks.slack.com/services/YMDSGTP1R/IBT3DRJVY/fBR7QVh6lu8S3GqGj0vbcdFv`
| `SLACK_CHANNEL` | Overrides the webhook default channel | `"#events"`

Default success message is "Thank you" or something. You can override this

| variable | purpose | Example
| - | - | -
| `SUCCESS_MESSAGE` | Message to write to user | "Thanks"

Using this gmail API is considered less secure and is not possible with accounts set up with 2-step verification. Personally, I have created a different account especially for this
![](https://user-images.githubusercontent.com/516342/42952279-0470d160-8b70-11e8-99c8-20ab154c218e.png)

[Set it up here](https://myaccount.google.com/lesssecureapps)
