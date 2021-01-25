const { add, calTip, celsiusToFahrenheit, fahrenheitToCelsius } = require('../src/math')

test('Should cal total with tip', () => {
  const total = calTip(10, .3)
  expect(total).toBe(13)
})

test('Should cal total with default tip', () => {
  const total = calTip(10)
  expect(total).toBe(12.5)
})

test('Should convert 32f to 0c', () => {
  const celsius = fahrenheitToCelsius(32)
  expect(celsius).toBe(0)
})

test('Should convert 0c to 32f', () => {
  const fahrenheit = celsiusToFahrenheit(0)
  expect(fahrenheit).toBe(32)
})

test('Async test demo', (done) => {
  setTimeout(() => {
    expect(1).toBe(1)
    done()
  },2000)
})

test('Should add two positive numbers', (done) => {
  add(2,3).then((sum) => {
    expect(sum).toBe(5)
    done()
  })
})

test('Should add trwo numbers async/await', async () => {
  const sum = await add(10, 22)
  expect(sum).toBe(32)
})
