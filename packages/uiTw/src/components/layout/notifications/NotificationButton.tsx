import { BellIcon } from "../../icons/BellIcon";
import { Button } from "../../ui/button";

export const NotificationButton = ({ count }: { count: number }) => {
  return (
    <div className="relative">
      <Button variant="ghost" size="icon" as="span">
        <BellIcon />
      </Button>
      {count > 0 && (
        <div className="absolute top-[20px] right-0 w-4 h-4 bg-destructive rounded-full text-xs font-bold">
          {count}
        </div>
      )}
    </div>
  );
};
