const express = require('express');
const Login = require('../models/login');
const router = express.Router();

/* get all logins. */
router.get('/', async function (req, res, next) {
  try {
    const logins = await Login.find();

    res.json(logins);

  } catch (error) {
    res.json(error)
  }

});

/* get single login. */
router.get('/:id', async function (req, res, next) {
  try {
    const login = await Login.findById(req.params.id)

    res.json(login);

  } catch (error) {
    res.json(error)
  }

});

/* insert single login. */
router.post('/', async function (req, res, next) {

  const { body } = req;

  try {


    const result = await Login.find({ department: body.department });

    if (result.length) return res.json({ msg: "record exists" });

    const record = new Login({ ...body });
    const login = await record.save();

    res.json({ msg: "Saved Data.", login });

  } catch (error) {

    res.json(error)
  }

});

/* update single login. */
router.put('/:id', async function (req, res, next) {
  const body = req.body
  try {
    const login = await Login.findOneAndUpdate({ _id: req.params.id }, { ...body }, { new: true, upsert: true })

    res.json({ msg: "record updated successfully", login });

  } catch (error) {
    res.json(error)
  }

});

/* delete single login. */
router.delete('/:id', async function (req, res, next) {
  try {

    const result = await Login.findById(req.params.id);

    if (!result) return res.json({ msg: "record does not exists" });

    const login = await Login.findByIdAndDelete(req.params.id)

    res.json({ msg: "deleted successfully", login });

  } catch (error) {
    res.json(error)
  }

});


module.exports = router;
