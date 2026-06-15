import { getStrapiData } from "@/utils/utils";
import BlogDetail from "./BlogDetail";
import Loading from "./Loading";

export default async function Page({ params , searchParams}) {
  let post = null;
  const { slug } = await params;
  const allowedQueryParams = ['author', 'category'];

  const filteredParams = Object.fromEntries(
    Object.entries(await searchParams).filter(([key]) => allowedQueryParams.includes(key))
  );
  let apiUrl = `/posts/${slug}`;
  for (const key in filteredParams) {
    filteredParams[key] = slug;
  }
  if(Object.keys(filteredParams).length > 0) {
    apiUrl = `/posts?${new URLSearchParams(filteredParams).toString()}`;
  }
  
  try {
    const res = await getStrapiData(
      apiUrl
    );
    post = res;
  } catch (err) {
    console.log("Error fetching post:", err);
  }

  return post ? <BlogDetail post={post} /> : <Loading />;
}