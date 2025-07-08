import React from "react";

// Generic Button component
const Button = ({
  children,
  onClick,
  type = "button",
  className,
  ...props
}) => (
  <button type={type} onClick={onClick} className={className} {...props}>
    {children}
  </button>
);

// Primary Button
export const PrimaryButton = (props) => (
  <Button {...props} className={`primary_button ${props.className || ""}`} />
);

// Secondary Button
export const SecondaryButton = (props) => (
  <Button {...props} className={`secondary_button ${props.className || ""}`} />
);
