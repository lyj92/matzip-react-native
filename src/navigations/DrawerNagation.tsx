import { createDrawerNavigator } from "@react-navigation/drawer";
import FeedListScreen from "../screens/feed/FeedListScreen";
import CalendarScreen from "../screens/calendar/CalendarScreen";
import { createStaticNavigation } from "@react-navigation/native";
import { MapStack } from "./MapNavigation";
import { FeedStack } from "./FeedNavigation";
import DrawerButton from "../components/DrawerButton";
import { colors } from "../constants/colors";
import CustomDrawerContent from "../components/CustomDrawerContent";

const MainDrawer = createDrawerNavigator({
  screenOptions: {
    // 드로워 전체 스타일
    drawerStyle: {
      width: "60%",
      backgroundColor: colors?.WHITE,
    },
    // 드로워 라벨 스타일
    drawerLabelStyle: {
      fontWeight: "600",
    },
    // 드로워 아이템 스타일
    drawerItemStyle: {
      borderRadius: 5,
    },

    // 드로어 동작 형식 front | back | permanent | slide
    drawerType: "front",
    drawerActiveTintColor: colors.WHITE,
    drawerInactiveTintColor: colors.GRAY_500,
    drawerActiveBackgroundColor: colors.PINK_700,
    drawerInactiveBackgroundColor: colors.GRAY_100,
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
    Map: {
      screen: MapStack,
      options: {
        title: "홈",
        headerShown: false,
      },
    },
    Feed: {
      screen: FeedStack,
      options: {
        title: "피드",
        headerShown: false,
      },
    },
    Calendar: {
      screen: CalendarScreen,
      options: {
        title: "캘린더",
        headerLeft: () => <DrawerButton />,
      },
    },
  },
  drawerContent: (props) => <CustomDrawerContent {...props} />,
});

const DrawerNavigation = createStaticNavigation(MainDrawer);

export default DrawerNavigation;
