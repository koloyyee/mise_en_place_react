import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Intent } from "@/types/task";
import { useState } from "react";
import { ActionFunctionArgs, Form, LoaderFunctionArgs, useSubmit } from "react-router-dom";

export async function action({request} : ActionFunctionArgs) {
	const formData = await request.formData();

		console.log(Object.fromEntries(formData))
	return {};
}

export async function loader({ params }: LoaderFunctionArgs) {
	const boardId = String(params.boardId);
	const columns = await getColumns(boardId);
	console.log(columns);
	return { columns }
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
	const submit = useSubmit();
	const [addColumn, setAddColumn] = useState(false);

	return (
		<main>
			{/* create column, the button will turn from a button to input form  */}
			{addColumn ?
				// creating new column with form
				<Form method="POST">
					<Input type="text" name="name" id="columnName" />
					<input type="hidden" name="intent" value={Intent.createColumn} />
					<Button type = "submit" id="createColumn" />
					<Button variant={"outline"}  onClick={() => setAddColumn(false)}> cancel </Button>
				</Form>
				:

				<Button type="button" onClick={() => setAddColumn(true)}>  + </Button>
			}
		</main>
	);
}