export type ListItemData = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  checked?: boolean;
};

export type PaginationData = {
  page: number;
  totalPages: number;
};

export type ListItemsPaginationData = PaginationData & {
  items: ListItemData[];
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
  onDelete: (todo: ListItemData) => void;
};

export type PaginationProps = {
  totalPages: number;
  currentPage: number | undefined;
  onPageChange: (page: number) => void;
};

export type SearchInputProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export type SortContainerProps = {
  checkedLast?: boolean;
  onToggle: (ascending: boolean) => void;
};

export type UploadButtonProps = {
  onClick: () => void;
  className?: string;
};

export type ListContainerProps = {
  items: ListItemData[];
  setItems: (items: ListItemData[]) => void;
  onEdit: (item: ListItemData) => void;
  onToggle: (item: ListItemData) => void;
};

export type InputContainerProps = {
  onAdd: (title: string) => void;
};
