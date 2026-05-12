import React from 'react';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiLaravel,
  SiDjango,
  SiReact,
  SiMysql,
  SiGit,
  SiPhp,
  SiPython,
  SiBootstrap,
  SiTailwindcss,
} from 'react-icons/si';
import { IconType } from 'react-icons';
import { skills as siteSkills } from '@/data/site-config';

// Map icon names from config to actual icon components

export const iconMap = {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiLaravel,
  SiDjango,
  SiReact,
  SiMysql,
  SiGit,
  SiPhp,
  SiPython,
  SiBootstrap,
  SiTailwindcss,
};

const SkillsShowcase = () => {
  const skills = siteSkills.map((skill) => ({
    text: skill.text,
    Icon: iconMap[skill.icon as keyof typeof iconMap] || SiGit,
  }));

  return (
    <div className="max-w-5xl mx-auto my-6 sm:my-8 md:my-12 px-3 sm:px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10">
        Skills
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="
                            bg-gray-900 
                            text-white 
                            rounded-lg 
                            p-3
                            sm:p-4
                            md:p-6 
                            flex 
                            flex-col 
                            items-center 
                            justify-center 
                            space-y-1.5
                            sm:space-y-2
                        "
          >
            <skill.Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            <span className="text-xs sm:text-sm md:text-lg font-bold text-center">
              {skill.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsShowcase;
