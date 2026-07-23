export default function HowItWorks() {
  return (
    <section
  id="about"
  className="bg-slate-950 py-24"
>
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-white text-center">
          How It Works
        </h2>

        <p className="text-gray-400 text-center mt-4">
          Get your personalized career guidance in three simple steps.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="text-5xl">📝</div>
            <h3 className="text-white text-2xl font-semibold mt-6">
              Answer Questions
            </h3>
            <p className="text-gray-400 mt-4">
              Tell us about your skills, interests, education, and goals.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="text-5xl">🤖</div>
            <h3 className="text-white text-2xl font-semibold mt-6">
              AI Analysis
            </h3>
            <p className="text-gray-400 mt-4">
              Our AI analyzes your profile to find the best career paths.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="text-5xl">🚀</div>
            <h3 className="text-white text-2xl font-semibold mt-6">
              Get Your Roadmap
            </h3>
            <p className="text-gray-400 mt-4">
              Receive career recommendations and a personalized learning plan.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}