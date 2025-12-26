
import React, { useState, useEffect } from 'react';
import { StatusBar } from './components/StatusBar';
import { SystemNav } from './components/SystemNav';
import { SafetyCacheToast } from './components/SafetyCacheToast';
import { NotificationPanel } from './components/NotificationPanel';
import { HomeView } from './views/HomeView';
import { AppDrawerView } from './views/AppDrawerView';
import { MessageView } from './views/MessageView';
import { QuestView } from './views/QuestView';
import { SafetyView } from './views/SafetyView';
import { StoryView } from './views/StoryView';
import { CameraView } from './views/CameraView';
import { GalleryView } from './views/GalleryView';
import { MapsView } from './views/MapsView';
import { MusicView } from './views/MusicView';
import { SettingsView } from './views/SettingsView';
import { MathView } from './views/MathView';
import { LockedView } from './views/LockedView';
import { LockScreenView } from './views/LockScreenView';
import { PhoneView } from './views/PhoneView';
import { DrivingView } from './views/DrivingView';
import { AppView, AppIcon, Contact, Quest } from './types';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { 
  Gamepad2, Book 
} from 'lucide-react';
import { 
  PhoneIcon, MessageIcon, InternetIcon, GalleryIcon, StoreIcon, 
  CameraIcon, SettingsIcon, MapsIcon, MailIcon, YoutubeIcon, 
  ShieldIcon, MusicIcon, CalculatorIcon 
} from './components/OneUIIcons';

// Real Android / One UI Style Colors & Icons
const APP_CONFIG = {
  PHONE: { color: '#4CAF50', icon: PhoneIcon }, // Green with white glyph
  MESSAGES: { color: '#2196F3', icon: MessageIcon }, // Blue with white glyph
  INTERNET: { color: '#7E57C2', icon: InternetIcon }, // Purple with white glyph
  GALLERY: { color: '#FFFFFF', icon: GalleryIcon }, // White BG with Colorful Flower
  STORE: { color: '#F48FB1', icon: StoreIcon }, // Pink with white bag
  CAMERA: { color: '#D32F2F', icon: CameraIcon }, // Red with white aperture (One UI style)
  SETTINGS: { color: '#78909C', icon: SettingsIcon }, // Grey with white gear
  MAPS: { color: '#FFFFFF', icon: MapsIcon }, // White BG with Colorful Pin
  MAIL: { color: '#FFFFFF', icon: MailIcon }, // White BG with Colorful M
  YOUTUBE: { color: '#FFFFFF', icon: YoutubeIcon }, // White BG with Red Logo
  SAFETY: { color: '#009688', icon: ShieldIcon }, // Teal with white shield
  MUSIC: { color: '#673AB7', icon: MusicIcon }, // Deep Purple
  CALCULATOR: { color: '#4CAF50', icon: CalculatorIcon } // Green
};

const INITIAL_APPS: AppIcon[] = [
  { id: '1', name: 'Phone', icon: APP_CONFIG.PHONE.icon, color: APP_CONFIG.PHONE.color, view: AppView.PHONE }, 
  { id: '2', name: 'Messages', icon: APP_CONFIG.MESSAGES.icon, color: APP_CONFIG.MESSAGES.color, view: AppView.MESSAGES },
  { id: '3', name: 'Internet', icon: APP_CONFIG.INTERNET.icon, color: APP_CONFIG.INTERNET.color, view: AppView.LOCKED_APP }, 
  { id: '4', name: 'Gallery', icon: APP_CONFIG.GALLERY.icon, color: APP_CONFIG.GALLERY.color, view: AppView.GALLERY }, 
  { id: '5', name: 'Store', icon: APP_CONFIG.STORE.icon, color: APP_CONFIG.STORE.color, view: AppView.LOCKED_APP }, 
  { id: '6', name: 'Camera', icon: APP_CONFIG.CAMERA.icon, color: APP_CONFIG.CAMERA.color, view: AppView.CAMERA },
  { id: '7', name: 'Mail', icon: APP_CONFIG.MAIL.icon, color: APP_CONFIG.MAIL.color, view: AppView.MESSAGES }, 
  { id: '8', name: 'Maps', icon: APP_CONFIG.MAPS.icon, color: APP_CONFIG.MAPS.color, view: AppView.MAPS }, 
  { id: '9', name: 'Safety', icon: APP_CONFIG.SAFETY.icon, color: APP_CONFIG.SAFETY.color, view: AppView.EMERGENCY },
  { id: '10', name: 'Settings', icon: APP_CONFIG.SETTINGS.icon, color: APP_CONFIG.SETTINGS.color, view: AppView.SETTINGS },
  { id: '11', name: 'YouTube', icon: APP_CONFIG.YOUTUBE.icon, color: APP_CONFIG.YOUTUBE.color, view: AppView.LOCKED_APP, isLocked: true },
  { id: '12', name: 'Music', icon: APP_CONFIG.MUSIC.icon, color: APP_CONFIG.MUSIC.color, view: AppView.MUSIC },
  { id: '13', name: 'Tasks', icon: Gamepad2, color: '#FF9800', view: AppView.QUESTS }, // Keeping Gamepad for Tasks/Games
  { id: '14', name: 'Stories', icon: Book, color: '#00BCD4', view: AppView.STORY_TIME }, // Book is fine
  { id: '15', name: 'Tutor', icon: APP_CONFIG.CALCULATOR.icon, color: APP_CONFIG.CALCULATOR.color, view: AppView.MATH },
  { id: '16', name: 'Games', icon: Gamepad2, color: '#E91E63', view: AppView.LOCKED_APP, isLocked: true },
];

const CONTACTS: Contact[] = [
  { id: '1', name: 'Mom', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150', relation: 'family', isApproved: true, canVideo: true },
  { id: '2', name: 'Dad', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150', relation: 'family', isApproved: true, canVideo: true },
  { id: '3', name: 'Grandma', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150', relation: 'family', isApproved: true, canVideo: false },
  { id: '4', name: 'Coach Mike', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150', relation: 'friend', isApproved: true, canVideo: false },
];

const INITIAL_QUESTS: Quest[] = [
  { id: 'q1', title: 'Finish Math Homework', reward: '30m Games', completed: false, icon: '📚' },
  { id: 'q2', title: 'Clean Room', reward: 'Pet Snack', completed: true, icon: '🧹' },
  { id: 'q3', title: 'Read for 20 mins', reward: 'New Story', completed: false, icon: '📖' },
];

const ALLOWED_STUDY_APPS = ['Tutor', 'Stories', 'Tasks', 'Music', 'Calculator', 'Settings', 'Phone', 'Safety'];

const App = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOCK_SCREEN);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [quests, setQuests] = useState(INITIAL_QUESTS);
  
  // Settings States
  const [isDrivingModeEnabled, setIsDrivingModeEnabled] = useState(true);
  const [isDrivingNow, setIsDrivingNow] = useState(false); // Tracks if the simulation is currently active
  const [isStudyMode, setIsStudyMode] = useState(false);
  
  // Lock Reason State to differentiate UI
  const [lockReason, setLockReason] = useState<'TIME_LIMIT' | 'STUDY_MODE'>('TIME_LIMIT');
  const [lockedAppName, setLockedAppName] = useState('Restricted App');
  
  // Timer for locked apps - get from localStorage or set default (1 hour from now)
  const getNextAllowanceTime = (appName: string): number => {
    const stored = localStorage.getItem(`nextAllowance_${appName}`);
    if (stored) {
      const time = parseInt(stored, 10);
      // If time has passed, set new allowance (1 hour from now)
      if (Date.now() > time) {
        const newTime = Date.now() + 60 * 60 * 1000; // 1 hour
        localStorage.setItem(`nextAllowance_${appName}`, newTime.toString());
        return newTime;
      }
      return time;
    }
    // First time - set 1 hour from now
    const newTime = Date.now() + 60 * 60 * 1000; // 1 hour
    localStorage.setItem(`nextAllowance_${appName}`, newTime.toString());
    return newTime;
  };
  
  const [nextAllowanceTime, setNextAllowanceTime] = useState<number>(0);

  // Offline Cache Logic
  const [locationBuffer, setLocationBuffer] = useState<number>(0);
  const [isUploadingBuffer, setIsUploadingBuffer] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Toggle Offline Mode Simulation
  const toggleOfflineMode = () => {
    if (isOfflineMode) {
      // Switching back to Online
      setIsUploadingBuffer(true);
      setShowToast(true);
      setTimeout(() => {
         setIsOfflineMode(false);
         setIsUploadingBuffer(false);
         setLocationBuffer(0);
         setTimeout(() => setShowToast(false), 2000);
      }, 3000);
    } else {
      // Switching to Offline
      setIsOfflineMode(true);
      setShowToast(true);
      // Toast hides after 5s unless persistent needed
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  const toggleDrivingMode = () => setIsDrivingModeEnabled(!isDrivingModeEnabled);
  const toggleStudyMode = () => setIsStudyMode(!isStudyMode);

  const triggerDrivingSimulation = () => {
      if(!isDrivingModeEnabled) {
          alert("Please enable Driving Mode first.");
          return;
      }
      setIsDrivingNow(true);
      setTimeout(() => {
          setCurrentView(AppView.DRIVING);
      }, 1000);
  };

  const exitDrivingSimulation = () => {
      setIsDrivingNow(false);
      setCurrentView(AppView.HOME);
  };

  // Simulate location buffering when offline
  useEffect(() => {
    let interval: any;
    if (isOfflineMode) {
      interval = setInterval(() => {
        setLocationBuffer(prev => prev + 1);
      }, 2000); // Add a point every 2s
    }
    return () => clearInterval(interval);
  }, [isOfflineMode]);

  // Effect to enforce Study Mode on currently open apps (if toggled via notification panel)
  useEffect(() => {
    // If driving mode is active, we respect its own allowed apps (Maps/Music) and don't double lock
    if (isStudyMode && !isDrivingNow) {
      const restrictedViews = [AppView.MESSAGES, AppView.CAMERA, AppView.MAPS, AppView.GALLERY];
      if (restrictedViews.includes(currentView)) {
         let name = 'Restricted App';
         if (currentView === AppView.MESSAGES) name = 'Messages';
         if (currentView === AppView.CAMERA) name = 'Camera';
         if (currentView === AppView.MAPS) name = 'Maps';
         if (currentView === AppView.GALLERY) name = 'Gallery';
         
         setLockedAppName(name);
         setLockReason('STUDY_MODE');
         setCurrentView(AppView.LOCKED_APP);
      }
    }
  }, [isStudyMode, currentView, isDrivingNow]);

  const handleOpenApp = (app: AppIcon) => {
    // Check locked status
    if (app.isLocked) {
      setLockReason('TIME_LIMIT');
      setLockedAppName(app.name);
      setNextAllowanceTime(getNextAllowanceTime(app.name));
      setCurrentView(AppView.LOCKED_APP);
      return;
    }
    
    // Check Study Mode Restrictions
    if (isStudyMode && !ALLOWED_STUDY_APPS.includes(app.name)) {
        setLockReason('STUDY_MODE');
        setLockedAppName(app.name);
        setCurrentView(AppView.LOCKED_APP);
        return;
    }

    setCurrentView(app.view);
  };

  const goHome = () => {
    // If driving mode is simulated/active, Home button returns to Driving Hub
    if (isDrivingNow) {
        setCurrentView(AppView.DRIVING);
    } else {
        setCurrentView(AppView.HOME);
    }
    setIsDrawerOpen(false);
  };

  const handleBack = () => {
    if (isDrawerOpen) {
        setIsDrawerOpen(false);
    } else if (currentView !== AppView.HOME && currentView !== AppView.LOCK_SCREEN) {
        if (isDrivingNow && currentView !== AppView.DRIVING) {
             setCurrentView(AppView.DRIVING);
        } else {
             setCurrentView(AppView.HOME);
        }
    }
  };

  const handleToggleQuest = (id: string) => {
    setQuests(prev => prev.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
  };

  const handleTopSwipe = (_: any, info: PanInfo) => {
    // Detect swipe down from top area
    if (info.offset.y > 50 && !isNotificationPanelOpen) {
      setIsNotificationPanelOpen(true);
    }
  };

  const isLightStatusBar = [
    AppView.LOCK_SCREEN, AppView.CAMERA, AppView.MAPS, AppView.MUSIC, AppView.GALLERY
  ].includes(currentView);

  const isLocked = currentView === AppView.LOCK_SCREEN;

  return (
    <div className="w-full h-[100dvh] flex items-stretch sm:items-center justify-center bg-black sm:bg-[#f0f0f0] p-0 sm:p-4 font-sans select-none perspective-[1000px] pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]">
      
      {/* PHONE HARDWARE SHELL - Samsung S24 Ultra Style */}
      <div className="relative w-full h-full sm:w-[390px] sm:h-[844px] max-w-[100vw] max-h-full bg-[#1a1a1a] rounded-none sm:rounded-[24px] shadow-none sm:shadow-[0_0_0_2px_#333,0_0_0_5px_#111,0_20px_50px_-10px_rgba(0,0,0,0.6)] ring-0 sm:ring-1 ring-white/10 transition-all duration-500 overflow-hidden">
        
        {/* Physical Buttons */}
        <div className="hidden sm:block absolute top-32 -right-[6px] w-[4px] h-12 bg-[#2a2a2a] rounded-r-md z-0 shadow-sm"></div>
        <div className="hidden sm:block absolute top-52 -right-[6px] w-[4px] h-20 bg-[#2a2a2a] rounded-r-md z-0 shadow-sm"></div>

        {/* Inner Bezel / Screen Container */}
        <div className="w-full h-full bg-black rounded-none sm:rounded-[20px] overflow-hidden relative border-[3px] border-black">
          
          {/* WALLPAPER LAYER */}
          <div className="absolute inset-0 z-0 bg-black">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center transition-all duration-700"
                  style={{ 
                    filter: isLocked ? 'blur(15px) brightness(0.6)' : 'blur(0px) brightness(0.95)',
                    transform: isLocked ? 'scale(1.15)' : 'scale(1)'
                  }}>
             </div>
             <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
          </div>

          {/* SCREEN CONTENT */}
          <div className="w-full h-full relative flex flex-col">
            
            <StatusBar 
              isOfflineMode={isOfflineMode} 
              lightMode={isLightStatusBar || isDrawerOpen || isNotificationPanelOpen} 
              isDrivingModeEnabled={isDrivingModeEnabled}
            />
            
            {/* Gesture Area for Notification Shade - Transparent overlay at top */}
            {!isLocked && !isNotificationPanelOpen && (
              <motion.div 
                className="absolute top-0 left-0 right-0 h-10 z-[70]"
                onPanEnd={handleTopSwipe}
              />
            )}

            <NotificationPanel 
              isOpen={isNotificationPanelOpen} 
              onClose={() => setIsNotificationPanelOpen(false)} 
              isDrivingModeEnabled={isDrivingModeEnabled}
              onToggleDrivingMode={toggleDrivingMode}
            />
            
            {/* Offline Notification Overlay */}
            <SafetyCacheToast active={showToast} uploading={isUploadingBuffer} bufferCount={locationBuffer} />

            {/* Hole Punch Camera - Centered Small */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-[100] w-3 h-3 bg-black rounded-full shadow-inner ring-1 ring-white/10"></div>
            
            {/* Main Viewport */}
            <div className="flex-1 relative overflow-hidden z-10 flex flex-col">
              <AnimatePresence mode="wait">
                {currentView === AppView.LOCK_SCREEN && (
                  <LockScreenView 
                     key="lockscreen" 
                     onUnlock={() => setCurrentView(AppView.HOME)} 
                     onCamera={() => setCurrentView(AppView.CAMERA)}
                  />
                )}

                {currentView === AppView.HOME && (
                  <HomeView 
                    key="home"
                    apps={INITIAL_APPS} 
                    onOpenApp={handleOpenApp} 
                    onOpenDrawer={() => setIsDrawerOpen(true)}
                    isStudyMode={isStudyMode}
                    allowedStudyApps={ALLOWED_STUDY_APPS}
                  />
                )}
                
                {/* Apps render as full screen overlays */}
                {currentView === AppView.MESSAGES && (
                  <motion.div key="msg" initial={{y: '10%', opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: '10%', opacity: 0}} className="h-full bg-white overflow-hidden">
                    <MessageView contacts={CONTACTS} onBack={goHome} />
                  </motion.div>
                )}

                {currentView === AppView.PHONE && (
                  <motion.div key="phone" initial={{y: '10%', opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: '10%', opacity: 0}} className="h-full bg-white overflow-hidden">
                    <PhoneView onBack={goHome} />
                  </motion.div>
                )}

                {currentView === AppView.SETTINGS && (
                  <motion.div key="settings" initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.95}} className="h-full bg-[#f2f2f2] overflow-hidden">
                    <SettingsView 
                        onBack={goHome}
                        isOfflineMode={isOfflineMode}
                        toggleOfflineMode={toggleOfflineMode}
                        isUploadingBuffer={isUploadingBuffer}
                        onLock={() => setCurrentView(AppView.LOCK_SCREEN)} 
                        isDrivingModeEnabled={isDrivingModeEnabled}
                        toggleDrivingMode={toggleDrivingMode}
                        triggerDrivingSimulation={triggerDrivingSimulation}
                        isStudyMode={isStudyMode}
                        toggleStudyMode={toggleStudyMode}
                    />
                  </motion.div>
                )}

                {currentView === AppView.LOCKED_APP && (
                  <motion.div key="locked" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full w-full">
                    <LockedView appName={lockedAppName} onClose={goHome} reason={lockReason} nextAllowanceTime={nextAllowanceTime} />
                  </motion.div>
                )}

                {currentView === AppView.MATH && (
                  <motion.div key="math" initial={{y: '100%'}} animate={{y: 0}} exit={{y: '100%'}} className="h-full bg-white overflow-hidden">
                    <MathView onClose={goHome} />
                  </motion.div>
                )}

                {currentView === AppView.QUESTS && (
                  <motion.div key="quests" initial={{y: '100%'}} animate={{y: 0}} exit={{y: '100%'}} className="h-full bg-white overflow-hidden">
                    <QuestView quests={quests} onToggleQuest={handleToggleQuest} />
                  </motion.div>
                )}

                {currentView === AppView.EMERGENCY && (
                  <motion.div key="emergency" initial={{y: '100%'}} animate={{y: 0}} exit={{y: '100%'}} className="h-full bg-white overflow-hidden">
                    <SafetyView isOffline={isOfflineMode} bufferCount={locationBuffer} />
                  </motion.div>
                )}

                {currentView === AppView.STORY_TIME && (
                  <motion.div key="story" initial={{y: '100%'}} animate={{y: 0}} exit={{y: '100%'}} className="h-full bg-white overflow-hidden">
                    <StoryView onBack={goHome} isOffline={isOfflineMode} />
                  </motion.div>
                )}

                {currentView === AppView.CAMERA && (
                  <motion.div key="camera" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full bg-black">
                    <CameraView onClose={goHome} />
                  </motion.div>
                )}
                
                {currentView === AppView.GALLERY && (
                  <motion.div key="gallery" initial={{scale: 0.95, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0.95, opacity: 0}} className="h-full bg-white">
                    <GalleryView onBack={goHome} />
                  </motion.div>
                )}

                {currentView === AppView.MAPS && (
                  <motion.div key="maps" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full bg-[#e5e3df]">
                    <MapsView isOffline={isOfflineMode} />
                  </motion.div>
                )}

                {currentView === AppView.MUSIC && (
                  <MusicView key="music" onClose={goHome} />
                )}

                {currentView === AppView.DRIVING && (
                  <DrivingView 
                      key="driving"
                      onDismiss={exitDrivingSimulation} 
                      onEmergency={() => setCurrentView(AppView.PHONE)}
                      onOpenMaps={() => setCurrentView(AppView.MAPS)}
                      onOpenMusic={() => setCurrentView(AppView.MUSIC)}
                  />
                )}
              </AnimatePresence>

              <AppDrawerView 
                apps={INITIAL_APPS} 
                isOpen={isDrawerOpen} 
                onClose={() => setIsDrawerOpen(false)}
                onOpenApp={handleOpenApp}
                isStudyMode={isStudyMode}
                allowedStudyApps={ALLOWED_STUDY_APPS}
              />
            </div>

            {/* Android Navigation Bar - Pinned to bottom, ensures no overlap */}
            {/* Hide nav bar if locked OR in driving mode */}
            {!isLocked && currentView !== AppView.DRIVING && (
                <div className="z-50 relative shrink-0">
                    <SystemNav 
                       onBack={handleBack} 
                       onHome={goHome} 
                       isLightMode={currentView !== AppView.HOME && currentView !== AppView.CAMERA && currentView !== AppView.MAPS && currentView !== AppView.MUSIC && currentView !== AppView.GALLERY}
                    />
                </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
