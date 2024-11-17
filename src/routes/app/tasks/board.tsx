import { getBoard, updateTaskOrder } from "@/api/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BoardType, Intent, ItemMutation } from "@/types/task";
import { useState } from "react";
import { ActionFunctionArgs, Form, LoaderFunctionArgs, useLoaderData, useSubmit } from "react-router-dom";
import { ZodError } from "zod";
import Column from "./column";

function parseRearrangeItem(item: ItemMutation) {
	if (!item.id) {
		console.error("id missing")
	}
	if (!item.orderNum) {
		console.error("orderNum missing")
	}
	if (!item.name) {
		console.error("name missing")
	}
	if (!item.columnId) {
		console.error("columnId missing")
	}
	return { id: item.id, name: item.name, columnId: item.columnId, orderNum: item.columnId }
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const intent = formData.get("intent");
	const itemId = Number(formData.get("id"));
	const boardId = String(formData.get("boardId"));
	
	formData.delete("intent");
	const item = Object.fromEntries(formData) as unknown as ItemMutation;
	console.log(Object.fromEntries(formData))
	console.log(item)

	try {
		switch (intent) {
			case Intent.moveItem:
				await updateTaskOrder(boardId, itemId, item);
				break;
			case Intent.createColumn:
				console.log("create column");
				break;

			default:
				break;
		}
	} catch (e) {
		if (e instanceof ZodError) console.error(e.formErrors);
	}
	return {};
}

export async function loader({ params }: LoaderFunctionArgs) {
	const board = await getBoard(String(params.id));
	if (!board || board.status >= 300) {
		throw new Response("Unable to fetch board ", { status: board?.status });
	}
	return { board: await board.json() }
}

export default function Board() {


	/**
	 * Each board will contain a few columns, the column can be created with add button
	 * when the column is created, it will autofocus on the name input, and have a save column button before on blur the column is created by saving on the backend.
	 * 
	 * each column name can be changed by clicking on it, turn it from a button or into an input, 
	 * on blur the input will do a put request to the server up to update the column name.
	 * 
	 * each column can be arrange with drag and drop,
	 * each column will have a list of card(item), we can create card with an add new item button
	 */
	const { board } = useLoaderData() as { board: BoardType };
	console.log({board})

	const submit = useSubmit();
	const [addColumn, setAddColumn] = useState(false);

	return (
		<main>
			{/* create column, the button will turn from a button to input form  */}
			{addColumn ?
				// creating new column with form
				<Form method="POST" onSubmit={(e) => {
					e.preventDefault();
				}}>
					<Input type="text" name="name" id="columnName" />
					<input type="hidden" name="intent" value={Intent.createColumn} />
					<Button aria-label="submit-button" role="submit" type="submit" id="createColumn" />
					<Button aria-label="cancel-button" role="cancel" variant={"outline"} onClick={() => setAddColumn(false)}> cancel </Button>
				</Form>
				:
				<Button type="button" onClick={() => setAddColumn(true)}>  + </Button>
			}
			{/* rerender columns here */}
			<div className="flex gap-5 flex-grow">
				{board?.cols?.map((col, index) => {
					if (col.id && board.id) {
						return <Column key={"col-" + col.id + "-" + index} aria-label="board-column" boardId={board.id} name={col.name} items={col.items ?? []} columnId={col.id}>
						</Column>
					}
				})}
			</div>
		</main>
	);
}