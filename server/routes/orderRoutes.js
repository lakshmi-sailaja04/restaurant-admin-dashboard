const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getTopSellers,
  getAnalyticsSummary
} = require('../controllers/orderController');

router.get('/', getOrders);

router.get('/:id', getOrderById);

router.post('/', createOrder);

router.patch('/:id/status', updateOrderStatus);

router.get('/analytics/top-sellers', getTopSellers);

router.get('/analytics/summary', getAnalyticsSummary);

module.exports = router;
