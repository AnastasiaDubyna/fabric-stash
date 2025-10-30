import { useCallback, useMemo, memo} from 'react';
import type Fabric from '@interfaces/fabricInterface.ts';
import FabricShelf from '@components/FabricShelf.tsx';
import { List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { getFabricsPerPage, getShelvesPerPage } from '@/utils/utils.tsx';
import useLoadFabrics from '@hooks/useLoadFabrics.tsx';
import FabricPatterns from "@components/FabricPatterns.tsx";

interface FabricStashProps {
	onRollClick: (fabricData: Fabric) => void;
	onRollMouseEnter: (fabric: Fabric, rect: DOMRect) => void;
	onRollMouseLeave: () => void;
}

const FabricStash = memo(({ onRollClick, onRollMouseEnter, onRollMouseLeave }: FabricStashProps) => {
	const shelfsPerPage = getShelvesPerPage(window.innerHeight, window.innerWidth);
	const fabricsPerPage = getFabricsPerPage(shelfsPerPage);

	const { onShelfLoaded, fabricListChunks } = useLoadFabrics(
		fabricsPerPage
	);

	const handleRollMouseEnter = useCallback((shelfId: number, rollId: number, rect: DOMRect | undefined) => {
		if (fabricListChunks[shelfId]?.[rollId] && rect) {
			onRollMouseEnter(fabricListChunks[shelfId][rollId], rect);
		}
	}, [fabricListChunks, onRollMouseEnter]);

	const handleRollMouseLeave = useCallback(() => {
		onRollMouseLeave();
	}, [onRollMouseLeave]);

	const handleRollClick = useCallback((fabricData: Fabric) => {
		onRollClick(fabricData);
	}, [onRollClick]);

	const rowProps = useMemo(() => ({
		fabricListChunks,
		handleRollMouseEnter,
		handleRollMouseLeave,
		handleRollClick
	}), [fabricListChunks, handleRollMouseEnter, handleRollMouseLeave, handleRollClick]);

	const allFabrics = useMemo(() =>
			fabricListChunks.flat(),
		[fabricListChunks]
	);

	if (!fabricListChunks.length) {
		return null;
	}

	return (
		<>
			<FabricPatterns fabrics={allFabrics} />
			<div className='w-1/2 h-full' style={{ willChange: 'transform' }}>
				<AutoSizer className='!h-full !w-full'>
					{({ height, width }) => {
						const rowHeight = width * (279 / 854) - 5;
						const rowsPerViewport = Math.ceil(height / rowHeight);
						return <List
							rowComponent={FabricShelf}
							rowCount={fabricListChunks.length < rowsPerViewport ? rowsPerViewport : fabricListChunks.length}
							rowHeight={rowHeight}
							rowProps={rowProps}
							onRowsRendered={onShelfLoaded}
							overscanCount={5}
						/>
					}}
				</AutoSizer>
			</div>
		</>
	);
});

export default FabricStash;
