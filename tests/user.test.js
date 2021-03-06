const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { setupDatabase, userOne, userOneId } = require('./fixtures/db')


beforeEach(setupDatabase)

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Greg',
      email: 'gmunker@gmail.com',
      password: 'Something12',
      age: 41
    })
    .expect(201)

    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Asserations about the response
    expect(response.body).toMatchObject({
      user: {
        name: 'Greg',
        email: 'gmunker@gmail.com'
      },
      token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Something12')
})

test('Should login exisiting user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})


test('Should return 400 when wrong creds', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: "gmunker@gmail.com",
      password: "Password34"
    })
    .expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauth user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete user with auth', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})

test('Should not delete user with unauth', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Anestasia'
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Anestasia')
})

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      something: true
    })
    .expect(400)
})


