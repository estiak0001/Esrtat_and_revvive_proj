import { useEffect, useState } from "react";
import {
  getContactMessages, toggleContactRead, deleteContactMessage,
  getInquiries, toggleInquiryRead, deleteInquiry,
} from "../api";
import { LuMail, LuMailOpen, LuTrash2 } from "react-icons/lu";

export default function MessagesManager() {
  const [tab, setTab] = useState("contact");
  const [contacts, setContacts] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const load = () => {
    getContactMessages().then((r) => setContacts(r.data));
    getInquiries().then((r) => setInquiries(r.data));
  };

  useEffect(() => {
    load();
  }, []);

  const onToggleContact = async (id) => {
    await toggleContactRead(id);
    load();
  };
  const onDeleteContact = async (id) => {
    if (!confirm("Delete this message?")) return;
    await deleteContactMessage(id);
    load();
  };
  const onToggleInquiry = async (id) => {
    await toggleInquiryRead(id);
    load();
  };
  const onDeleteInquiry = async (id) => {
    if (!confirm("Delete this inquiry?")) return;
    await deleteInquiry(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Messages</h1>
      <p className="text-gray-500 text-sm mb-6">Contact form submissions and destination/corporate/visa inquiries</p>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("contact")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "contact" ? "bg-[#0a1f2e] text-white" : "bg-white border border-gray-200 text-gray-600"}`}
        >
          Contact ({contacts.length})
        </button>
        <button
          onClick={() => setTab("inquiry")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "inquiry" ? "bg-[#0a1f2e] text-white" : "bg-white border border-gray-200 text-gray-600"}`}
        >
          Inquiries ({inquiries.length})
        </button>
      </div>

      {tab === "contact" && (
        <div className="space-y-3">
          {contacts.length === 0 && <p className="text-gray-400 text-sm">No contact messages yet.</p>}
          {contacts.map((m) => (
            <div key={m.id} className={`bg-white border rounded-xl p-4 ${!m.is_read ? "border-[#f98f0e]/40" : "border-gray-200"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-800 text-sm">{m.name}</p>
                    <span className="text-xs text-gray-400">{m.email}</span>
                    {m.phone && <span className="text-xs text-gray-400">· {m.phone}</span>}
                    {!m.is_read && <span className="text-xs bg-[#f98f0e]/10 text-[#f98f0e] rounded-full px-2 py-0.5">New</span>}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{m.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{new Date(m.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => onToggleContact(m.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50">
                    {m.is_read ? <LuMail size={15} /> : <LuMailOpen size={15} />}
                  </button>
                  <button onClick={() => onDeleteContact(m.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50">
                    <LuTrash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "inquiry" && (
        <div className="space-y-3">
          {inquiries.length === 0 && <p className="text-gray-400 text-sm">No inquiries yet.</p>}
          {inquiries.map((i) => (
            <div key={i.id} className={`bg-white border rounded-xl p-4 ${!i.is_read ? "border-[#f98f0e]/40" : "border-gray-200"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-800 text-sm">{i.name}</p>
                    <span className="text-xs text-gray-400">{i.email}</span>
                    {i.phone && <span className="text-xs text-gray-400">· {i.phone}</span>}
                    <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{i.inquiry_type}</span>
                    {i.destination && <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{i.destination}</span>}
                    {!i.is_read && <span className="text-xs bg-[#f98f0e]/10 text-[#f98f0e] rounded-full px-2 py-0.5">New</span>}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{i.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{new Date(i.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => onToggleInquiry(i.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50">
                    {i.is_read ? <LuMail size={15} /> : <LuMailOpen size={15} />}
                  </button>
                  <button onClick={() => onDeleteInquiry(i.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50">
                    <LuTrash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
