"use client";

import { BotIcon, LoaderIcon } from "@repo/ui-tw";
import { useMutation } from "@tanstack/react-query";
import { DropdownMenu } from "radix-ui";

interface DescriptionButtonProps {
  title?: string;
  description?: string;
  onDescriptionGenerated?: (description: string) => void;
}

const generateDescriptionMutation = async ({
  title,
  type,
}: {
  title: string;
  type: "polite" | "professional" | "review";
}) => {
  const res = await fetch("/api/ai/generate-description", {
    method: "POST",
    body: JSON.stringify({ title, type }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to generate description");
  }

  return res.json();
};

export const DescriptionButton = ({
  title,
  description,
  onDescriptionGenerated,
}: DescriptionButtonProps) => {
  const { mutate: generateDescription, isPending: loading } = useMutation({
    mutationFn: generateDescriptionMutation,
    onSuccess: (data) => {
      if (onDescriptionGenerated && data.description) {
        onDescriptionGenerated(data.description);
      }
    },
    onError: (error) => {
      console.error("Failed to generate description:", error);
    },
  });

  const handleGeneratePoliteDescription = () => {
    if (!title) return;
    generateDescription({ title, type: "polite" });
  };

  const handleGenerateProfessionalDescription = () => {
    if (!title) return;
    generateDescription({ title, type: "professional" });
  };

  const handleReviewDescription = () => {
    if (!description) return;
    generateDescription({ title: description, type: "review" });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {loading ? (
          <LoaderIcon />
        ) : (
          <button
            className="inline-flex size-[35px] items-center justify-center rounded-full  text-violet11 bg-violet-100 hover:bg-violet-200"
            aria-label="Customise options"
          >
            <BotIcon />
          </button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none hover:bg-violet-100 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
            <button onClick={handleGeneratePoliteDescription}>
              Generate Polite Description
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none hover:bg-violet-100 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
            <button onClick={handleGenerateProfessionalDescription}>
              Generate Professional Description
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none hover:bg-violet-100 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
            <button onClick={handleReviewDescription}>
              Review Description
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
