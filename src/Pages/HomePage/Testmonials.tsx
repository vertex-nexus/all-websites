import React from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../layout/Theme/themes";
import { Testimonial } from "../../Data/data";

interface Props {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<Props> = ({ testimonials }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <section id="testimonials" className="py-8 md:py-12 px-2 md:px-4 backdrop-blur-[4px] rounded-3xl m-4">
      <h2
        className="text-center text-[clamp(1.5rem,6vw,2.8rem)] font-black mb-6"
        style={{ color: colors.secondary[500] }}
      >
        What Our Clients Say ✨
      </h2>

      {/* LTR Section */}
      <div className="overflow-hidden relative mb-6">
        <div className="flex animate-scroll-ltr gap-8 hover:pause-animation">
          {[...testimonials, ...testimonials].map((testimonial, i) => (
            <div
              key={`ltr-${i}`}
              className="p-6 text-center rounded-[20px] min-w-[300px]"
              style={{
                backgroundColor: `${colors.blueAccent[900]}99`,
                border: `1px solid ${colors.grey[700]}55`,
                color: colors.grey[100]
              }}
            >
              <p className="text-base mb-2">"{testimonial.text}"</p>
              <p className="font-bold text-sm">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RTL Section */}
      <div className="overflow-hidden relative">
        <div className="flex animate-scroll-rtl gap-8 hover:pause-animation">
          {[...testimonials, ...testimonials].map((testimonial, i) => (
            <div
              key={`rtl-${i}`}
              className="p-6 text-center rounded-[20px] min-w-[300px]"
              style={{
                backgroundColor: `${colors.blueAccent[900]}99`,
                border: `1px solid ${colors.grey[700]}55`,
                color: colors.grey[100]
              }}
            >
              <p className="text-base mb-2">"{testimonial.text}"</p>
              <p className="font-bold text-sm">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          /* Keyframes for LTR and RTL */
          @keyframes scroll-ltr {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-rtl {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }

          /* Animations */
          .animate-scroll-ltr {
            animation: scroll-ltr 20s linear infinite;
            width: max-content;
          }
          .animate-scroll-rtl {
            animation: scroll-rtl 20s linear infinite;
            width: max-content;
          }

          /* Hover Pause */
          .hover\\:pause-animation:hover {
            animation-play-state: paused;
          }

          /* Speed up on smaller screens */
          @media (max-width: 768px) {
            .animate-scroll-ltr {
              animation-duration: 12s;
            }
            .animate-scroll-rtl {
              animation-duration: 12s;
            }
          }
        `}
      </style>
    </section>
  );
};

export default TestimonialsSection;
