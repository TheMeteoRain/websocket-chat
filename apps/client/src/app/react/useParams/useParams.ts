import { useParams as useReactParams } from 'react-router-dom'

type UseParams = Record<'channelId', string>

export const useParams = () => {
  return useReactParams<UseParams>()
}

export default useParams
// export function useRouteMatch<Params extends { [K in keyof UseRouteMatchParams]?: string } = unknown>(): match<Params>;
// export function useRouteMatch<Params extends { [K in keyof UseRouteMatchParams]?: string } = unknown>(
//     path: string | string[] | RouteProps,
// ): match<Params> | null;
// export function useRouteMatch = useReactRouteMatch()
