import { Post } from "@/types/domain";
import axiosInstance from "./axios";

/**
 * post 생성
 * @param body 요청 데이터
 * @return Post 타입 데이터 반환
 */
async function createPosts(body: Omit<Post, "id">): Promise<Post> {
  const { data } = await axiosInstance.post(`/posts/`, body);

  return data;
}

export { createPosts };
