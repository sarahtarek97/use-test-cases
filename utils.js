const { default: axios } = require('axios')
const db = require('./db')

//test number
const sum = (a, b) => a + b

//test string
const greeting = (name) => `Hello ${name}!`

//test boolean
const isEven = (number) => (number % 2 === 0 ? true : false)

//test arrays
const ANIMALS = ['cat', 'dog', 'monkey']

//test objects
const getOrderById = (id) => {
  if (!id) throw new Error('id is not defined')
  return {
    id: 1,
    price: 10,
    date: '2022',
  }
}

//test async code
const getOrders = async () => {
  return [
    { id: 1, price: 10 },
    { id: 2, price: 20 },
  ]
}

//test mock
const applyDiscount = (orderId) => {
  const order = db.getOrder(orderId)

  if (order.price >= 10) {
    order.price -= order.price * 0.1
    db.updateOrder(order)
  }
  return order
}

const fetchData = async () => {
  const data = axios.get('https://url.com')
  return data
}

module.exports = {
  sum,
  greeting,
  isEven,
  ANIMALS,
  getOrderById,
  getOrders,
  applyDiscount,
  fetchData,
}
