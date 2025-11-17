import { useEffect, useState } from "react";

interface Props {
  // onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: (_?:boolean)=>any;
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

  const handleClick = () => {
    const next = !isActive;
    setIsActive(next);
    onClick?.(next); // called once per click
  };

  return (
    <button className={className} onClick={handleClick} disabled={disabled}>
      {isActive ? active : inactive}
    </button>
  );
}
