export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="reveal mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-rose-500">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl font-semibold text-stone-800 sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-stone-600">{subtitle}</p>}
    </div>
  )
}
