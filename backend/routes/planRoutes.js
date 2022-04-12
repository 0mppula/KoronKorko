const express = require('express');
const router = express.Router();
const { getPlans, postPlan, updatePlan, deletePlan } = require('../controllers/goalController');

router.route('/').get(getPlans).post(postPlan);
router.route('/:id').put(updatePlan).delete(deletePlan);

module.exports = router;
