import NProgress from 'nprogress';
import { useEffect, useMemo } from 'react';

import { alpha, experimentalStyled as styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo-icon.svg';


const RootStyle = styled('div')(({ theme }) => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default
  }));


const LogoAnimation = styled('div')(({ theme }) => ({
    animation: 'logo-zoom-animation infinite 2s linear',
    width:'110px',
    height:'auto',
    'img':{
        width:'100%'
    }
  }));


// ----------------------------------------------------------------------

export default function LoadingScreen({ ...other }) {
    
    useMemo(() => {
      NProgress.start();
    }, []);
  
    useEffect(() => {
      NProgress.done();
    }, []);
  
    return (
      <RootStyle {...other}>  
        <LogoAnimation >
            <Box component={"img"} src={logo} alt="logo" />
        </LogoAnimation>
        <Box
        component={motion.div}
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%']
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        sx={{
          width: 150,
          height: 150,
          borderRadius: '25%',
          position: 'absolute',
          border: (theme) => `solid 3px ${alpha('#FF0300', 0.24)}`
        }}
      />

      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%']
        }}
        transition={{
          ease: 'linear',
          duration: 3.2,
          repeat: Infinity
        }}
        sx={{
          width: 170,
          height: 170,
          borderRadius: '25%',
          position: 'absolute',
          border: (theme) => `solid 8px ${alpha('#FF0300', 0.24)}`
        }}
      />
      </RootStyle>
    );
  }
  