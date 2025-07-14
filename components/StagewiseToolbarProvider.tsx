'use client';

import { StagewiseToolbar } from '@stagewise/toolbar-next';
import ReactPlugin from '@stagewise-plugins/react';

export default function StagewiseToolbarProvider() {
  return (
    <StagewiseToolbar
          config={{
            plugins: [ReactPlugin],
          }}
    />
  );
}
