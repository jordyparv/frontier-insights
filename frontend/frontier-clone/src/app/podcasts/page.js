import PodcastPage from "./Podcasts"
import { getStrapiData } from "@/utils/utils"

export default async function Page({ searchParams }) {

  const {page} = await searchParams

  const pageSize = 8

  const data = await getStrapiData(
    `/podcasts?page=${page || 1}&pageSize=${pageSize}&populate=deep`
  )

  return <PodcastPage podcasts={data} />
}