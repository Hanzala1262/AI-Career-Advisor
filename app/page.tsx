import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";


export default function Home() {
  return (
    
    <main className="relative overflow-hidden bg-slate-950">
      
      {/* Animated background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl animate-float-slow" />

        <div className="absolute right-[-150px] top-[500px] h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-3xl animate-float-reverse" />

        <div className="absolute left-[40%] top-[900px] h-80 w-80 rounded-full bg-blue-500/5 blur-3xl animate-pulse" />
      </div>

      {/* Website content */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
        <Footer />
      </div>

    </main>
  );
}








