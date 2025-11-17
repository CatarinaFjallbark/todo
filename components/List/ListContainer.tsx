import { ListItemData } from "@/types/todo";
import ListItem from "./ListItem";

export default function ListContainer({
  items,
  onEdit,
  onToggle
}: {
  items: ListItemData[];
  setItems: (items: ListItemData[]) => void;
  onEdit: (item: ListItemData) => void;
  onToggle: (item: ListItemData) => void;
}) {
  return (
    <ul className="w-full">
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onChange={() => onToggle(item)}
        />
      ))}
    </ul>
  );
}
