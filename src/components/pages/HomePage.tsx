// HPI 1.7-V
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Activity, Bed, Stethoscope, DoorOpen, ArrowRight, ShieldCheck, Clock, BarChart3, Smartphone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Canonical Data Sources ---
const RESOURCE_CATEGORIES = [
  {
    icon: Bed,
    title: 'Patient Beds',
    description: 'Monitor bed availability across all departments and units',
    color: 'accentcyan'
  },
  {
    icon: Stethoscope,
    title: 'Medical Equipment',
    description: 'Track ventilators, monitors, and diagnostic devices',
    color: 'accentcyan'
  },
  {
    icon: DoorOpen,
    title: 'Operating Rooms',
    description: 'Real-time status of surgical and procedure rooms',
    color: 'accentcyan'
  },
  {
    icon: Activity,
    title: 'Emergency Resources',
    description: 'Critical care equipment for rapid response scenarios',
    color: 'accentcyan'
  }
];

const SYSTEM_BENEFITS = [
  { text: 'Live status updates across all departments', icon: Clock },
  { text: 'Instant resource allocation notifications', icon: ShieldCheck },
  { text: 'Historical data for capacity planning', icon: BarChart3 },
  { text: 'Mobile-optimized for on-the-go access', icon: Smartphone }
];

const IMAGE_URL = "https://static.wixstatic.com/media/c2dc46_ed697cc137664c6db2f4c86ef7caf312~mv2.png?originWidth=1920&originHeight=1024";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Refs for scroll animations (Crash Prevention: These elements ALWAYS render)
  const parallaxSectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Scroll Hooks
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: parallaxSectionRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(parallaxProgress, [0, 1], ["-15%", "15%"]);
  const overlayOpacity = useTransform(parallaxProgress, [0, 0.5, 1], [0.8, 0.4, 0.8]);

  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background selection:bg-accentcyan selection:text-primary flex flex-col">
      <style>{`
        .tech-grid-light {
          background-image: linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .tech-grid-dark {
          background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
        }
        .text-stroke-cyan {
          -webkit-text-stroke: 1px #00F0FF;
          color: transparent;
        }
      `}</style>

      <Header />

      <main className="flex-grow flex flex-col w-full overflow-clip">
        
        {/* 
          SECTION 1: THE SPLIT HERO 
          Direct structural translation of the inspiration image.
          Left: Dark, Typography, CTA. Right: Full-bleed Image.
        */}
        <section className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col lg:flex-row">
          {/* Left Pane - Content */}
          <div className="w-full lg:w-1/2 bg-primary relative flex items-center justify-center p-8 md:p-16 lg:p-24 z-10 overflow-hidden">
            <div className="absolute inset-0 tech-grid-dark pointer-events-none"></div>
            
            <div className="w-full max-w-2xl relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] w-12 bg-accentcyan"></div>
                  <span className="font-paragraph text-accentcyan tracking-[0.2em] text-sm uppercase font-semibold">
                    System Online
                  </span>
                </div>
                
                <h1 className="font-heading text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] text-primary-foreground mb-8 tracking-tight">
                  OPTIMIZING<br />
                  <span className="text-stroke-cyan">CARE</span> DELIVERY
                </h1>
                
                <p className="font-paragraph text-lg md:text-xl text-primary-foreground/70 mb-12 max-w-xl leading-relaxed font-light">
                  Real-time resource intelligence for emergency response teams. Monitor bed availability, equipment status, and room allocation instantly to ensure optimal patient outcomes.
                </p>
                
                <Link to="/dashboard" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex items-center gap-4 bg-accentcyan text-primary px-8 py-4 rounded-full font-paragraph font-semibold text-lg transition-colors duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">Access Dashboard</span>
                    <div className="relative z-10 bg-primary text-accentcyan rounded-full p-2 group-hover:bg-accentcyan group-hover:text-primary transition-colors duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Pane - Image */}
          <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen bg-darkgrayoverlay overflow-hidden">
            <motion.div 
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <Image
                src={IMAGE_URL}
                alt="Modern hospital facility with advanced medical technology"
                className="w-full h-full object-cover grayscale contrast-125 mix-blend-luminosity opacity-80"
                width={1920}
              />
              {/* Gradient overlay to blend edges if needed, though split is sharp */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent lg:hidden"></div>
            </motion.div>
          </div>
        </section>

        {/* 
          SECTION 2: LIVE TICKER (Motion & Atmosphere)
          Establishes the "real-time" technical feel.
        */}
        <section className="w-full bg-accentcyan py-4 border-y border-primary/10 overflow-hidden flex items-center">
          <motion.div 
            className="flex whitespace-nowrap items-center gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <span className="font-heading text-primary text-xl uppercase tracking-widest flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  Live Telemetry Active
                </span>
                <span className="font-paragraph text-primary/70 text-lg">///</span>
                <span className="font-heading text-primary text-xl uppercase tracking-widest">Resource Tracking: Nominal</span>
                <span className="font-paragraph text-primary/70 text-lg">///</span>
                <span className="font-heading text-primary text-xl uppercase tracking-widest">Latency: &lt;12ms</span>
                <span className="font-paragraph text-primary/70 text-lg">///</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 
          SECTION 3: RESOURCE MATRIX (Sticky Layout)
          Architectural tension with a sticky left column and scrolling right column.
        */}
        <section className="relative w-full bg-background py-24 lg:py-40 px-8 md:px-16 lg:px-24 tech-grid-light">
          <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Sticky Left Column */}
            <div className="lg:col-span-4 relative">
              <div className="lg:sticky lg:top-40">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="font-heading text-5xl md:text-6xl text-primary mb-6 leading-tight">
                    Resource<br />Matrix
                  </h2>
                  <p className="font-paragraph text-lg text-primary/60 mb-8 max-w-md">
                    Comprehensive tracking across all critical hospital resources. Digitized, categorized, and monitored in real-time.
                  </p>
                  <div className="hidden lg:block w-full h-[1px] bg-primary/10 mt-12 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-accentcyan"></div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Scrolling Right Column - Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {RESOURCE_CATEGORIES.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-secondary border border-primary/10 p-10 hover:border-accentcyan transition-colors duration-500 flex flex-col h-full"
                >
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-transparent group-hover:border-accentcyan transition-colors duration-500"></div>
                  
                  <div className="mb-8 p-4 bg-background inline-block rounded-sm border border-primary/5 group-hover:bg-primary group-hover:text-accentcyan transition-colors duration-500">
                    <category.icon className="w-8 h-8 text-primary group-hover:text-accentcyan transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="font-heading text-2xl text-primary mb-4">
                    {category.title}
                  </h3>
                  
                  <p className="font-paragraph text-base text-primary/60 flex-grow">
                    {category.description}
                  </p>

                  <div className="mt-8 flex items-center text-sm font-semibold text-accentcyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span>View Status</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 
          SECTION 4: SYSTEM BENEFITS (Cinematic Parallax)
          Full-bleed image with intense parallax and overlaid data points.
        */}
        <section 
          ref={parallaxSectionRef}
          className="relative w-full h-[120vh] min-h-[800px] bg-primary overflow-clip flex items-center justify-center"
        >
          {/* Parallax Background */}
          <motion.div 
            className="absolute inset-0 w-full h-[130%]"
            style={{ y: imageY }}
          >
            <Image
              src={IMAGE_URL}
              alt="Hospital staff using real-time resource tracking dashboard"
              className="w-full h-full object-cover opacity-40 grayscale"
              width={1920}
            />
          </motion.div>
          
          {/* Dynamic Overlay */}
          <motion.div 
            className="absolute inset-0 bg-primary"
            style={{ opacity: overlayOpacity }}
          ></motion.div>

          {/* Content Container */}
          <div className="relative z-10 w-full max-w-[120rem] mx-auto px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center gap-16">
            
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-8 leading-[1.1]">
                  Accelerate<br />
                  <span className="text-accentcyan">Emergency</span><br />
                  Response
                </h2>
                <p className="font-paragraph text-xl text-primary-foreground/80 mb-10 max-w-lg font-light">
                  Eliminate delays in critical moments. Our system provides instant visibility into resource availability, enabling faster decision-making.
                </p>
              </motion.div>
            </div>

            <div className="w-full lg:w-1/2" ref={statsRef}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SYSTEM_BENEFITS.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="bg-primary-foreground/5 backdrop-blur-md border border-primary-foreground/10 p-8 hover:bg-primary-foreground/10 transition-colors"
                  >
                    <benefit.icon className="w-8 h-8 text-accentcyan mb-6" strokeWidth={1.5} />
                    <p className="font-paragraph text-base text-primary-foreground leading-relaxed">
                      {benefit.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 
          SECTION 5: CALL TO ACTION (Minimalist Focus)
          Clean, centered, high-contrast closure.
        */}
        <section className="relative w-full bg-secondary py-32 lg:py-48 px-8 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 tech-grid-light opacity-50 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="w-16 h-16 mx-auto border-2 border-accentcyan rounded-full flex items-center justify-center mb-8">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
              </div>
              
              <h2 className="font-heading text-5xl md:text-7xl text-primary mb-8 tracking-tight">
                Ready to Transform<br />Resource Management?
              </h2>
              
              <p className="font-paragraph text-xl text-primary/60 mb-12 max-w-2xl mx-auto font-light">
                Join leading healthcare facilities in optimizing emergency response and patient care delivery through real-time intelligence.
              </p>
              
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-paragraph px-12 py-5 bg-primary text-primary-foreground rounded-full text-lg font-semibold hover:bg-accentcyan hover:text-primary transition-colors duration-300 shadow-2xl shadow-primary/20"
                >
                  Launch Dashboard
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}