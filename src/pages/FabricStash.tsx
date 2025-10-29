import React, { useEffect, useState } from 'react';
import type Fabric from '@interfaces/fabricInterface';
import { getTotal } from '@api/fabrics';
import FabricShelf from '@components/FabricShelf';
import { List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import FabricInfoPopover from '@components/FabricInfoPopover';
import { countShelves, getFabricsPerPage, getShelvesPerPage, splitFabricListIntoShelfs } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import useLoadFabrics from '@hooks/useLoadFabrics';
import FabricInfoExpanded from '@/components/FabricInfoExpanded';
import FabricInfoForm from '@/components/FabricInfoForm';


//TODO: add default number of shelf to render to fill out the screen
interface FabricStashProps {

};

const FabricStash = ({

}: FabricStashProps ) => {
	const [fabricsList, setFabricsList] = React.useState<Fabric[]>([]);
	const [fabricListChunks, setFabricsListChunks] = React.useState<Fabric[][]>([]); //TODO: probably shouldn't resplit the whole list after each fetch
	// const [hoveredRoll, setHoveredRoll] = React.useState<Fabric | null>(null);
	// const [hoveredRect, setHoveredRect] = React.useState<DOMRect | undefined>(undefined);
	const [rowsTotal, setRowsTotal] = useState<number>(0);
	const [expanded, setExpanded] = useState<boolean>(false);
	const [selectedRoll, setSelectedRoll] = useState<Fabric | null>(null);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [shelfsPerPage, setShelfsPerPage] = useState<number>(0);
	const [fabricsPerPage, setFabricsPerPage] = useState<number>(0);
	const [popoverHandler, setPopoverHandler] = useState<((selectedRoll?: Fabric, rect?: DOMRect) => void) | null>(null); //TODO: add type here 
	
	console.log("Fabric stash rerenders");
	const { data: fabricsTotal } = useQuery({
		queryKey: ['fabricsTotal'],
		queryFn: getTotal,
		staleTime: Infinity,
	});

	const { onShelfLoaded, fabricPages } = useLoadFabrics(
		fabricListChunks, 
		fabricsPerPage
	);

	const handleRollMouseEnter = (shelfId: number, rollId: number, rect: DOMRect | undefined) => {
		console.log("ENTERED")
		console.log(fabricListChunks[shelfId], fabricListChunks[shelfId][rollId], popoverHandler, rect);
		//Popover is undefined 
		if (fabricListChunks[shelfId] && fabricListChunks[shelfId][rollId] && popoverHandler && rect) {
			popoverHandler(fabricListChunks[shelfId][rollId], rect);
		}
	};
	const handleRollMouseLeave = () => {
		popoverHandler && popoverHandler();
	};

	const handleRollClick = (fabricData: Fabric) => {
		setExpanded(true); 
		setSelectedRoll(fabricData);
	};

	const handleEditBtnClick = () => {
		setIsEditMode(true);
	}

	useEffect(() => {
		setFabricsListChunks(splitFabricListIntoShelfs(fabricsList));
	}, [fabricsList]);

	useEffect(() => {
		setFabricsList(fabricPages ? fabricPages.flatMap(page => page.fabrics) : []);
	}, [fabricPages]);

	useEffect(() => {
		setShelfsPerPage(getShelvesPerPage(window.innerHeight, window.innerWidth));
	}, []);

	useEffect(() => {
		setFabricsPerPage(getFabricsPerPage(shelfsPerPage));
	}, [shelfsPerPage]);

	//TODO: fix bug - rowCount gets recalculated and messes up shelves 
	return (
		fabricListChunks.length > 0 && 
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
							rowProps={{ fabricListChunks, handleRollMouseEnter, handleRollMouseLeave, handleRollClick }}
							onRowsRendered={onShelfLoaded}
						/>
					}}
				</AutoSizer>
			</div>
			{ selectedRoll && (
					!isEditMode 
						? <FabricInfoExpanded fabricData={selectedRoll} handleEditBtnClick={handleEditBtnClick} />
						: <FabricInfoForm fabricData={selectedRoll} />)}
			<FabricInfoPopover registerPopoverHandler={setPopoverHandler}/>
		</>
	);
};

export default FabricStash;



