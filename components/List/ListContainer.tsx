import { ListContainerProps } from "@/types/todo";
import ListItem from "./ListItem";

export const ListContainer = ({
  items,
  onEdit,
  onToggle
}: ListContainerProps) => {
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
};
