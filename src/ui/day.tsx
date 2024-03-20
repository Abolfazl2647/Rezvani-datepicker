import { ButtonHTMLAttributes } from "react";

interface DayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function DayButton(props: DayButtonProps) {
  return <button {...props} />;
}
