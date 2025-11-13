import ListItem from "./ListItem";

export default function List() {
  const items = [
    {
      title: "test",
      description: "testDesc",
      id: "dkldkmsl",
      dueDate: "2022",
      checked: false,
    },
    {
      title: "test",
      description: "testDesc",
      id: "4rfe",
      dueDate: "2022",
      checked: true,
    },
  ];
  return (
    <ul className="w-full">
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
