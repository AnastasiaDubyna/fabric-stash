import {memo, useMemo} from 'react';
import type Fabric from '@/interfaces/fabricInterface';
import { USE_MOCK } from '@/const';

interface FabricPatternsProps {
    fabrics: Fabric[];
}

const FabricPatterns = memo(({ fabrics }: FabricPatternsProps) => {
    // Create patterns only for unique images
    const uniquePatterns = useMemo(() => {
        const seen = new Set<string>();
        const patterns: Fabric[] = [];

        fabrics.forEach(fabric => {
            const id = fabric.image?.midi || 'default';
            if (!seen.has(id)) {
                seen.add(id);
                patterns.push(fabric);
            }
        });

        return patterns;
    }, [fabrics]);

    return (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
                {uniquePatterns.map(fabric => {
                    const patternId = fabric.image ? `pattern-${fabric.image.midi}` : 'pattern-default';
                    const xlinkHref = fabric.image && USE_MOCK ? fabric.image.midi :
                        fabric.image
                            ? `${import.meta.env.VITE_API_IMAGE_URL_BASE}/${fabric.image.midi}`
                            : "default-pattern.jpg";
                    return (
                        <pattern
                            key={patternId}
                            id={patternId}
                            patternUnits="userSpaceOnUse"
                            width="73"
                            height="240"
                        >
                            <image
                                xlinkHref={xlinkHref}
                                width="73"
                                height="240"
                                preserveAspectRatio="xMidYMid slice"
                            />
                        </pattern>
                    );
                })}
            </defs>
        </svg>
    );
});

export default FabricPatterns;
