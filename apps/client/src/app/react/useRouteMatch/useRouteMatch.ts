import { useRouteMatch as useReactRouteMatch } from 'react-router-dom'

interface UseRouteMatchParams {
  channelId?: string
}

export const useRouteMatch = () => {
  return useReactRouteMatch<UseRouteMatchParams>()
}

export default useRouteMatch
// export function useRouteMatch<Params extends { [K in keyof UseRouteMatchParams]?: string } = unknown>(): match<Params>;
// export function useRouteMatch<Params extends { [K in keyof UseRouteMatchParams]?: string } = unknown>(
//     path: string | string[] | RouteProps,
// ): match<Params> | null;
// export function useRouteMatch = useReactRouteMatch()
