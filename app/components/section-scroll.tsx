import clsx from 'clsx';
import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { getClass } from '~/utils';

const ns = 'section-scroll';

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  order: number;
};

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const SectionScroll = ({
  as: Element = 'section',
  children,
  className,
  order,
}: Props) => {
  const rootClassName = clsx({
    [`${ns}`]: true,
    [`${className}`]: className,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <Element className={rootClassName}>
      <div className={getClass(ns, 'inner')} ref={ref}>
        <div className={getClass(ns, 'content')}>{children}</div>

        <motion.div style={{ y }}>
          <div className="container">
            <h2>{`#00${order}`}</h2>
          </div>
        </motion.div>
      </div>
    </Element>
  );
};

export default SectionScroll;
