"use client";

import { Download } from "lucide-react";
import { triggerVCardDownload } from "@/utils/vcardDownload";

export default function SaveContactsButton() {
  return (
    <button
      type="button"
      id="btn-save-contacts"
      onClick={triggerVCardDownload}
      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-mono uppercase tracking-widest text-white bg-gradient-to-r from-brand-indigo to-brand-purple shadow-[0_4px_20px_-4px_rgba(99,102,241,0.5)] hover:shadow-[0_6px_28px_-4px_rgba(168,85,247,0.55)] hover:from-brand-purple hover:to-brand-pink transition-all duration-300 active:scale-[0.97] cursor-pointer"
    >
      <Download className="w-3.5 h-3.5" />
      Save to Contacts
    </button>
  );
}
