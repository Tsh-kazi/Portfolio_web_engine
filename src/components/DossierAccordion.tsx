"use client";

import { useState } from "react";
import {
  ChevronDown,
  Briefcase,
  GraduationCap,
  Globe,
  Award,
} from "lucide-react";

interface WorkJob {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Leadership {
  role: string;
  org: string;
  period: string;
  desc?: string;
}

interface DossierAccordionProps {
  professionalProfile: string;
  workExperience: WorkJob[];
  education: Education[];
  leadership: Leadership[];
  languages: string[];
}

export default function DossierAccordion({
  professionalProfile,
  workExperience,
  education,
  leadership,
  languages,
}: DossierAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <section id="dossier" className="scroll-mt-20 mt-6">
      {/* Toggle trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        id="btn-dossier-toggle"
        className="w-full flex items-center justify-between px-6 py-4 bg-white/85 border border-blue-100/70 rounded-xl shadow-sm shadow-blue-50/30 hover:shadow-md hover:shadow-blue-100/40 hover:border-blue-200 transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-blue-500" />
          </span>
          <div className="text-left">
            <p className="text-sm font-bold text-zinc-900 font-heading">
              View Complete Professional Dossier
            </p>
            <p className="text-sm text-zinc-500">
              Experience · Education · Leadership · Languages
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-blue-400 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expandable panel */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[2400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-3 bg-white/80 border border-zinc-200 rounded-xl shadow-sm overflow-hidden">

          {/* ── Professional Summary ── */}
          <div className="px-6 py-5 border-b border-blue-50">
            <p className="text-sm font-mono uppercase tracking-widest text-blue-400 mb-2">
              Profile Summary
            </p>
            <p className="text-base text-zinc-600 leading-relaxed">
              {professionalProfile}
            </p>
          </div>

          {/* ── Work Experience Timeline ── */}
          <div className="px-6 py-5 border-b border-blue-50">
            <div className="flex items-center gap-2 mb-5">
              <Briefcase className="w-4 h-4 text-blue-500" />
              <p className="text-base font-bold text-zinc-900 font-heading">
                Work Experience
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-200 to-amber-100" />
              <div className="space-y-7">
                {workExperience.map((job, i) => (
                  <div key={i} className="relative pl-6">
                    <span className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
                    <div className="flex flex-wrap items-start justify-between gap-1 mb-1">
                      <p className="text-base font-bold text-zinc-900 font-heading">
                        {job.role}
                      </p>
                      <span className="text-sm font-mono text-blue-500 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full flex-shrink-0">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      {job.company}
                    </p>
                    <ul className="space-y-1.5">
                      {job.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-base text-zinc-600 leading-relaxed"
                        >
                          <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Education & Leadership ── */}
          <div className="px-6 py-5 border-b border-blue-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Education */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-4 h-4 text-violet-500" />
                  <p className="text-base font-bold text-zinc-900 font-heading">
                    Education
                  </p>
                </div>
                <div className="space-y-3">
                  {education.map((edu, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-lg bg-violet-50/50 border border-violet-100/80"
                    >
                      <p className="text-sm font-bold text-zinc-800 leading-snug mb-0.5 font-heading">
                        {edu.degree}
                      </p>
                      <p className="text-sm text-zinc-500">{edu.institution}</p>
                      <p className="text-sm font-mono text-violet-500 mt-1">
                        {edu.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-amber-500" />
                  <p className="text-base font-bold text-zinc-900 font-heading">
                    Leadership
                  </p>
                </div>
                <div className="space-y-3">
                  {leadership.map((l, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-lg bg-amber-50/50 border border-amber-100/80"
                    >
                      <p className="text-sm font-bold text-zinc-800 font-heading">
                        {l.role}
                      </p>
                      <p className="text-sm text-zinc-500">{l.org}</p>
                      <p className="text-sm font-mono text-amber-500 mt-0.5">
                        {l.period}
                      </p>
                      {l.desc && (
                        <p className="text-sm text-zinc-500 mt-1.5 leading-relaxed">
                          {l.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Languages ── */}
          <div className="px-6 py-5">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-teal-500" />
              <p className="text-base font-bold text-zinc-900 font-heading">Languages</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 text-zinc-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                  {lang}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
