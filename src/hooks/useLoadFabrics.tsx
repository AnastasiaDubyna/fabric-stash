import { getFabrics } from "@/api/fabrics";
import { useInfiniteQuery } from "@tanstack/react-query";
import {useCallback, useMemo} from "react";
import {splitFabricListIntoShelfs} from "@/utils/utils.tsx";

const useLoadFabrics = (
  fabricsPerPage: number
) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['fabrics-infinite'],
    queryFn: async ({ pageParam }: { pageParam?: string }) => {
      const fabrics = await getFabrics(fabricsPerPage, pageParam);
      const lastFabricId = fabrics.length > 0 ? fabrics[fabrics.length - 1]._id : undefined;
      return {
        fabrics,
        nextCursor: lastFabricId
      };
    },
    initialPageParam: "",
    getNextPageParam: lastPage => {
      if (lastPage.fabrics.length < fabricsPerPage) {
        return undefined;
      }
      return lastPage.nextCursor;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!fabricsPerPage
  });

  const fabricsList = useMemo(() => {
    return data?.pages ? data.pages.flatMap(page => page.fabrics) : [];
  }, [data?.pages]);

  const fabricListChunks = useMemo(() =>
          splitFabricListIntoShelfs(fabricsList),
      [fabricsList]
  );

    //Passed to react-window
  const onShelfLoaded = useCallback(async (allRows: { startIndex: number; stopIndex: number; }) => {
    if (hasNextPage && (data ? allRows.stopIndex === fabricListChunks.length - 1 : true) && fabricsPerPage) {
      await fetchNextPage();
    }
  }, [hasNextPage, data, fabricListChunks.length, fabricsPerPage, fetchNextPage]);

  return {
    onShelfLoaded,
    fabricListChunks
  }
};

export default useLoadFabrics;
