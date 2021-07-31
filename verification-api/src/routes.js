const { Router } = require('express');

const verificationRouter = require('./routes/verify');

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api.
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version,
  });
});

router.use('/verify', verificationRouter);

module.exports = router;
