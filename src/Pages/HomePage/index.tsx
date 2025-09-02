import { Box,  Stack } from '@mui/material';
import { getColors } from '../../layout/Theme/themes';
import HeroSection from './HeroSection';
import OurServices from './Services';

function HomePage() {
  const colors = getColors();
  return (
      <Box
        component="main"
        sx={{
          color: colors.grey[100],
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <Stack spacing={4}>
          <HeroSection />
          <OurServices />
        </Stack>
      </Box>
  );
}

export default HomePage;