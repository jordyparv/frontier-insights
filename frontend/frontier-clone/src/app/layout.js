import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import FooterSection from "./sections/FooterSection";
import { getStrapiData } from "@/utils/utils";
import FullScreenLoader from "@/components/FullSreenLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "FRONTLINE INSIGHTS",
  description: "Building bold brands",
};

export default async function RootLayout({ children }) {
  let data = {};
  let loading = true;
  try {
    const res = await getStrapiData("layout", {
      param: {
        populate: "*",
      },
    });
    data = {
      footerData: {
        ...res?.siteSetting,
        quickLinks: res?.quickLinks || [],
        socialLinks: res?.socialLinks || [],
      },
      navData: {
        navItems: res?.navItems || [],
        showContact: res?.showContactButton ?? false,
        logo: res?.siteSetting?.site_logo?.url || null,
      }
    };
    console.log("Fetched layout data:", res.siteSetting);
  } catch (e) {
    console.error("Error fetching footer data:", e.message);
  } finally {
    loading = false;
  }
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_API_URL + (data?.navData?.logo || "/favicon.ico")}
          type="image/svg+xml"
          sizes="any"
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans select-none`}
      >
        <SmoothScroll>
          {loading && <FullScreenLoader text="Loading site details..." />}

          <Navbar navData={data?.navData || {}} />
          {children}
          <FooterSection
            footerData={data?.footerData}
            quickLinks={data?.footerData?.quickLinks}
            socialLinks={data?.footerData?.socialLinks}
            loading={loading}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
