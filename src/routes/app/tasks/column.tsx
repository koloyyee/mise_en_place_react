import { ItemMutation, TaskType } from "@/api/task";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ContentTypes, Intent } from "@/types/task";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ActionFunctionArgs, useFetcher, useSubmit } from "react-router-dom";
import Item from "./item";

/**
 * Column is the component represent different status or stage in a board, e.g.: To-Do, Done  
 */

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	console.log(formData);

	return null;
}

interface Column {
	name: string;
	items: TaskType[];
	columnId: number;
	boardId: string;
}
export default function Column({ boardId, columnId, items, name }: Column) {

	const [acceptDrop, setAcceptDrop] = useState(false);
	const [edit, setEdit] = useState(false);
	const listRef = useRef<HTMLUListElement>();

	const submit = useSubmit();


	return (
		<Card
			className={
				"flex-shrink-0 flex flex-col overflow-hidden max-h-full w-80 border-slate-400 rounded-xl shadow-sm shadow-slate-400 bg-slate-100 " +
				(acceptDrop ? `outline outline-2 outline-brand-red` : ``)
			}
			onDragOver={(e) => {
				if (items.length === 0 && e.dataTransfer.types.includes(ContentTypes.card)) {
					e.preventDefault();
					setAcceptDrop(true);
				}
			}}
			onDragLeave={() => {
				setAcceptDrop(false);
			}}
			onDrop={(e) => {
				const transfer = JSON.parse(e.dataTransfer.getData(ContentTypes.card));
				if (!transfer.id || !transfer.name) console.error("id or name missing")
				const mutatedItem: ItemMutation = {
					order: 1,
					columnId: columnId,
					id: transfer.id,
					name: transfer.name
				}
				console.log({ mutatedItem })
				submit({ ...mutatedItem, boardId: boardId, intent: Intent.moveItem },
					{
						method: "POST",
						navigate: false,
						fetcherKey: `card:${transfer.id}`
					}
				)
				setAcceptDrop(false);
			}}
		>
			<CardTitle>
				<EditableText
					fieldName="name"
					value={name}
					inputLabel="Edit column name"
					buttonLabel={`Edit column "${name}" name`}
					inputClass="border border-slate-400 w-full rounded-lg py-1 px-2 font-medium text-black"
					buttonClass="block rounded-lg text-left w-full border border-transparent py-1 px-2 font-medium text-slate-600"
				>
					<input type="hidden" name="intent" value={Intent.updateColumn} />
					<input type="hidden" name="columnId" value={columnId} />
				</EditableText>
			</CardTitle>

			<CardContent>
				<ul>
					{items.sort((a, b) => a.orderNum - b.orderNum)
						.map((item, index) => (
							<Item
								item={item}
								key={"item-" + item.id}
								prevOrder={item[index - 1] ? item[index - 1].orderNum : 0}
								nextOrder={item[index + 1] ? item[index + 1].orderNum : item.orderNum + 1}
							/>
						))}

				</ul>
			</CardContent>
		</Card>
	);
}

function EditableText({
	children,
	fieldName,
	value,
	inputClass,
	inputLabel,
	buttonClass,
	buttonLabel
}: {
	children: React.ReactNode;
	fieldName: string;
	value: string;
	inputClass: string;
	inputLabel: string;
	buttonClass: string;
	buttonLabel: string;
}) {

	const fetcher = useFetcher();
	const [edit, setEdit] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	return (edit ?
		<fetcher.Form
			method="POST"
			onSubmit={() => {
				flushSync(() => {
					setEdit(false)
				})
				buttonRef.current?.focus();
			}}
		>
			{children}
			<input
				required
				ref={inputRef}
				type="text"
				aria-label={inputLabel}
				name={fieldName}
				defaultValue={value}
				className={inputClass}
				onKeyDown={(e) => {
					if (e.key === "Escape") {
						flushSync(() => {
							setEdit(false)
						})
						buttonRef.current?.focus();
					}
				}}
				onBlur={(e) => {
					if (inputRef.current?.value !== value && inputRef.current?.value.trim() !== "") {
						fetcher.submit(e.currentTarget)
					}
					setEdit(false);
				}}
			/>
		</fetcher.Form>
		:
		<button
			aria-label={buttonLabel}
			type="button"
			ref={buttonRef}
			onClick={() => {
				flushSync(() => {
					setEdit(true)
				})
				inputRef.current?.select();
			}}
			className={buttonClass}
		>

			{value || <span className="text-slate-500"> Edit</span>}
		</button>
	);
}