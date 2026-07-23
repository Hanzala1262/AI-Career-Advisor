import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-6xl mx-auto px-6 py-24">

        <h1 className="text-5xl font-bold">
          About <span className="text-blue-500">CareerAI</span>
        </h1>

        <p className="mt-8 text-lg text-gray-400 leading-8">
          CareerAI is an AI-powered career guidance platform that helps
          students and professionals discover the best career path based on
          their skills, interests, education, and goals.
        </p>

        <h2 className="text-3xl font-semibold mt-16">
          Our Mission
        </h2>

        <p className="mt-6 text-gray-400 leading-8">
          Our mission is to make career guidance accessible to everyone using
          Artificial Intelligence. Instead of generic advice, every user
          receives personalized recommendations and a clear learning roadmap.
        </p>

        <Link
          href="/"
          className="inline-block mt-12 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          ← Back to Home
        </Link>

      </section>

    </main>
  );
}