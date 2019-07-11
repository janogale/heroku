const express = require('express');
const mongoose = require('mongoose');
const updateModel = require('../models/update');
const { chunkArray } = require('../helpers/index')
const router = express.Router();

/* get all updates. */
router.get('/', async function (req, res, next) {
  try {
    const result = await updateModel.find().sort('-createdAt')
    const chunkedArr = chunkArray(result, 7);
    res.json(chunkedArr);

  } catch (error) {
    res.json(error)
  }

});

/* get single update by id. */
router.get('/:id', async function (req, res, next) {

  // if not valid ID move to next route
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next();

  try {
    const result = await updateModel.findById(req.params.id)

    res.json(result);

  } catch (error) {
    res.json(error)
  }

});



/* get  updates by department.  last 24 hours*/
router.get('/:department/:date', async function (req, res, next) {

  const department = req.params.department.toUpperCase();

  try {
    const result = await updateModel.find({
      "department": department, "updatedAt": {
        $lt: new Date(),
        $gte: new Date(new Date().setDate(new Date().getDate() - 1))
      }
    })

    res.json(result);

  } catch (error) {
    res.json(error)
  }

});

/* get  updates by department. */
router.get('/:department', async function (req, res, next) {

  const department = req.params.department.toUpperCase();
  try {
    const result = await updateModel.find({ department })

    res.json(result);

  } catch (error) {
    res.json(error)
  }

});

/* insert single update. */
router.post('/', async function (req, res, next) {

  const { body } = req;

  try {

    const record = new updateModel({ ...body });
    const update = await record.save();

    res.json({ msg: "Saved Data.", status: "Saved", update });

  } catch (error) {

    res.json(error)
  }

});

/* update single update. */
router.put('/:id', async function (req, res, next) {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.json({ msg: "Invalid ID" });
  }

  const body = req.body

  try {
    const update = await updateModel.findByIdAndUpdate({ _id: req.params.id }, { ...body }, { new: true })

    res.json({ msg: "record updated successfully", status: "updated", update });

  } catch (error) {
    res.json(error)
  }

});

/* delete single update. */
router.delete('/:id', async function (req, res, next) {
  try {

    const result = await update.findById(req.params.id);

    if (!result) return res.json({ msg: "record does not exists" });

    const update = await update.findByIdAndDelete(req.params.id)

    res.json({ msg: "deleted successfully", update });

  } catch (error) {
    res.json(error)
  }

});


module.exports = router;
