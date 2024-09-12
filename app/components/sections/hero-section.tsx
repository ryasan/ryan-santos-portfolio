import clsx from "clsx";
import { getClass } from "~/utils";

const ns = "hero-section";

// type Props = {
// };

const HeroSection = () => {
  const rootClassName = clsx({
    [`${ns}`]: true,
  });

  return (
    <div className={rootClassName}>
      <div className="container">
        <div className={getClass(ns, "content")}>
          <h1 className={getClass(ns, "title")}>Ryan Santos</h1>
          <p className={getClass(ns, "subtitle")}>Frontend Developer</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
