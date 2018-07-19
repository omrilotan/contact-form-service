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

Using this gmail API is considered less secure and is not possible with accounts set up with 2-step verification. Personally, I have created a different account especially for this. [Set it up here](https://myaccount.google.com/lesssecureapps)

![](https://user-images.githubusercontent.com/516342/42952279-0470d160-8b70-11e8-99c8-20ab154c218e.png)

---

## Example of a form with progressive enhancement
```html
<form id="contactme" action="http://localhost:1337/v1/send?to=my@email.net" method="post">
	<input type="text" name="name" placeholder="name" value="">
	<input type="text" name="contact" placeholder="phone or email">
	<textarea name="message" placeholder="How can I help you?"></textarea>
	<input type="hidden" name="token" value="2tWak5XSkhSWGxPUVE">
	<button>Send</button>
</form>
```

```js
window.addEventListener('DOMContentLoaded', function() {
	const nodes = {
		error: document.createElement('p'),
		waiting: document.createElement('p'),
		success: document.createElement('p'),
		contactme
	};
	nodes.error.className = 'error';
	nodes.error.appendChild(document.createTextNode('Something went wrong, please try again.'));
	nodes.waiting.appendChild(document.createTextNode('Thank you'));
	nodes.success.appendChild(document.createTextNode('I will return to you shortly'));

	nodes.contactme.onsubmit = function(event) {
		event.preventDefault();

		// Remove error message if it exists, we're having anther go
		if (nodes.error.parentNode) {
			nodes.error.parentNode.removeChild(nodes.error);
		}

		// Replace form with a thank you message
		nodes.contactme.parentNode.replaceChild(nodes.waiting, nodes.contactme);

		// Convert form data to an object
		const data = [].reduce.call(
			nodes.contactme,
			(accumulator, {name, value}) => value ? Object.assign(
				accumulator,
				{[name]: value}
			) : accumulator,
			{}
		);

		fetch(nodes.contactme.action, {
			headers: {'Content-Type': 'application/json; charset=utf-8'},
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			redirect: 'follow',
			referrer: 'no-referrer',
			body: JSON.stringify(data),
		}).then(function (response) {
			if (response.ok) {

				// Replace thank you message with something more substantial, now that we know the email was sent
				nodes.waiting.parentNode.replaceChild(nodes.success, nodes.waiting);
			} else {
				throw new Error(response.statusText);
			}
		}).catch(function (error) {
			// console.error(error); // if you wish

			// Put the form back with an error message. This way user will not lose their filled information
			nodes.waiting.parentNode.replaceChild(nodes.contactme, nodes.waiting);
			nodes.contactme.parentNode.insertBefore(nodes.error, nodes.contactme);
		});
	}
});
```
