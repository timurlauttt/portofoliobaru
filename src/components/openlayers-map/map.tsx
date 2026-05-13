'use client';
import React, { useState, useEffect } from 'react';
import { timelineData } from '@/data/site-config';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dynamic imports untuk menghindari SSR issues
import dynamic from 'next/dynamic';
import L from 'leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

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

export default function MapComponent() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Setup Leaflet marker icon
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  }, []);

  const defaultCenter: [number, number] = timelineData.length > 0 ? [timelineData[0].location[1], timelineData[0].location[0]] : [0, 0];

  const handleTimelineClick = (index: number) => {
    setActiveIndex(index);
  };

  if (!isClient) return null;

  return (
    <div className={`relative p-2 sm:p-4 md:p-6 lg:p-8 bg-white dark:bg-black py-8 sm:py-12 md:py-16`}>
      <div className={cn('absolute inset-0', '[background-size:20px_20px]', '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]', 'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]')} />
      <div className="max-w-full mx-auto px-2 sm:px-5 relative z-10">
        <div className="w-full bg-bg border-2 sm:border-4 border-black dark:border-darkBorder dark:bg-darkBg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#555555] dark:sm:shadow-[8px_8px_0px_0px_#555555] transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_#555555] transition-all duration-300 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-black dark:text-darkText text-center">My Journey Through Time & Space 🗺️</h1>
        </div>
        
        {/* Desktop View - Map with Timeline */}
        <div className="hidden md:flex relative gap-0">
          {/* Main Map Container */}
          <div className={`flex-1 border-2 sm:border-4 border-black dark:border-darkBorder bg-white dark:bg-darkBg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#555555] dark:sm:shadow-[8px_8px_0px_0px_#555555] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[750px] rounded-md flex relative overflow-hidden`}>
            {/* Map Section */}
            <div className="flex-1 relative w-full">
              <MapContainer center={defaultCenter} zoom={5} style={{ height: '100%', width: '100%' }} className="w-full h-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {timelineData.map((entry, idx) => (
                  <Marker key={entry.id} position={[entry.location[1], entry.location[0]]} eventHandlers={{ click: () => handleTimelineClick(idx) }}>
                    {activeIndex === idx && (
                      <Popup>
                        <div className="min-w-[200px]">
                          <b className="text-base font-black block mb-2">{entry.popupTitle}</b>
                          <p className="text-sm">{entry.popupDescription}</p>
                        </div>
                      </Popup>
                    )}
                  </Marker>
                ))}
              </MapContainer>
              <div className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-2 px-3 rounded-md border-2 border-black dark:border-darkBorder shadow-md text-xs sm:text-sm text-black dark:text-white font-medium max-w-[200px] sm:max-w-xs">
                Click markers!
              </div>
            </div>
          </div>
          
          {/* Desktop Timeline Sidebar */}
          <div className="w-[380px] lg:w-[420px] bg-white dark:bg-darkBg border-l-2 lg:border-l-4 border-black dark:border-darkBorder flex flex-col overflow-hidden">
            <div className="flex-none flex items-center justify-between p-4 lg:p-6 border-2 lg:border-b-4 border-black dark:border-darkBorder bg-white dark:bg-darkBg sticky top-0">
              <h2 className="font-black text-lg lg:text-xl text-black dark:text-white">Journey Timeline</h2>
            </div>
            <div className="flex-1 overflow-y-auto border-2 border-black p-4 lg:p-6 custom-scrollbar relative">
              {timelineData.map((entry, index) => (
                <TimelineItem key={entry.id} entry={entry} isActive={index === activeIndex} onClick={() => handleTimelineClick(index)} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile View - Timeline Only */}
        <div className="md:hidden">
          <div className="border-2 border-black dark:border-darkBorder bg-white dark:bg-darkBg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#555555] rounded-lg overflow-hidden">
            <div className="bg-white dark:bg-darkBg p-4 border-b-2 border-black dark:border-darkBorder">
              <h2 className="font-black text-lg text-black dark:text-white">My Journey</h2>
            </div>
            <div className="overflow-y-auto max-h-[70vh] p-4">
              {timelineData.map((entry, index) => (
                <TimelineItem key={entry.id} entry={entry} isActive={index === activeIndex} onClick={() => handleTimelineClick(index)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
