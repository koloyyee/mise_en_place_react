import { Form } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function FormBody() {

  return (
    <Form>
      <Label> Name </Label>
      <Input type="text" name="name" />
      <Label> Description (optional) </Label>
      <Input type="text" name="description" />
      <Button type="submit"> Submit</Button>
    </Form>
  );
}