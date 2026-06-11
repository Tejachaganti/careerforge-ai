const ResumeAnalysis =
  require(
    "../models/ResumeAnalysis"
  )

const getHistory =
  async (req, res) => {

    try {

      const history =
        await ResumeAnalysis
          .find({
            userId:
              req.user._id,
          })
          .sort({
            createdAt: -1,
          })

      res.json(history)

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })

    }
  }

module.exports = {
  getHistory,
}