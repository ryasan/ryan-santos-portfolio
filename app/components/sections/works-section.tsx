import clsx from 'clsx';
import { getClass } from '~/utils';
import SectionScroll from '~/components/section-scroll';

const ns = 'works-section';

type WorksSectionProps = {
  order: number;
};


const WorksSection = ({ order }: WorksSectionProps) => {
  const rootClassName = clsx({
    [`${ns}`]: true,
  });

  return (
    <SectionScroll className={rootClassName} order={order}>
      <div className="container">
        <div className={getClass(ns, 'content')}>
          <h1 className={getClass(ns, 'title')}>Works Section</h1>
        </div>
      </div>
    </SectionScroll>
  );
};

export default WorksSection;
