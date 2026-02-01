const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  searchMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability
} = require('../controllers/menuController');

router.get('/', getMenuItems);

router.get('/search', searchMenuItems);

router.post('/', createMenuItem);

router.put('/:id', updateMenuItem);

router.delete('/:id', deleteMenuItem);

router.patch('/:id/availability', toggleAvailability);

module.exports = router;
