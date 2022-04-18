const express = require('express');
const router = express.Router();
const { getPlans, postPlan, updatePlan, deletePlan } = require('../controllers/planController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPlans).post(protect, postPlan);
router.route('/:id').put(protect, updatePlan).delete(protect, deletePlan);

module.exports = router;
