export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}
