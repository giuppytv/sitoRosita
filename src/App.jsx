import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { siteData } from "./data";

const NAV_ITEMS = [
  ["Metodo", "#metodo"],
  ["Servizi", "#servizi"],
  ["Risultati", "#risultati"],
  ["FAQ", "#faq"],
  ["Prenota", "#prenota"],
];

const ICONS = {
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  chevron: "m9 18 6-6-6-6",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8ZM3.5 12H8l1.5-3 3 6 1.5-3h6.5",
  leaf: "M5 21c8-1 14-7 16-19C12 4 5 9 4 18c0 1 0 2 1 3Zm0 0c3-5 7-8 12-10",
  message: "M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M6 6l12 12M18 6 6 18",
  fork: "M4 3v7a3 3 0 0 0 3 3v8M7 3v18M10 3v7a3 3 0 0 1-3 3M17 3v18M17 3c2 2 3 4 3 7s-1 5-3 7",
  play: "M8 5v14l11-7-11-7Z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4",
  sparkle: "M12 2l1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2Zm7 13 .9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15Z",
  star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2 2 9.3l6.9-1L12 2Z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-15v6l4 2",
  map: "M12 22s7-5.3 7-12a7 7 0 0 0-14 0c0 6.7 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm18 3-10 7L2 7",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z",
  instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm6.5-.5h.01",
  arrow: "M7 17 17 7M8 7h9v9",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function Icon({ name, size = 22, fill = "none", className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICONS[name] || ICONS.sparkle} />
    </svg>
  );
}

function SectionTitle({ eyebrow, title, text, center = false, dark = false }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} transition={{ duration: 0.6 }} className={`mb-10 ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <p className={`mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${dark ? "border border-emerald-300/20 bg-emerald-400/10 text-emerald-300" : "border border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
        <Icon name="sparkle" size={16} /> {eyebrow}
      </p>
      <h2 className={`text-3xl font-bold tracking-tight md:text-5xl ${dark ? "text-white" : "text-slate-950"}`}>{title}</h2>
      {text && <p className={`mt-5 text-lg leading-8 ${dark ? "text-slate-300" : "text-slate-600"}`}>{text}</p>}
    </motion.div>
  );
}

function Button({ children, href = "#", variant = "primary", className = "" }) {
  const styles = {
    primary: "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 focus:ring-emerald-200",
    ghost: "bg-white/80 text-slate-900 ring-1 ring-slate-200 hover:bg-white focus:ring-slate-200",
    dark: "bg-slate-950 text-white hover:bg-slate-800 focus:ring-slate-200",
  };

  return (
    <a href={href} className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 ${styles[variant]} ${className}`}>
      {children}
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"><Icon name="leaf" /></span>
          <span>
            <span className="block text-base font-extrabold tracking-tight text-slate-950">{siteData.doctorName}</span>
            <span className="block text-xs font-medium text-slate-500">{siteData.profession}</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-semibold text-slate-600 transition hover:text-emerald-700">{label}</a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="#prenota" variant="ghost">Prenota visita</Button>
          <Button href={`https://wa.me/${siteData.whatsappNumber}?text=Ciao%2C%20vorrei%20maggiori%20informazioni%20per%20una%20consulenza%20nutrizionale.`}>WhatsApp</Button>
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-full bg-slate-100 p-3 text-slate-900 lg:hidden" aria-label="Apri menu">
          {open ? <Icon name="x" /> : <Icon name="menu" />}
        </button>
      </nav>

      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="border-t border-slate-100 bg-white px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {NAV_ITEMS.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-semibold text-slate-700 hover:bg-emerald-50">{label}</a>
            ))}
            <Button href="#prenota" className="mt-2">Prenota appuntamento</Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#d1fae5,transparent_35%),linear-gradient(135deg,#f8fafc_0%,#ecfdf5_100%)] pt-32 md:pt-40">
      <div className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="absolute -bottom-32 left-20 h-72 w-72 rounded-full bg-lime-200/50 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 lg:grid-cols-2 lg:px-8 lg:pb-28">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
            <Icon name="shield" size={17} /> {siteData.hero.badge}
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl font-extrabold tracking-tight text-slate-950 md:text-7xl">{siteData.hero.title}</motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">{siteData.hero.text}</motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#prenota">Prenota appuntamento <Icon name="calendar" size={18} /></Button>
            <Button href="#metodo" variant="ghost">Scopri il metodo <Icon name="chevron" size={18} /></Button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {siteData.hero.stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-white/70 p-4 text-center shadow-sm ring-1 ring-white">
                <p className="text-2xl font-black text-slate-950">{stat.value}</p>
                <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-2xl shadow-emerald-900/10 ring-1 ring-emerald-100">
            <div className="flex h-full items-center justify-center rounded-[2rem] bg-gradient-to-br from-emerald-100 via-white to-lime-100 p-8">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-xl">
                  <Icon name="fork" className="text-emerald-600" size={56} />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">Inserisci foto</p>
                <h3 className="mt-3 text-3xl font-black text-slate-950">Foto professionale della dottoressa</h3>
                <p className="mt-4 text-slate-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Metodo() {
  return (
    <section id="metodo" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle eyebrow="Il metodo" title="Un percorso costruito sulla persona, non sulle rinunce." text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dieta standard: ogni scelta nasce da obiettivi, salute, gusti e routine quotidiana." />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {siteData.method.map((step) => (
            <motion.div variants={fadeUp} key={step.title} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6 transition hover:-translate-y-2 hover:bg-emerald-50 hover:shadow-xl hover:shadow-emerald-900/5">
              <p className="text-sm font-black text-emerald-600">{step.number}</p>
              <h3 className="mt-5 text-xl font-black text-slate-950">{step.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Servizi() {
  return (
    <section id="servizi" className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle dark center eyebrow="Servizi" title="Consulenze nutrizionali per ogni fase della vita." text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sostituisci questi testi con le aree reali di specializzazione." />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {siteData.services.map((service) => (
            <motion.div variants={fadeUp} key={service.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition hover:-translate-y-2 hover:bg-white/[0.08]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                <Icon name={service.icon} size={28} />
              </div>
              <h3 className="text-2xl font-black">{service.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{service.text}</p>
              <a href="#prenota" className="mt-6 inline-flex items-center gap-2 font-bold text-emerald-300 hover:text-emerald-200">Prenota <Icon name="arrow" size={18} /></a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="risultati" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle center eyebrow="Risultati" title="Storie, recensioni e trasformazioni reali." text="Inserisci qui testimonianze autorizzate, recensioni Google o risultati del percorso nutrizionale." />
        <div className="grid gap-6 lg:grid-cols-3">
          {siteData.testimonials.map((review, index) => (
            <motion.div key={review.name + index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: index * 0.1 }} className="rounded-[2rem] bg-slate-50 p-7 ring-1 ring-slate-100">
              <div className="mb-5 flex gap-1 text-amber-400">
                {[...Array(5)].map((_, idx) => <Icon key={idx} name="star" size={18} fill="currentColor" />)}
              </div>
              <p className="leading-8 text-slate-700">“{review.text}”</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-emerald-100" />
                <div>
                  <p className="font-black text-slate-950">{review.name}</p>
                  <p className="text-sm text-slate-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Appointment() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "Prima visita", date: "", message: "" });

  const whatsappText = useMemo(() => {
    return encodeURIComponent(
      `Ciao ${siteData.doctorName}, vorrei prenotare un appuntamento.\n\nNome: ${form.name || "Lorem ipsum"}\nTelefono: ${form.phone || "Lorem ipsum"}\nEmail: ${form.email || "Lorem ipsum"}\nServizio: ${form.service}\nData preferita: ${form.date || "Lorem ipsum"}\nMessaggio: ${form.message || "Lorem ipsum"}`
    );
  }, [form]);

  return (
    <section id="prenota" className="relative overflow-hidden bg-emerald-50 py-24">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-200/60 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionTitle eyebrow="Appuntamenti" title="Prenota la tua consulenza." text="Compila il modulo e invia la richiesta via WhatsApp. Puoi collegarlo in futuro a Calendly, Google Calendar o a un gestionale medico." />
          <div className="space-y-4">
            {[
              ["clock", "Orari", "Lorem ipsum: Lun–Ven 09:00–19:00"],
              ["map", "Studio", `${siteData.address}, ${siteData.city}`],
              ["phone", "Telefono", siteData.phone],
              ["mail", "Email", siteData.email],
            ].map(([icon, title, text]) => (
              <div key={title} className="flex items-start gap-4 rounded-3xl bg-white p-5 shadow-sm">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700"><Icon name={icon} /></div>
                <div>
                  <p className="font-black text-slate-950">{title}</p>
                  <p className="text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[2.25rem] bg-white p-6 shadow-2xl shadow-emerald-900/10 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" placeholder="Nome e cognome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" placeholder="Telefono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <select className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
              <option>Prima visita</option>
              <option>Controllo nutrizionale</option>
              <option>Consulenza online</option>
              <option>Educazione alimentare</option>
            </select>
            <input type="date" className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 md:col-span-2" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <textarea className="min-h-36 rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 md:col-span-2" placeholder="Messaggio / esigenza principale" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={`https://wa.me/${siteData.whatsappNumber}?text=${whatsappText}`} className="w-full sm:w-auto">Invia richiesta su WhatsApp <Icon name="message" size={18} /></Button>
            <Button href={`mailto:${siteData.email}`} variant="ghost" className="w-full sm:w-auto">Invia email</Button>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">Cliccando su WhatsApp si aprirà una chat con un messaggio precompilato. Inserisci qui eventuale testo privacy/GDPR: Lorem ipsum dolor sit amet.</p>
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionTitle center eyebrow="FAQ" title="Domande frequenti" text="Rispondi in anticipo ai dubbi più comuni dei pazienti." />
        <div className="space-y-4">
          {siteData.faq.map((item) => (
            <details key={item.question} className="group rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-100 open:bg-emerald-50">
              <summary className="cursor-pointer list-none text-lg font-black text-slate-950">{item.question}</summary>
              <p className="mt-4 leading-7 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-white/10 pt-10 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500"><Icon name="leaf" /></span>
            <div>
              <p className="font-black">{siteData.doctorName}</p>
              <p className="text-sm text-slate-400">{siteData.profession}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md leading-7 text-slate-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Inserisci qui bio breve, iscrizione albo e dati professionali.</p>
        </div>
        <div>
          <p className="mb-4 font-black">Link utili</p>
          <div className="space-y-3 text-slate-400">
            <a className="block hover:text-white" href="#servizi">Servizi</a>
            <a className="block hover:text-white" href="#prenota">Prenota</a>
            <a className="block hover:text-white" href="#faq">FAQ</a>
            <a className="block hover:text-white" href="#">Privacy Policy</a>
          </div>
        </div>
        <div>
          <p className="mb-4 font-black">Contatti</p>
          <div className="space-y-3 text-slate-400">
            <p>{siteData.phone}</p>
            <p>{siteData.email}</p>
            <p>{siteData.address}</p>
            <a className="inline-flex items-center gap-2 hover:text-white" href={siteData.instagramUrl}><Icon name="instagram" size={18} /> Instagram</a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-sm text-slate-500 lg:px-8">© {new Date().getFullYear()} {siteData.doctorName}. Tutti i diritti riservati. P.IVA Lorem Ipsum • Iscrizione albo Lorem Ipsum.</p>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a href={`https://wa.me/${siteData.whatsappNumber}?text=Ciao%2C%20vorrei%20prenotare%20una%20consulenza%20nutrizionale.`} className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-900/30 transition hover:scale-110 hover:bg-emerald-600" aria-label="Contatta su WhatsApp">
      <Icon name="message" size={30} />
    </a>
  );
}

export default function App() {
  return (
    <main className="min-h-screen scroll-smooth bg-white font-sans text-slate-900">
      <Navbar />
      <Hero />
      <Metodo />
      <Servizi />
      <Results />
      <Appointment />
      <FAQ />
      <section className="bg-slate-950 px-5 py-20 text-white">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-lime-500 p-8 shadow-2xl md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">Pronta/o a iniziare il tuo percorso?</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/85">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Prenota una consulenza e scopri il percorso più adatto a te.</p>
            </div>
            <Button href="#prenota" variant="dark">Prenota ora <Icon name="calendar" size={18} /></Button>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
