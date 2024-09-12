import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import type { MetaFunction } from '@netlify/remix-runtime';
import type { LinksFunction } from '@remix-run/node';

import styles from '~/styles/main.css?url';
import FooterSection from '~/components/sections/footer-section';
// import HeaderSection from '~/components/sections/header-section';
import HeroSection from '~/components/sections/hero-section';
import WorksSection from '~/components/sections/works-section';

export const meta: MetaFunction = () => {
  return [
    { title: 'Ryan Santos Portfolio' },
    {
      name: 'description',
      content: 'A portfolio site showcasing the works of Ryan Santos',
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
    },
    { rel: 'stylesheet', href: styles, loader: 'sass' },
  ];
};

export default function Index() {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleScroll = () => {
    console.log({handleScroll});
    // setActiveSection(index);
  };

  return (
    <div onScroll={handleScroll}>
      {/* <HeaderSection /> */}

      {[HeroSection, WorksSection, FooterSection].map((Section, index) => (
        <Section
          key={index}
          order={index + 1}
        />
      ))}

      <motion.div
        style={{
          background: 'white',
          bottom: 100,
          height: 5,
          left: 0,
          position: 'fixed',
          right: 0,
          scaleX,
        }}
      />
    </div>
  );
}
