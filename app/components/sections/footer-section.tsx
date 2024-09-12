import clsx from 'clsx';
import { getClass } from '~/utils';
import SectionScroll from '~/components/section-scroll';

const ns = 'footer-section';

type FooterSectionProps = {
  order: number;
};

const FooterSection = ({ order }: FooterSectionProps) => {
  const rootClassName = clsx({
    [`${ns}`]: true,
  });

  return (
    <SectionScroll className={rootClassName} order={order} as="footer">
      <div className="container">
        <div className={getClass(ns, 'content')}>
          <h1 className={getClass(ns, 'title')}>Footer Section</h1>
        </div>
      </div>
    </SectionScroll>
  );
};

export default FooterSection;
