import { createPosts } from "@/api/post";
import { UseMutationCustomOptions } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants/keys";
/**
 * 마커 등록 리액트 훅
 * @param mutationOptions
 * @returns
 */
const useMutateCreatePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createPosts,
    onSuccess: () => {
      // 성공 시 마커 조회 리패치
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
    },
    ...mutationOptions,
  });
};

export { useMutateCreatePost };
