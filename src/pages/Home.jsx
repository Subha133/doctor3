import Hero from "../components/hero/Hero";
import VideoCarousel from "../components/hero/VideoCarousel";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Testimonials from "../components/sections/Testimonials";
import AppointmentForm from "../components/sections/AppointmentForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <VideoCarousel />
      <Testimonials />
      <AppointmentForm />
    </main>
  );
}
