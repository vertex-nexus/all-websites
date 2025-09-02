import { useState, useEffect, useRef } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Header from './TopBar';
import MiniDrawer from './Navigation';
import Footer from './Footer/index.tsx';
import ScrollToTop from './ScrollToTop';
import AuroraBackground from './Background/AuroraBackground.tsx';
import { navConfig } from './navConfig';

import './global.css';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const isNonMobile = useMediaQuery('(min-width: 768px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [, setShowOutlet] = useState<boolean>(false);
  
  const mousePositionRef = useRef({ x: 0, y: 0, lastMove: 0 });

  const APP_BAR = '64px';

  const handleSideBarState = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = {
        x: event.clientX,
        y: event.clientY,
        lastMove: performance.now(),
      };
    };

    const handleMouseClick = (event: MouseEvent) => {
      const clickEvent = new CustomEvent('global-click', {
        detail: { x: event.clientX, y: event.clientY }
      });
      window.dispatchEvent(clickEvent);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseClick);
    };
  }, []);

  const getNavConfig = () => {
    return navConfig;
  };

  return (
    <>
      <AuroraBackground mousePositionRef={mousePositionRef} />
      <Box className="items-center justify-center relative overflow-hidden px-0 md:px-16 lg:px-64">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            mt:"80px"
          }}
        >
          <ScrollToTop />
          <Header
            APP_BAR={APP_BAR}
            setIsSidebarOpen={handleSideBarState}
            isNonMobile={isNonMobile}
          />
          <MiniDrawer
            APP_BAR={APP_BAR}
            setShowOutlet={setShowOutlet}
            isNonMobile={isNonMobile}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={handleSideBarState}
            navConfig={getNavConfig()}
          />
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </>
  );
}