/**
 * Created by: Varun kumar
 * Date: 08 July, 2018
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res ) => {
  res.render('index');
});

module.exports = router;