import {
  useEffect,
  useState,
} from "react"

import api from "../services/api"

function ResumeHistoryPage() {

  const [history,
    setHistory] =
    useState([])

  useEffect(() => {

    const load =
      async () => {

        const { data } =
          await api.get(
            "/resume/history"
          )

        setHistory(data)

      }

    load()

  }, [])

  return (
    <div>

      <h1>
        Resume History
      </h1>

      {history.map(item => (

        <div
          key={item._id}
        >

          <h3>
            ATS Score:
            {item.atsScore}
          </h3>

          <p>
            {item.summary}
          </p>

        </div>

      ))}

    </div>
  )
}

export default ResumeHistoryPage