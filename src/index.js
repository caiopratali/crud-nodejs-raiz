const http = require('http');

const UserController = require('./controllers/UserController');
const routes = require('./routes');

const server = http.createServer((request, response) => {
  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  const route = routes.find(routeObj => (routeObj.endpoint === request.url && routeObj.method === request.method));

  if(route) {
    route.handler(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'not found' }));
  }
});

server.listen(3000, () => console.log('🚀 Server ON! 🔗 URL: http://localhost:3000'));