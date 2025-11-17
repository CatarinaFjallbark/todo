import { ListItemData } from "@/types/list";
import ListItem from "./ListItem";
import { toggleTodo } from "@/lib/todos";

export default function ListContainer({
  items,
  setItems
}: {
  items: ListItemData[];
  setItems: (items: ListItemData[]) => void;
}) {
  return (
    <ul className="w-full">
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onChange={async () => {
            const updatedTodo = await toggleTodo(item.id, !item.checked);
            setItems(
              items
                .map((i) => (i.id === item.id ? updatedTodo : i))
                .sort((a, b) => {
                  const aFlag = a.checked ? 1 : 0;
                  const bFlag = b.checked ? 1 : 0;
                  return aFlag - bFlag;
                })
            );
          }}
        />
      ))}
    </ul>
  );
}
