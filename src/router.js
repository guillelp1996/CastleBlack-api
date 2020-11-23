const { Router } = require("express");
const router = Router();

router.get("/health", function(req, res) {
  // res.body = "Up and running";
  res.json({data:"Up and running"})
  // QUESTION: why this endpoint blocks the app?
  /**
   * because the 'body' method is in request not in response
   */
});

module.exports = router;
