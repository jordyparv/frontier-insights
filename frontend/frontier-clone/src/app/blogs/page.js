import { getStrapiData } from "@/utils/utils"
import BlogPage from "./Blogs"

export default async function page() {
  let blogs = []

  try {
    const res = await getStrapiData("/posts?populate=deep")
    blogs = Array.isArray(res) ? res : res?.data || []
  } catch (err) {
    console.log("Error fetching blogs:", err)
  }

  return <BlogPage blogData={blogs} />
}