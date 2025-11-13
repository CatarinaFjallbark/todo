export type ListItemData = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  checked: boolean;
};

export type ListItemProps = {
  item: ListItemData;
};
