export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-6xl mx-auto px-6 py-24">

        <div className="text-center animate-[fadeUp_0.8s_ease-out_forwards]">
          <h1 className="text-5xl font-bold">
            Contact <span className="text-blue-500">CareerAI</span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question, suggestion, or feedback? We'd love to hear from
            you.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div className="animate-[fadeUp_0.8s_ease-out_0.2s_forwards] opacity-0">
            <h2 className="text-3xl font-semibold">
              Let's Talk
            </h2>

            <p className="mt-6 text-gray-400 leading-8">
              Whether you have feedback about CareerAI or need help using
              the platform, feel free to get in touch with us.
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex items-center gap-4">
                <div className="text-2xl">📧</div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-white">
                    support@CareerAI.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-2xl">💬</div>
                <div>
                  <p className="text-sm text-gray-500">Support</p>
                  <p className="text-white">
                    We're here to help
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div
            className="
              bg-slate-900
              border border-slate-800
              rounded-2xl
              p-8
              animate-[fadeUp_0.8s_ease-out_0.35s_forwards]
              opacity-0
            "
          >
            <form className="space-y-6">

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="
                    w-full
                    bg-slate-950
                    border border-slate-700
                    rounded-xl
                    px-4 py-3
                    text-white
                    outline-none
                    focus:border-blue-500
                    transition-all duration-300
                  "
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="your@email.com"
                  className="
                    w-full
                    bg-slate-950
                    border border-slate-700
                    rounded-xl
                    px-4 py-3
                    text-white
                    outline-none
                    focus:border-blue-500
                    transition-all duration-300
                  "
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="
                    w-full
                    bg-slate-950
                    border border-slate-700
                    rounded-xl
                    px-4 py-3
                    text-white
                    outline-none
                    resize-none
                    focus:border-blue-500
                    transition-all duration-300
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  px-6 py-3
                  rounded-xl
                  text-white
                  font-medium
                  transition-all duration-300
                  hover:scale-[1.02]
                  hover:shadow-lg
                  hover:shadow-blue-500/20
                "
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>
    </main>
  );
}