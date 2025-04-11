import { Card } from "@repo/ui";
import { MoveIcon } from "@repo/ui-tw";

interface WidgetCardProps {
  children: React.ReactNode;
  title: string;
}

export const WidgetCard = ({ children, title }: WidgetCardProps) => {
  return (
    <Card title={title} className="h-full w-full relative">
      <div className="dragItem absolute top-4 right-4 hover:cursor-move group-hover:opacity-50 opacity-0 transition-opacity duration-300">
        <MoveIcon className="size-4" />
      </div>
      {children}
    </Card>
  );
};
