const {
  sum,
  greeting,
  isEven,
  ANIMALS,
  getOrderById,
  getOrders,
  applyDiscount,
  fetchData,
} = require('../utils')
const { default: axios } = require('axios')

const db = require('../db')
jest.mock('axios')

describe('sum', () => {
  it('should return 2 + 3 = 5', () => {
    const result = sum(2, 3)
    expect(result).toBe(5)
    expect(result).toBeGreaterThan(4)
    expect(result).toBeGreaterThanOrEqual(5)
    expect(result).toBeLessThan(6)
    expect(result).toBeLessThanOrEqual(5)

    expect(sum(0.1002, 0.3)).toBeCloseTo(0.4)
  })
})

describe('greeting', () => {
  it('should retun Hello Sarah', () => {
    const result = greeting('Sarah')
    expect(result).toMatch('Hello Sarah')
  })
})

describe('isEven', () => {
  it('should return true for 4', () => {
    const result = isEven(4)
    expect(result).toBeTruthy()
  })

  it('should return false for 5', () => {
    const result = isEven(5)
    expect(result).toBeFalsy()
  })
})

describe('validation', () => {
  it('defined', () => {
    let x = 1
    expect(x).toBeDefined()
  })

  it('undefined', () => {
    let x
    expect(x).toBeUndefined()
  })

  it('null', () => {
    let x = null
    expect(x).toBeNull()
  })

  it('not null', () => {
    let x = 8
    expect(x).not.toBeNull()
  })
})

describe('animals', () => {
  it('should return true for cat', () => {
    expect(ANIMALS).toContain('cat')
  })
})

describe('getOrderById', () => {
  it('should return order of id= 1', () => {
    const result = getOrderById(1)
    // expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1, price: 10 })
    expect(result).toHaveProperty('id', 1)
  })

  it('should throw error if id is not defined', () => {
    expect(() => getOrderById()).toThrowError('id is not defined')
  })
})

describe('getOrders', () => {
  it('should return some orders', async () => {
    // const orders = await getOrders();
    // expect(orders.length).toBe(2);
    await expect(getOrders()).resolves.toContainEqual({ id: 1, price: 10 })
    // await expect(getOrders()).rejects.toContainEqual({ id: 1, price: 10 });
  })
})

describe('applyDiscount', () => {
  it('should apply discount 10% for order price 10', () => {
    // db.getOrder = jest.fn().mockReturnValue({ id: 1, price: 10 })
    db.getOrder = jest.fn().mockImplementation((id) => {
      if (id < 5) {
        return { id, price: 10 }
      }
      return { id, price: 8 }
    })
    db.updateOrder = jest.fn()
    // db.getOrder = function (orderId) {
    //   return { id: orderId, price: 10 }
    // }
    const order = applyDiscount(1)
    expect(order).toEqual({ id: 1, price: 9 })
    expect(db.getOrder.mock.calls.length).toBe(1)
    expect(db.updateOrder.mock.calls.length).toBe(1)
    expect(db.updateOrder.mock.calls[0][0]).toEqual({ id: 1, price: 9 })
    expect(db.updateOrder).toHaveBeenCalled()
    expect(db.updateOrder).toHaveBeenCalledWith({ id: 1, price: 9 })
    // db.getOrder.mockReset()
  })

  it('should not apply discount for order price 8', () => {
    const order = applyDiscount(10)
    expect(order).toEqual({ id: 10, price: 8 })
    expect(db.updateOrder.mock.calls.length).toBe(1)
  })
})

describe('fetchData', () => {
  it('should return some data', async () => {
    axios.get.mockResolvedValue({ id: 5 })
    const data = await fetchData()
    expect(data).toEqual({ id: 5 })
  })
})
