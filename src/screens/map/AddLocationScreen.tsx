import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import useForm from "@/hooks/useForm";
import { MapStackParamList } from "@/types/navigation";
import { validateAddPost } from "@/utils/validation";
import { StackScreenProps } from "@react-navigation/stack";

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useGetAddress from "@/hooks/useGetAdress";
import DatePicker from "react-native-date-picker";
import { getDateWithSeparater } from "@/utils/date";
import MarkerColorInput from "@/components/MarkerColorInput";
import { colors } from "@/constants/colors";
import ScoreInput from "@/components/ScoreInput";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageInput from "@/components/ImageInput";
import usePermission from "@/hooks/usePermission";
import useImagePicker from "@/hooks/useImagePicker";
import PreViewImageList from "@/components/PreViewImageList";
import { useMutateCreatePost } from "@/hooks/queries/useMutateCreatePost";
import { useNavigation } from "@react-navigation/native";
type Props = StackScreenProps<MapStackParamList, "AddLocation">;

function AddLocationScreen({ route }: Props) {
  const { location } = route.params;
  const navigation = useNavigation();
  const address = useGetAddress(location);
  const inset = useSafeAreaInsets();
  const postForm = useForm({
    initialValue: {
      title: "",
      description: "",
      date: new Date(),
      color: colors.PINK_400,
      score: 3,
    },
    validate: validateAddPost,
  });

  const imagePicker = useImagePicker();

  const createPost = useMutateCreatePost();

  const [openDate, setOpenDate] = useState<boolean>(false);

  usePermission("PHOTO");

  const handleSubmit = () => {
    createPost.mutate(
      {
        address,
        ...location,
        ...postForm.values,
        imageUris: imagePicker.imageUris,
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      }
    );
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: inset.bottom + 100 },
        ]}
      >
        <InputField disabled value={address} />
        <CustomButton
          variant="outlined"
          label={getDateWithSeparater(postForm.values.date, ". ")}
          onPress={() => setOpenDate(true)}
        />
        <InputField
          placeholder="제목을 입력하세요"
          error={postForm.errors.title}
          touched={postForm.touched.title}
          {...postForm.getTextInputProps("title")}
        />
        <InputField
          multiline
          placeholder="기록하고 싶은 내용을 입력하세요"
          error={postForm.errors.description}
          touched={postForm.touched.description}
          {...postForm.getTextInputProps("description")}
        />

        <MarkerColorInput
          color={postForm.values.color}
          score={postForm.values.score}
          onChangeColor={(value) => postForm.onChange("color", value)}
        />

        <DatePicker
          modal
          locale="ko"
          title={null}
          confirmText="확인"
          cancelText="취소"
          mode="date"
          onConfirm={(date) => {
            postForm.onChange("date", date);
            setOpenDate(false);
          }}
          date={postForm.values.date}
          open={openDate}
          onCancel={() => setOpenDate(false)}
        />

        <ScoreInput
          score={postForm.values.score}
          onChangeScore={(value) => postForm.onChange("score", value)}
        />
        <View style={{ flexDirection: "row" }}>
          <ImageInput onChange={imagePicker.handleChangeImage} />
          <PreViewImageList
            onDelete={imagePicker.delete}
            imageUris={imagePicker.imageUris}
          />
        </View>
      </ScrollView>

      <FixedBottomCTA label="저장" onPress={handleSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;
