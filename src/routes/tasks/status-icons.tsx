import { Urgency } from "@/api/task";
import { Circle, CircleAlert, Diamond, Square, TriangleAlert } from "lucide-react";
import { forwardRef } from "react";

export const StatusIcon = forwardRef<HTMLDivElement, { status: string }>(
  ({ status }, ref) => {
    let icon;
    switch (status) {
      case Urgency.critical:
        icon = <CircleAlert color="#8B0000"/>
        break;
      case Urgency.urgent:
        icon = <TriangleAlert color="#FF6347" />
        break;
      case Urgency.high:
        icon = <Circle color="#FFD700" />
        break;
      case Urgency.medium:
        icon = <Square color="#3F00FF" />
        break;
      case Urgency.low:
        icon = <Diamond color="#808080" />
        break;
      default:
        icon = <Diamond color="#808080" />
        break;

    }
    return <span ref={ref} >{icon}</span>;
  });