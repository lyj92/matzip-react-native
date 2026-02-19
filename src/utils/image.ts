import { Image } from "react-native-image-crop-picker";

/**
 * 이미지 함수
 * @param key
 * @param images
 * @returns
 */
function getFormDataImages(key: string = "images", images: Image[]) {
  const formData = new FormData();

  images.forEach(({ path, mime }) => {
    const file = {
      uri: path,
      type: mime,
      name: path.split("/").pop(),
    };

    formData.append(key, file);
  });
  return formData;
}

export { getFormDataImages };
