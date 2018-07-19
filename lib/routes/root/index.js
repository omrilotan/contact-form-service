module.exports = (request, response) => {
	response.headersSent || response.status(200).type('txt');
  response.send('to err is human; to redirect, divine');
}
