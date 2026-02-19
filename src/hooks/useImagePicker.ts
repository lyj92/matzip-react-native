import { getFormDataImages } from "@/utils/image";
import ImageCropPicker from "react-native-image-crop-picker";
import useMutationImages from "@/hooks/queries/useMutationImages";
import { useState } from "react";
import { ImageUri } from "@/types/domain";
import Toast from "react-native-toast-message";

/**
 * 이미지 선택 커스텀 훅
 */
function useImagePicker() {
  const uploadImages = useMutationImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>([]);

  // 이미지 추가 함수
  const addImageUris = (uris: string[]) => {
    setImageUris((prev) => [...prev, ...uris.map((uri) => ({ uri }))]);
  };

  // 이미지 삭제 함수
  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter((image) => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const handleChangeImage = () => {
    ImageCropPicker.openPicker({
      mediaType: "photo",
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
    })
      .then((images) => {
        const formData = getFormDataImages("images", images);
        uploadImages.mutate(formData, {
          onSuccess: (data) => addImageUris(data),
        });
      })
      .catch((error) => {
        // 권한 체크 문구
        if (error.code !== "E_PICKER_CANCELED") {
          Toast.show({
            type: "error",
            text1: "권한을 허용했는지 확인해주세요.",
            position: "bottom",
          });
        }
      });
  };

  return { handleChangeImage, imageUris, delete: deleteImageUri };
}

export default useImagePicker;
