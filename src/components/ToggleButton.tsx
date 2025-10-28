import { useState } from "react";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  active: string | React.ReactNode;
  inactive: string | React.ReactNode;
  disabled?: boolean;
}

export default function ToggleButton({
  onClick,
  className,
  inactive,
  active,
  disabled = false,
}: Props) {
  const [isActive, setIsActive] = useState(false);

  return (
    <button className={className}
      onClick={(e) => {
        setIsActive(prev => !prev);
        onClick?.(e);
      }}
      disabled={disabled}>
      {isActive ? active : inactive}
    </button>
  );
}
