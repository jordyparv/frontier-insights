export default async function MagazineRelease(params) {
  const { sectionData } = await params || {};
  const headline = sectionData?.content?.title || "";
  const description = sectionData?.content?.subtitle || "";
  if(!headline && !description) return null;
  return (
    <section className="py-6 bg-black/90 relative overflow-hidden border-y border-[#443730]/50">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-6xl font-semibold leading-tight max-w-5xl mx-auto text-white/90 tracking-wide">
           {headline}
        </h2>
         <div className="w-24 h-[1px] bg-white/30 mx-auto my-4" />
        <h2 className="text-lg font-serif italic text-white/80 leading-relaxed">
           {description}
        </h2>

      </div>
    </section>
  )
}
