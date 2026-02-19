import axiosInstance from "./axios";

/**
 * 이미지 업로드 api
 * @param body
 * @returns
 */
async function uploadImages(body: FormData): Promise<string[]> {
  const { data } = await axiosInstance.post(`/images`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export { uploadImages };
