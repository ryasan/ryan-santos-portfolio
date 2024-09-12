import clsx from 'clsx';
import { getClass } from '~/utils';
import SectionScroll from '~/components/section-scroll';

const ns = 'hero-section';

type HeroSectionProps = {
  order: number;
};

const HeroSection = ({ order }: HeroSectionProps) => {
  const rootClassName = clsx({
    [`${ns}`]: true,
  });

  return (
    <SectionScroll className={rootClassName} order={order}>
      <div className="container">
        <div className={getClass(ns, 'content')}>
          <h1 className={getClass(ns, 'title')}>Hero Section</h1>
        </div>
      </div>
    </SectionScroll>
  );
};

export default HeroSection;
