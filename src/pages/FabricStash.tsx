import React, { useEffect } from 'react';
import type Fabric from '@interfaces/fabricInterface';
import { getFabrics } from '@api/fabrics';
import FabricShelf from '@/components/FabricShelf';
import { useInfiniteLoader } from 'react-window-infinite-loader';
import { List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';


interface FabricStashProps {

};

const FabricStash = ({

}: FabricStashProps ) => {
	const [fabricsList, setFabricsList] = React.useState<Fabric[]>([]);
	const [fabricListChunks, setFabricsListChunks] = React.useState<Fabric[][]>([]); //TODO: probably shouldn't resplit the whole list after each fetch
	const splitFabricListIntoShelfs = (capacity: number): Fabric[][] => {
		const result: Fabric[][] = [];
		for (let i = 0; i < fabricsList.length; i += capacity) {
			result.push(fabricsList.slice(i, i + capacity));
		}
		return result;
	};
	const fetchFabricsData = async (limit: number, lastId: string = "") => {
		console.log("Fetching more data");
		try {
			const fabricsData = await getFabrics(limit, lastId);
			setFabricsList(prev => [...prev, ...fabricsData]);
		} catch (err) {
			//TODO: come up with some sort of fallback and do not throw it further
			throw err;
		}
	};
	const isRowLoaded = (index: number) => index < fabricListChunks.length;
	const loadMoreRows = async (startIndex: number, stopIndex: number) => {
		const itemsToLoad: number = (stopIndex - startIndex) * 9;
		// console.log("startId", startIndex)
		// console.log("stopId", stopIndex)
		await fetchFabricsData(50, fabricsList[fabricsList.length-1]._id);
	};
	const onRowsRendered = useInfiniteLoader({
		isRowLoaded,
		loadMoreRows, 
		rowCount: fabricListChunks.length + 1
	});

	useEffect(() => {
		fetchFabricsData(45);
	}, []);

	useEffect(() => {
		setFabricsListChunks(splitFabricListIntoShelfs(9));
	}, [fabricsList]);

	return (
		fabricsList.length > 0 && 
		<div className='flex flex-col w-1/2 h-full'>
			<AutoSizer className='!h-full !w-full'>
				{({ height, width }) => {
					const rowHeight = width * (279 / 854);
					return <List
						rowComponent={FabricShelf}
						rowCount={fabricListChunks.length}
						rowHeight={rowHeight}
						rowProps={{ fabricListChunks }}
						onRowsRendered={onRowsRendered}
					/>
				}}
			</AutoSizer>;
		</div>
	);
};

export default FabricStash;



