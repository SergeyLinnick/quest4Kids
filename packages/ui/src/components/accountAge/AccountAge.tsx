"use client";

import { Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface AccountAgeProps {
  createdAt: string | undefined; // ISO
}

const AccountAge = ({ createdAt }: AccountAgeProps) => {
  const [daysOld, setDaysOld] = useState<number | null>(null);

  useEffect(() => {
    if (!createdAt) return;

    const calculateDaysOld = () => {
      const creationDate = new Date(createdAt);
      const currentDate = new Date();

      // Calculate the difference in milliseconds
      const diffInMs = currentDate.getTime() - creationDate.getTime();

      // Convert milliseconds to days
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      setDaysOld(diffInDays);
    };

    calculateDaysOld();
  }, [createdAt]);

  if (!createdAt) return null;

  if (daysOld === null) {
    return <p>Loading...</p>;
  }

  return (
    <Text as="span" size="1" color="sky">
      Created {daysOld} day{daysOld !== 1 ? "s" : ""} ago.
    </Text>
  );
};

export default AccountAge;
