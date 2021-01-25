const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Greg',
      email: 'gmunker@gmail.com',
      password: 'Something12',
      age: 41
    })
    .expect(201)
})
