import { createStackNavigator } from "@react-navigation/stack";
import { createStaticNavigation } from "@react-navigation/native";
import { colors } from "@/constants/colors";
import AuthHomeScreen from "@/screens/auth/AuthHomeScreen";
import LoginScreen from "@/screens/auth/LoginScreen";
import SignupScreen from "@/screens/auth/SignupScreen";

const AuthStack = createStackNavigator({
  // 헤더 옵션들
  screenOptions: {
    headerTitleAlign: "center",
    headerBackButtonDisplayMode: "minimal",
    headerTintColor: colors?.BLACK,
    // 헤더 스타일
    headerStyle: {
      backgroundColor: colors?.WHITE,
      shadowColor: colors?.GRAY_500,
    },
    // 헤더 폰트 스타일
    headerTitleStyle: {
      fontSize: 16,
    },
    // 공통 컨텐츠 영역 스타일
    cardStyle: {
      backgroundColor: "white",
    },
  },
  screens: {
    // 스크린을 객체화 하고 그 안에 해당 스타일링 옵션을 추가할 수 있음
    AuthHome: {
      screen: AuthHomeScreen,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: LoginScreen,
      options: {
        title: "로그인",
      },
    },
    Signup: {
      screen: SignupScreen,
      options: {
        title: "회원가입",
      },
    },
  },
});

export const AuthNavigation = createStaticNavigation(AuthStack);
