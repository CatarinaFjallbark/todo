export type ListItemData = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  checked?: boolean;
};

export type ListItemProps = {
  item: ListItemData;
  onChange: () => void;
  onEdit: (item: ListItemData) => void;
};

export type EditContainerProps = {
  todo: ListItemData;
  onClose: () => void;
  onChange: (todo: ListItemData) => void;
  onDelete: () => void;
};
