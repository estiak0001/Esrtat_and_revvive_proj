import { useEffect, useState } from "react";
import { LuMapPin, LuPhone, LuMessageCircle, LuMail, LuGlobe, LuClock } from "react-icons/lu";
import { siteInfo } from "../../data/site";
import { getSettings } from "../../lib/api";

export default function ContactInfo() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  const items = [
    { icon: LuMapPin, label: "Address", value: settings.address || siteInfo.address },
    { icon: LuPhone, label: "Phone", value: settings.phone || siteInfo.phone },
    { icon: LuMessageCircle, label: "WhatsApp", value: settings.whatsapp || siteInfo.whatsapp },
    { icon: LuMail, label: "Email", value: settings.email || siteInfo.email },
    { icon: LuGlobe, label: "Website", value: settings.website || siteInfo.website },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="font-display text-xl font-bold text-navy-900">Get in Touch</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-600">
          Have a question or ready to start planning? Reach out through any of the channels
          below, or send us a message.
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {items.map(({ icon: Icon, label, value }) => (
          <li key={label} className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <Icon size={20} />
            </span>
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-wide text-navy-400">
                {label}
              </p>
              <p className="text-sm font-medium text-navy-900">{value}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl bg-navy-900 p-6">
        <div className="flex items-center gap-3">
          <LuClock className="text-amber-400" size={20} />
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Office Hours
          </h4>
        </div>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <dd className="font-medium text-white">{settings.hours_weekdays || siteInfo.hours.weekdays}</dd>
          </div>
          <div className="flex items-center justify-between pt-1">
            <dd className="font-medium text-amber-300">{settings.hours_friday || siteInfo.hours.friday}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
