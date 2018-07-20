var http = require('http');
var request = require('request');
var spotify = {
	id: 'f631ed4a343543a2814e52fc3da52309',
	secret: '96c311d249b24969a170c671f6267508'
};
var authToken = '';

http.createServer(function (req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/html; charset=utf8');

  if(req.url == '/') {
    getAuthToken((token) => {
      res.write(token);
      res.end();
    });
  } else if(req.url == '/serdar') {
    var serdarId = '7BJjzi0JHyDHAsmVe21dGa';
    //return serdar ortaç
    getArtist(serdarId, (resp) => {
      console.log(typeof(resp));      
      res.write(resp);
      res.end();
    });    
  } else if(req.url == '/keser') {
    var keserId = '0M4jyxbQ9vrCql6jYi2y0o';
    //return mustafa keser
    getArtist(keserId, (resp) => {
      res.write(resp);
      res.end();
    });    
  } else {
    res.end();
  }

}).listen(8090); 

function getAuthToken(callback) {
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
        console.log('Got auth token: '+body.access_token);
        authToken = body.access_token;
        callback(body.access_token);
      }
    });
}

function getArtist(artistId, callback) {
  if(authToken == '') {
    getAuthToken((token) => {
      getArtist(artistId, callback);
    });
  } else {
    var artistOptions = {
      url: `https://api.spotify.com/v1/artists/${artistId}`,
      headers: {
        'Authorization': 'Bearer ' + authToken
      },
      json: true
    };

    request.get(artistOptions, (err, resp, body) => {
      if (!err && resp.statusCode === 200) {
        console.log(typeof(body));
        console.log('Got artist: '+JSON.stringify(body));
        callback(JSON.stringify(body));
      }
    });
  }
}