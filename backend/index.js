var http = require('http');
var request = require('request');
var spotify = {
	id: 'f631ed4a343543a2814e52fc3da52309',
	secret: '96c311d249b24969a170c671f6267508'
};

http.createServer(function (req, res) {

  if(req.url == '/') {
    var authOptions = {
    	url: 'https://accounts.spotify.com/api/token',
    	headers: {
      	'Authorization': 'Basic ' + (new Buffer(spotify.id + ':' + spotify.secret).toString('base64'))
    	},
    	form: {
      	grant_type: 'client_credentials'
    	},
    	json: true
    };

    request.post(authOptions, (err, resp, body) => {
    	if (!err && resp.statusCode === 200) {
    		var token = body.access_token;
    		res.write(token);
    		res.end();
    	}
    });
  } else {
    res.end();
  }

}).listen(8090); 