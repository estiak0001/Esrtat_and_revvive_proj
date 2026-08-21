import { useEffect, useState } from "react";
import PageBanner from "../components/shared/PageBanner";
import FeatureListSection from "../components/shared/FeatureListSection";
import CallToAction from "../components/shared/CallToAction";
import { getVisaSupport, getSettings } from "../lib/api";
import { images } from "../data/site";

export default function VisaAssistance() {
  const [visaSupport, setVisaSupport] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    getVisaSupport().then((data) => setVisaSupport(data.map((d) => d.text))).catch(() => {});
    getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <>
      <PageBanner
        eyebrow="Visa Assistance"
        title="Simplifying Your Visa Journey"
        description="Our experienced team assists clients with visa documentation, application procedures, appointment scheduling, and travel guidance."
        image={settings.visa_banner || images.visaBanner}
      />

      <FeatureListSection
        eyebrow="We Support"
        title="Guidance at Every Step of Your Application"
        intro="Visa paperwork is one of the most stressful parts of planning a trip. Our team reviews your documents, guides your application, and keeps you informed until your visa is approved."
        listTitle="We Support"
        items={visaSupport}
        image={settings.visa_banner || images.visaBanner}
        imageAlt="Airplane wing above the clouds at sunset"
        ctaLabel="Start Your Visa Application"
        reverse
      />

      <CallToAction
        title="Have a Visa Question?"
        description="Speak with a visa specialist before you apply and avoid costly delays."
        primaryLabel="Get Visa Support"
      />
    </>
  );
}
