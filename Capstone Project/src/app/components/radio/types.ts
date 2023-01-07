export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface Props extends InputProps {
  id: string;
  label: string;
  className?: string;
  isSelected?: boolean;
}