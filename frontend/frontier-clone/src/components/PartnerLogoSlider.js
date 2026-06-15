import { STRAPI_URL } from "@/utils/constraints"

export default async function PartnerLogoSlider({ partner_logos }) {
  const logos = await partner_logos
  return (
    <section className="py-14 overflow-hidden bg-[#faf9f6]">
      
      {/* Title with lines */}
      <div className="flex items-center justify-center gap-6 mb-14">
        <div className="h-[1px] w-24 bg-gray-400/40"></div>
        <p className="text-gray-600 text-sm tracking-wide">
          Loved by {logos.length} big and small brands around the worlds
        </p>
        <div className="h-[1px] w-24 bg-gray-400/40"></div>
      </div>

      {/* Carousel */}
      <div className="relative w-[80%] overflow-hidden flex items-center mx-auto">
        <div className="flex w-max animate-scroll gap-20">

          {/* Duplicate twice for seamless loop */}
          {logos.map((__logo, index) => (
            <div
              key={index}
              className="text-3xl font-semibold text-gray-700 whitespace-nowrap size-28 rounded-full overflow-hidden flex items-center"
            >
              <img 
                src={__logo?.logo?.url}
                alt={__logo.logo.name} 
                className="object-cover w-full h-full"
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}