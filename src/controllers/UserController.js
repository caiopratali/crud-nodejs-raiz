const { createSecureServer } = require('http2');
const users = require('../mocks/users.js');

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc') return a.id < b.id ? 1 : -1;

      return a.id > b.id ? 1 : -1;
    });

    response.send(200, sortedUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find(user => user.id == Number(id));

    if (!user) return response.send(400, { error: 'User not found' });
    
    response.send(200, user);
  },

  createUser(request, response) {
    const { body } = request;

    const lastUserId = users[users.length - 1].id;

    const newUser = {id: lastUserId + 1, ...body}

    users.push(newUser);

    response.send(201, newUser);
  },

  updateUser(request, response) {
    const { id } = request.params;
    const { body } = request;

    const user = users.find(user => user.id === Number(id));

    if (!user) return response.send(400, { error: 'User not found' });

    Object.assign(user, body);

    response.send(200, user);
  },

  deleteUser(request, response) {
    const { id } = request.params;

    const userIndex = users.findIndex(user => user.id === Number(id));

    if (userIndex < 0) return response.send(400, { error: 'User not found' }); 

    users.splice(userIndex, 1);

    response.send(200);
  }
}