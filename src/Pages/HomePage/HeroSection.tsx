import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from "@mui/material/styles";
import { tokens } from '../../layout/Theme/themes';

interface HeroSectionProps {
  onCardHoverState?: (isHovering: boolean) => void;
}

const words = [
  'Cloud Infrastructure',
  'AI & Machine Learning',
  'Cybersecurity Solutions',
  'Scalable Platforms',
];

const typingSpeed = 120;
const deletingSpeed = 60;
const pauseDelay = 1800;

const HeroSection: React.FC<HeroSectionProps> = ({ onCardHoverState }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const cardRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(currentWord.substring(0, typedText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (typedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setTypedText(currentWord.substring(0, typedText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, wordIndex, isDeleting]);

  // Hover handler
  useEffect(() => {
    const card = cardRef.current;
    if (!card || !onCardHoverState) return;

    const handlePointerEnter = () => onCardHoverState(true);
    const handlePointerLeave = () => onCardHoverState(false);

    card.addEventListener('pointerenter', handlePointerEnter);
    card.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      card.removeEventListener('pointerenter', handlePointerEnter);
      card.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [onCardHoverState]);

  return (
    <main
      ref={cardRef}
      className="relative z-10 w-full max-w-full mx-auto px-16 py-8 flex flex-col min-h-[90vh]
                 rounded-[20px] border  overflow-hidden
                 transition-all duration-300 ease-in-out"
      style={{
        borderColor: colors.grey[700],
        boxShadow: `0 8px 32px 0 ${colors.grey[800]}CC`
      }}
    >
      <section className="grid lg:grid-cols-[1fr_0.8fr] grid-cols-1 gap-20 lg:gap-20 items-center flex-1 py-12">
        {/* Hero Content */}
        <div className="flex flex-col gap-8 text-left lg:text-left text-center">
          
          {/* Hero Badge */}
          <div
            className="inline-flex items-center w-fit mx-auto lg:mx-0 px-5 py-3 rounded-full
                         backdrop-blur-md border transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: `${colors.secondary[100]}33`, // 20% opacity
              borderColor: colors.secondary[300],
              boxShadow: `0 2px 8px ${colors.grey[900]}33`
            }}
          >
            <span
              className="text-base font-semibold"
              style={{
                color: colors.secondary[200],
                textShadow: `0 1px 2px ${colors.grey[900]}26`
              }}
            >
              ✨ Transform Your Business
            </span>
          </div>

          {/* Hero Title */}
          <h1
            className="text-5xl lg:text-7xl font-black leading-tight m-0 transition-colors duration-300"
            style={{
              color: colors.grey[100],
              textShadow: `0 3px 6px ${colors.grey[900]}33`
            }}
          >
            Build the Future with{' '}
            <span
              style={{
                color: colors.secondary[400],
                WebkitBackgroundClip: 'text',
              }}
            >
              Cutting-Edge Solutions
            </span>
          </h1>

          {/* Hero Subtitle with Typewriter */}
          <div className="max-w-2xl min-h-[5.5rem]">
            <div className="flex items-center justify-center lg:justify-start">
              <span
                className="font-mono text-3xl lg:text-4xl font-bold"
                style={{
                  color: colors.blueAccent[300],
                  textShadow: `0 0 12px ${colors.secondary[300]}66`
                }}
              >
                {typedText}
              </span>
              <span
                className="inline-block w-1 h-7 ml-1"
                style={{
                  background: `linear-gradient(90deg, ${colors.secondary[400]}, ${colors.secondary[600]})`,
                  borderRadius: '2px'
                }}
              />
            </div>
          </div>

          {/* Hero Actions */}
          <div className="flex gap-6 items-center flex-wrap justify-center lg:justify-start">
            <a
              href="#our-portfolio"
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg
                           text-white cursor-pointer transition-all duration-300 ease-out
                           transform hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(90deg, ${colors.secondary[500]}, ${colors.secondary[700]})`,
                boxShadow: `0 6px 20px ${colors.secondary[500]}80`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 30px ${colors.secondary[500]}B3`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 6px 20px ${colors.secondary[500]}80`;
              }}
            >
              <span>View Our Work</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{
                     background: `linear-gradient(90deg, ${colors.grey[100]}26, ${colors.grey[100]}0A)`
                   }} />
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg
                           cursor-pointer transition-all duration-300 ease-out backdrop-blur-md border
                           transform hover:-translate-y-1 relative overflow-hidden"
              style={{
                backgroundColor: `${colors.primary[800]}66`,
                borderColor: colors.grey[700],
                color: colors.grey[100]
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.primary[800]}99`;
                e.currentTarget.style.boxShadow = `0 10px 30px ${colors.grey[900]}26`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.primary[800]}66`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>Start Your Project</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{
                     background: `linear-gradient(90deg, ${colors.grey[100]}26, ${colors.grey[100]}0A)`
                   }} />
            </a>
          </div>

          {/* Hero Stats */}
          <div className="flex justify-center lg:justify-start gap-10 mt-6">
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '99.9%', label: 'Uptime Guaranteed' },
              { value: '24/7', label: 'Expert Support' }
            ].map((stat) => (
              <div key={stat.value} className="text-center">
                <div
                  className="text-4xl font-black leading-none"
                  style={{
                    WebkitBackgroundClip: 'text',
                    color:colors.secondary[400]
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-base mt-2"
                  style={{ color: colors.grey[300] }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual */}
        <div className="flex items-center justify-center relative order-first lg:order-last mb-8 lg:mb-0"
             style={{ perspective: '1000px' }}>
          <img
            src="/logo.svg"
            alt="Innovation Technology"
            className="w-full max-w-md lg:max-w-lg h-auto rounded-3xl relative z-10
                         transition-transform duration-500 ease-out shadow-2xl
                         transform hover:scale-105"
            style={{
              transform: 'rotateY(5deg) rotateX(2deg)',
              boxShadow: `0 30px 60px ${colors.grey[900]}4D`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotateY(5deg) rotateX(2deg) scale(1)';
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
