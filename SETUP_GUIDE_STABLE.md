# React Native 프로젝트 셋업 가이드 (안정 버전)

> React Navigation v7 (현재 안정 버전) 기준 - 공식 문서 참조

---

## 버전 정보

| 패키지 | 버전 | 비고 |
|--------|------|------|
| React Navigation | **v7.x** | 현재 안정 버전 |
| React Native | 0.74.x ~ 0.79.x | |
| Reanimated | 3.x ~ 4.x | RN 버전에 따라 |

---

## 1. 프로젝트 생성

```bash
npx @react-native-community/cli init 프로젝트명
cd 프로젝트명
```

---

## 2. React Navigation 기본 설치

### 2.1 Core 패키지

```bash
npm install @react-navigation/native
```

### 2.2 필수 의존성

```bash
npm install react-native-screens react-native-safe-area-context
```

### 2.3 iOS Pod 설치

```bash
npx pod-install ios
```

### 2.4 MainActivity.kt 수정 (Android)

`android/app/src/main/java/com/앱이름/MainActivity.kt`:

```kotlin
package com.앱이름

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "앱이름"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)  // null 전달 필수!
  }

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

---

## 3. Stack Navigator 설치

```bash
npm install @react-navigation/stack react-native-gesture-handler
```

또는 Native Stack (더 나은 성능):

```bash
npm install @react-navigation/native-stack
```

---

## 4. Drawer Navigator 설치

### 4.1 패키지 설치

```bash
npm install @react-navigation/drawer
npm install react-native-gesture-handler react-native-reanimated react-native-worklets
```

### 4.2 Babel 설정

`babel.config.js`:

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

> **참고:** Reanimated 4.x 사용 시 `react-native-worklets/plugin` 사용

### 4.3 iOS Pod 설치

```bash
npx pod-install ios
```

---

## 5. Bottom Tab Navigator 설치

```bash
npm install @react-navigation/bottom-tabs
```

---

## 6. React Navigation v7 사용법 (Static API)

### 6.1 기본 구조

v7에서는 `createStaticNavigation`을 사용한 **Static API**가 도입됨.

```tsx
// App.tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigations/Navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
```

> **주의:** `NavigationContainer`가 `createStaticNavigation`에 포함되어 있으므로 별도로 감싸지 않음

### 6.2 Stack Navigator

```tsx
import { createStackNavigator } from '@react-navigation/stack';
import { createStaticNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const RootStack = createStackNavigator({
  screens: {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
```

### 6.3 Drawer Navigator

```tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStaticNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const MainDrawer = createDrawerNavigator({
  screens: {
    Home: HomeScreen,
    Settings: SettingsScreen,
  },
});

const Navigation = createStaticNavigation(MainDrawer);

export default Navigation;
```

### 6.4 Bottom Tab Navigator

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const MainTab = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
});

const Navigation = createStaticNavigation(MainTab);

export default Navigation;
```

### 6.5 중첩 네비게이션

```tsx
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStaticNavigation } from '@react-navigation/native';

// Drawer 내부 Stack
const HomeStack = createStackNavigator({
  screens: {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
});

// Main Drawer
const MainDrawer = createDrawerNavigator({
  screens: {
    HomeStack: HomeStack,
    Settings: SettingsScreen,
  },
});

const Navigation = createStaticNavigation(MainDrawer);

export default Navigation;
```

### 6.6 Screen Options 설정

```tsx
const RootStack = createStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: '홈',
        headerShown: true,
      },
    },
    Details: {
      screen: DetailsScreen,
      options: {
        title: '상세',
      },
    },
  },
  screenOptions: {
    headerStyle: { backgroundColor: '#6200ee' },
    headerTintColor: '#fff',
  },
});
```

---

## 7. TypeScript 타입 설정

### 7.1 타입 정의

```tsx
import { StaticParamList } from '@react-navigation/native';

const RootStack = createStackNavigator({
  screens: {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
```

### 7.2 Navigation 사용

```tsx
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Details')}
    />
  );
}
```

### 7.3 StackScreenProps vs StackNavigationProp

두 타입의 핵심 차이:

| | StackScreenProps | StackNavigationProp |
|---|---|---|
| **포함하는 것** | `navigation` + `route` 둘 다 | `navigation`만 |
| **사용 상황** | 스크린 컴포넌트의 props 타입 | useNavigation 훅의 타입 |
| **파라미터 접근** | `route.params`로 접근 가능 | 불가능 |

#### StackScreenProps 사용 (파라미터를 받아야 할 때)

```tsx
import { StackScreenProps } from '@react-navigation/stack';

// 타입 정의
type FeedStackParamList = {
  FeedList: undefined;
  FeedDetail: { id: number };  // id 파라미터 필수
};

// StackScreenProps: navigation + route 둘 다 포함
type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

function FeedDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;  // ✅ route.params 접근 가능

  return <Text>Feed ID: {id}</Text>;
}

// 호출 시
navigation.navigate('FeedDetail', { id: 123 });
```

#### StackNavigationProp 사용 (이동만 할 때)

```tsx
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 타입 정의
type AuthStackParamList = {
  AuthHome: undefined;
  Login: undefined;
};

// StackNavigationProp: navigation만 포함
type Navigation = StackNavigationProp<AuthStackParamList>;

function AuthHomeScreen() {
  const navigation = useNavigation<Navigation>();

  // ✅ 이동만 하면 됨 (파라미터 받을 필요 없음)
  return (
    <Button onPress={() => navigation.navigate('Login')}>
      로그인으로 이동
    </Button>
  );
}
```

#### 언제 뭘 써야 하나?

```
파라미터 받아야 해? (route.params 필요)
  ├─ YES → StackScreenProps
  └─ NO  → StackNavigationProp (useNavigation 훅과 함께)
```

---

## 8. 빌드 및 실행

```bash
# Android
npm run android

# iOS
npm run ios

# Metro 캐시 클리어 (문제 발생 시)
npx react-native start --reset-cache
```

---

## 9. 트러블슈팅

### 9.1 Metro 에러 - Got unexpected undefined

```bash
npx react-native start --reset-cache
```

### 9.2 Reanimated 에러

1. babel.config.js 확인
2. `npx react-native start --reset-cache`
3. Android: `cd android && ./gradlew clean`
4. iOS: `cd ios && pod install`

### 9.3 Android 저장 공간 부족

Android Studio > Device Manager > Wipe Data

### 9.4 iOS New Architecture 에러

`ios/Podfile`에서 아래 코드 삭제:
```ruby
ENV['RCT_NEW_ARCH_ENABLED'] = '0'
```

그 후 `npx pod-install ios`

---

## 10. 패키지 버전 요약

```json
{
  "dependencies": {
    "@react-navigation/native": "^7.x",
    "@react-navigation/stack": "^7.x",
    "@react-navigation/drawer": "^7.x",
    "@react-navigation/bottom-tabs": "^7.x",
    "react-native-screens": "latest",
    "react-native-safe-area-context": "latest",
    "react-native-gesture-handler": "latest",
    "react-native-reanimated": "latest",
    "react-native-worklets": "latest"
  }
}
```

---

## 11. 빠른 시작 체크리스트

- [ ] 프로젝트 생성
- [ ] @react-navigation/native 설치
- [ ] react-native-screens 설치
- [ ] react-native-safe-area-context 설치
- [ ] MainActivity.kt 수정 (onCreate에 null 전달)
- [ ] (Stack) @react-navigation/stack 설치
- [ ] (Stack) react-native-gesture-handler 설치
- [ ] (Drawer) @react-navigation/drawer 설치
- [ ] (Drawer) react-native-reanimated 설치
- [ ] (Drawer) react-native-worklets 설치
- [ ] (Drawer) babel.config.js에 reanimated plugin 추가
- [ ] (Tab) @react-navigation/bottom-tabs 설치
- [ ] iOS: npx pod-install ios
- [ ] 빌드 테스트

---

## 12. 공식 문서 링크

- [React Navigation 공식 문서](https://reactnavigation.org/docs/getting-started)
- [Stack Navigator](https://reactnavigation.org/docs/stack-navigator)
- [Drawer Navigator](https://reactnavigation.org/docs/drawer-navigator)
- [Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator)
- [Reanimated 설치](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)
