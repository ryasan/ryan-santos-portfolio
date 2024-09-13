import clsx from 'clsx';
import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const ns = 'parallax-layout';

type ParallaxLayoutProps = {
  as?: 'section' | 'header' | 'footer';
  children: React.ReactNode;
  className?: string;
  disableParallax?: boolean;
  id: number | null;
};

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const ParallaxLayout = ({
  as: Element = 'section',
  children,
  className,
  disableParallax,
  id,
}: ParallaxLayoutProps) => {
  const rootClassName = clsx({
    [`${ns}`]: true,
    [`${className}`]: className,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  if (id === 1) {
    console.log('scrollYProgress: ', scrollYProgress);
  }

  return (
    <Element className={rootClassName} id={`section-${id}`}>
      <div className={`${ns}__inner`} ref={ref}>
        <div className={`${ns}__content`}>{children}</div>
      </div>

      {typeof id === 'number' && !disableParallax && (
        <motion.div className={`${ns}__text`} style={{ y }}>
          <div className="container">
            <h2>{`#00${id}`}</h2>
          </div>
        </motion.div>
      )}
    </Element>
  );
};

export default ParallaxLayout;
