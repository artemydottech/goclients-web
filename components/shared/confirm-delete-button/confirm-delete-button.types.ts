export interface ConfirmDeleteButtonProps {
  title: string;
  description: string;
  isPending: boolean;
  onConfirm: () => void;
}
