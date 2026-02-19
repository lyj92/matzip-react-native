import { createPosts } from "@/api/post";
import { UseMutationCustomOptions } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

/**
 *
 * @param mutationOptions
 * @returns
 */
const useMutateCreatePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createPosts,
    ...mutationOptions,
  });
};

export { useMutateCreatePost };
