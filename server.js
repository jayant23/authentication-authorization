const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

const server = http.createServer((req, res) => {
  console.log(req.url + '---------------' + req.method);
  let path = './views';

  switch (req.url) {
    case '/':
      path += '/index.html';
      res.statusCode = 200;
      break;
    case '/about':
      if(req.method==="GET"){
        handleAbout(req, res);
        return;
      }
      path += '/about.html';
      res.statusCode = 301;
      return;
    case '/career':
      if(req.method==="GET"){
        handleProtectedRoute(req, res);
        return;
      }
      path += '/about.html';
      res.statusCode = 301;
      return;      
    case '/login':
      if (req.method === 'POST') {
        handleLogin(req, res);
        return;
      }
      break;
    case '/protected':
      if (req.method === 'GET') {
        handleProtectedRoute(req, res);
        return;
      }
      break;
    case '/about':
      if (req.method === 'GET') {
        path += '/about.html';
        return;
      }
      break;
    default:
      path += '/404.html';
      res.statusCode = 404;
      break;
  }

  res.setHeader('Content-Type', 'text/html');

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log('HTML page is not found');
      res.end('<h1>Page Not Found</h1>');
    } else {
      res.end(data);
    }
  });
});

function handleLogin(req, res) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const formData = qs.parse(body);
    const username = formData.username;
    const password = formData.password;

    // Validate the username and password
    if (username === 'john' && password === 'secret') {
      // Successful login
      const token = jwt.sign({ username: username }, secretKey, { expiresIn: '1h' });
      res.writeHead(302, {
        Location: '/about',
        'Set-Cookie': `authorization=${token}; HttpOnly; Max-Age=3600`,
      });
      res.end();
    } else {
      // Invalid credentials
      res.statusCode = 401;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Invalid credentials</h1>');
    }
  });
}
function handleProtectedRoute(req, res) {
  // Retrieve the cookie header from the request
  const cookieHeader = req.headers.cookie;

  if (cookieHeader) {
    // Parse the cookie string to get the individual cookies
    const cookies = qs.parse(cookieHeader, '; ');

    // Get the authorization cookie value
    const authorizationCookie = cookies.authorization;

    if (authorizationCookie) {
      // Extract the token from the authorization cookie
      const token = authorizationCookie.split('=')[0];

      // Verify the token
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          // Invalid token
          res.statusCode = 401;
          res.setHeader('Content-Type', 'text/html');
          res.end('<h1>Invalid token</h1>');
        } else {
          // Valid token
          console.log(decoded);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end('<h1>Protected Route</h1>');
        }
      });
    } else {
      // No authorization cookie
      res.statusCode = 401;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Unauthorized</h1>');
    }
  } else {
    // No cookies provided
    res.statusCode = 401;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Unauthorized</h1>');
  }
}

function handleAbout(req, res) {
  const path = './views/about.html';

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log('HTML page is not found');
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Page Not Found</h1>');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
}

// function handleProtectedRoute(req, res) {
//   const token = req.headers.authorization;

//   if (!token) {
//     // No token provided
//     res.statusCode = 401;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<h1>Unauthorized</h1>');
//   } else {
//     jwt.verify(token, secretKey, (err, decoded) => {
//       if (err) {
//         // Invalid token
//         res.statusCode = 401;
//         res.setHeader('Content-Type', 'text/html');
//         res.end('<h1>Invalid token</h1>');
//       } else {
//         // Valid token
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/html');
//         res.end('<h1>Protected Route</h1>');
//       }
//     });
//   }
// }

server.listen(3000, 'localhost', () => {
  console.log('Listening for requests on port 3000');
});
