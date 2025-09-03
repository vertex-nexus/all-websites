
import { motion, AnimatePresence } from "motion/react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useEffect, useState } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getColors } from "../layout/Theme/themes";
type TeamSection = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const TeamSection = ({
  teamSection,
  autoplay = false,
}: {
  teamSection: TeamSection[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % teamSection.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + teamSection.length) % teamSection.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12 backdrop-blur-[4px] rounded-3xl">
         <h2 
          className="text-4xl md:text-5xl font-black text-center mb-8 px-2"
          style={{
            WebkitBackgroundClip: 'text',
          }}
        >
         Meet Our Team 👋
        </h2>
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {teamSection.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : teamSection.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold ">
              {teamSection[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {teamSection[active].designation}
            </p>
            <motion.p className="mt-8 text-lg  dark:text-neutral-300" style={{
              color:getColors().grey[300]
            }}>
              {teamSection[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full "
              style={{
                backgroundColor: getColors().grey[100],
                
              }}
            >
              <KeyboardArrowLeftIcon className="h-5 w-5 transition-transform duration-300 group-hover/button:rotate-12 " style={{
                color: getColors().grey[900]
              }} />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full "
              style={{
                backgroundColor: getColors().grey[100],
              }}
            >
              <KeyboardArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover/button:-rotate-12" style={{
                color: getColors().grey[900]
              }}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
