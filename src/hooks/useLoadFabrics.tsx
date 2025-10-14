import { getFabrics } from "@/api/fabrics";
import type Fabric from "@/interfaces/fabricInterface";
import { getFabricCountInRange, getFabricsPerPage } from "@/utils/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useLoadFabrics = (
  fabricListChunks: Fabric[][], 
  fabricsPerPage: number
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['fabrics-infinite'],
    queryFn: async ({ pageParam }: { pageParam?: string }) => {
      const fabrics = await getFabrics(fabricsPerPage, pageParam);
      console.log("QUERY CALLED", fabrics, fabricsPerPage, pageParam);
      const lastFabricId = fabrics.length > 0 ? fabrics[fabrics.length - 1]._id : undefined;
      return {
        fabrics,
        nextCursor: lastFabricId
      };
    },
    initialPageParam: "",
    getNextPageParam: lastPage => {
      // console.log("getNextPageParam", lastPage);
      if (lastPage.fabrics.length < fabricsPerPage) {
        return undefined; 
      }
      return lastPage.nextCursor;
    },
    staleTime: 5 * 60 * 1000, // 5 хвилин
    gcTime: 10 * 60 * 1000, // 10 хвилин
    enabled: !!fabricsPerPage
  });

    //Passed to react-window 
  const onShelfLoaded = (allRows: { startIndex: number; stopIndex: number; }) => {
    // console.log(data, hasNextPage, data ? allRows.stopIndex === fabricListChunks.length - 1 : true, fabricsPerPage);
    if (hasNextPage && (data ? allRows.stopIndex === fabricListChunks.length - 1 : true) && fabricsPerPage) {
      fetchNextPage();
    }    
  };

  return {
    onShelfLoaded,
    fabricPages: data?.pages
  }
};

export default useLoadFabrics;