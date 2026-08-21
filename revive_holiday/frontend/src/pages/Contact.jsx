import { useEffect, useState } from "react";
import PageBanner from "../components/shared/PageBanner";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import { images } from "../data/site";
import { getSettings } from "../lib/api";

export default function Contact() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <>
      <PageBanner
        eyebrow="We'd Love to Hear From You"
        title="Get in Touch"
        description="Questions, quotes, or ready to book — our travel consultants are one message away."
        image={settings.contact_banner || images.contactBanner}
      />

      <section className="bg-sand-50 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
          <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-card lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
