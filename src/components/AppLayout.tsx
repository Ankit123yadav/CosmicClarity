import React, { useState, useEffect } from 'react';
import { Moon, Star, Sparkles, Heart, Briefcase, Coins, Users, Calendar, Phone, MessageCircle, ChevronDown, ChevronLeft, ChevronRight, Shield, Globe, HandHeart, Lock, Compass, Award, Play, Instagram, Youtube, Send, Mail, CheckCircle2, Clock, Menu, X, Loader2, AlertCircle } from 'lucide-react';
import { saveBookingToSheet } from '@/lib/googleSheets';
const LOGO_URL = 'https://d64gsuwffb70l.cloudfront.net/6a096a665111775d506ed8fa_1779003637307_b0819c21.jpeg'; // Replace with your logo URL
const HERO_BG = 'https://d64gsuwffb70l.cloudfront.net/6a096a75b04a12435b5976bd_1779002097151_5b76c9c4.png';
const TAROT_IMG = 'https://d64gsuwffb70l.cloudfront.net/6a096a75b04a12435b5976bd_1779002119074_822cb379.png';
const WHEEL_IMG = 'https://d64gsuwffb70l.cloudfront.net/6a096a75b04a12435b5976bd_1779002140632_9c7d6c9c.png';
const WHATSAPP_LINK = 'https://wa.me/917607267145?text=Hi%20Ekta%2C%20I%27d%20like%20to%20book%20a%20cosmic%20consultation';

// Price map (in INR rupees) — used by booking flow
const SERVICE_PRICES: Record<string, number> = {
  'Birth Chart Reading': 2499,
  'Tarot Card Reading': 999,
  'Love & Relationship': 1799,
  'Career & Finance': 1899,
  'Marriage Compatibility': 2999,
  'Monthly Horoscope': 1299
};

// ---------- Small UI helpers ----------
const SectionLabel: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gold-border glass-cosmic">
    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
    <span className="font-display-cosmic text-[11px] tracking-[0.25em] uppercase text-amber-200">{children}</span>
  </div>;
const Divider: React.FC = () => <div className="flex items-center justify-center my-4">
    <div className="w-12 divider-cosmic" />
    <Star className="w-3 h-3 text-amber-400 mx-3" fill="currentColor" />
    <div className="w-12 divider-cosmic" />
  </div>;

// ---------- Header ----------
const Header: React.FC<{
  onBook: () => void;
}> = ({
  onBook
}) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [{
    label: 'About',
    href: '#about'
  }, {
    label: 'Services',
    href: '#services'
  }, {
    label: 'Why Us',
    href: '#why'
  }, {
    label: 'Reviews',
    href: '#testimonials'
  }, {
    label: 'Horoscope',
    href: '#content'
  }, {
    label: 'FAQ',
    href: '#faq'
  }];
  return <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass-cosmic border-b border-amber-500/10 py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden gold-border-strong animate-glow-pulse">
            <img src={LOGO_URL} alt="Cosmic Clarity" className="w-full h-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="font-display-cosmic text-sm md:text-base text-amber-200 tracking-widest">COSMIC CLARITY</div>
            <div className="font-serif-cosmic italic text-[11px] md:text-xs text-amber-100/60">with Ekta</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map(l => <a key={l.href} href={l.href} className="text-sm font-body-cosmic text-amber-100/70 hover:text-amber-300 transition-colors tracking-wide">
              {l.label}
            </a>)}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline-gold px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <button onClick={onBook} className="btn-gold px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
            Book a Reading
          </button>
        </div>

        <button className="md:hidden text-amber-200" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && <div className="lg:hidden glass-cosmic border-t border-amber-500/10 mt-3">
          <div className="px-5 py-4 flex flex-col gap-3">
            {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-amber-100/80 py-2 font-body-cosmic">
                {l.label}
              </a>)}
            <div className="flex gap-3 pt-2">
              <a href={WHATSAPP_LINK} className="flex-1 btn-outline-gold px-4 py-2.5 rounded-full text-sm text-center">WhatsApp</a>
              <button onClick={() => {
            setOpen(false);
            onBook();
          }} className="flex-1 btn-gold px-4 py-2.5 rounded-full text-sm font-semibold">Book Now</button>
            </div>
          </div>
        </div>}
    </header>;
};

// ---------- Hero ----------
const Hero: React.FC<{
  onBook: () => void;
}> = ({
  onBook
}) => <section id="top" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0">
      <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0618]/40 via-[#1A0E2E]/70 to-[#050210]" />
    </div>
    <div className="absolute inset-0 stars-bg opacity-70" />

    {/* twinkling stars */}
    {[...Array(20)].map((_, i) => <div key={i} className="absolute animate-twinkle" style={{
    top: `${Math.random() * 90}%`,
    left: `${Math.random() * 95}%`,
    animationDelay: `${Math.random() * 3}s`
  }}>
        <div className="w-1 h-1 bg-amber-200 rounded-full shadow-[0_0_8px_2px_rgba(244,212,124,0.6)]" />
      </div>)}

    <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center w-full">
      <div className="text-center lg:text-left animate-fade-up">
        <div className="flex justify-center lg:justify-start mb-6">
          <SectionLabel>Trusted by 12,000+ Seekers</SectionLabel>
        </div>

        <h1 className="font-serif-cosmic text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white mb-6">
          Unlock <span className="gold-gradient-text italic">Clarity</span><br />
          Through the<br />
          <span className="gold-gradient-text">Stars & Tarot</span>
        </h1>

        <p className="font-body-cosmic text-base md:text-lg text-amber-100/70 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
          Ancient wisdom for modern decisions. Personalized astrology and tarot consultations with Ekta —
          for clarity in love, career, finances, and your soul's journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
          <button onClick={onBook} className="btn-gold px-8 py-4 rounded-full font-semibold tracking-wide flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" /> Book a Reading
          </button>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline-gold px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" /> Talk to Ekta
          </a>
        </div>

        {/* trust strip */}
        <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" />)}
            </div>
            <span className="text-sm text-amber-100/70">4.9/5 • 2,400+ reviews</span>
          </div>
          <div className="h-4 w-px bg-amber-500/20 hidden sm:block" />
          <div className="flex items-center gap-2 text-sm text-amber-100/70">
            <Shield className="w-4 h-4 text-amber-300" /> 100% Confidential
          </div>
        </div>
      </div>

      {/* Right: Logo / cosmic visual */}
      <div className="relative flex justify-center items-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[110%] h-[110%] rounded-full bg-gradient-to-br from-purple-700/30 via-indigo-900/20 to-transparent blur-3xl" />
        </div>
        <div className="absolute w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full border border-amber-500/20 animate-spin-slow" />
        <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-amber-500/10 animate-spin-slow" style={{
        animationDirection: 'reverse'
      }} />

        <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden gold-border-strong animate-glow-pulse">
          <img src="https://d64gsuwffb70l.cloudfront.net/6a096a665111775d506ed8fa_1779003637307_b0819c21.jpeg" alt="Cosmic Clarity with Ekta" className="w-full h-full object-cover" />
        </div>

        {/* floating moon */}
        <div className="absolute -top-4 -right-2 md:top-0 md:right-4 animate-float-slow">
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full glass-cosmic gold-border flex items-center justify-center">
            <Moon className="w-7 h-7 md:w-10 md:h-10 text-amber-300" />
          </div>
        </div>
        <div className="absolute -bottom-2 -left-2 md:bottom-4 md:left-0 animate-float-slow" style={{
        animationDelay: '2s'
      }}>
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full glass-cosmic gold-border flex items-center justify-center">
            <Sparkles className="w-7 h-7 md:w-10 md:h-10 text-amber-300" />
          </div>
        </div>
      </div>
    </div>

    {/* scroll cue */}
    <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-300/60 hover:text-amber-300 transition-colors">
      <ChevronDown className="w-6 h-6 animate-bounce" />
    </a>
  </section>;

// ---------- Stats Strip ----------
const Stats: React.FC = () => {
  const stats = [{
    v: '12K+',
    l: 'Seekers Guided'
  }, {
    v: '8+ Yrs',
    l: 'Of Experience'
  }, {
    v: '50K+',
    l: 'YouTube Family'
  }, {
    v: '4.9★',
    l: 'Rated Sessions'
  }];
  return <section className="relative py-12 border-y border-amber-500/10">
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => <div key={i} className="text-center">
            <div className="font-serif-cosmic text-3xl md:text-4xl gold-gradient-text mb-1">{s.v}</div>
            <div className="text-xs md:text-sm tracking-widest uppercase text-amber-100/60 font-display-cosmic">{s.l}</div>
          </div>)}
      </div>
    </section>;
};

// ---------- About ----------
const About: React.FC<{
  onBook: () => void;
}> = ({
  onBook
}) => {
  const expertise = [{
    icon: Star,
    t: 'Vedic Astrology'
  }, {
    icon: Sparkles,
    t: 'Intuitive Tarot'
  }, {
    icon: Heart,
    t: 'Relationship Healing'
  }, {
    icon: Compass,
    t: 'Life Path Guidance'
  }, {
    icon: HandHeart,
    t: 'Energy Healing'
  }, {
    icon: Moon,
    t: 'Moon Cycle Work'
  }];
  return <section id="about" className="relative py-24 md:py-32">
      <div className="absolute inset-0 stars-bg opacity-40" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[90%] h-[90%] rounded-full bg-gradient-to-br from-purple-700/20 to-amber-500/10 blur-3xl" />
          </div>
          <div className="relative rounded-3xl overflow-hidden gold-border-strong">
            <img src={WHEEL_IMG} alt="Zodiac wheel" className="w-full aspect-square object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0618] via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-6 -right-4 md:-right-6 glass-cosmic gold-border rounded-2xl px-5 py-4 backdrop-blur-lg">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-300" />
              <div>
                <div className="font-display-cosmic text-xs text-amber-200 tracking-widest">CERTIFIED</div>
                <div className="font-serif-cosmic text-sm text-white">Tarot & Astrology Practitioner</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>About Ekta</SectionLabel>
          <h2 className="font-serif-cosmic text-4xl md:text-5xl text-white mt-5 mb-6 leading-tight">
            A gentle guide between you and the <span className="gold-gradient-text italic">cosmos</span>
          </h2>
          <p className="font-body-cosmic text-amber-100/70 text-base md:text-lg leading-relaxed mb-5">
            For over <span className="text-amber-300">8 years</span>, Ekta has helped seekers across India and the world
            find clarity in their most tender moments — heartbreak, career crossroads, family struggles, and the quiet
            search for purpose.
          </p>
          <p className="font-body-cosmic text-amber-100/70 text-base leading-relaxed mb-8">
            Her readings blend Vedic astrology, intuitive tarot, and gentle energy work — never fear-based,
            always rooted in empathy and practical guidance you can actually use.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {expertise.map((e, i) => {
            const Icon = e.icon;
            return <div key={i} className="glass-cosmic gold-border rounded-xl px-3 py-3 flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-amber-100/80 font-body-cosmic">{e.t}</span>
                </div>;
          })}
          </div>

          <button onClick={onBook} className="btn-gold px-7 py-3.5 rounded-full font-semibold tracking-wide flex items-center gap-2">
            Begin Your Journey <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>;
};

// ---------- Services ----------
type Service = {
  icon: any;
  title: string;
  desc: string;
  duration: string;
  price: string;
  popular?: boolean;
};
const Services: React.FC<{
  onBook: (s?: string) => void;
}> = ({
  onBook
}) => {
  const services: Service[] = [{
    icon: Star,
    title: 'Birth Chart Reading',
    desc: 'A deep dive into your natal chart — personality, karma, life purpose & cosmic blueprint.',
    duration: '60 min',
    price: '₹2,100'
  }, {
    icon: Sparkles,
    title: 'Tarot Card Reading',
    desc: 'Receive clear, intuitive guidance on a specific question or area of life through the cards.',
    duration: '30 min',
    price: '₹1,100',
    popular: true
  }, {
    icon: Heart,
    title: 'Love & Relationship',
    desc: 'Clarity on soulmates, breakups, reconciliation & emotional patterns blocking love.',
    duration: '45 min',
    price: '₹1,100'
  }, {
    icon: Briefcase,
    title: 'Career & Finance',
    desc: 'Timing, decisions, opportunities — astrological guidance on your professional path.',
    duration: '45 min',
    price: '₹1,100'
  }, {
    icon: Users,
    title: 'Marriage Compatibility',
    desc: 'Detailed kundli matching with modern, compassionate analysis — beyond just gunas.',
    duration: '60 min',
    price: '₹2,100'
  }, {
    icon: Moon,
    title: 'Spritual Guidance ',
    desc: 'A personalized month-ahead forecast with rituals, remedies & energy guidance.',
    duration: '30 min',
    price: '₹2,100'
  }];
  return <section id="services" className="relative py-24 md:py-32">
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Sacred Offerings</SectionLabel>
          <h2 className="font-serif-cosmic text-4xl md:text-5xl text-white mt-5 mb-4">
            Personalized <span className="gold-gradient-text italic">Consultations</span>
          </h2>
          <Divider />
          <p className="font-body-cosmic text-amber-100/70 text-base md:text-lg">
            Choose the reading that resonates with where you are right now. Every session is 1-on-1, recorded for you, and held with deep care.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
          const Icon = s.icon;
          return <div key={i} className="service-card relative rounded-2xl p-7 group">
                {s.popular && <div className="absolute -top-3 right-6 btn-gold px-3 py-1 rounded-full text-[10px] font-bold tracking-widest">
                    MOST LOVED
                  </div>}
                <div className="w-14 h-14 rounded-full glass-cosmic gold-border-strong flex items-center justify-center mb-5 group-hover:animate-glow-pulse">
                  <Icon className="w-6 h-6 text-amber-300" />
                </div>
                <h3 className="font-serif-cosmic text-2xl text-white mb-3">{s.title}</h3>
                <p className="font-body-cosmic text-sm text-amber-100/65 leading-relaxed mb-6 min-h-[64px]">{s.desc}</p>
                <div className="flex items-center justify-between mb-5 pb-5 border-b border-amber-500/15">
                  <div className="flex items-center gap-2 text-amber-100/60 text-sm">
                    <Clock className="w-4 h-4" /> {s.duration}
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest text-amber-100/50">Starting</div>
                    <div className="font-serif-cosmic text-xl gold-gradient-text">{s.price}</div>
                  </div>
                </div>
                <button onClick={() => onBook(s.title)} className="w-full btn-outline-gold px-5 py-3 rounded-full text-sm font-medium tracking-wide group-hover:btn-gold transition-all">
                  Book This Reading
                </button>
              </div>;
        })}
        </div>

        <div className="text-center mt-12">
          <p className="text-amber-100/50 text-sm font-body-cosmic">
            <Clock className="inline w-4 h-4 mr-1 text-amber-400" /> Limited slots available daily • Booking details saved to the sheet on submit
          </p>
        </div>
      </div>
    </section>;
};

// ---------- Why Choose Us ----------
const WhyUs: React.FC = () => {
  const features = [{
    icon: HandHeart,
    t: 'Personalized Sessions',
    d: 'Every reading is unique to your chart, energy and questions — never templated.'
  }, {
    icon: Lock,
    t: 'Complete Confidentiality',
    d: 'Your story, your secrets, your healing — held with absolute privacy.'
  }, {
    icon: Compass,
    t: 'Practical Guidance',
    d: 'No vague predictions. Real steps, timings and clarity you can act on today.'
  }, {
    icon: Heart,
    t: 'Non-Judgmental Space',
    d: 'Whatever you bring — heartbreak, confusion, fear — you are safe here.'
  }, {
    icon: Sparkles,
    t: 'Modern Spiritual Approach',
    d: 'Ancient wisdom translated for modern lives, careers and relationships.'
  }, {
    icon: Globe,
    t: 'Online Worldwide',
    d: 'Consultations on Zoom, Google Meet or WhatsApp — wherever you are.'
  }];
  return <section id="why" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Why Cosmic Clarity</SectionLabel>
          <h2 className="font-serif-cosmic text-4xl md:text-5xl text-white mt-5 mb-4">
            A space that feels like <span className="gold-gradient-text italic">home</span>
          </h2>
          <Divider />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
          const Icon = f.icon;
          return <div key={i} className="glass-cosmic gold-border rounded-2xl p-7 hover:border-amber-400/40 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-700/20 gold-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-amber-300" />
                </div>
                <h3 className="font-serif-cosmic text-xl text-white mb-2">{f.t}</h3>
                <p className="text-sm text-amber-100/65 font-body-cosmic leading-relaxed">{f.d}</p>
              </div>;
        })}
        </div>
      </div>
    </section>;
};

// ---------- Testimonials ----------
const Testimonials: React.FC = () => {
  const items = [{
    name: 'Priya Sharma',
    city: 'Mumbai',
    text: 'Ekta\'s tarot reading helped me see the truth about a relationship I was holding onto. I cried, I healed, I moved on. Six months later — I\'m the happiest I\'ve ever been.',
    tag: 'Relationship Clarity'
  }, {
    name: 'Rahul Mehta',
    city: 'Bangalore',
    text: 'I was stuck between two job offers. Ekta\'s career reading was practical, not mystical fluff. I chose the right one — and got promoted within a year.',
    tag: 'Career Breakthrough'
  }, {
    name: 'Ananya Iyer',
    city: 'Delhi NCR',
    text: 'After my divorce, I felt completely lost. Her birth chart reading reminded me who I really am. It was healing in the truest sense.',
    tag: 'Emotional Healing'
  }, {
    name: 'Vikram Singh',
    city: 'Pune',
    text: 'I was skeptical. But Ekta predicted things about my finances with scary accuracy — without ever sounding scary. Calm, grounded, genuinely gifted.',
    tag: 'Financial Guidance'
  }, {
    name: 'Neha Kapoor',
    city: 'Gurgaon',
    text: 'My marriage compatibility session changed how I see my partner. We\'re communicating better than in 7 years of marriage.',
    tag: 'Marriage Insight'
  }, {
    name: 'Aditya Rao',
    city: 'Hyderabad',
    text: 'The monthly horoscope guidance is like having a wise friend who actually knows what\'s coming. I plan my month around her insights now.',
    tag: 'Monthly Guidance'
  }];
  const [idx, setIdx] = useState(0);
  const visible = 3;
  const next = () => setIdx((idx + 1) % items.length);
  const prev = () => setIdx((idx - 1 + items.length) % items.length);
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  });
  const shown = [0, 1, 2].map(i => items[(idx + i) % items.length]);
  return <section id="testimonials" className="relative py-24 md:py-32">
      <div className="absolute inset-0 stars-bg opacity-40" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Stories of Clarity</SectionLabel>
          <h2 className="font-serif-cosmic text-4xl md:text-5xl text-white mt-5 mb-4">
            Words from <span className="gold-gradient-text italic">souls</span> we've held
          </h2>
          <Divider />
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {shown.map((t, i) => <div key={`${idx}-${i}`} className="glass-cosmic gold-border rounded-2xl p-7 animate-fade-up" style={{
          animationDelay: `${i * 0.1}s`
        }}>
              <div className="flex mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400" fill="currentColor" />)}
              </div>
              <p className="font-serif-cosmic text-lg text-amber-50/90 leading-relaxed italic mb-6" data-mixed-content="true">
                "{t.text}"
              </p>
              <div className="pt-5 border-t border-amber-500/15 flex items-center justify-between">
                <div>
                  <div className="font-display-cosmic text-sm text-amber-200 tracking-wide">{t.name}</div>
                  <div className="text-xs text-amber-100/50">{t.city}</div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-amber-300/70 font-display-cosmic">{t.tag}</span>
              </div>
            </div>)}
        </div>

        <div className="flex justify-center gap-3 mt-10">
          <button onClick={prev} aria-label="Previous" className="w-11 h-11 rounded-full btn-outline-gold flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} aria-label="Next" className="w-11 h-11 rounded-full btn-outline-gold flex items-center justify-center">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>;
};

// ---------- Horoscope / Content ----------
const ContentHub: React.FC = () => {
  const cards = [{
    icon: Star,
    tag: 'Daily',
    t: 'Today\'s Horoscope',
    d: 'A short cosmic note for each sign — refreshed every morning at sunrise.'
  }, {
    icon: Sparkles,
    tag: 'Weekly',
    t: 'Weekly Tarot Pull',
    d: 'Three-card guidance for the week ahead, with rituals and reflections.'
  }, {
    icon: Compass,
    tag: 'Insights',
    t: 'Zodiac Deep Dives',
    d: 'Understand your moon sign, rising and karmic placements like never before.'
  }, {
    icon: Moon,
    tag: 'Moon Cycle',
    t: 'New & Full Moon',
    d: 'Energy updates, intention rituals and release ceremonies for each lunation.'
  }, {
    icon: Heart,
    tag: 'Healing',
    t: 'Spiritual Blogs',
    d: 'Honest essays on love, grief, manifestation and the soul\'s seasons.'
  }, {
    icon: HandHeart,
    tag: 'Practice',
    t: 'Affirmation Library',
    d: 'Daily affirmations aligned with the planets and your chart.'
  }];
  return <section id="content" className="relative py-24 md:py-32">
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Free Wisdom</SectionLabel>
          <h2 className="font-serif-cosmic text-4xl md:text-5xl text-white mt-5 mb-4">
            Daily <span className="gold-gradient-text italic">cosmic</span> companions
          </h2>
          <Divider />
          <p className="text-amber-100/70 font-body-cosmic">Bite-sized spiritual nourishment, free for everyone in our circle.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => {
          const Icon = c.icon;
          return <a href="#newsletter" key={i} className="service-card rounded-2xl p-7 block group">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl glass-cosmic gold-border flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-300/80 font-display-cosmic px-3 py-1 rounded-full gold-border">
                    {c.tag}
                  </span>
                </div>
                <h3 className="font-serif-cosmic text-xl text-white mb-2">{c.t}</h3>
                <p className="text-sm text-amber-100/65 leading-relaxed">{c.d}</p>
                <div className="mt-5 text-amber-300 text-sm font-medium tracking-wide flex items-center gap-1.5 group-hover:gap-3 transition-all">
                  Explore <ChevronRight className="w-4 h-4" />
                </div>
              </a>;
        })}
        </div>
      </div>
    </section>;
};

// ---------- Social Proof ----------
// const SocialProof: React.FC = () => <section className="relative py-24 md:py-32">
//     <div className="absolute inset-0 stars-bg opacity-30" />
//     <div className="relative max-w-7xl mx-auto px-5 md:px-8">
//       <div className="text-center max-w-2xl mx-auto mb-14">
//         <SectionLabel>Join the Circle</SectionLabel>
//         <h2 className="font-serif-cosmic text-4xl md:text-5xl text-white mt-5 mb-4">
//           A community of <span className="gold-gradient-text italic">seekers</span>
//         </h2>
//         <Divider />
//       </div>

//       <div className="grid lg:grid-cols-3 gap-5 mb-10">
//         {/* Youtube embed area */}
//         <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="lg:col-span-2 service-card rounded-2xl p-2 block group relative overflow-hidden">
//           <div className="relative rounded-xl overflow-hidden aspect-video">
//             <img src={HERO_BG} alt="YouTube preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
//             <div className="absolute inset-0 bg-gradient-to-t from-[#0A0618] via-[#0A0618]/30 to-transparent" />
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-20 h-20 rounded-full btn-gold flex items-center justify-center animate-glow-pulse">
//                 <Play className="w-8 h-8 ml-1" fill="currentColor" />
//               </div>
//             </div>
//             <div className="absolute bottom-5 left-5 right-5">
//               <div className="flex items-center gap-2 mb-2">
//                 <Youtube className="w-5 h-5 text-red-400" />
//                 <span className="text-xs uppercase tracking-widest text-amber-200 font-display-cosmic">50K Subscribers</span>
//               </div>
//               <div className="font-serif-cosmic text-xl md:text-2xl text-white">Weekly readings, monthly forecasts & guided meditations</div>
//             </div>
//           </div>
//         </a>

//         <div className="flex flex-col gap-5">
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="service-card rounded-2xl p-6 flex-1 flex flex-col justify-between">
//             <div className="flex items-center gap-3 mb-4">
//               <Instagram className="w-6 h-6 text-pink-300" />
//               <div>
//                 <div className="font-display-cosmic text-xs tracking-widest text-amber-200">INSTAGRAM</div>
//                 <div className="font-serif-cosmic text-xl text-white">30K followers</div>
//               </div>
//             </div>
//             <p className="text-sm text-amber-100/60 mb-4">Daily reels, tarot pulls & moon energy updates.</p>
//             <span className="btn-outline-gold px-4 py-2 rounded-full text-sm text-center">Follow @cosmicclarity</span>
//           </a>

//           <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="service-card rounded-2xl p-6 flex-1 flex flex-col justify-between">
//             <div className="flex items-center gap-3 mb-4">
//               <Send className="w-6 h-6 text-emerald-300" />
//               <div>
//                 <div className="font-display-cosmic text-xs tracking-widest text-amber-200">TELEGRAM / WHATSAPP</div>
//                 <div className="font-serif-cosmic text-xl text-white">Free Circle</div>
//               </div>
//             </div>
//             <p className="text-sm text-amber-100/60 mb-4">Weekly forecasts, exclusive offers & live sessions.</p>
//             <span className="btn-outline-gold px-4 py-2 rounded-full text-sm text-center">Join Free Community</span>
//           </a>
//         </div>
//       </div>
//     </div>
//   </section>;

const SocialProof: React.FC = () => <section className="relative py-24 md:py-32">
    <div className="absolute inset-0 stars-bg opacity-30" />
    <div className="relative max-w-7xl mx-auto px-5 md:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <SectionLabel>Join the Circle</SectionLabel>
        <h2 className="font-serif-cosmic text-4xl md:text-5xl text-white mt-5 mb-4">
          A community of <span className="gold-gradient-text italic">seekers</span>
        </h2>
        <Divider />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* YouTube card */}
        <a href="https://youtube.com/@cosmicclaritywithekta" target="_blank" rel="noopener noreferrer" className="service-card rounded-2xl p-6 flex flex-col justify-between group">
          <div className="flex items-center gap-3 mb-4">
            <Youtube className="w-6 h-6 text-red-400" />
            <div>
              <div className="font-display-cosmic text-xs tracking-widest text-amber-200">YOUTUBE</div>
              <div className="font-serif-cosmic text-xl text-white">@cosmicclaritywithekta</div>
            </div>
          </div>
          <p className="text-sm text-amber-100/60 mb-4">Weekly readings, monthly forecasts & guided meditations.</p>
          <span className="btn-outline-gold px-4 py-2 rounded-full text-sm text-center inline-flex items-center justify-center gap-2">
            <Play className="w-3.5 h-3.5" fill="currentColor" /> Subscribe on YouTube
          </span>
        </a>

        {/* Instagram card */}
        <a href="https://www.instagram.com/cosmicclaritywithekta2026/" target="_blank" rel="noopener noreferrer" className="service-card rounded-2xl p-6 flex flex-col justify-between group">
          <div className="flex items-center gap-3 mb-4">
            <Instagram className="w-6 h-6 text-pink-300" />
            <div>
              <div className="font-display-cosmic text-xs tracking-widest text-amber-200">INSTAGRAM</div>
              <div className="font-serif-cosmic text-xl text-white">@cosmicclaritywithekta2026</div>
            </div>
          </div>
          <p className="text-sm text-amber-100/60 mb-4">Daily reels, tarot pulls & moon energy updates.</p>
          <span className="btn-outline-gold px-4 py-2 rounded-full text-sm text-center">Follow on Instagram</span>
        </a>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* WhatsApp community card */}
        <a href="https://chat.whatsapp.com/Fie37CpTHMWKuJIejPRSgX" target="_blank" rel="noopener noreferrer" className="service-card rounded-2xl p-6 flex flex-col justify-between group">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-6 h-6 text-emerald-300" />
            <div>
              <div className="font-display-cosmic text-xs tracking-widest text-amber-200">WHATSAPP COMMUNITY</div>
              <div className="font-serif-cosmic text-xl text-white">Join the Free Circle</div>
            </div>
          </div>
          <p className="text-sm text-amber-100/60 mb-4">Weekly forecasts, exclusive offers & live sessions.</p>
          <span className="btn-outline-gold px-4 py-2 rounded-full text-sm text-center inline-flex items-center justify-center gap-2">
            <MessageCircle className="w-3.5 h-3.5" /> Join WhatsApp Community
          </span>
        </a>

        {/* Telegram community card */}
        <a href="https://t.me/+30brl-Mst7g5NDBl" target="_blank" rel="noopener noreferrer" className="service-card rounded-2xl p-6 flex flex-col justify-between group">
          <div className="flex items-center gap-3 mb-4">
            <Send className="w-6 h-6 text-sky-300" />
            <div>
              <div className="font-display-cosmic text-xs tracking-widest text-amber-200">TELEGRAM COMMUNITY</div>
              <div className="font-serif-cosmic text-xl text-white">Cosmic Clarity Telegram</div>
            </div>
          </div>
          <p className="text-sm text-amber-100/60 mb-4">Daily cosmic notes, polls & instant updates from Ekta.</p>
          <span className="btn-outline-gold px-4 py-2 rounded-full text-sm text-center inline-flex items-center justify-center gap-2">
            <Send className="w-3.5 h-3.5" /> Join Telegram Community
          </span>
        </a>
      </div>
    </div>
  </section>;


// ---------- FAQ ----------
const FAQ: React.FC = () => {
  const faqs = [{
    q: 'Is tarot reading really accurate?',
    a: 'Tarot is a tool for reflection and clarity, not fortune-telling. When read intuitively, it reveals patterns, possibilities and the energy around your question with remarkable precision — but you always hold free will.'
  }, {
    q: 'How does an astrology consultation work?',
    a: 'You share your birth date, time and place. Ekta studies your chart in advance, then meets you live on Zoom or WhatsApp video to walk you through it, answer questions, and offer practical guidance.'
  }, {
    q: 'Are online readings as effective as in-person?',
    a: 'Absolutely. Energy is not bound by location. Hundreds of clients across India, the US, UK and UAE receive deep, accurate readings online every month.'
  }, {
    q: 'What details do I need to share?',
    a: 'For astrology: birth date, exact time and city. For tarot: just your question and an open heart. For relationship readings, your partner\'s details help but aren\'t mandatory.'
  }, {
    q: 'Are consultations confidential?',
    a: 'Always. Nothing you share leaves the session. Your story, vulnerabilities and questions are held with complete privacy.'
  }, {
    q: 'Do you offer remedies or are they expensive?',
    a: 'Yes — but only simple, ethical remedies like mantras, lifestyle shifts, gemstone suggestions (optional) and energy practices. We never push expensive rituals or pujas.'
  }, {
    q: 'Can I reschedule or get a refund?',
    a: 'Sessions can be rescheduled up to 12 hours in advance. Refunds are offered if cancelled at least 24 hours before the session.'
  }];
  const [open, setOpen] = useState<number | null>(0);
  return <section id="faq" className="relative py-24 md:py-32">
      <div className="relative max-w-3xl mx-auto px-5 md:px-8">
        <div className="text-center mb-14">
          <SectionLabel>Gentle Answers</SectionLabel>
          <h2 className="font-serif-cosmic text-4xl md:text-5xl text-white mt-5 mb-4">
            Questions, <span className="gold-gradient-text italic">answered</span>
          </h2>
          <Divider />
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => <div key={i} className="glass-cosmic gold-border rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left">
                <span className="font-serif-cosmic text-lg md:text-xl text-white pr-4">{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-amber-300 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && <div className="px-6 pb-5 -mt-1">
                  <div className="divider-cosmic mb-4" />
                  <p className="text-amber-100/70 font-body-cosmic leading-relaxed">{f.a}</p>
                </div>}
            </div>)}
        </div>
      </div>
    </section>;
};

// ---------- Final CTA + Newsletter ----------
const FinalCTA: React.FC<{
  onBook: () => void;
}> = ({
  onBook
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'err'>('idle');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('err');
      return;
    }
    setStatus('loading');
    try {
      await fetch('https://famous.ai/api/crm/6a096a75b04a12435b5976bd/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          source: 'cosmic-clarity-newsletter',
          tags: ['newsletter', 'horoscope', 'cosmic-clarity']
        })
      });
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('err');
    }
  };
  return <section id="newsletter" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src={TAROT_IMG} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0618]/80 via-[#1A0E2E]/90 to-[#050210]" />
      </div>
      <div className="absolute inset-0 stars-bg opacity-60" />

      <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
        <Moon className="w-12 h-12 text-amber-300 mx-auto mb-6 animate-float-slow" />
        <h2 className="font-serif-cosmic text-4xl md:text-6xl text-white leading-tight mb-6">
          Your answers may already be<br />
          <span className="gold-gradient-text italic">written in the stars.</span>
        </h2>
        <p className="text-amber-100/70 text-lg font-body-cosmic mb-10 max-w-xl mx-auto">
          Let's read them together — gently, honestly, and with all the clarity you deserve.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <button onClick={onBook} className="btn-gold px-8 py-4 rounded-full font-semibold tracking-wide flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" /> Book Consultation
          </button>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline-gold px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" /> Connect on WhatsApp
          </a>
        </div>

        <div className="glass-cosmic gold-border rounded-2xl p-7 max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail className="w-4 h-4 text-amber-300" />
            <span className="font-display-cosmic text-xs tracking-widest text-amber-200">FREE WEEKLY HOROSCOPE</span>
          </div>
          <h3 className="font-serif-cosmic text-2xl text-white mb-2">Cosmic letters in your inbox</h3>
          <p className="text-sm text-amber-100/60 mb-5">Weekly forecasts, tarot pulls and moon rituals — free, forever.</p>

          {status === 'done' ? <div className="flex items-center justify-center gap-2 text-emerald-300 py-3">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-body-cosmic">You're in the circle. Welcome, beautiful soul.</span>
            </div> : <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
              <input type="email" value={email} onChange={e => {
            setEmail(e.target.value);
            setStatus('idle');
          }} placeholder="your@email.com" className="flex-1 px-5 py-3 rounded-full bg-[#0A0618]/60 gold-border text-white placeholder-amber-100/40 outline-none focus:border-amber-400" />
              <button type="submit" disabled={status === 'loading'} className="btn-gold px-6 py-3 rounded-full font-semibold tracking-wide">
                {status === 'loading' ? 'Sending…' : 'Subscribe'}
              </button>
            </form>}
          {status === 'err' && <p className="text-rose-300 text-xs mt-2">Please enter a valid email.</p>}
        </div>
      </div>
    </section>;
};

// ---------- Footer ----------
const Footer: React.FC = () => <footer className="relative border-t border-amber-500/10 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-5 md:px-8">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full overflow-hidden gold-border-strong">
              <img  src="./CosmicClarityLogo.jpeg" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-display-cosmic text-amber-200 tracking-widest">COSMIC CLARITY</div>
              <div className="font-serif-cosmic italic text-xs text-amber-100/60">with Ekta</div>
            </div>
          </div>
          <p className="text-sm text-amber-100/60 font-body-cosmic leading-relaxed max-w-md">
            Ancient wisdom for modern hearts. Trusted spiritual guidance through astrology,
            tarot and energy work — for love, career, healing and life's quiet questions.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-cosmic gold-border flex items-center justify-center text-amber-300 hover:text-amber-200"><Instagram className="w-4 h-4" /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-cosmic gold-border flex items-center justify-center text-amber-300 hover:text-amber-200"><Youtube className="w-4 h-4" /></a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-cosmic gold-border flex items-center justify-center text-amber-300 hover:text-amber-200"><MessageCircle className="w-4 h-4" /></a>
            <a href="mailto:hello@cosmicclarity.in" className="w-10 h-10 rounded-full glass-cosmic gold-border flex items-center justify-center text-amber-300 hover:text-amber-200"><Mail className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display-cosmic text-xs tracking-widest text-amber-200 mb-4">SERVICES</h4>
          <ul className="space-y-2.5 text-sm text-amber-100/60 font-body-cosmic">
            <li><a href="#services" className="hover:text-amber-300">Birth Chart Reading</a></li>
            <li><a href="#services" className="hover:text-amber-300">Tarot Card Reading</a></li>
            <li><a href="#services" className="hover:text-amber-300">Love & Relationship</a></li>
            <li><a href="#services" className="hover:text-amber-300">Career & Finance</a></li>
            <li><a href="#services" className="hover:text-amber-300">Marriage Compatibility</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display-cosmic text-xs tracking-widest text-amber-200 mb-4">EXPLORE</h4>
          <ul className="space-y-2.5 text-sm text-amber-100/60 font-body-cosmic">
            <li><a href="#about" className="hover:text-amber-300">About Ekta</a></li>
            <li><a href="#content" className="hover:text-amber-300">Daily Horoscope</a></li>
            <li><a href="#testimonials" className="hover:text-amber-300">Testimonials</a></li>
            <li><a href="#faq" className="hover:text-amber-300">FAQ</a></li>
            <li><a href="#newsletter" className="hover:text-amber-300">Newsletter</a></li>
          </ul>
        </div>
      </div>

      <div className="divider-cosmic mb-6" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-amber-100/40 font-body-cosmic">
        <div data-mixed-content="true">© {new Date().getFullYear()} Cosmic Clarity with Ekta. All rights reserved.</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-amber-300">Privacy</a>
          <a href="#" className="hover:text-amber-300">Terms</a>
          <a href="#" className="hover:text-amber-300">Refund Policy</a>
        </div>
      </div>
      <div className="text-center text-[10px] text-amber-100/30 mt-6 tracking-widest">
        ✦ MADE WITH LOVE & A LITTLE STARDUST ✦
      </div>
    </div>
  </footer>;

// ---------- Booking Modal ----------
const BookingModal: React.FC<{
  open: boolean;
  onClose: () => void;
  preset?: string;
}> = ({
  open,
  onClose,
  preset
}) => {
  const services = ['Birth Chart Reading', 'Tarot Card Reading', 'Love & Relationship', 'Career & Finance', 'Marriage Compatibility', 'Monthly Horoscope'];
  const slots = ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM', '7:00 PM', '9:00 PM'];
  const [step, setStep] = useState(1);
  const [service, setService] = useState(preset || services[0]);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const amount = SERVICE_PRICES[service] || 999;
  const formattedAmount = `₹${amount.toLocaleString('en-IN')}`;
  useEffect(() => {
    if (preset) setService(preset);
  }, [preset]);
  useEffect(() => {
    if (open) {
      setStep(1);
      setSubmitting(false);
      setSubmitError(null);
      setBookingId(null);
    }
  }, [open]);

  // Validation per step
  const canContinue = () => {
    if (step === 1) return !!service;
    if (step === 2) return !!date && !!slot;
    if (step === 3) return !!name.trim() && /\S+@\S+\.\S+/.test(email) && phone.trim().length >= 8;
    return true;
  };

  // Subscribe to CRM (fire-and-forget) after a successful booking submit
  const captureContact = async () => {
    try {
      await fetch('https://famous.ai/api/crm/6a096a75b04a12435b5976bd/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          name,
          source: 'booking-flow',
          tags: ['booking', service, 'cosmic-clarity']
        })
      });
    } catch {}
  };

  const submitBooking = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const sheetEndpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL as string | undefined;
      if (!sheetEndpoint) {
        throw new Error('Google Sheets endpoint is not configured. Add VITE_GOOGLE_SHEETS_WEBAPP_URL to your environment.');
      }

      const bookingRef = `BOOK-${Date.now()}`;
      await saveBookingToSheet({
        booking_ref: bookingRef,
        service,
        booking_date: date,
        booking_slot: slot,
        name,
        email,
        phone,
        amount,
        amount_currency: 'INR',
        source: 'booking-flow',
        submitted_at: new Date().toISOString()
      }, sheetEndpoint);

      setBookingId(bookingRef);
      await captureContact();
      setSubmitting(false);
      setStep(5);
    } catch (e: any) {
      setSubmitError(e?.message || 'Could not save booking. Please try again.');
      setSubmitting(false);
    }
  };
  const handlePrimary = async () => {
    if (!canContinue()) return;
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      await submitBooking();
    }
  };
  if (!open) return null;
  return <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-lg glass-cosmic gold-border-strong rounded-3xl p-7 md:p-9 cosmic-bg max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-amber-200/70 hover:text-amber-200" aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <Sparkles className="w-8 h-8 text-amber-300 mx-auto mb-3" />
          <h3 className="font-serif-cosmic text-2xl md:text-3xl text-white">
            {step === 5 ? 'Confirmed ✦' : 'Book Your Reading'}
          </h3>
          {step !== 5 && <>
              <div className="flex justify-center gap-2 mt-4">
                {[1, 2, 3, 4].map(s => <div key={s} className={`h-1 w-9 rounded-full transition-colors ${step >= s ? 'bg-amber-400' : 'bg-amber-500/20'}`} />)}
              </div>
              <div className="text-[10px] text-amber-100/60 mt-2 font-display-cosmic tracking-widest" data-mixed-content="true">
                STEP {step} OF 4 • {['SERVICE', 'DATE & TIME', 'YOUR DETAILS', 'REVIEW'][step - 1]}
              </div>
            </>}
        </div>

        {step === 1 && <div>
            <label className="block text-sm text-amber-200 mb-3 font-display-cosmic tracking-widest">SELECT SERVICE</label>
            <div className="grid grid-cols-2 gap-2">
              {services.map(s => <button key={s} onClick={() => setService(s)} className={`p-3 rounded-xl text-xs text-left border transition-all ${service === s ? 'border-amber-400 bg-amber-500/10 text-amber-100' : 'border-amber-500/20 text-amber-100/60 hover:border-amber-400/50'}`}>
                  <div className="font-medium">{s}</div>
                  <div className="text-[10px] text-amber-300/80 mt-1" data-mixed-content="true">₹{SERVICE_PRICES[s]?.toLocaleString('en-IN')}</div>
                </button>)}
            </div>
          </div>}

        {step === 2 && <div className="space-y-5">
            <div>
              <label className="block text-sm text-amber-200 mb-2 font-display-cosmic tracking-widest">CHOOSE DATE</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 rounded-xl bg-[#0A0618]/60 gold-border text-white outline-none focus:border-amber-400" />
            </div>
            <div>
              <label className="block text-sm text-amber-200 mb-2 font-display-cosmic tracking-widest">PICK A SLOT</label>
              <div className="grid grid-cols-3 gap-2">
                {slots.map(s => <button key={s} onClick={() => setSlot(s)} className={`py-2.5 rounded-lg text-sm border transition-all ${slot === s ? 'border-amber-400 bg-amber-500/10 text-amber-100' : 'border-amber-500/20 text-amber-100/60 hover:border-amber-400/50'}`}>
                    {s}
                  </button>)}
              </div>
              <p className="text-xs text-amber-100/50 mt-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Limited slots available daily
              </p>
            </div>
          </div>}

        {step === 3 && <div className="space-y-4">
            <div>
              <label className="block text-xs text-amber-200 mb-2 font-display-cosmic tracking-widest">YOUR NAME</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full px-4 py-3 rounded-xl bg-[#0A0618]/60 gold-border text-white placeholder-amber-100/30 outline-none focus:border-amber-400" />
            </div>
            <div>
              <label className="block text-xs text-amber-200 mb-2 font-display-cosmic tracking-widest">EMAIL</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl bg-[#0A0618]/60 gold-border text-white placeholder-amber-100/30 outline-none focus:border-amber-400" />
            </div>
            <div>
              <label className="block text-xs text-amber-200 mb-2 font-display-cosmic tracking-widest">WHATSAPP NUMBER</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 ..." className="w-full px-4 py-3 rounded-xl bg-[#0A0618]/60 gold-border text-white placeholder-amber-100/30 outline-none focus:border-amber-400" />
            </div>
            <p className="text-xs text-amber-100/50 text-center">Your booking will be saved when you submit on the next step.</p>
          </div>}

        {step === 4 && <div className="space-y-5">
            <div className="glass-cosmic gold-border rounded-2xl p-5">
              <div className="font-display-cosmic text-xs tracking-widest text-amber-200 mb-4">ORDER SUMMARY</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-amber-100/80"><span>Service</span><span className="text-amber-100">{service}</span></div>
                <div className="flex justify-between text-amber-100/80"><span>Date</span><span className="text-amber-100">{date}</span></div>
                <div className="flex justify-between text-amber-100/80"><span>Slot</span><span className="text-amber-100">{slot}</span></div>
                <div className="flex justify-between text-amber-100/80"><span>Name</span><span className="text-amber-100">{name}</span></div>
                <div className="flex justify-between text-amber-100/80"><span>Email</span><span className="text-amber-100 truncate ml-2 max-w-[60%]">{email}</span></div>
                <div className="flex justify-between text-amber-100/80"><span>WhatsApp</span><span className="text-amber-100">{phone}</span></div>
              </div>
              <div className="divider-cosmic my-4" />
              <div className="flex justify-between items-baseline">
                <span className="font-display-cosmic text-xs tracking-widest text-amber-200">BOOKING AMOUNT</span>
                <span className="font-serif-cosmic text-3xl gold-gradient-text">{formattedAmount}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 glass-cosmic gold-border rounded-xl px-4 py-3">
              <Shield className="w-5 h-5 text-amber-300 flex-shrink-0" />
              <div className="text-xs text-amber-100/70">
                Your booking details will be submitted to the team we will respond as soon as possible.
              </div>
            </div>

            {submitError && <div className="flex items-start gap-2 bg-rose-950/40 border border-rose-500/30 rounded-xl px-4 py-3 text-rose-200 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>}
          </div>}

        {step === 5 && <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full btn-gold mx-auto flex items-center justify-center mb-5 animate-glow-pulse">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif-cosmic text-2xl text-white mb-2">Your booking is saved ✦</h4>
            <p className="text-amber-100/70 font-body-cosmic mb-5 text-sm">
              Your booking has been saved to the sheet. We’ll follow up on your slot and send confirmation details to your email and WhatsApp.
            </p>

            <div className="glass-cosmic gold-border rounded-xl p-4 text-left text-sm space-y-1.5 mb-6">
              <div className="flex justify-between text-amber-100/70"><span>Service</span><span className="text-amber-100">{service}</span></div>
              <div className="flex justify-between text-amber-100/70"><span>Date & Slot</span><span className="text-amber-100" data-mixed-content="true">{date} • {slot}</span></div>
              <div className="flex justify-between text-amber-100/70"><span>Amount</span><span className="text-amber-100">{formattedAmount}</span></div>
              {bookingId && <div className="flex justify-between text-amber-100/70"><span>Booking ID</span><span className="text-amber-100 text-[10px] truncate ml-2 max-w-[60%]" data-mixed-content="true">{bookingId}</span></div>}
            </div>

            <a href={`${WHATSAPP_LINK}%0A%0ABooking%3A%20${encodeURIComponent(service)}%20on%20${encodeURIComponent(date)}%20at%20${encodeURIComponent(slot)}`} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex px-6 py-3 rounded-full font-semibold tracking-wide items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Confirm on WhatsApp
            </a>
          </div>}

        {step < 5 && <div className="flex gap-3 mt-7">
            {step > 1 && !submitting && <button onClick={() => setStep(step - 1)} className="flex-1 btn-outline-gold py-3 rounded-full font-medium">Back</button>}
            <button onClick={handlePrimary} disabled={!canContinue() || submitting} className={`flex-1 btn-gold py-3 rounded-full font-semibold tracking-wide flex items-center justify-center gap-2 ${!canContinue() || submitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
              {step === 4 ? submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Send className="w-4 h-4" /> Submit Booking</> : 'Continue'}
            </button>
          </div>}
      </div>
    </div>;
};

// ---------- Floating buttons ----------
const FloatingButtons: React.FC<{
  onBook: () => void;
}> = ({
  onBook
}) => <>
    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center shadow-2xl shadow-emerald-500/40 animate-glow-pulse" aria-label="WhatsApp">
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
    <button onClick={onBook} className="fixed bottom-6 left-6 z-40 btn-gold px-5 py-3 rounded-full font-semibold tracking-wide text-sm hidden md:flex items-center gap-2 shadow-2xl">
      <Sparkles className="w-4 h-4" /> Book Now
    </button>
  </>;

// ---------- Main ----------
const AppLayout: React.FC = () => {
  const [bookOpen, setBookOpen] = useState(false);
  const [preset, setPreset] = useState<string | undefined>(undefined);
  const openBooking = (s?: string) => {
    setPreset(s);
    setBookOpen(true);
  };
  return <div className="cosmic-bg min-h-screen text-white font-body-cosmic overflow-x-hidden">
      <Header onBook={() => openBooking()} />
      <main>
        <Hero onBook={() => openBooking()} />
        <Stats />
        <About onBook={() => openBooking()} />
        <Services onBook={openBooking} />
        <WhyUs />
        <Testimonials />
        <ContentHub />
        <SocialProof />
        <FAQ />
        <FinalCTA onBook={() => openBooking()} />
      </main>
      <Footer />
      <FloatingButtons onBook={() => openBooking()} />
      <BookingModal open={bookOpen} onClose={() => setBookOpen(false)} preset={preset} />
    </div>;
};
export default AppLayout;