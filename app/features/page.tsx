import Link from "next/link";

const features = [
  {
    icon: "🤖",
    title: "AI Career Advisor",
    description:
      "Receive personalized career recommendations based on your skills, interests, education, and goals.",
  },
  {
    icon: "📝",
    title: "Smart Assessment",
    description:
      "Answer multiple questions that help the AI understand your strengths and preferences.",
  },
  {
    icon: "📊",
    title: "Skill Gap Analysis",
    description:
      "Identify missing skills and understand what you need to learn for your dream career.",
  },
  {
    icon: "🛣️",
    title: "Learning Roadmap",
    description:
      "Get a step-by-step roadmap with technologies, certifications, and resources.",
  },
  {
    icon: "💼",
    title: "Career Match Score",
    description:
      "Compare different careers with AI-generated match scores based on your profile.",
  },
  {
    icon: "📄",
    title: "Download Report",
    description:
      "Download your complete career guidance report as a professional PDF.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">
          <h1 className="text-5xl font-bold">
            Our <span className="text-blue-500">Features</span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
            CareerAI combines Artificial Intelligence with career guidance to
            help students and professionals make better career decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="text-2xl font-bold mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-400 mt-4 leading-8">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl inline-block font-semibold"
          >
            ← Back to Home
          </Link>
        </div>

      </section>
    </main>
  );
}