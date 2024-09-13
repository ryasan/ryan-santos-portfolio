import clsx from 'clsx';
import SectionScroll from '~/components/parallax-layout';

const ns = 'hero-section';

type HeroSectionProps = {
  id: number | null;
};

const HeroSection = ({ id }: HeroSectionProps) => {
  const rootClassName = clsx({
    [`${ns}`]: true,
  });

  return (
    <SectionScroll className={rootClassName} id={id}>
      <div className="container">
        <div className={`${ns}__content`}>
          <h1 className={`${ns}__title`}>HERO SECTION</h1>
        </div>
      </div>
    </SectionScroll>
  );
};

export default HeroSection;
