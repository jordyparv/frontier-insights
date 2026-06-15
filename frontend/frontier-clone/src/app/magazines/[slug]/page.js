import MagazineDetail from "./MagazineDetail";
import { getStrapiData } from "@/utils/utils";
import MagazineDetailSkeleton from "./MagazineDetailSkeleton";

export default async function Page({ params }) {
  const { slug } = await params;
  let magazine = null;
  let loading = true;
  // Mock magazine data based on slug
  try {
    const res = await getStrapiData(`/magazines/${slug}`);
    magazine = res?.data || {};

    console.log("Fetched magazine data:", res);
  } catch (error) {
    console.error("Error fetching magazine:", error?.message || error);
  } finally { 
    loading = false;
  }
  const trending = [
    {
      id: 1,
      title: "The Silence of a Prince",
      issue: "JAN 2026 • VOL 12",
      image: "/team1.jpg",
      excerpt: "Legacy stewardship and modern global diplomacy.",
    },
    {
      id: 2,
      title: "Women Redefining Leadership",
      issue: "FEB 2026 • VOL 12",
      image: "/team2.jpg",
      excerpt: "Visionaries transforming global systems.",
    },
    {
      id: 3,
      title: "Frontier 100",
      issue: "Annual Special",
      image: "/team3.jpg",
      excerpt: "The most influential leaders of the year.",
    },
    {
      id: 4,
      title: "Modern Minimalist",
      issue: "Monthly Edition",
      image: "/team4.jpg",
      excerpt: "Why less is more in the world of high-end product photography.",
    },
    {
      id: 5,
      title: "Global Pulse",
      issue: "Special Report",
      image: "/team5.jpg",
      excerpt: "Tracking the shifts in emerging markets across Southeast Asia.",
    },
  ];
  const _trending = Array(10).fill(trending).flat().slice(0, 2); // Mock more trending items

  return loading ? (
    <MagazineDetailSkeleton />
  ) : (
    <MagazineDetail magazine={magazine} trending={_trending} />
  );
}
