import { ListItemData } from "@/types/list";
import ListItem from "./ListItem";
import { getTodos, toggleTodo } from "@/lib/todos";

export default function ListContainer({
  items,
  setItems,
  onEdit
}: {
  items: ListItemData[];
  setItems: (items: ListItemData[]) => void;
  onEdit: (item: ListItemData) => void;
}) {
  return (
    <ul className="w-full">
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onChange={async () => {
            await toggleTodo(item.id, !item.checked);
            setItems(await getTodos());
          }}
        />
      ))}
    </ul>
  );
}
