import { NavigatorScreenParams } from "@react-navigation/native";

/**
 * 맵 네비게이션 타입
 *
 * - undefined: 해당 스크린으로 이동할 때 파라미터가 필요 없음
 *
 * 예시:
 * navigation.navigate('MapHome');        // 파라미터 없이 이동
 * navigation.navigate('AddLocation');    // 파라미터 없이 이동
 */
export type MapStackParamList = {
  MapHome: undefined;
  AddLocation: undefined;
  SearchLocation: undefined;
};

/**
 * 인증 네비게이션 타입
 *
 * - undefined: 해당 스크린으로 이동할 때 파라미터가 필요 없음
 *
 * 예시:
 * navigation.navigate('Login');   // 파라미터 없이 이동
 * navigation.navigate('Signup');  // 파라미터 없이 이동
 */
export type AuthStackParamList = {
  AuthHome: undefined;
  Login: undefined;
  Signup: undefined;
};

/**
 * 피드 네비게이션 타입
 *
 * - undefined: 파라미터 필요 없음
 * - { id: number }: 해당 스크린으로 이동할 때 id 파라미터가 필수
 *
 * 예시:
 * navigation.navigate('FeedList');                    // 파라미터 없이 이동
 * navigation.navigate('FeedDetail', { id: 123 });    // id 필수! 없으면 타입 에러
 * navigation.navigate('EditLocation', { id: 456 }); // id 필수!
 */
export type FeedStackParamList = {
  FeedList: undefined;
  FeedDetail: { id: number }; // id 파라미터 필수
  FeedFavorite: undefined;
  EditLocation: { id: number }; // id 파라미터 필수
};

/**
 * 메인 드로어 타입
 *
 * NavigatorScreenParams<T>란?
 * - 중첩된 네비게이터의 스크린으로 한 번에 이동할 때 사용
 * - 드로어 안에 스택이 있을 때, 스택 내부의 특정 스크린으로 바로 이동 가능
 *
 * 예시:
 * // 1. 단순히 Map 드로어 탭으로 이동 (기본 스크린인 MapHome으로 감)
 * navigation.navigate('Map');
 *
 * // 2. Map 드로어 탭의 AddLocation 스크린으로 바로 이동
 * navigation.navigate('Map', {
 *   screen: 'AddLocation'
 * });
 *
 * // 3. Feed 드로어 탭의 FeedDetail 스크린으로 바로 이동 (파라미터 포함)
 * navigation.navigate('Feed', {
 *   screen: 'FeedDetail',
 *   params: { id: 123 }
 * });
 *
 * // 4. Calendar는 중첩 네비게이터가 없으므로 undefined
 * navigation.navigate('Calendar');
 */
export type MainDrawerParamList = {
  Map: NavigatorScreenParams<MapStackParamList>; // Map 스택의 모든 스크린 타입 포함
  Feed: NavigatorScreenParams<FeedStackParamList>; // Feed 스택의 모든 스크린 타입 포함
  Calendar: undefined; // 중첩 네비게이터 없음, 단독 스크린
};

/**
 * 전역 네비게이션 타입 선언 (TypeScript Declaration Merging)
 *
 * 이게 뭐하는 거야?
 * - React Navigation의 useNavigation() 훅을 사용할 때 타입 추론이 자동으로 됨
 * - 이 설정이 없으면 매번 useNavigation<StackNavigationProp<...>>() 이렇게 타입을 직접 지정해야 함
 *
 * 설정 전 (불편함):
 * const navigation = useNavigation<StackNavigationProp<MainDrawerParamList>>();
 * navigation.navigate('Map'); // 매번 타입 지정 필요
 *
 * 설정 후 (편리함):
 * const navigation = useNavigation();
 * navigation.navigate('Map');                              // 자동 타입 추론!
 * navigation.navigate('Feed', { screen: 'FeedDetail', params: { id: 1 } }); // 자동 완성 지원!
 *
 * 작동 원리:
 * - declare global: 전역 타입을 선언/확장
 * - namespace ReactNavigation: React Navigation 라이브러리의 타입 네임스페이스
 * - interface RootParamList extends MainDrawerParamList:
 *   React Navigation이 내부적으로 사용하는 RootParamList에 우리 타입을 합침
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainDrawerParamList {}
  }
}
