import { getFabrics } from "@/api/fabrics";
import type Fabric from "@/interfaces/fabricInterface";
import { getFabricCountInRange } from "@/utils/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useLoadFabrics = (
  fabricsList: Fabric[], 
  setFabricsList: React.Dispatch<React.SetStateAction<Fabric[]>>,
  fabricListChunks: Fabric[][], 
  rowsTotal: number,
  shelfsPerViewport: number
) => {
  const [loadMoreFabrics, setLoadMoreFabrics] = useState<boolean>(false);
  const [lastLoadedShelfId, setLastLoadedShelfId] = useState<number>(-1);

  //Passed to react-window 
  const onShelfLoaded = (allRows: { startIndex: number; stopIndex: number; }) => {
    // console.log("onShelfLoaded is called")
    if (allRows.stopIndex === fabricListChunks.length - 1 && fabricListChunks.length < rowsTotal) {
      setLoadMoreFabrics(true);
    }
  };

  const getInitialBatch = () => {
    if (lastLoadedShelfId === -1) {
      setLoadMoreFabrics(true);
    }
  };

  console.log("useLoadMoreFabrics is called")
  const { data, isSuccess, error } = useQuery({
      queryKey: ['fabrics', lastLoadedShelfId+1],
      queryFn: () => {
        //INITIAL LOAD
        const limit: number = getFabricCountInRange(lastLoadedShelfId+1, lastLoadedShelfId+shelfsPerViewport);
        if (lastLoadedShelfId === -1) return getFabrics(limit)

        //SUBSEQUENT LOADS
        const lastLoadedShelf: Fabric[] = fabricListChunks[lastLoadedShelfId];
        const lastIdInFabricsList = fabricsList[fabricsList.length - 1]._id;
        const lastIdInFabricsListChunks = lastLoadedShelf[lastLoadedShelf.length-1]._id;
        if (lastIdInFabricsList === lastIdInFabricsListChunks) {
          return getFabrics(limit, lastIdInFabricsList)
        } else {
          throw "Something is wrong. Ids don't match"
        }
      },
      staleTime: Infinity,
      enabled: loadMoreFabrics
  });
  //HANDLE ERRORS CAUSE THIS BITCH DOESNT THROW THEM
  console.log(error);


  // const {
  //   fetchNextPage,
  //   fetchPreviousPage,
  //   hasNextPage,
  //   hasPreviousPage,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   promise,
  //   ...result
  // } = useInfiniteQuery({
  //   queryKey: ['fabrics-test'],
  //   queryFn: ({ pageParam }) => {
  //     console.log("pageParam", pageParam);
  //     return getFabrics(pageParam)
  //   },
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
  //     console.log("lastPage", lastPage)
  //     console.log("allPages", allPages)
  //     console.log("lastPageParam", lastPageParam)
  //     console.log("allPageParams", allPageParams)
  //     return {shelfStart: lastLoadedShelfId + 1, shelfStop: lastLoadedShelfId + 5}
  //   },
  //   // getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
  //   //   firstPage.prevCursor,
  // })

  // useEffect(() => {
  //   fetchNextPage();
  // }, []);

  useEffect(() => {
    setLastLoadedShelfId(fabricListChunks.length - 1);
  }, [fabricListChunks]);

  useEffect(() => {
    if (isSuccess && data) {
      setFabricsList(prev => [...prev, ...data]);
      setLoadMoreFabrics(false);
    };
  }, [isSuccess, data]);

  return {
    getInitialBatch,
    onShelfLoaded
  }
};

export default useLoadFabrics;