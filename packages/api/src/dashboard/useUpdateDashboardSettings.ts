import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { dashboardService } from "./services";
import { IWidgetSettings } from "./types";

export const useUpdateDashboardSettings = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  // const queryClient = useQueryClient();
  const { data: session } = useSession();

  const {
    mutate: updateDashboardSettings,
    isPending: isLoading,
    error,
  } = useMutation<IWidgetSettings[], Error, IWidgetSettings[]>({
    mutationFn: (settings: IWidgetSettings[]) => {
      if (!session) {
        throw new Error("No session available");
      }
      return dashboardService.updateDashboardSettings(settings, session);
    },
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CHILDREN] });

    //   customRevalidatePath("/kids");
    //   customRevalidateTag("children-list");

    //   onSuccess?.();
    //   // toast.success("Child Added");
    // },
    onError: (error) => {
      console.error("Error updating dashboard settings:", error);
    },
  });

  return { updateDashboardSettings, isLoading, error };
};
