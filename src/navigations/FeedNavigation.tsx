import { createStackNavigator } from "@react-navigation/stack";
import FeedListScreen from "../screens/feed/FeedListScreen";
import FeedDetailScreen from "../screens/feed/FeedDetailScreen";
import FeedFavoriteScreen from "../screens/feed/FeedFavoriteScreen";
import EditLocationScreen from "../screens/feed/EditLocationScreen";
import { colors } from "../constants/colors";
import DrawerButton from "../components/DrawerButton";

export const FeedStack = createStackNavigator({
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
    FeedList: {
      screen: FeedListScreen,
      options: {
        title: "피드",
        headerLeft: () => <DrawerButton />,
      },
    },
    FeedDetail: {
      screen: FeedDetailScreen,
      options: {},
    },
    FeedFavortie: {
      screen: FeedFavoriteScreen,
      options: {},
    },
    Editlocation: {
      screen: EditLocationScreen,
      options: {},
    },
  },
});
