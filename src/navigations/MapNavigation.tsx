import { colors } from "@/constants/colors";
import AddLocationScreen from "@/screens/map/AddLocationScreen";
import MapHomeScreen from "@/screens/map/MapHomeScreen";
import SearchLocationScreen from "@/screens/map/SearchLocationScreen";
import { createStackNavigator } from "@react-navigation/stack";

/**
 * 맵 스택 스크린 종류
 */
export const MapStack = createStackNavigator({
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
  },

  screens: {
    MapHomeScreen: {
      screen: MapHomeScreen,
      options: {
        headerShown: false,
      },
    },
    AddLocation: {
      screen: AddLocationScreen,
      options: {},
    },
    SearchLocation: {
      screen: SearchLocationScreen,
      options: {},
    },
  },
});
