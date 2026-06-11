const express =
  require("express")

const {
  protect,
} = require(
  "../middleware/authMiddleware"
)

const {
  getHistory,
} = require(
  "../controllers/resumeController"
)

const router =
  express.Router()

router.use(protect)

router.get(
  "/history",
  getHistory
)

module.exports = router