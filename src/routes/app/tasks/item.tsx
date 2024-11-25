import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContentTypes, Intent, ItemMutation, TaskType } from "@/types/task";
import { useState } from "react";
import { useSubmit } from "react-router-dom";
import TaskFormBody from "./item-form-body";

/**
 * The idea of "moving" is not about actually shifting but rather sending a request
 * and mutate the database record and update the frontend.
 */ 

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

  const { id, orderNum, columnId, name, boardId} = item;
  const submit = useSubmit();
  const [acceptDrop, setAcceptDrop] = useState<"none" | "top" | "bottom">("none");
	const [edit, setEdit] = useState(false);

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
          e.dataTransfer.setData(ContentTypes.card, JSON.stringify({ id, name }))
        }}
      >
        <CardTitle className="flex justify-between">
          {name}
				<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline">✍️</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[69rem]">
								<DialogHeader>
									<DialogTitle>Create New Task</DialogTitle>
									<DialogDescription>
										Here you can create and assign new task.
									</DialogDescription>
									<div className="grid gap-4 py-4">
										<TaskFormBody isEdit={true}
											columnId={columnId}
											boardId={boardId}
											nextOrder={item.orderNum}
											onAddCard={() => {}}
											onComplete={() => setEdit(false)} 
											intent={Intent.updateItem}
											task = { item}
											/>
									</div>
								</DialogHeader>
							</DialogContent>
						</Dialog>
        </CardTitle>
      </Card>
    </li>
  );
}