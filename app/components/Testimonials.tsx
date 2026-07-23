export default function Testimonials() {
  return (
    <section className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-white text-center">
          What Our Users Say
        </h2>

        <p className="text-gray-400 text-center mt-4">
          Trusted by students and professionals.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <p className="text-gray-300">
              "This AI helped me choose the right career path."
            </p>

            <h4 className="text-white font-semibold mt-6">
              ⭐⭐⭐⭐⭐
            </h4>

            <p className="text-blue-400 mt-2">
              Rahul Sharma
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <p className="text-gray-300">
              "The roadmap was clear and easy to follow."
            </p>

            <h4 className="text-white font-semibold mt-6">
              ⭐⭐⭐⭐⭐
            </h4>

            <p className="text-blue-400 mt-2">
              Aisha Khan
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <p className="text-gray-300">
              "A great project with a premium user experience."
            </p>

            <h4 className="text-white font-semibold mt-6">
              ⭐⭐⭐⭐⭐
            </h4>

            <p className="text-blue-400 mt-2">
              John David
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}