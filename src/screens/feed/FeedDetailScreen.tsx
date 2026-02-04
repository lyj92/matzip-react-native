/**
 * StackScreenProps vs StackNavigationProp 차이
 *
 * StackScreenProps<ParamList, RouteName>
 * - navigation + route 둘 다 포함
 * - 스크린이 파라미터(route.params)를 받아야 할 때 사용
 * - 두 번째 인자로 스크린 이름을 명시하면 해당 스크린의 params 타입이 자동 추론됨
 *
 * 이 스크린에서 StackScreenProps를 사용하는 이유:
 * - FeedDetail 스크린은 { id: number } 파라미터를 받아야 함
 * - route.params.id로 전달받은 데이터에 접근해야 함
 *
 * 사용 예시:
 * navigation.navigate('FeedDetail', { id: 123 });  // 이렇게 호출됨
 * const { id } = route.params;                      // 이렇게 받음
 */
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FeedStackParamList} from '../../types/navigation';

// StackScreenProps: navigation + route 둘 다 포함된 타입
// 두 번째 제네릭 'FeedDetail'로 해당 스크린의 params 타입 { id: number } 추론
type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

function FeedDetailScreen({route}: Props) {
  // route.params로 전달받은 파라미터 접근
  const {id} = route.params;

  return (
    <View>
      <Text>FeedDetailScreen{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default FeedDetailScreen;
