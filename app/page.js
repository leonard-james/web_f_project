import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  FileText,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react";

const destinations = [
  {
    href: "/user_profile",
    label: "Explore people",
    title: "User profiles",
    description: "Browse community profiles, contact details, and each person's posts.",
    icon: UsersRound,
    tone: "bg-blue-50 text-blue-700",
  },
  {
    href: "/posts",
    label: "Read the latest",
    title: "Posts & conversations",
    description: "Discover stories from the community and open a post to read its comments.",
    icon: FileText,
    tone: "bg-violet-50 text-violet-700",
  },
  {
    href: "/dashboard",
    label: "See the overview",
    title: "Project dashboard",
    description: "Get a quick view of the data powering the ViewPoint experience.",
    icon: ChartNoAxesColumnIncreasing,
    tone: "bg-emerald-50 text-emerald-700",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 pb-12">
      <section className="relative isolate overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-white shadow-xl shadow-slate-900/10 sm:px-10 sm:py-14 lg:px-14">
        <div className="absolute -right-16 -top-28 -z-10 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute -bottom-36 right-1/3 -z-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-slate-200">
            <Sparkles className="h-4 w-4 text-sky-300" />
            A clearer view of your community
          </div>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Welcome to <span className="text-sky-300">ViewPoint.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Explore people, ideas, and the conversations that bring them together — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/user_profile" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
              Explore profiles <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/posts" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Browse posts
            </Link>
          </div>
        </div>
        <div className="mt-12 flex items-center gap-3 border-t border-white/10 pt-6 text-sm text-slate-300 sm:absolute sm:bottom-10 sm:right-10 sm:mt-0 sm:border-0 sm:pt-0">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
            <MapPin className="h-5 w-5 text-sky-300" />
          </span>
          <span><span className="block font-medium text-white">People & places</span><span>Connected through shared stories</span></span>
        </div>
      </section>

      <section aria-labelledby="discover-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Your workspace</p>
            <h2 id="discover-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Where would you like to go?</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-500">Choose a space to explore. Your next discovery is just a click away.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {destinations.map(({ href, label, title, description, icon: Icon, tone }, index) => (
            <Link key={href} href={href} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
              <div className="flex items-center justify-between">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tone}`}><Icon className="h-5 w-5" /></span>
                <span className="text-xs font-semibold tracking-widest text-slate-400">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                {label}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
