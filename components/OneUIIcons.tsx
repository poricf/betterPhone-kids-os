import React from 'react';

interface IconProps {
  size?: number;
  color?: string; // Used for monochrome icons
  className?: string;
}

// --- SAMSUNG ONE UI STYLE ICONS (Monochrome Glyph on Colored Background) ---

export const PhoneIcon: React.FC<IconProps> = ({ size = 24, color = "white", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M19.95 21q-3.125 0-6.175-1.362-3.05-1.363-5.563-3.876-2.512-2.512-3.875-5.562Q3 7.15 3 4.025q0-.45.3-.75.3-.3.75-.3H8.1q.35 0 .625.238.275.237.35.587l.725 3.4q.05.3-.05.588-.1.287-.35.512L7.4 10.3q1.325 2.225 2.925 3.825 1.6 1.6 3.825 2.925l2.025-2.025q.225-.225.525-.337.3-.113.575-.063l3.425.725q.35.05.587.337.238.288.238.638v4.05q0 .45-.3.75-.3.3-.75.3Z"/>
  </svg>
);

export const MessageIcon: React.FC<IconProps> = ({ size = 24, color = "white", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M20,2H4C2.9,2,2,2.9,2,4v18l4-4h14c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M17,11H7V9h10V11z M17,7H7V5h10V7z"/>
  </svg>
);

export const InternetIcon: React.FC<IconProps> = ({ size = 24, color = "white", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    {/* Samsung Internet Ring Accent */}
    <path d="M19.07 4.93L4.93 19.07" strokeWidth="0" fill="none"/> 
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.5" strokeDasharray="2 4" opacity="0.6" />
  </svg>
);

export const CameraIcon: React.FC<IconProps> = ({ size = 24, color = "white", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
     <path d="M12,8.8c-1.8,0-3.2,1.4-3.2,3.2s1.4,3.2,3.2,3.2s3.2-1.4,3.2-3.2S13.8,8.8,12,8.8z M20,6h-3.2L15,4H9L7.2,6H4 C2.9,6,2,6.9,2,8v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M12,17c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5 S14.8,17,12,17z"/>
  </svg>
);

export const CalculatorIcon: React.FC<IconProps> = ({ size = 24, color = "white", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M18,4H6C4.9,4,4,4.9,4,6v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V6C20,4.9,19.1,4,18,4z M7,7h2v2H7V7z M7,11h2v2H7V11z M7,15h2v2H7V15z M11,7h2v2h-2V7z M11,11h2v2h-2V11z M11,15h2v2h-2V15z M15,7h2v2h-2V7z M15,11h2v2h-2V11z M15,15h2v2h-2V15z"/>
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, color = "white", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M19.4,13c0-0.3,0.1-0.6,0.1-1s0-0.7-0.1-1l2.1-1.7c0.2-0.2,0.2-0.4,0.1-0.6l-2-3.5C19.5,5.1,19.3,5,19,5.1l-2.5,1 c-0.5-0.4-1.1-0.7-1.7-1l-0.4-2.6C14.5,2.2,14.2,2,14,2h-4C9.8,2,9.5,2.2,9.5,2.4L9.1,5.1C8.5,5.3,8,5.7,7.4,6.1L4.9,5.1 C4.7,5,4.5,5.1,4.4,5.3l-2,3.5C2.3,8.9,2.3,9.2,2.5,9.3L4.6,11c0,0.3-0.1,0.6-0.1,1s0,0.7,0.1,1l-2.1,1.7 c-0.2,0.2-0.2,0.4-0.1,0.6l2,3.5C4.5,18.9,4.7,19,4.9,18.9l2.5-1c0.5,0.4,1.1,0.7,1.7,1l0.4,2.6c0,0.2,0.2,0.4,0.5,0.4h4 c0.2,0,0.5-0.2,0.5-0.4l0.4-2.6c0.6-0.3,1.2-0.6,1.7-1l2.5,1c0.2,0.1,0.5,0,0.6-0.2l2-3.5c0.1-0.2,0.1-0.5-0.1-0.6L19.4,13z M12,15.5c-1.9,0-3.5-1.6-3.5-3.5s1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5S13.9,15.5,12,15.5z"/>
  </svg>
);

export const StoreIcon: React.FC<IconProps> = ({ size = 24, color = "white", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
     <path d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1V7z"/>
  </svg>
);

// --- MULTI-COLOR "REAL" ICONS (Use on White Background) ---

export const GalleryIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    {/* Real Samsung Gallery Flower Style */}
    <path fill="#D81B60" d="M12 2C9.24 2 7 4.24 7 7c0 2.76 2.24 5 5 5s5-2.24 5-5c0-2.76-2.24-5-5-5z"/>
    <path fill="#E53935" d="M22 12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5 5-2.24 5-5z"/>
    <path fill="#FB8C00" d="M12 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z"/>
    <path fill="#8E24AA" d="M2 12c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5z"/>
    <circle cx="12" cy="12" r="1.5" fill="white"/>
  </svg>
);

export const MapsIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Google Maps Pin Style */}
    <path d="M12 2c-3.5 0-6.4 2.6-6.9 6h-.1c0 3.8 2.5 8.1 7 14 4.5-5.9 7-10.2 7-14 0-3.3-2.7-6-7-6z" fill="#FFF"/>
    <path d="M18.5 8.5a6.5 6.5 0 0 0-4.6-6.4c-.4-.1-.9-.1-1.3-.1v7l5.9 5.9c-.1-2.4-1.3-4.6-3-6.4z" fill="#34A853"/>
    <path d="M5.5 8.5c0 1.9.8 3.6 2 4.9l5.5-6.4V2.1C8.7 2.7 5.5 5.3 5.5 8.5z" fill="#EA4335"/>
    <path d="M12.6 14L7.5 7.6c-.7 1.1-1 2.4-1 3.8 0 1.9.7 3.7 2 5.2L12.6 14z" fill="#FBBC04"/>
    <path d="M12.6 14l3.3-3.3c-.6-1.5-2-2.6-3.7-2.6-.9 0-1.7.3-2.3.9L12.6 14z" fill="#1967D2"/>
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
     {/* Gmail Style M */}
     <path d="M2 5v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2z" fill="#fff"/>
     <path d="M19 4H5C3.34 4 2 5.34 2 7v10c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V7c0-1.66-1.34-3-3-3z" fill="none"/>
     <path d="M12 11L4 5H2v2l10 7 10-7V5h-2l-8 6z" fill="#EA4335"/>
     <path d="M2 17V7l2 1.5V17h-2z" fill="#4285F4"/>
     <path d="M20 17V7l-2 1.5V17h2z" fill="#34A853"/>
     <path d="M18.5 5H20v2l-1.5 1.1L18.5 5z" fill="#C5221F"/>
     <path d="M4 5H5.5L4 8.1 4 5z" fill="#C5221F"/>
  </svg>
);

export const GoogleGIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const GmailIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
     <path d="M2 5v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2z" fill="#f2f2f2"/>
     <path d="M2 5l10 7 10-7v2l-10 7-10-7V5z" fill="#EA4335"/>
     <path d="M2 19V7l10 7 10-7v12H2z" fill="none" stroke="#EA4335" strokeWidth="2"/>
     <rect x="2" y="5" width="20" height="14" rx="2" fill="white"/>
     <path d="M4 6L12 12L20 6" stroke="#EA4335" strokeWidth="2" strokeLinecap="round"/>
     <path d="M20 6V18H4V6" stroke="#EA4335" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

export const PhotosIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M8 11.5a3.5 3.5 0 1 1-3.5-3.5H8v3.5z" fill="#FBBC04"/>
    <path d="M12.5 8a3.5 3.5 0 1 1 3.5-3.5V8h-3.5z" fill="#EA4335"/>
    <path d="M16 12.5a3.5 3.5 0 1 1 3.5 3.5H16v-3.5z" fill="#4285F4"/>
    <path d="M11.5 16a3.5 3.5 0 1 1-3.5 3.5V16h3.5z" fill="#34A853"/>
  </svg>
);

export const DriveIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M8.2 16h8.5l-2.6 4.6H5.4L8.2 16z" fill="#0066DA"/>
    <path d="M15.2 6.5L8.7 17.6 4.3 10l6.5-11h8.7L15.2 6.5z" fill="#00AC47"/>
    <path d="M15.4 6.5l4.3 7.5L15.3 21 8.6 9.4l6.8-2.9z" fill="#FFBA00"/>
    <polygon points="12,2 8,9 12,9" fill="#00AC47" />
    <polygon points="12,2 19,14 15,14" fill="#EA4335" />
    <polygon points="19,14 12,14 8,21 15,21" fill="#2684FC" />
  </svg>
);

export const PlayStoreIcon: React.FC<IconProps> = ({ size = 24 }) => (
   <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#00E2FF" d="M12.9,2c-0.3-0.3-0.8-0.3-1.1,0L3.5,10.3C3.2,10.6,3,11,3,11.5s0.2,0.9,0.5,1.2l8.3,8.3 c0.3,0.3,0.8,0.3,1.1,0l8.6-8.6C21.8,12,22,11.5,22,11S21.8,10.1,21.5,10.6z" opacity="0.1"/>
      <path fill="#00C8F8" d="M12.9,2c-0.3-0.3-0.8-0.3-1.1,0L3.5,10.3C3.2,10.6,3,11,3,11.5s0.2,0.9,0.5,1.2l8.3,8.3 c0.3,0.3,0.8,0.3,1.1,0l8.6-8.6C21.8,12,22,11.5,22,11S21.8,10.1,21.5,10.6z" opacity="0.1"/>
      <path fill="#34A853" d="M3.5 10.3 L 13.5 2 L 15 3.5 L 5 13.5 Z"/>
      <path fill="#4285F4" d="M3.5 13.7 L 13.5 23.7 L 15 22.2 L 5 12.2 Z"/>
      <path fill="#FBBC04" d="M 21.5 10.6 L 15 17.1 L 12 12 L 15 6.9 L 21.5 13.4 C 21.8 13.1 22 12.6 22 12 S 21.8 10.9 21.5 10.6 Z"/>
      <path fill="#EA4335" d="M 3.5 10.3 C 3.2 10.6 3 11 3 11.5 s 0.2 0.9 0.5 1.2 l 8.3 8.3 l 3.2 -3.2 l -11.5 -11.5 Z"/>
   </svg>
);

export const MusicIcon: React.FC<IconProps> = ({ size = 24, color = "white", className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>
);

export const YoutubeIcon: React.FC<IconProps> = ({ size = 24, color = "white", className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
        <rect x="2" y="4" width="20" height="16" rx="4" fill="#FF0000"/>
        <path d="M10 15V9l5.2 3-5.2 3z" fill="white"/>
    </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 24, color = "white", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);
