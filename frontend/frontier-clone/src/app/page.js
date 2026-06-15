import dynamic from "next/dynamic";
const MagazineRelease = dynamic(() => import("./sections/MagazineRelease"));
const EliteArchivesSection = dynamic(() => import("./sections/EliteArchives"));
const WomenVisionariesSection = dynamic(
  () => import("./sections/WomenVisionariesSection"),
);
const HallOfFame = dynamic(() => import("./sections/HallOfFame"));
const TrendingSection = dynamic(() => import("./sections/TrendingSection"));
const InnovationTechnologySection = dynamic(
  () => import("./sections/InnovationTechnologySection"),
);
const VisionaryVoicesSection = dynamic(
  () => import("./sections/VisionaryVoicesSection"),
);
const ShowcaseSection = dynamic(() => import("./sections/ShowcaseSection"));
const EditorialHighlight = dynamic(
  () => import("./sections/EditorialHighlight"),
);
const HeroSection = dynamic(() => import("./sections/HeroSection"));
const PartnerLogoSlider = dynamic(() => import("../components/PartnerLogoSlider"));
const FullScreenLoader = dynamic(() => import("../components/FullSreenLoader"));

import LazySection from "@/components/LazySectionWrapper";
import { getStrapiData } from "@/utils/utils";
const sectionComponentMap = {
  "sections.magazine-release": MagazineRelease,
  "sections.elite-archives": EliteArchivesSection,
  "sections.women-visionaries": WomenVisionariesSection,
  "sections.hall-of-fame": HallOfFame,
  "sections.trending-insights": TrendingSection,
  "sections.innovation-technology": InnovationTechnologySection,
  "sections.visionary-voices": VisionaryVoicesSection,
  "sections.showcase": ShowcaseSection,
  "sections.editorial-highlight": EditorialHighlight,
};

async function getHomePage() {
  const apis = [
    "/home-page?populate=deep",
    "/home-sections?populate=deep",
    // '/posts'
  ];
  return await Promise.all(apis.map((api) => getStrapiData(api))).then(
    ([homeRes, sectionsRes]) => {
      const homeData = homeRes?.data?.[0] || {};
      const sectionsData = sectionsRes?.data || [];
      // Map sections to their respective components
      const sectionsMap = {};
      homeData?.sections.forEach((section) => {
        if (section.__component) {
          sectionsMap[section.__component] = section;
        }
      });
      return {
        ...homeData,
        sections: Object.values(sectionsMap),
        sectionsData,
      };
    },
  );
}

export default async function Home() {
  let data = null;

  try {
    const _data = await getHomePage();
    data = _data;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return (
      <FullScreenLoader
        text="We're having trouble loading this page. Check back again later."
        textColor="text-red-600"
        loadingColor="red"
      />
    );
  }

  if (!data) {
    return <FullScreenLoader text="Loading site details..." />;
  }

  const site = data || {};

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* HERO */}

      <HeroSection site={site} />

      <PartnerLogoSlider partner_logos={site.partner_logos || []} />
      {site?.sections?.map((section, index) => {
        const Component = sectionComponentMap[section.__component];
        const sectionName = section.__component.split(".").pop() || "unknown";
        let sectionData = site.sectionsData?.find(
          (s) => s.type === sectionName,
        );

        if (!Component) return null;

        return (
          <LazySection key={index}
           fallback={<div className="h-[400px] animate-pulse bg-gray-100" />}
          >
            <Component sectionData={sectionData} />
          </LazySection>
        );
      })}
    </main>
  );
}
