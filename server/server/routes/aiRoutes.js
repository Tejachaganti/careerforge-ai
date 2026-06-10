
const express = require("express")

const {
  analyzeResume,
  askAI,
  getHistory,
  clearHistory,
} = require(
  "../controllers/aiController"
)
const {
  protect,
} = require("../middleware/authMiddleware")

const upload = require("../middleware/upload")

const router = express.Router()

router.use(protect)

router.post(
  "/ask",
  
  upload.any(),
  askAI
)

router.get(
  "/history",
  getHistory
)

router.delete(
  "/history",
  clearHistory
)

router.post(
  "/resume/analyze",
  upload.single("resume"),
  analyzeResume
)

module.exports = router