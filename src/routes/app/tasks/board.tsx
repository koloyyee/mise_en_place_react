
/**
 * Task 1:
 * about to rearrange the order the tasks inside a board.
 * 
 * Task 2:
 * able to move a task from a board to another board.
 */

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Params } from "react-router-dom";
 
export async function loader({params} : {params: Params}) {
	const uuid = String(params.id);
	console.log(uuid)
	return {uuid}
}

/**
 * Task 1
 */
export default function Board() {

	const t = ["A", "B", "C"];
	const [tasks, setTasks] = useState(t);
	const [draggedTaskIndex, setDraggedTaskIndex] = useState<null | number>(null);
	const [targetTaskIndex, setTargetTaskIndex] = useState<null | number>(null);



	function handleDragStart(e: React.DragEvent<HTMLElement>, index: number) {
		const curr = e.currentTarget;
		curr.style.opacity = "0.4";

		// setDragSrcEl(curr);
		setDraggedTaskIndex(index);
		console.log("start: ", { index, draggedTaskIndex, targetTaskIndex })
		e.dataTransfer.effectAllowed = "move";
		// e.dataTransfer.setData("text/html", curr.innerHTML);

	}

	function handleDragEnd(e: React.DragEvent<HTMLElement>) {
		const curr = e.currentTarget;
		curr.style.opacity = "1";
		curr.classList.remove("over");
	}
	function handleDragOver(e: React.DragEvent<HTMLElement>, index: number) {
		e.preventDefault();
		setTargetTaskIndex(index)
		console.log({ draggedTaskIndex, targetTaskIndex })

		return false;
	}

	function handleDragEnter(e: React.DragEvent<HTMLElement>, index: number) {
		const curr = e.currentTarget;
		curr.classList.add("over")

		// setDraggedTaskIndex(index);
		// console.log("enter: ", { draggedTaskIndex, targetTaskIndex })
	}
	function handleDragLeave(e: React.DragEvent<HTMLElement>) {
		const curr = e.currentTarget;
		setTargetTaskIndex(null)
		curr.classList.remove("over")
	}


	/**
	 *	The crux of the logic, 
	 * because React is functional therefore we need to overwrite the tasks with new tasks that has been swapped 
	 * 
	 * @param e 
	 * @returns 
	 */
	function handleDrag(e: React.DragEvent<HTMLElement>) {
		e.stopPropagation();
		if (draggedTaskIndex !== null && targetTaskIndex !== null) {

			const updatedTasks = [...tasks];
			const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);
			updatedTasks.splice(targetTaskIndex, 0, draggedTask)

			setTasks(updatedTasks);
			setDraggedTaskIndex(null);
		}
		return false;
	}

	return (
		<Card className="p-5">
			{tasks.map((t, i) => (
				<Card key={t + i * 10} id={t + i}
					draggable
					onDragStart={(e) => handleDragStart(e, i)}
					onDragOver={(e) => handleDragOver(e, i)}
					onDragEnter={(e) => handleDragEnter(e, i)}
					onDragEnd={handleDragEnd}
					onDragLeave={handleDragLeave}
					onDrag={(e) => handleDrag(e)}
				>
					<CardContent> {t}</CardContent>
				</Card>
			))}
		</Card>
	);
}