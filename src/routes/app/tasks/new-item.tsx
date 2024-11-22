import TaskFormBody from "@/components/tasks/form-body";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

interface NewCardProps {
	columnId: number,
	nextOrer: number,
	onAddCard: () => void;
	onComplete: () => void;
}
export function NewCard() {

	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Create New Task</DialogTitle>
				<DialogDescription>
					Here you can create and assign new task.
				</DialogDescription>
				<div className="grid gap-4 py-4">
					<TaskFormBody isEdit={false} />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
			</DialogHeader>
		</DialogContent>
	);

}