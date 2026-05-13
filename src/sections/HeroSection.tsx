'use client';
import { TypeAnimation } from 'react-type-animation';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import ronitImage from '@/media/aku.png';
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
import Image from 'next/image';
import { DialogComponent } from '@/components/getInTouchDialog';
import ChatbotToggle from '@/components/ChatbotToggle';
import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { siteConfig, siteUrls, skills as siteSkills } from '@/data/site-config';
import { IconType } from 'react-icons';

// Map icon names from config to actual icon components
export const iconMap: Record<string, IconType> = {
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

// Memoize skills array to prevent re-creation on every render
const skills = siteSkills.map((skill) => ({
  text: skill.text,
  Icon: iconMap[skill.icon] || SiGit,
}));

const HeroSection = memo(function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const socialIconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.4,
      },
    },
  };

  // Adjust buttonVariants to remove hover effects and delay appearance
  const buttonVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 1.5, // Delay the button's appearance after marquee
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const marqueeContainerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 1.2,
      },
    },
  };

  return (
    <header className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white dark:bg-black overflow-hidden py-12 sm:py-16 md:py-20 lg:py-0">
      {/* Grid background */}
      <div
        className={cn(
          'absolute inset-0',
          '[background-size:20px_20px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <motion.div
        className="mx-auto w-full max-w-7xl px-6 lg:px-8 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between relative z-10 flex-1 gap-6 sm:gap-8 lg:gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start order-2 lg:order-1 space-y-4 sm:space-y-5 md:space-y-6">
          <motion.div variants={itemVariants}>
            <TypeAnimation
              className="text-lg sm:text-xl md:text-2xl font-bold text-[#2b55ff] dark:text-[#4b6fff] relative z-10"
              sequence={siteConfig.greetings}
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading leading-tight"
          >
            I&#39;m {siteConfig.name}. 👋
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg lg:text-lg font-normal leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl"
          >
            {siteConfig.bio}
          </motion.p>

          <motion.div
            className="flex flex-col items-center lg:items-start gap-4 sm:gap-5 md:gap-6 w-full"
            variants={itemVariants}
          >
            <div className="flex space-x-5 sm:space-x-6 md:space-x-7">
              <motion.a
                href={siteUrls.github}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FaGithub className="text-3xl sm:text-3xl md:text-4xl text-gray-800 dark:text-white hover:text-cerulean-400 transition-colors duration-300" />
              </motion.a>
              <motion.a
                href={siteUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FaLinkedin className="text-3xl sm:text-3xl md:text-4xl text-gray-800 dark:text-white hover:text-cerulean-400 transition-colors duration-300" />
              </motion.a>
              <motion.a
                href={siteUrls.email}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FaEnvelope className="text-3xl sm:text-3xl md:text-4xl text-gray-800 dark:text-white hover:text-cerulean-400 transition-colors duration-300" />
              </motion.a>
            </div>

            {/* Contact button */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileTap="tap"
              className="relative z-10"
            >
              <DialogComponent
                triggerButtonText="Get in Touch!"
                dialogTitle="Get in Touch"
                dialogDescription="Please fill out the form below to get in touch with me."
                inputLabels={{ name: 'Name', email: 'Email', message: 'Message' }}
                buttonClassName="h-11 sm:h-12 md:h-12 text-sm sm:text-base md:text-base font-heading px-6 sm:px-8"
              />
            </motion.div>

            {/* Chatbot button - mobile only */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 lg:hidden"
            >
              <ChatbotToggle />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="hidden lg:flex w-full lg:w-1/2 mt-2 lg:mt-0 justify-center lg:justify-end order-1 lg:order-2"
          variants={itemVariants}
        >
          <Image
            src={ronitImage}
            alt={siteConfig.name}
            priority // This is above the fold, so load it immediately
            width={400}
            height={400}
            sizes="(max-width: 480px) 180px, (max-width: 640px) 220px, (max-width: 768px) 280px, (max-width: 1024px) 350px, 450px"
            className="w-auto h-auto max-w-[180px] sm:max-w-[220px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[450px]"
            placeholder="blur"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-full z-0"
        variants={marqueeContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <Marquee
          className="border-t-border dark:border-t-darkBorder dark:bg-secondaryBlack border-t-2 border-b-2 border-b-border dark:border-b-darkBorder bg-white py-2 sm:py-3 lg:py-5 font-base"
          direction="left"
          speed={70}
          loop={0}
          gradientWidth={50}
        >
          {' '}
          {skills.map((skill, id) => (
            <motion.div
              className="flex items-center mx-4 sm:mx-6 lg:mx-8"
              key={id}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            >
              <skill.Icon className="text-2xl sm:text-3xl lg:text-4xl mr-2 sm:mr-3" />
              <span className="text-lg sm:text-xl lg:text-2xl font-heading">{skill.text}</span>
            </motion.div>
          ))}
        </Marquee>
      </motion.div>

      {/* Chatbot positioned above the marquee in bottom-right corner on desktop */}
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:block absolute bottom-20 right-4 z-10 xl:bottom-24"
      >
        <ChatbotToggle />
      </motion.div>
    </header>
  );
});

export default HeroSection;
