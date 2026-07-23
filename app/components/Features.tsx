export default function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI Career Advisor",
      description:
        "Get personalized career recommendations based on your profile and goals.",
    },
    {
      icon: "📝",
      title: "Smart Assessment",
      description:
        "Answer multiple questions about your skills, interests, education, and personality.",
    },
    {
      icon: "📊",
      title: "Skill Gap Analysis",
      description:
        "Discover which skills you already have and what you should learn next.",
    },
    {
      icon: "🛣️",
      title: "Learning Roadmap",
      description:
        "Receive a step-by-step roadmap to achieve your dream career.",
    },
    {
      icon: "💼",
      title: "Career Match Score",
      description:
        "See how well different careers match your profile with AI-powered scoring.",
    },
    {
      icon: "📄",
      title: "Download Report",
      description:
        "Export your complete career report and roadmap as a PDF.",
    },
  ];

  return (
    <section id="features" className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Powerful Features
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Everything you need to discover your ideal career with the help of Artificial Intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="text-2xl font-semibold text-white mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-400 mt-4 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}