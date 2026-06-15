import { STRAPI_URL } from "@/utils/constraints";
import MagazinesPage from "./MagazinesPage";
import { getStrapiData } from "@/utils/utils";

export default async function Page({ searchParams }) {
  const page = Number(searchParams?.page || 1);
  const pageSize = 8;

  const res = await getStrapiData(
    `/magazines?populate=deep&page=${page}&pageSize=${pageSize}`
  );

  const magazines =
    res?.data?.map((item) => ({
      id: item.id,
      title: item.title,
      issue: item.issue,
      excerpt: item.excerpt,
      image: item.cover_image?.url,
      slug: item.slug,
      pdf: item.pdf_file?.url,
    })) || [];

  const pagination = res?.meta?.pagination || {
    page: 1,
    pageCount: 1,
  };

  return (
    <MagazinesPage
      magazines={magazines}
      pagination={pagination}
      currentPage={page}
    />
  );
}