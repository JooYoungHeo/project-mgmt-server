const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    ok: 'ok'
  });
});

module.exports = router;