const getOrder = (orderId) => {
  return { id: orderId, price: 100 };
};

const updateOrder = (order) => {
  console.log("order is update");
};

const createOrder = () => {
  console.log("order is created");
};

const getUser = () => {
  console.log("get user");
};

module.exports = {
  updateOrder,
  getOrder,
  createOrder,
  getUser
};
