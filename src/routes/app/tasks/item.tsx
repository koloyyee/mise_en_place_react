import { Card, CardTitle } from "@/components/ui/card";
import { ContentTypes, Intent, ItemMutation, TaskType } from "@/types/task";
import { useState } from "react";
import { useSubmit } from "react-router-dom";


interface ItemProp {
  item: TaskType;
  nextOrder: number;
  prevOrder: number;
}

export default function Item({
  item,
  nextOrder,
  prevOrder

}: ItemProp) {

  const { id, orderNum, columnId, name } = item;
  const submit = useSubmit();
  const [acceptDrop, setAcceptDrop] = useState<"none" | "top" | "bottom">("none");
  return (
    <li
      className={
        "border-t-2 border-b-2 -mb-[2px] last:mb-0 cursor-grab active:cursor-grabbing px-2 py-1 " +
        (acceptDrop === "top"
          ? "border-t-brand-red border-b-transparent"
          : acceptDrop === "bottom"
            ? "border-b-brand-red border-t-transparent"
            : "border-t-transparent border-b-transparent")
      }
      onDragOver={(e) => {
        if (e.dataTransfer.types.includes(ContentTypes.card)) {
          e.preventDefault();
          e.stopPropagation();
          const rect = e.currentTarget.getBoundingClientRect();
          const midpoint = (rect.top + rect.bottom) / 2;
          setAcceptDrop(e.clientY <= midpoint ? "top" : "bottom");
        }
      }}
      onDragLeave={() => setAcceptDrop("none")}
      onDrop={(e) => {
        e.stopPropagation();
        const transfer = JSON.parse(e.dataTransfer.getData(ContentTypes.card));
        if (!transfer.id) console.error("id is missing")
        if (!transfer.name) console.error("name is missing")
        const droppedOrder = acceptDrop === "top" ? prevOrder : nextOrder;
        const moveOrder = (droppedOrder + Number(orderNum)) / 2;

        const mutation: ItemMutation = {
          orderNum: moveOrder,
          columnId: columnId,
          id: transfer.id,
          name: transfer.name,
        }


        submit({ ...mutation, boardId: item.boardId, intent: Intent.moveItem }, {
          method: "PUT",
          navigate: false,
          fetcherKey: `card:${transfer.id}`
        })
      }}
    >
      <Card
        id={"item-" + id}
        draggable
        className="p-3 my-2"
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = "move";
          console.log("moving " + id + name)
          e.dataTransfer.setData(ContentTypes.card, JSON.stringify({ id, name }))
        }}
      >
        <CardTitle>
          {name}
        </CardTitle>
      </Card>
    </li>
  );
}