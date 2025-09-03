import { TeamSection } from "../../components/TeamSection";

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Vaibhav is a visionary leader who drives our marketing efforts with creativity and data-driven insights. His strategies have been crucial to our growth.",
      name: "Vaibhav",
      designation: "Marketing Head",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Shubham is an exceptionally skilled developer with a knack for solving complex technical challenges. His contributions are key to our product's success.",
      name: "Shubham Kunwar",
      designation: "Lead Developer",
      src: "/team/kunwar.jpg",
    },
    {
      quote:
        "Devansh's expertise in sales has been instrumental in building strong client relationships and expanding our market reach. He consistently exceeds targets.",
      name: "Devansh",
      designation: "Senior Sales Manager",
      src: "/team/Devansh.jpeg",
    },
    {
      quote:
        "Ananya brings a fresh perspective to our design team. Her commitment to creating intuitive and beautiful user experiences is second to none.",
      name: "Ananya Sharma",
      designation: "UI/UX Lead",
      src: "/team/Ananya.png",
    },
  ];
  return <TeamSection teamSection={testimonials} />;
}