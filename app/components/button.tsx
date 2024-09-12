import clsx from "clsx";

const ns = "button";

// type Props = {}

const Button = () => {
  const rootClassName = clsx({
    [`${ns}`]: true,
  });

  return <button className={rootClassName}>Button</button>;
};

export default Button;
