import { useEffect, useMemo, useState } from "react"

import {
  FiActivity,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiEdit2,
  FiFilter,
  FiPlus,
  FiTrash2,
  FiX,
  FiXCircle,
} from "react-icons/fi"

import api from "../../services/api"

import EmptyState from "../ui/EmptyState"

const statuses = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
]

const statusStyles = {

  Applied:
    "bg-sky-50 text-sky-700 ring-sky-200",

  Interview:
    "bg-amber-50 text-amber-700 ring-amber-200",

  Offer:
    "bg-emerald-50 text-emerald-700 ring-emerald-200",

  Rejected:
    "bg-rose-50 text-rose-700 ring-rose-200",

}

const emptyForm = {

  company: "",

  location: "",

  notes: "",

  role: "",

  status: "Applied",

}

function JobTracker() {

  const [editingId, setEditingId] = useState(null)

  const [filter, setFilter] = useState("All")

  const [formData, setFormData] = useState(emptyForm)

  const [isLoading, setIsLoading] = useState(true)

  const [isSaving, setIsSaving] = useState(false)

  const [jobs, setJobs] = useState([])

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const token =
          localStorage.getItem("careerforge_token")

        
        const response = await api.get(
  "/jobs"
)

        setJobs(response.data)

      } catch (error) {

        console.log(error)

        alert("Could not load jobs")

      } finally {

        setIsLoading(false)

      }

    }

    fetchJobs()

  }, [])

  const filteredJobs = useMemo(() => {

    if (filter === "All") return jobs

    return jobs.filter(
      (job) => job.status === filter
    )

  }, [filter, jobs])

  const counts = useMemo(

    () =>

      statuses.reduce(

        (summary, status) => ({

          ...summary,

          [status]: jobs.filter(
            (job) => job.status === status
          ).length,

        }),

        { All: jobs.length }

      ),

    [jobs]

  )

  const handleChange = (event) => {

    setFormData((current) => ({

      ...current,

      [event.target.name]:
        event.target.value,

    }))

  }

  const resetForm = () => {

    setEditingId(null)

    setFormData(emptyForm)

  }

  const handleSubmit = async (event) => {

    event.preventDefault()

    setIsSaving(true)

    try {

      const token =
        localStorage.getItem("careerforge_token")

      if (editingId) {

        

        await api.put(
  `/jobs/${id}`,
  data
)

        setJobs((current) =>

          current.map((job) =>

            job._id === editingId
              ? response.data
              : job

          )

        )

      } else {

        await api.post(
  "/jobs",
  jobData
)

        setJobs((current) => [
          response.data,
          ...current,
        ])

      }

      resetForm()

    } catch (error) {

      console.log(error)

      alert("Could not save job")

    } finally {

      setIsSaving(false)

    }
  }

  const handleEdit = (job) => {

    setEditingId(job._id)

    setFormData({

      company: job.company || "",

      location: job.location || "",

      notes: job.notes || "",

      role: job.role || "",

      status: job.status || "Applied",

    })

  }

  const handleDelete = async (jobId) => {

    try {

      const token =
        localStorage.getItem("careerforge_token")

      await api.delete(
  `/jobs/${id}`
)

      setJobs((current) =>

        current.filter(
          (job) => job._id !== jobId
        )

      )

    } catch (error) {

      console.log(error)

      alert("Could not delete job")

    }

  }

  return (

    <div className="space-y-6">

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={FiActivity}
          title="Applications"
          value={jobs.length}
          color="from-blue-500 to-sky-600"
        />

        <StatCard
          icon={FiClock}
          title="Interviews"
          value={counts.Interview || 0}
          color="from-amber-500 to-orange-500"
        />

        <StatCard
          icon={FiCheckCircle}
          title="Offers"
          value={counts.Offer || 0}
          color="from-emerald-500 to-green-600"
        />

        <StatCard
          icon={FiXCircle}
          title="Rejected"
          value={counts.Rejected || 0}
          color="from-rose-500 to-red-600"
        />

      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">

        <form
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={handleSubmit}
        >

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold text-slate-950">

              {editingId
                ? "Edit Job"
                : "Add Job"}

            </h2>

            {editingId ? (

              <button
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                type="button"
                onClick={resetForm}
              >

                <FiX className="h-5 w-5" />

              </button>

            ) : null}

          </div>

          <label className="mt-5 block text-sm font-semibold text-slate-700">

            Company

            <input
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />

          </label>

          <label className="mt-4 block text-sm font-semibold text-slate-700">

            Role

            <input
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />

          </label>

          <label className="mt-4 block text-sm font-semibold text-slate-700">

            Location

            <input
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

          </label>

          <label className="mt-4 block text-sm font-semibold text-slate-700">

            Status

            <select
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >

              {statuses.map((status) => (

                <option key={status}>
                  {status}
                </option>

              ))}

            </select>

          </label>

          <label className="mt-4 block text-sm font-semibold text-slate-700">

            Notes

            <textarea
              className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />

          </label>

          <button
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            disabled={isSaving}
            type="submit"
          >

            <FiPlus className="h-4 w-4" />

            {isSaving
              ? "Saving..."
              : editingId
              ? "Save Changes"
              : "Add Job"}

          </button>

        </form>

        <section>

          <div className="mb-5 flex flex-wrap items-center gap-2">

            <FiFilter className="h-4 w-4 text-slate-500" />

            {["All", ...statuses].map(
              (status) => (

                <button
                  key={status}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    filter === status
                      ? "bg-slate-950 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                  type="button"
                  onClick={() =>
                    setFilter(status)
                  }
                >

                  {status} (
                  {counts[status] || 0})

                </button>

              )

            )}

          </div>

          {isLoading ? (

            <p className="text-slate-500">

              Loading jobs...

            </p>

          ) : filteredJobs.length ? (

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {filteredJobs.map((job) => (

                <div
                  key={job._id}
                  className="grid gap-4 border-b border-slate-100 px-5 py-5"
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-lg font-bold text-slate-950">

                        {job.company}

                      </p>

                      <p className="text-sm text-slate-500">

                        {job.location ||
                          "Remote"}

                      </p>

                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${
                        statusStyles[
                          job.status
                        ] ||
                        statusStyles.Applied
                      }`}
                    >

                      {job.status}

                    </span>

                  </div>

                  <div>

                    <p className="font-semibold text-slate-800">

                      {job.role}

                    </p>

                    <p className="mt-1 text-sm text-slate-500">

                      {job.notes}

                    </p>

                  </div>

                  <div className="flex gap-2">

                    <button
                      className="rounded-xl border border-slate-200 p-2 hover:bg-slate-100"
                      type="button"
                      onClick={() =>
                        handleEdit(job)
                      }
                    >

                      <FiEdit2 className="h-4 w-4" />

                    </button>

                    <button
                      className="rounded-xl border border-slate-200 p-2 hover:bg-rose-50"
                      type="button"
                      onClick={() =>
                        handleDelete(job._id)
                      }
                    >

                      <FiTrash2 className="h-4 w-4" />

                    </button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <EmptyState
              description="Add your first application."
              icon={FiBriefcase}
              title="No jobs found"
            />

          )}

        </section>

      </div>

    </div>

  )
}

function StatCard({
  icon: Icon,
  title,
  value,
  color,
}) {

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${color}`}
      >

        <Icon className="h-6 w-6 text-white" />

      </div>

      <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-500">

        {title}

      </p>

      <h2 className="mt-2 text-4xl font-black text-slate-950">

        {value}

      </h2>

    </div>

  )
}

export default JobTracker