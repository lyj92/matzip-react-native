import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import useForm from "@/hooks/useForm";
import { MapStackParamList } from "@/types/navigation";
import { validateAddPost } from "@/utils/validation";
import { StackScreenProps } from "@react-navigation/stack";
import axios from "axios";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Config from "react-native-config";
import { ScrollView } from "react-native-gesture-handler";
import useGetAddress from "@/hooks/useGetAdress";
type Props = StackScreenProps<MapStackParamList, "AddLocation">;

function AddLocationScreen({ route }: Props) {
  const { location } = route.params;
  const address = useGetAddress(location);
  const postForm = useForm({
    initialValue: {
      title: "",
      description: "",
    },
    validate: validateAddPost,
  });

  console.log(address, "address");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputField disabled value={address} />
      <CustomButton variant="outlined" label="날짜 선택" />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;
