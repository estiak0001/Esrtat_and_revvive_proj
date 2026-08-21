import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageBanner from "../components/shared/PageBanner";
import MissionVision from "../components/about/MissionVision";
import CoreValues from "../components/about/CoreValues";
import CallToAction from "../components/shared/CallToAction";
import { images } from "../data/site";
import { getSettings } from "../lib/api";

export default function About() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <>
      <PageBanner
        eyebrow="About Revive Holidays"
        title="Who We Are"
        description="A trusted travel company dedicated to delivering exceptional travel experiences worldwide."
        image={settings.about_banner || images.aboutBanner}
      />

      <section className="bg-white py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl px-6 text-center"
        >
          <p className="text-lg leading-relaxed text-navy-700">
            Revive Holidays is a trusted travel company dedicated to delivering exceptional
            travel experiences worldwide. Our mission is to simplify travel while maintaining
            the highest standards of professionalism, customer care, and service excellence.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-navy-700">
            Through our extensive network of travel partners, airlines, hotels, and destination
            experts, we provide comprehensive travel solutions tailored to individual and
            corporate needs.
          </p>
          <p className="mt-5 font-display text-xl font-semibold text-teal-700">
            Every journey we create is built on trust, reliability, and attention to detail.
          </p>
        </motion.div>
      </section>

      <MissionVision />
      <CoreValues />
      <CallToAction
        title="Let's Plan Something Extraordinary"
        description="Talk to a Revive Holidays travel consultant and start designing your next trip today."
      />
    </>
  );
}
