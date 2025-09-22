import React, { useEffect } from 'react';
import type Fabric from '@interfaces/fabricInterface';
import { getFabrics } from '@api/fabrics';
import FabricShelf from '@/components/FabricShelf';
import { useInfiniteLoader } from 'react-window-infinite-loader';
import { List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import FabricInfoPopover from '@/components/FabricInfoPopover';

//TODO: add default number of shelf to render to fill out the screen
interface FabricStashProps {

};

const FabricStash = ({

}: FabricStashProps ) => {
	const [fabricsList, setFabricsList] = React.useState<Fabric[]>([]);
	const [fabricListChunks, setFabricsListChunks] = React.useState<Fabric[][]>([]); //TODO: probably shouldn't resplit the whole list after each fetch
	const [hoveredRoll, setHoveredRoll] = React.useState<Fabric | null>(null);
	const [hoveredRect, setHoveredRect] = React.useState<DOMRect | undefined>(undefined);
	// const [fabricsTotal, setFabricsTotal] = React.useState<number>(20);
	const splitFabricListIntoShelfs = (capacity: number): Fabric[][] => {
		const result: Fabric[][] = [];
		for (let i = 0; i < fabricsList.length; i += capacity) {
			result.push(fabricsList.slice(i, i + capacity));
		}
		return result;
	};
	const fetchFabricsData = async (limit: number, lastId: string = "") => {
		// console.log("Fetching more data");
		try {
			const fabricsData = await getFabrics(limit, lastId);
			setFabricsList(prev => [...prev, ...fabricsData]);
		} catch (err) {
			//TODO: come up with some sort of fallback and do not throw it further
			throw err;
		}
	};
	const isRowLoaded = (index: number) => index < fabricListChunks.length;
	const loadMoreRows = async () => {
		await fetchFabricsData(50, fabricsList[fabricsList.length-1]._id);
	};
	const onRowsRendered = useInfiniteLoader({
		isRowLoaded,
		loadMoreRows, 
		rowCount: fabricListChunks.length + 1 //TODO: Make an api call to get the total count of fabrics 
		// rowCount: 2
	});

	const handleRollMouseEnter = (shelfId: number, rollId: number, rect: DOMRect | undefined) => {
		if (fabricListChunks[shelfId] && fabricListChunks[shelfId][rollId]) {
			setHoveredRoll(fabricListChunks[shelfId][rollId]);
			setHoveredRect(rect);
		}
	};
	const handleRollMouseLeave = () => {
		setHoveredRoll(null);
	};

	useEffect(() => {
		fetchFabricsData(50);
		// fetchFabricsData(18);
	}, []);

	useEffect(() => {
		setFabricsListChunks(splitFabricListIntoShelfs(9));
	}, [fabricsList]);

	console.log(fabricListChunks);
	return (
		fabricsList.length > 0 && 
		<>
			<div className='flex flex-col w-1/2 h-full'>
				<AutoSizer className='!h-full !w-full'>
					{({ height, width }) => {
						const rowHeight = width * (279 / 854);
						const rowsPerViewport = Math.ceil(height / rowHeight);
						return <List
							rowComponent={FabricShelf}
							// rowCount={50}
							rowCount={fabricListChunks.length < rowsPerViewport ? rowsPerViewport : fabricListChunks.length}
							rowHeight={rowHeight}
							rowProps={{ fabricListChunks, handleRollMouseEnter, handleRollMouseLeave}}
							onRowsRendered={onRowsRendered}
						/>
					}}
				</AutoSizer>
			</div>
			{ hoveredRoll && <FabricInfoPopover fabricData={hoveredRoll} rect={hoveredRect}/>}
		</>
	);
};

export default FabricStash;



