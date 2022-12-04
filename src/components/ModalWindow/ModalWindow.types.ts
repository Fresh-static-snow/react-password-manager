export interface IModalWindow {
  id?: string;
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}
