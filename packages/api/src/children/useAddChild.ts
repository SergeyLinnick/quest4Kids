// import { useMutation } from "@tanstack/react-query";
// import { customRevalidatePath } from "../_common/revalidatePath";
// import { customRevalidateTag } from "../_common/revalidateTag";
// import { userService } from "./services";
// import { ICreateChild } from "./types";

// // Does not use in this project.
// // It is an example of how to use the useMutation hook.

// export const useAddChild = ({
//   onSuccess,
// }: {
//   onSuccess?: () => void;
// } = {}) => {
//   // const queryClient = useQueryClient();

//   const {
//     mutate: addChild,
//     isPending: isLoading,
//     error,
//   } = useMutation<ICreateChild, Error, ICreateChild>({
//     mutationFn: userService.addChild,
//     onSuccess: (data) => {
//       // queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CHILDREN] });

//       customRevalidatePath("/kids");
//       customRevalidateTag("children-list");

//       onSuccess?.();
//       // toast.success("Child Added");
//     },
//     onError: (error) => {
//       console.error("Error creating child:", error);
//     },
//   });

//   return { addChild, isLoading, error };
// };
