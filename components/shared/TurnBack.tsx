'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeftCircle } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export default function TurnBack() {
    const router = useRouter();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className='mb-8' onClick={() => router.back()}>
                    <ArrowLeftCircle className="h-8 w-8 text-primary" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Turn Back</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
