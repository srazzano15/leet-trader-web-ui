interface ButtonProps {
  text?: string;
  variant?: "primary" | "secondary" | "gradient";
  children?: React.ReactNode;
  classes?: string;
  onClick?: () => void;
  props?: any
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant = "primary",
  children,
  classes = '',
  onClick, 
  ...props
}) => {
  const variants = {
    primary: "",
    secondary: "",
    gradient:
      " transition rounded-xl text-sm py-2 px-4 font-medium text-white bg-gradient-to-r from-green-600 via-emerald-500 to-yellow-300 hover:opacity-80",
  };
  if (children) return <button onClick={onClick} className={classes}>{children}</button>;

  return <button onClick={onClick} className={`${variants[variant]} ${classes}`}>{text}</button>;
};

export default Button;
