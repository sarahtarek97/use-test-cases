const { default: axios } = require("axios");
const db = require("./db");
const email = require('./email')

//test number
const sum = (a, b) => a + b;

//test string
const greeting = (name) => `Hello ${name}!`;

//test boolean
const isEven = (number) => (number % 2 === 0 ? true : false);

//test arrays
const ANIMALS = ["cat", "dog", "monkey"];

//test objects
const getOrderById = (id) => {
  if (!id) throw new Error("id is not defined");
  return {
    id: 1,
    price: 10,
    date: "2022",
  };
};

//test async code
const getOrders = async () => {
  return [
    { id: 1, price: 10 },
    { id: 2, price: 20 },
  ];
};

//test mock
const applyDiscount = (orderId) => {
  const order = db.getOrder(orderId);

  if (order.price >= 10) {
    order.price -= order.price * 0.1;
    db.updateOrder(order);
  }
  return order;
};

const fetchData = async () => {
  const data = axios.get("https://url.com");
  return data;
};

const createOrder = async (userId, products) => {
  if (!userId) {
    throw new Error("userId not found");
  }

  let totalPrice = 0;
  products.forEach((product) => (totalPrice += product.price));

  await db.createOrder(userId, products);

  const user = await db.getUser(userId);
  email.sendEmail(user.email, totalPrice);

  return `order created successfully with totalPrice ${totalPrice} and products ${products}`;
};
module.exports = {
  sum,
  greeting,
  isEven,
  ANIMALS,
  getOrderById,
  getOrders,
  applyDiscount,
  fetchData,
  createOrder
};
