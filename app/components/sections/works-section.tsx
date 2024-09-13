import clsx from 'clsx';
import SectionScroll from '~/components/parallax-layout';

const ns = 'works-section';

type WorksSectionProps = {
  id: number | null;
};


const WorksSection = ({ id }: WorksSectionProps) => {
  const rootClassName = clsx({
    [`${ns}`]: true,
  });

  return (
    <SectionScroll className={rootClassName} id={id}>
      <div className="container">
        <div className={`${ns}__content`}>
          <h1 className={`${ns}__title`}>WORKS SECTION</h1>
        </div>
      </div>
    </SectionScroll>
  );
};

export default WorksSection;
