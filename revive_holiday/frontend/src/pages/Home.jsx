import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import AlbumsPreview from "../components/home/AlbumsPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ServicesGrid from "../components/home/ServicesGrid";
import CallToAction from "../components/shared/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <AlbumsPreview />
      <WhyChooseUs />
      <ServicesGrid />
      <CallToAction />
    </>
  );
}
