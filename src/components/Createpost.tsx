import { useState, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { superbase } from "../superbase-client"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface PostInput {
  title: string
  context: string
  section: string
  branch: string
}

const creatpost = async (post: PostInput) => {
  const { data, error } = await superbase.from("announcement").insert(post)
  if (error) throw new Error(error.message)
  return data
}

export default function Creatpost() {
  const [title, settitle] = useState("")
  const [context, setcontext] = useState("")
  const [branch, setDept] = useState("")
  const [section, setSection] = useState("")
  const [loading, setLoading] = useState(false)

  async function getCurrentUser() {
    const { data, error } = await superbase.auth.getUser()
    if (error || !data.user) {
      console.error("Error fetching user:", error?.message)
      return null
    }
    return data.user.id
  }

  async function getSection() {
    const userId = await getCurrentUser()
    if (!userId) return

    const { data: crData, error } = await superbase
      .from("cr_users")
      .select("branch , section")
      .eq("user_id", userId)
      .single()

    if (error) {
      console.error("Error fetching CR section:", error.message)
      return
    }

    setDept(crData.branch)
    setSection(crData.section)
  }

  useEffect(() => {
    getSection()
  }, [])

  const { mutate } = useMutation({
    mutationFn: creatpost,
    onSuccess: () => {
      toast.success("Posted successfully!")
      settitle("")
      setcontext("")
      setLoading(false)
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message}`)
      setLoading(false)
    },
  })

  const handlesubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    mutate({ title, context, section, branch })
  }

  return (
    <form
      onSubmit={handlesubmit}
      className="max-w-lg mx-auto bg-transparent p-6 rounded-2xl shadow-md space-y-4 flex flex-col"
      style={{
        fontFamily: "Atkinson Hyperlegible, sans-serif",
        fontWeight: 400,
        fontStyle: "normal",
      }}
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(event) => settitle(event.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 p-2 
                    text-white placeholder-gray-400
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter a title..."
        />
      </div>

      <div>
        <label htmlFor="context" className="block text-sm font-medium text-white">
          Body
        </label>
        <textarea
          id="context"
          name="context"
          required
          rows={5}
          value={context}
          onChange={(event) => setcontext(event.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 p-2 
                    text-white placeholder-gray-400
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Write your post..."
        ></textarea>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label
            htmlFor="department"
            className="block text-sm font-medium text-white"
          >
            Department
          </label>
          <div
            id="department"
            className="mt-1 w-full rounded-lg border border-gray-300 p-2  focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-white"
          >
            {branch}
          </div>
        </div>

        <div className="w-28">
          <label
            htmlFor="section"
            className="block text-sm font-medium text-white"
          >
            Section
          </label>
          <div
            id="section"
            className="mt-1 w-full rounded-lg border border-gray-300 p-2  focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-white"
          >
            {section}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full text-white font-semibold py-2 px-4 rounded-lg transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-blue-700"
        }`}
      >
        {loading ? "Posting..." : "Create Post"}
      </button>
      <ToastContainer />
    </form>
  )
}
