import { useEffect, useState } from "react";
import PageBanner from "../components/shared/PageBanner";
import FeatureListSection from "../components/shared/FeatureListSection";
import CallToAction from "../components/shared/CallToAction";
import { getCorporateServices, getSettings } from "../lib/api";
import { images } from "../data/site";

export default function CorporateTravel() {
  const [corporateServices, setCorporateServices] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    getCorporateServices().then((data) => setCorporateServices(data.map((d) => d.text))).catch(() => {});
    getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <>
      <PageBanner
        eyebrow="For Businesses"
        title="Professional Travel Solutions for Businesses"
        description="Revive Holidays offers comprehensive corporate travel management services designed to optimize efficiency while reducing travel-related stress."
        image={settings.corporate_banner || images.corporateBanner}
      />

      <FeatureListSection
        eyebrow="Corporate Travel"
        title="Built for Executive & Team Travel"
        intro="From single executive trips to company-wide conferences, our corporate desk keeps your travel program efficient, compliant, and stress-free."
        listTitle="Services Include"
        items={corporateServices}
        image={settings.corporate_banner || images.corporateBanner}
        imageAlt="A business team collaborating around laptops"
        ctaLabel="Talk to Our Corporate Desk"
      />

      <CallToAction
        title="Simplify Your Company's Travel Program"
        description="Get a dedicated corporate travel consultant for your business today."
        primaryLabel="Request a Consultation"
      />
    </>
  );
}
