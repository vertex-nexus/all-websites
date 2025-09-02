import { useState, useEffect, useRef } from 'react';
import { useTheme } from "@mui/material/styles";
import { tokens } from '../../layout/Theme/themes';
import { MOCK_WEBSITES } from './Mockwebsite';

const PortfolioComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentProjectCode, setCurrentProjectCode] = useState('');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [portfolioItems] = useState(MOCK_WEBSITES);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const defaultIndex = portfolioItems.findIndex(item => item.id === 'f1');
    const index = defaultIndex !== -1 ? defaultIndex : 0;
    setCurrentProjectIndex(index);
    setCurrentProjectCode(portfolioItems[index].code);
  }, [portfolioItems]);

  const showProject = (index: number) => {
    setCurrentProjectIndex(index);
    setCurrentProjectCode(portfolioItems[index].code);
    setIsModalOpen(true);
    setIsMinimized(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    setIsMinimized(false);
  };

  const minimizeModal = () => {
    setIsModalOpen(false);
    setIsMinimized(true);
  };

  const restoreModal = () => {
    setIsModalOpen(true);
    setIsMinimized(false);
  };

  const nextProject = () => {
    const nextIndex = (currentProjectIndex + 1) % portfolioItems.length;
    showProject(nextIndex);
  };

  const prevProject = () => {
    const prevIndex = (currentProjectIndex - 1 + portfolioItems.length) % portfolioItems.length;
    showProject(prevIndex);
  };

  // Duplicate items for seamless loop
  const duplicatedItems = [...portfolioItems, ...portfolioItems];

  return (
    <>
      <section 
        id="our-portfolio" 
        className="py-8 px-2"
        style={{ backgroundColor: colors.primary[900] }}
      >
        {/* Title */}
        <h2 
          className="text-4xl md:text-5xl font-black text-center mb-8 px-2"
          style={{
            WebkitBackgroundClip: 'text',
            color:colors.secondary[500]
          }}
        >
          Our Portfolio 📁
        </h2>
        
        {/* Scrolling Portfolio */}
        <div className="relative w-full overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing hover:[animation-play-state:paused]"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.animationPlayState = 'running';
            }}
          >
            <div 
              className="flex gap-8 animate-scroll-rtl"
              style={{
                animation: 'scroll-rtl 220s linear infinite',
                width: 'max-content'
              }}
            >
              {duplicatedItems.map((product, index) => (
                <div
                  key={index}
                  className="w-72 m-4 md:w-80 h-96 md:h-[400px] flex-shrink-0 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                  style={{
                    backgroundColor: `${colors.primary[700]}33`, // Light transparent background
                    border: `1px solid ${colors.secondary[800]}`,
                    boxShadow: `0 4px 20px ${colors.grey[900]}20`
                  }}
                  onClick={() => showProject(index % portfolioItems.length)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 15px 35px ${colors.secondary[500]}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 4px 20px ${colors.grey[900]}20`;
                  }}
                >
                  <div className="w-full h-3/5 overflow-hidden">
                    <img 
                      src={product.imagePath} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center flex-grow">
                    <h3 
                      className="font-bold text-xl mb-2"
                      style={{ color: colors.grey[100] }}
                    >
                      {product.title}
                    </h3>
                    <p 
                      className="text-sm mb-4 leading-relaxed"
                      style={{ color: colors.grey[300] }}
                    >
                      Price: INR {product.price}
                    </p>
                    <button 
                      className="inline-block px-4 py-2 rounded-full font-bold text-sm text-center transition-all duration-300 hover:-translate-y-1 border-none cursor-pointer"
                      style={{
                        backgroundColor: colors.secondary[500],
                        color: colors.primary[900]
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = colors.secondary[400];
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = colors.secondary[500];
                      }}
                    >
                      View Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50 transition-all duration-500 opacity-100 scale-100"
          style={{ backgroundColor: `${colors.grey[900]}E6` }} // 90% dark overlay
        >
          <div 
            className="w-full h-full relative flex flex-col rounded-none shadow-none"
            style={{ backgroundColor: colors.primary[800] }}
          >
            {/* Control Buttons */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-4 z-10 px-4 py-2 rounded-full"
                 style={{ backgroundColor: `${colors.primary[900]}80` }}>
              {[{action: minimizeModal, icon: 'fa-window-minimize'}, {action: prevProject, icon: 'fa-chevron-left'}, {action: nextProject, icon: 'fa-chevron-right'}, {action: closeModal, icon: 'fa-times'}].map((btn, i) => (
                <button
                  key={i}
                  onClick={btn.action}
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                  style={{ 
                    backgroundColor: `${colors.grey[700]}66`,
                    color: colors.grey[100]
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = `${colors.secondary[500]}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = `${colors.grey[700]}66`;
                  }}
                >
                  <i className={`fas ${btn.icon} text-lg`}></i>
                </button>
              ))}
            </div>

            {/* Project Preview */}
            <div className="flex-grow w-full h-full flex">
              <iframe
                srcDoc={currentProjectCode}
                className="w-full h-full"
                style={{ backgroundColor: colors.grey[100] }}
                frameBorder="0"
                allowFullScreen
                sandbox="allow-scripts allow-forms allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}

      {/* Minimized Window */}
      {isMinimized && !isModalOpen && (
        <div 
          className="fixed bottom-5 left-5 rounded-lg px-4 py-2 shadow-lg cursor-pointer z-50 transition-all duration-300 translate-y-0 opacity-100"
          style={{ backgroundColor: `${colors.primary[900]}E6` }}
          onClick={restoreModal}
        >
          <div className="flex items-center gap-2">
            <i 
              className="fas fa-window-maximize text-2xl"
              style={{ color: colors.secondary[500] }}
            ></i>
            <span 
              className="font-bold"
              style={{ color: colors.grey[100] }}
            >
              Demo Website
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioComponent;
