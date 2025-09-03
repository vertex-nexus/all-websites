import { useMemo } from "react";
import ServicesSection from "./ServicesSection";
import TeamSection from "./TeamSection";
import TestimonialsSection from "./Testmonials";
import ContactSection from "./ContactSection";
import Portfolio from "./Portfolio";
import { servicesData, testimonialsData, whatsappNumber } from "../../Data/data";

const OurServices = () => {
  const whatsappLinkDirect = useMemo(() => {
    const encodedMessage = encodeURIComponent("Hello! I'm interested in your services.");
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  }, []);

  return (
    <main className="home-sections mx-auto">
      <ServicesSection services={servicesData} />
     <Portfolio/>
      <TeamSection />
      <TestimonialsSection testimonials={testimonialsData} />
      <ContactSection whatsappLink={whatsappLinkDirect} />
    </main>
  );
};

export default OurServices;
