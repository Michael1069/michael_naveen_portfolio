import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Mail, Linkedin, Download, ArrowRight, ExternalLink, MapPin, GraduationCap, Code2, TerminalSquare, Cpu, Database, Bot } from "lucide-react";
import Masonry from "./components/Masonry";
import GlareHover from "./components/reactbits/GlareHover/GlareHover";

// ===== THEME =====
// Michael likes a black + red aesthetic with confident/cool energy.
// Tailwind is assumed. Colors lean dark with subtle red accents.

const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const skills = [
  {
    group: "Core",
    items: [
      { name: "JavaScript", icon: <Code2 className="w-4 h-4" /> },
      { name: "TypeScript", icon: <Code2 className="w-4 h-4" /> },
      { name: "Java", icon: <TerminalSquare className="w-4 h-4" /> },
      { name: "Python", icon: <TerminalSquare className="w-4 h-4" /> },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "TailwindCSS" },
      { name: "React" },
    ],
  },
  {
    group: "Backend / DB",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "MySQL", icon: <Database className="w-4 h-4" /> },
      { name: "JDBC" },
    ],
  },
  {
    group: "AI / Tools",
    items: [
      { name: "OpenAI / LLMs", icon: <Cpu className="w-4 h-4" /> },
      { name: "CLI Apps" },
      { name: "Git & GitHub" },
      { name: "Linux / Shell" },
    ],
  },
];

const projects = [
  {
    title: "RUBBER — Personal AI Dev Assistant",
    description:
      "A multi-surface AI agent (CLI, editor extension, and web) that manages project history, files, and local memory for private, on-device workflows.",
    tags: ["TypeScript", "Node", "CLI", "LLMs"],
    links: {
      github: "https://github.com/Michael1069/rubber", // TODO: replace
      live: null,
    },
    highlight: true,
  },
  {
    title: "ASCII Boot — LLaMA3 Terminal Launcher",
    description:
      "A repo that boots with a custom ASCII banner (\"Welcome to Llama3\") before launching the chat loop, with history persistence and API/local modes.",
    tags: ["Python", "Terminal", "UX"],
    links: {
      github: "https://github.com/Michael1069/ollama-llama3", // TODO: replace
      live: null,
    },
  },
  {
    title: "DBMS Lab — MySQL + JDBC Demos",
    description:
      "A set of clean, minimal examples for CRUD, pooling, and prepared statements using Java + JDBC with MySQL.",
    tags: ["Java", "MySQL", "JDBC"],
    links: {
      github: "https://github.com/Michael1069/dbms-jdbc-demo", // TODO: replace
      live: null,
    },
  },
  {
    title: "AVS Edge — Voice Assistant on Embedded",
    description:
      "Prototype integrating Alexa Voice Service APIs with embedded hardware for wake-word capture, intents, and offline fallbacks.",
    tags: ["C/Embedded", "AVS", "Edge"],
    links: {
      github: "https://github.com/Michael1069/avs-edge-proto", // TODO: replace
      live: null,
    },
  },
];

const experiences = [
  {
    role: "Aspiring Full‑Stack Developer (Freelance Path)",
    org: "Independent",
    date: "2025 — Present",
    bullets: [
      "Building portfolio of practical, shipped projects.",
      "Focusing on clean architecture, testing, and DX.",
      "Exploring AI‑assisted developer tooling (RUBBER).",
    ],
  },
  {
    role: "B.E. — (In Progress)",
    org: "College, Chennai",
    date: "Current",
    bullets: [
      "Coursework: DBMS, Networks, OOPS, OS, SE.",
      "Projects include JDBC demos and embedded voice assistant.",
    ],
  },
];

const socials = [
  { label: "GitHub", icon: <Github className="w-5 h-5" />, href: "https://github.com/Michael1069" },
  { label: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/michael-naveen-m-68a548320/" },
  { label: "Email", icon: <Mail className="w-5 h-5" />, href: "mailto:mikemicky05@gmail.com" },
];

export default function Portfolio() {
  const [hoveredTab, setHoveredTab] = useState(null);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="relative z-10 min-h-screen text-zinc-100 bg-transparent selection:bg-red-600/40">



      {/* HEADER */}
      {/* NAVBAR */}
      <nav className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center gap-0.5 sm:gap-2 p-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl shadow-black/50"
        >

          {/* Links */}
          <div
            className="flex items-center"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onMouseEnter={() => setHoveredTab(n.href)}
                className={`relative px-2 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm transition-colors duration-300 ${hoveredTab === n.href ? "text-black font-medium" : "text-zinc-400 hover:text-white"
                  }`}
              >
                {hoveredTab === n.href && (
                  <motion.span
                    layoutId="nav-item"
                    className="absolute inset-0 bg-white rounded-full z-[-1]"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                {n.label}
              </a>
            ))}
          </div>

          <Link 
            to="/agent" 
            className="ml-1 sm:ml-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-zinc-100 hover:bg-white text-black text-[11px] sm:text-sm font-medium transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-1.5 shrink-0"
          >
            <span className="hidden sm:inline">Try My Agent</span>
            <span className="inline sm:hidden">Agent</span>
            <Bot className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </motion.div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Spotlight Effect */}


        <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center pt-32"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Available for freelance projects
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500">Michael</span> <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500">Naveen M</span>
            </h1>

            <p className="mt-4 text-xl md:text-2xl text-zinc-400 max-w-2xl font-light leading-relaxed">
              Crafting <span className="text-zinc-100 font-medium">high-performance</span> web experiences with modern architecture and minimalist design.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-zinc-100 text-black rounded-full text-lg font-medium hover:bg-white transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                View Work
              </a>
              <a
                href="https://github.com/Michael1069"
                className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-lg font-medium hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center gap-2"
              >
                <Github className="w-5 h-5" /> GitHub
              </a>
            </div>
          </motion.div>

          {/* Scroll Indicator */}

        </div>
      </section>

      {/* ABOUT & SKILLS MASONRY */}
      <section id="about" className="py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 relative">
            {/* Scroll Anchor for Skills */}
            <div id="skills" className="absolute -top-32" />

            <h2 className="text-4xl font-bold text-white tracking-tight">About & Skills</h2>
            <p className="mt-2 text-zinc-400">Who I am and what I use.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* About Me Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-1 h-full"
            >
              <GlareHover
                width="100%"
                height="100%"
                borderRadius="1.5rem"
                background="rgba(24, 24, 27, 0.5)"
                borderColor="rgba(255, 255, 255, 0.1)"
                className="flex flex-col justify-center p-8 backdrop-blur-xl h-full min-h-[400px]"
              >
                <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  I’m a full-stack developer obsessed with
                  <span className="text-red-400 font-medium"> performance</span> and
                  <span className="text-red-400 font-medium"> design</span>.
                  Currently pursuing my B.E., I build tools that solve real problems.
                  I don't just write code; I craft experiences.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                    <GraduationCap className="w-4 h-4" /> B.E. CSE
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                    <MapPin className="w-4 h-4" /> Chennai, India
                  </div>
                </div>
              </GlareHover>
            </motion.div>

            {/* Skills Grid Column */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((s, i) => (
                <motion.div
                  key={s.group}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 + (i * 0.05) }}
                >
                  <GlareHover
                    width="100%"
                    height="100%"
                    borderRadius="1.5rem"
                    background="rgba(24, 24, 27, 0.4)"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    className="p-6 backdrop-blur-md flex flex-col justify-between group hover:border-red-500/30 transition-colors h-full"
                  >
                    <div>
                      <div className="text-xs uppercase tracking-widest text-zinc-500 mb-4 font-semibold">{s.group}</div>
                      <div className="flex flex-wrap gap-2">
                        {s.items.map((it) => (
                          <span key={it.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm text-zinc-300 group-hover:bg-white/10 transition-colors">
                            {it.icon && <span className="opacity-70">{it.icon}</span>}
                            {it.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlareHover>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* PROJECTS MASONRY */}
      <section id="projects" className="py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight">Selected Work</h2>
              <p className="mt-2 text-zinc-400">Shipped projects and experiments.</p>
            </div>
            <a
              href="https://github.com/Michael1069?tab=repositories"
              className="text-sm text-white/50 hover:text-red-400 transition-colors inline-flex items-center gap-2"
            >
              View all on GitHub <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <Masonry
            items={projects.map((p, i) => ({
              id: p.title,
              data: p,
              // Removed fixed height, letting Masonry measure content
            }))}
            renderItem={({ data: p, originalIndex }) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: originalIndex * 0.1 }}
              >
                <GlareHover
                  width="100%"
                  height="100%"
                  borderRadius="1.5rem"
                  background="rgba(24, 24, 27, 0.4)"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  className="group relative backdrop-blur-sm overflow-hidden hover:border-red-500/30 transition-all duration-500 flex flex-col p-5 sm:p-8"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        {p.links.github && (
                          <a
                            title="GitHub"
                            href={p.links.github}
                            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {p.links.live && (
                          <a
                            title="Live"
                            href={p.links.live}
                            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed flex-grow">{p.description}</p>

                    <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] sm:text-xs font-medium px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/5 border border-white/5 text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlareHover>
              </motion.div>
            )}
            ease="elastic.out"
            stagger={0.1}
          />
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-4xl font-bold text-white mb-10 tracking-tight">Journey</h2>
          <div className="space-y-6">
            {experiences.map((e, i) => (
              <motion.div
                key={e.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative pl-8 border-l border-white/10 hover:border-red-500/50 transition-colors"
              >
                <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-zinc-800 border border-zinc-600 group-hover:bg-red-500 group-hover:border-red-400 transition-colors" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                  <h3 className="text-xl font-bold text-white">{e.role}</h3>
                  <span className="text-sm font-mono text-zinc-500">{e.date}</span>
                </div>
                <div className="text-red-400 font-medium mb-4">{e.org}</div>
                <ul className="space-y-2 text-zinc-400">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 relative z-10">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] border border-white/10 bg-gradient-to-b from-zinc-900/50 to-black p-12 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let’s build something <br /> exceptional.</h2>
              <p className="text-xl text-zinc-400 mb-8 max-w-lg mx-auto">Open for freelance projects and collaborations. Drop me a line if you want to ship fast.</p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-red-500/30 hover:text-red-400 transition-all text-sm font-medium"
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative bg */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1),transparent_70%)] pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <div>
            © {year} Michael Naveen M. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Designed with ❤️</span>
          </div>
        </div>
      </footer>
    </main >
  );
}
