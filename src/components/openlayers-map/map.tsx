'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { timelineData } from '@/data/site-config';
import { Menu, ChevronLeft, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const MapContainer = dynamic(
  () => import('react-leaflet').then(m => m.MapContainer),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-200">Loading map...</div> }
);
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const LeafletPopup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

const TimelineItem: React.FC<{ entry: typeof timelineData[0]; isActive: boolean; onClick: () => void }> = ({ entry, isActive, onClick }) => (
  <div onClick={onClick} className={`relative cursor-pointer w-full transition-colors duration-200 rounded-md pl-10 sm:pl-14 md:pl-16 pr-2 sm:pr-4 py-3 sm:py-4 border-l-4 border-transparent ${isActive ? 'bg-yellow-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
    <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-black dark:bg-white rounded-full z-10"></div>
    <div className="flex-1">
      <h3 className="font-black text-base sm:text-lg md:text-xl mb-1">{entry.title}</h3>
      <p className="text-xs sm:text-sm font-mono font-bold text-gray-600 dark:text-gray-400">{entry.date}</p>
      <p className="mt-1.5 sm:mt-2 text-sm sm:text-base leading-relaxed">{entry.description}</p>
      <div className="mt-2 sm:mt-3 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
        <MapPin size={14} className="sm:w-4 sm:h-4" />
        <span>{entry.locationName}</span>
      </div>
    </div>
  </div>
);

const TimelineContainer: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => (
  <div className={`absolute top-0 left-0 h-full w-full sm:w-[380px] md:w-[420px] bg-white/95 dark:bg-darkBg/95 backdrop-blur-md border-r-2 sm:border-r-4 border-black dark:border-darkBorder transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-20 flex flex-col overflow-hidden ${!isOpen ? 'invisible md:visible' : 'visible'}`}>
    <div className="flex-none flex items-center justify-between p-3 sm:p-4 border-b-2 sm:border-b-4 border-black dark:border-darkBorder bg-white dark:bg-darkBg">
      <h2 className="font-black text-lg sm:text-xl text-black dark:text-white">Journey Timeline</h2>
      <button onClick={onClose} className="p-2 bg-black dark:bg-darkBg text-white dark:text-darkText hover:bg-gray-800 dark:hover:bg-black transition-colors rounded md:hidden" aria-label="Close timeline">
        <ChevronLeft size={24} />
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 custom-scrollbar relative">
      {children}
    </div>
  </div>
);

export default function MapComponent() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTimelineOpen, setIsTimelineOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const defaultCenter: [number, number] = timelineData.length > 0 ? [timelineData[0].location[1], timelineData[0].location[0]] : [0, 0];

  const handleTimelineClick = (index: number) => {
    setActiveIndex(index);
    if (isMobile) {
      setIsTimelineOpen(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="relative p-2 sm:p-4 md:p-6 lg:p-8 bg-white dark:bg-black py-8 sm:py-12 md:py-16">
      <div className={cn('absolute inset-0', '[background-size:20px_20px]', '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]', 'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]')} />
      <div className="max-w-full mx-auto px-2 sm:px-5 relative z-10">
        <div className="w-full bg-bg border-2 sm:border-4 border-black dark:border-darkBorder dark:bg-darkBg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#555555] dark:sm:shadow-[8px_8px_0px_0px_#555555] transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_#555555] transition-all duration-300 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-black dark:text-darkText text-center">My Journey Through Time & Space 🗺️</h1>
        </div>
        <div className="relative border-2 sm:border-4 border-black dark:border-darkBorder bg-white dark:bg-darkBg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#555555] dark:sm:shadow-[8px_8px_0px_0px_#555555] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[750px] overflow-hidden rounded-md">
          <MapContainer center={defaultCenter} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {timelineData.map((entry, idx) => (
              <Marker key={entry.id} position={[entry.location[1], entry.location[0]]} eventHandlers={{ click: () => handleTimelineClick(idx) }}>
                {activeIndex === idx && (
                  <LeafletPopup>
                    <div className="min-w-[200px]">
                      <b className="text-base font-black block mb-2">{entry.popupTitle}</b>
                      <p className="text-sm">{entry.popupDescription}</p>
                    </div>
                  </LeafletPopup>
                )}
              </Marker>
            ))}
          </MapContainer>
          <TimelineContainer isOpen={isTimelineOpen} onClose={() => setIsTimelineOpen(false)}>
            {timelineData.map((entry, index) => (
              <TimelineItem key={entry.id} entry={entry} isActive={index === activeIndex} onClick={() => handleTimelineClick(index)} />
            ))}
          </TimelineContainer>
          {isMobile && !isTimelineOpen && (
            <button onClick={() => setIsTimelineOpen(true)} aria-label="Open timeline" className="absolute top-4 left-4 z-30 p-3 bg-bg dark:bg-darkBg text-black dark:text-darkText border-4 border-black dark:border-white rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
              <Menu size={24} />
            </button>
          )}
          <div className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-2 px-3 rounded-md border-2 border-black dark:border-darkBorder shadow-md text-xs sm:text-sm text-black dark:text-white font-medium max-w-[200px] sm:max-w-xs">
            Click markers or timeline items to explore!
          </div>
        </div>
      </div>
    </div>
  );
}
