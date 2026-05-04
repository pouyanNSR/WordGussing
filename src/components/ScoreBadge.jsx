import React from 'react';
import { Box, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const ScoreBadge = ({ score = 0, icon: IconComponent = MonetizationOnIcon }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        left: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 2.5,
        py: 1.2,
        borderRadius: '32px',
        // گرادینت طلایی سه‌بعدی
        background: 'linear-gradient(145deg, #a84900 0%, #FFB347 50%, #FF8C00 100%)',
        // سایه‌های چندلایه برای عمق بخشیدن
        boxShadow: `
          0 8px 24px rgba(0,0,0,0.45),
          inset 0 2px 4px rgba(255,255,255,0.4),
          inset 0 -3px 6px rgba(0,0,0,0.25)
        `,
        border: '2px solid rgba(184, 134, 11, 0.6)',
        // چرخش پرسپکتیو برای حس سه‌بعدی
        transform: 'perspective(600px) rotateY(-4deg) translateZ(0)',
        backdropFilter: 'blur(2px)',
        transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
        cursor: 'default',
        userSelect: 'none',
        '&:hover': {
          transform: 'perspective(600px) rotateY(0deg) scale(1.07)',
          boxShadow: `
            0 12px 32px rgba(0,0,0,0.55),
            inset 0 2px 4px rgba(255,255,255,0.5),
            inset 0 -3px 6px rgba(0,0,0,0.3)
          `,
        },
      }}
    >
      <IconComponent
        sx={{
          color: '#FFF',
          fontSize: 34,
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))',
        }}
      />
      <Typography
        variant="h5"
        fontWeight="800"
        sx={{
          color: '#FFF',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          lineHeight: 1,
          letterSpacing: '0.5px',
        }}
      >
        {score.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default ScoreBadge;