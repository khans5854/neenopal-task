export interface ContextMenuProps {
  id: string;
  top?: number | boolean;
  left?: number | boolean;
  right?: number | boolean;
  bottom?: number | boolean;
  onClick?: () => void;
}
