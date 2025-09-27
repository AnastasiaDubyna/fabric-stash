import React, { useEffect, useState } from 'react';
import type Fabric from '@interfaces/fabricInterface';
import { getTotal } from '@api/fabrics';
import FabricShelf from '@components/FabricShelf';
import { List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import FabricInfoPopover from '@components/FabricInfoPopover';
import { countShelfsPerViewport, countShelves, splitFabricListIntoShelfs } from '@/utils/utils';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import useLoadFabrics from '@hooks/useLoadFabrics';


//TODO: add default number of shelf to render to fill out the screen
interface FabricStashProps {

};

const FabricStash = ({

}: FabricStashProps ) => {
	const [fabricsList, setFabricsList] = React.useState<Fabric[]>([]);
	const [fabricListChunks, setFabricsListChunks] = React.useState<Fabric[][]>([]); //TODO: probably shouldn't resplit the whole list after each fetch
	const [hoveredRoll, setHoveredRoll] = React.useState<Fabric | null>(null);
	const [hoveredRect, setHoveredRect] = React.useState<DOMRect | undefined>(undefined);
	const [rowsTotal, setRowsTotal] = useState<number>(0);
	const shelfsPerViewport = countShelfsPerViewport(window.innerHeight, window.innerWidth);
	
	const { data: fabricsTotal } = useQuery({
  queryKey: ['fabricsTotal'],
  queryFn: getTotal,
  staleTime: Infinity,
	});

	useEffect(() => {
		fabricsTotal && setRowsTotal(countShelves(fabricsTotal));
	}, [fabricsTotal]);

	const { onShelfLoaded, getInitialBatch } = useLoadFabrics(
		fabricsList, 
		setFabricsList, 
		fabricListChunks, 
		rowsTotal, 
		shelfsPerViewport
	);

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
		getInitialBatch();
	}, []);

	useEffect(() => {
		setFabricsListChunks(splitFabricListIntoShelfs(fabricsList));
	}, [fabricsList]);

	console.log("fabricsList.length:", fabricsList.length);
	return (
		fabricsList.length > 0 && 
		<>
			<div className='w-1/2 h-full'>
				<AutoSizer className='!h-full !w-full'>
					{({ height, width }) => {
						const rowHeight = width * (279 / 854) - 5;
						const rowsPerViewport = Math.ceil(height / rowHeight);
						return <List
							rowComponent={FabricShelf}
							rowCount={fabricListChunks.length < rowsPerViewport ? rowsPerViewport : fabricListChunks.length}
							rowHeight={rowHeight}
							rowProps={{ fabricListChunks, handleRollMouseEnter, handleRollMouseLeave}}
							onRowsRendered={onShelfLoaded}
						/>
					}}
				</AutoSizer>
			</div>
			{ hoveredRoll && <FabricInfoPopover fabricData={hoveredRoll} rect={hoveredRect}/>}
		</>
	);
};

export default FabricStash;



