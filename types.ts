
import type { ElementType } from 'react';

export enum AppView {
  LOCK_SCREEN = 'LOCK_SCREEN',
  HOME = 'HOME',
  MESSAGES = 'MESSAGES',
  CHAT = 'CHAT',
  QUESTS = 'QUESTS',
  STORY_TIME = 'STORY_TIME',
  SETTINGS = 'SETTINGS',
  EMERGENCY = 'EMERGENCY',
  LOCKED_APP = 'LOCKED_APP',
  CAMERA = 'CAMERA',
  MAPS = 'MAPS',
  MUSIC = 'MUSIC',
  MATH = 'MATH',
  PHONE = 'PHONE',
  DRIVING = 'DRIVING',
  GALLERY = 'GALLERY'
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  relation: 'family' | 'friend' | 'emergency';
  isApproved: boolean;
  canVideo: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isIncoming: boolean;
}

export interface Quest {
  id: string;
  title: string;
  reward: string;
  completed: boolean;
  icon: string;
}

export interface AppIcon {
  id: string;
  name: string;
  icon: ElementType;
  color: string;
  view: AppView;
  isLocked?: boolean;
  notifications?: number;
}
