"use client"

export default function MagazineDetailSkeleton() {
  return (
    <main className="relative min-h-screen bg-gradient-to-r from-[#eef2ec] via-[#f3ede3] to-[#faf8f3] pt-32 animate-pulse">

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.04),transparent_60%)]" />

      {/* HERO */}
      <section className="relative mb-40">
        <div className="relative max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center">

          {/* LEFT */}
          <div className="max-w-xl space-y-6">

            <div className="h-3 w-32 bg-[#c8a85d]/40 rounded" />

            <div className="h-14 w-3/4 bg-black/20 rounded" />
            <div className="h-14 w-2/3 bg-black/20 rounded" />

            <div className="h-2 w-40 bg-[#c8a85d]/30 rounded mt-6" />

            <div className="h-5 w-full bg-black/10 rounded mt-6" />
            <div className="h-5 w-5/6 bg-black/10 rounded" />

            <div className="h-10 w-40 bg-black/20 rounded-full mt-8" />

            <div className="h-6 w-48 bg-black/20 rounded mt-10" />

            <div className="space-y-4 mt-6">
              <div className="h-4 w-full bg-black/10 rounded" />
              <div className="h-4 w-5/6 bg-black/10 rounded" />
              <div className="h-4 w-4/6 bg-black/10 rounded" />
            </div>

          </div>

          {/* RIGHT COVER */}
          <div className="flex justify-center">
            <div className="w-[380px] h-[520px] bg-black/10 rounded-md shadow-xl" />
          </div>

        </div>
      </section>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-8 grid lg:grid-cols-3 gap-24">

        <div className="lg:col-span-2 space-y-6">
          <div className="h-5 w-full bg-black/10 rounded" />
          <div className="h-5 w-5/6 bg-black/10 rounded" />
          <div className="h-5 w-4/6 bg-black/10 rounded" />
        </div>

        <aside className="hidden lg:block">
          <div className="space-y-8">
            <div className="h-6 w-32 bg-black/20 rounded" />
            <div className="h-40 w-full bg-black/10 rounded-xl" />
            <div className="h-40 w-full bg-black/10 rounded-xl" />
          </div>
        </aside>

      </div>

    </main>
  )
}