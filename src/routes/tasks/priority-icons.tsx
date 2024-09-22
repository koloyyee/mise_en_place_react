import { Priority } from "@/api/task";
import { Circle, CircleAlert, Diamond, Square, TriangleAlert } from "lucide-react";
import { forwardRef } from "react";

export const PriorityIcon = forwardRef<HTMLDivElement, { priority: string }>(
  ({ priority }, ref) => {
    let icon;
    switch (priority) {
      case Priority.critical:
        icon = <CircleAlert color="#8B0000"/>
        break;
      case Priority.urgent:
        icon = <TriangleAlert color="#FF6347" />
        break;
      case Priority.high:
        icon = <Circle color="#FFD700" />
        break;
      case Priority.medium:
        icon = <Square color="#3F00FF" />
        break;
      case Priority.low:
        icon = <Diamond color="#808080" />
        break;
      default:
        icon = <Diamond color="#808080" />
        break;

    }
    return <span ref={ref} >{icon}</span>;
  });