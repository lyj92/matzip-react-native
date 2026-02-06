import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * API 에러 응답 타입
 *
 * 서버에서 에러 발생 시 반환되는 응답 형태를 정의
 * AxiosError를 확장하여 서버 에러 응답의 구조를 타입으로 지정
 *
 * @property statusCode - HTTP 상태 코드 (예: 400, 401, 500 등)
 * @property message - 에러 메시지 (예: "Invalid credentials")
 * @property error - 에러 타입명 (예: "Bad Request", "Unauthorized")
 */
type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

/**
 * useMutation 커스텀 옵션 타입
 *
 * TanStack Query의 useMutation 훅에서 사용할 커스텀 옵션 타입
 * mutationFn을 제외한 나머지 옵션들만 받을 수 있도록 설정
 * (mutationFn은 각 mutation 훅에서 직접 정의하기 때문에 제외)
 *
 * @template TData - mutation 성공 시 반환되는 데이터 타입 (기본값: unknown)
 * @template TVariables - mutation 함수에 전달되는 인자 타입 (기본값: unknown)
 *
 * @example
 * // useLogin 훅에서 사용 예시
 * const useLogin = (options?: UseMutationCustomOptions<User, LoginRequest>) => {
 *   return useMutation({
 *     mutationFn: (data) => postLogin(data),
 *     ...options, // onSuccess, onError 등 전달 가능
 *   });
 * };
 *
 * // 컴포넌트에서 사용
 * const loginMutation = useLogin({
 *   onSuccess: (data) => console.log('로그인 성공', data),
 *   onError: (error) => console.log('로그인 실패', error.response?.data.message),
 * });
 */
type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  "mutationFn"
>;

/**
 * useQuery 커스텀 옵션 타입
 *
 * TanStack Query의 useQuery 훅에서 사용할 커스텀 옵션 타입
 * queryKey를 제외한 나머지 옵션들만 받을 수 있도록 설정
 * (queryKey는 각 query 훅에서 직접 정의하기 때문에 제외)
 *
 * @template TQueryFnData - queryFn이 반환하는 원본 데이터 타입 (기본값: unknown)
 * @template TData - select 옵션 등으로 변환된 최종 데이터 타입 (기본값: TQueryFnData와 동일)
 *
 * @example
 * // useGetProfile 훅에서 사용 예시
 * const useGetProfile = (options?: UseQueryCustomOptions<Profile>) => {
 *   return useQuery({
 *     queryKey: ['profile'],
 *     queryFn: () => getProfile(),
 *     ...options, // enabled, staleTime, select 등 전달 가능
 *   });
 * };
 *
 * // 컴포넌트에서 사용
 * const { data: profile } = useGetProfile({
 *   enabled: isLoggedIn, // 로그인 상태일 때만 쿼리 실행
 *   staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
 * });
 */
type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  "queryKey"
>;

export type { UseMutationCustomOptions, ResponseError, UseQueryCustomOptions };
