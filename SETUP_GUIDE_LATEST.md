# React Native 프로젝트 셋업 가이드 (강의용)

> React Native 0.79.x + React Navigation v7 + New Architecture 기준

---

## 1. 프로젝트 생성

```bash
npx @react-native-community/cli init 프로젝트명
cd 프로젝트명
```

---

## 2. React Navigation 설치

### 2.1 기본 패키지 설치

```bash
npm install @react-navigation/native@latest
npm install @react-navigation/stack@latest
npm install react-native-screens@4.10.0
npm install react-native-safe-area-context@latest
npm install react-native-gesture-handler@latest
```

> **주의:** `react-native-screens`는 4.10.0 버전 사용 (최신 버전은 RN 0.79.x codegen 호환 이슈 있음)

### 2.2 MainActivity.kt 수정 (Android)

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

> **핵심:** `super.onCreate(null)` - savedInstanceState 대신 null 전달

---

## 3. Drawer Navigator 설치 (Reanimated 포함)

### 3.1 패키지 설치

```bash
npm install @react-navigation/drawer
npm install react-native-reanimated@4.1.0
npm install react-native-worklets@0.5.0
```

> **버전 호환성:**
>
> - `react-native-reanimated` 4.1.0 (4.2.x는 RN 0.79.x 미지원)
> - `react-native-worklets` 0.5.0 (reanimated 4.1.x와 호환)

### 3.2 Babel 설정

`babel.config.js`:

```javascript
module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: ["react-native-worklets/plugin"],
};
```

### 3.3 Metro 설정

`metro.config.js`:

```javascript
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

const config = {};

module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(getDefaultConfig(__dirname), config)
);
```

---

## 4. iOS 설정

### 4.1 Podfile 설정

`ios/Podfile`에서 New Architecture 비활성화 코드가 있으면 **삭제**:

```ruby
# 아래 코드가 있으면 삭제! (Reanimated 4.x는 New Architecture 필수)
# ENV['RCT_NEW_ARCH_ENABLED'] = '0'
```

### 4.2 Pod 설치

```bash
cd ios
pod install
cd ..
```

---

## 5. 빌드 및 실행

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

---

## 6. 트러블슈팅

### 6.1 Android - INSTALL_FAILED_INSUFFICIENT_STORAGE

에뮬레이터 저장 공간 부족:

**해결:** Android Studio > Device Manager > 에뮬레이터 > Wipe Data

### 6.2 Android - Kotlin 컴파일 에러 (FabricViewStateManager)

`react-native-screens` 버전이 RN 0.79.x와 호환되지 않음:

**해결:** `npm install react-native-screens@4.10.0`

### 6.3 Android - Codegen 에러 (Unknown prop type "environment")

`react-native-screens` 최신 버전의 codegen 호환 이슈:

**해결:** `npm install react-native-screens@4.10.0`

### 6.4 Android - Kotlin 버전 충돌 (coil 라이브러리)

`react-native-screens` 4.15+ 버전이 coil 라이브러리(Kotlin 2.2.0)를 사용하는데 RN은 Kotlin 2.0.0 사용:

**해결:** `npm install react-native-screens@4.10.0`

### 6.5 iOS - Reanimated New Architecture 에러

```
[Reanimated] Reanimated requires the New Architecture to be enabled.
```

**해결:** `ios/Podfile`에서 `ENV['RCT_NEW_ARCH_ENABLED'] = '0'` 삭제 후 `pod install`

### 6.6 Metro - Got unexpected undefined

파일 import 경로 오류 또는 Metro 캐시 문제:

**해결:**

```bash
npx react-native start --reset-cache
```

---

## 7. 최종 패키지 버전 (검증됨)

```json
{
  "dependencies": {
    "@react-navigation/drawer": "^7.x",
    "@react-navigation/native": "^7.x",
    "@react-navigation/stack": "^7.x",
    "react": "19.0.0",
    "react-native": "0.79.4",
    "react-native-gesture-handler": "^2.30.0",
    "react-native-reanimated": "4.1.0",
    "react-native-safe-area-context": "^5.6.2",
    "react-native-screens": "4.10.0",
    "react-native-worklets": "0.5.0"
  }
}
```

---

## 8. 기본 App.tsx 구조

```tsx
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigations/Navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Navigation />
    </SafeAreaProvider>
  );
}
```

---

## 9. React Navigation v7 Static API 사용법

```tsx
// src/navigations/DrawerNavigation.tsx
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStaticNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const MainDrawer = createDrawerNavigator({
  screens: {
    Home: HomeScreen,
    Settings: SettingsScreen,
  },
});

const DrawerNavigation = createStaticNavigation(MainDrawer);

export default DrawerNavigation;
```

```tsx
// src/navigations/StackNavigation.tsx
import { createStackNavigator } from "@react-navigation/stack";
import { createStaticNavigation } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const AuthStack = createStackNavigator({
  screens: {
    Login: LoginScreen,
    Signup: SignupScreen,
  },
});

const AuthNavigation = createStaticNavigation(AuthStack);

export default AuthNavigation;
```

---

## 10. TypeScript 타입 설정

### 10.1 StackScreenProps vs StackNavigationProp

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

## 11. 빠른 시작 체크리스트

- [ ] 프로젝트 생성
- [ ] @react-navigation/native 설치
- [ ] @react-navigation/stack 설치
- [ ] react-native-screens@4.10.0 설치
- [ ] react-native-safe-area-context 설치
- [ ] react-native-gesture-handler 설치
- [ ] MainActivity.kt 수정 (onCreate에 null 전달)
- [ ] (Drawer 사용 시) @react-navigation/drawer 설치
- [ ] (Drawer 사용 시) react-native-reanimated@4.1.0 설치
- [ ] (Drawer 사용 시) react-native-worklets@0.5.0 설치
- [ ] (Drawer 사용 시) babel.config.js에 worklets plugin 추가
- [ ] (Drawer 사용 시) metro.config.js에 reanimated wrapper 추가
- [ ] iOS: Podfile에서 New Architecture 비활성화 코드 삭제
- [ ] iOS: pod install
- [ ] Android/iOS 빌드 테스트
