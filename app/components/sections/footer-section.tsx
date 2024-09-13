import clsx from 'clsx';
import SectionScroll from '~/components/parallax-layout';

const ns = 'footer-section';

type FooterSectionProps = {
  id: number | null;
};

const FooterSection = ({ id }: FooterSectionProps) => {
  const rootClassName = clsx({
    [`${ns}`]: true,
  });

  return (
    <SectionScroll
      className={rootClassName}
      id={id}
      as="footer"
      // disableParallax
    >
      <div className="container">
        <div className={`${ns}__content`}>
          <h1 className={`${ns}__title`}>FOOTER SECTION</h1>
        </div>
      </div>
    </SectionScroll>
  );
};

export default FooterSection;
