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

const {
  getHistory,
  deleteHistory,
} = require("../controllers/resumeController")

router.get("/history", getHistory)

router.delete(
  "/history/:id",
  deleteHistory
)
module.exports = router