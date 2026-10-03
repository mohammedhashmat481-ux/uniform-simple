import React from 'react';

export const NeedleThreadIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 4.5C18.5 3.5 17 3.5 16 4.5L8.5 12L7 10.5C6.5 10 5.7 10 5.2 10.5L3.5 12.2C3 12.7 3 13.5 3.5 14L10 20.5C10.5 21 11.3 21 11.8 20.5L13.5 18.8C14 18.3 14 17.5 13.5 17L12 15.5L19.5 8C20.5 7 20.5 5.5 19.5 4.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.5 7.5L17.5 6.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 4C8 4 12 8 12 12" stroke={color} strokeWidth="1.5" strokeDasharray="2 2"/>
  </svg>
);

export const ScissorsIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="3" stroke={color} strokeWidth="1.5"/>
    <circle cx="6" cy="18" r="3" stroke={color} strokeWidth="1.5"/>
    <path d="M8.2 7.8L20 18.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8.2 16.2L20 5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1" fill={color}/>
  </svg>
);

export const MeasuringTapeIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8C3 6.34315 4.34315 5 6 5H18C19.6569 5 21 6.34315 21 8V16C21 17.6569 19.6569 19 18 19H6C4.34315 19 3 17.6569 3 16V8Z" stroke={color} strokeWidth="1.5"/>
    <path d="M7 5V9M10 5V11M13 5V9M16 5V11M19 5V9" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const FabricRollIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="7" cy="12" rx="4" ry="7" stroke={color} strokeWidth="1.5"/>
    <circle cx="7" cy="12" r="1.5" fill={color}/>
    <path d="M7 5H19C20.6569 5 22 8.13401 22 12C22 15.866 20.6569 19 19 19H7" stroke={color} strokeWidth="1.5"/>
    <path d="M7 19H17C18.6569 19 20 20 20 21C20 21.5523 19.5523 22 19 22H5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const ShirtIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L9 2H15L18 4L22 7.5L19 11L17 9.5V21H7V9.5L5 11L2 7.5L6 4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 2C9 3.65685 10.3431 5 12 5C13.6569 5 15 3.65685 15 2" stroke={color} strokeWidth="1.5"/>
    <path d="M12 5V21" stroke={color} strokeWidth="1.2" strokeDasharray="2 2"/>
  </svg>
);

export const QualityBadgeIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 5.26L19.5 4.5L18.74 8.91L22 12L18.74 15.09L19.5 19.5L15.09 18.74L12 22L8.91 18.74L4.5 19.5L5.26 15.09L2 12L5.26 8.91L4.5 4.5L8.91 5.26L12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
