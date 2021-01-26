const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
  setupDatabase,
  userOne,
  userOneId,
  userTwo,
  userTwoId,
  taskOne,
  taskTwo,
  taskThree,
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From my test"
    })
    .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Should get tasks for user', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body).toHaveLength(2)
})

test('Should not be allowed to delete other user task', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const task = Task.findById(taskOne._id)

    expect(task).not.toBeNull()
})

