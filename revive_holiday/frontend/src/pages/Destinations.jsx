import { useEffect, useState } from "react";
import PageBanner from "../components/shared/PageBanner";
import SectionHeading from "../components/shared/SectionHeading";
import DestinationCard from "../components/destinations/DestinationCard";
import CallToAction from "../components/shared/CallToAction";
import { getDestinations, getSettings } from "../lib/api";
import { images } from "../data/site";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    getDestinations().then(setDestinations).catch(() => {});
    getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <>
      <PageBanner
        eyebrow="Where To Next"
        title="Popular Destinations"
        description="Handpicked destinations across the globe, ready to be turned into your next itinerary."
        image={settings.destinations_banner || images.destinationsBanner}
      />

      <section className="bg-sand-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Explore"
            title="Find Your Next Escape"
            description="From European heritage cities to island paradises, our consultants tailor every destination to you."
          />

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, i) => (
              <DestinationCard
                key={destination.id}
                name={destination.name}
                description={destination.description}
                image={destination.image_url}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title="Don't See Your Dream Destination?"
        description="Our network reaches far beyond this list. Tell us where you want to go."
      />
    </>
  );
}
