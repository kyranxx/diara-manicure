"use client";

import dynamic from 'next/dynamic';

const StagewiseToolbarProvider = dynamic(() => import('@/components/StagewiseToolbarProvider'), {
  ssr: false,
});

export default StagewiseToolbarProvider;
