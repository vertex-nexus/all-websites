import React from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../layout/Theme/themes";
import { Service } from "../../Data/data";

interface Props {
  services: Service[];
}

const ServicesSection: React.FC<Props> = ({ services }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <section id="services" className="py-8 md:py-12 px-2 md:px-4 w-full backdrop-blur-[4px] rounded-3xl">
      <h2
        className="text-center text-[clamp(1.5rem,6vw,2.8rem)] font-black mb-6"
        style={{ color: colors.secondary[500] }}
      >
        Our Services 💡
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center max-w-[90vw] mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-8 text-center rounded-[20px] transition-all duration-300 ease-in-out hover:translate-y-[-5px]"
            style={{
              backgroundColor: `${colors.blueAccent[900]}99`,
              border: `1px solid ${colors.secondary[300]}55`,
              color: colors.grey[100],
              width: '100%',
            }}
          >
            <div className="text-[2.5rem] mb-4">{service.icon}</div>
            <h3 className="font-bold text-xl mb-2">{service.title}</h3>
            <p style={{ color: colors.grey[300] }}>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
