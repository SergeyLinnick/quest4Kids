import { BellIcon } from "../../icons/BellIcon";
import { Button } from "../../ui/button";

export const NotificationButton = ({
  hasNewNotifications,
}: {
  hasNewNotifications: boolean;
}) => {
  return (
    <div className="relative">
      <Button variant="ghost" size="icon" as="span">
        <BellIcon />
      </Button>
      {hasNewNotifications && (
        <div className="absolute top-[20px] right-2 w-2 h-2 bg-destructive rounded-full" />
      )}
    </div>
  );
};
