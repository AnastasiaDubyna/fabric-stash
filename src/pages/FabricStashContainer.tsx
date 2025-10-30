import { useState, useCallback } from 'react';
import FabricStash from '@components/FabricStash.tsx';
import FabricInfoExpanded from '@/components/FabricInfoExpanded';
import FabricInfoForm from '@/components/FabricInfoForm';
import type Fabric from '@interfaces/fabricInterface';
import FabricInfoPopover from "@components/FabricInfoPopover.tsx";

const FabricStashContainer = () => {
    const [selectedRoll, setSelectedRoll] = useState<Fabric | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [hoveredFabric, setHoveredFabric] = useState<Fabric | null>(null);
    const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

    const handleRollClick = useCallback((fabricData: Fabric) => {
        setSelectedRoll(fabricData);
        setIsEditMode(false);
    }, []);

    const handleEditBtnClick = useCallback(() => {
        setIsEditMode(true);
    }, []);

    const handleRollMouseEnter = useCallback((fabric: Fabric, rect: DOMRect) => {
        setHoveredFabric(fabric);
        setHoveredRect(rect);
    }, []);

    const handleRollMouseLeave = useCallback(() => {
        setHoveredFabric(null);
        setHoveredRect(null);
    }, []);

    return (
        <>
            <FabricStash
                onRollClick={handleRollClick}
                onRollMouseEnter={handleRollMouseEnter}
                onRollMouseLeave={handleRollMouseLeave}
            />

            {selectedRoll && (
                isEditMode
                    ? <FabricInfoForm
                        fabricData={selectedRoll}
                    />
                    : <FabricInfoExpanded
                        fabricData={selectedRoll}
                        handleEditBtnClick={handleEditBtnClick}
                    />
            )}

            <FabricInfoPopover fabric={hoveredFabric} rect={hoveredRect} />
        </>
    );
};

export default FabricStashContainer;
