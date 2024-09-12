import clsx from "clsx";
import { getClass } from "~/utils";

const ns = "header-section";

const HeaderSection = () => {
  const rootClassName = clsx({
    [`${ns}`]: true,
  });

  return (
    <div className={rootClassName}>
      <div className="container-fluid">
				<nav className={getClass(ns, "nav")}>
					Header Nav
				</nav>
			</div>
    </div>
  );
};

export default HeaderSection;
