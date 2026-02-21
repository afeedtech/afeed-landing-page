import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SavedSegment, AudienceFilters, AudienceGlobalFiltersState } from '@/types/analytics';

interface SegmentsContextType {
  savedSegments: SavedSegment[];
  addSegment: (segment: SavedSegment) => void;
  updateSegment: (id: string, updates: Partial<SavedSegment>) => void;
  removeSegment: (id: string) => void;
}

const SegmentsContext = createContext<SegmentsContextType | undefined>(undefined);

// Mock segments for demo purposes
const mockSegments: SavedSegment[] = [
  {
    id: 'seg_1',
    name: 'High Spenders',
    description: 'Users who have spent over $500',
    filters: { totalSpendTier: 'high' } as AudienceFilters,
    globalFilters: {} as AudienceGlobalFiltersState,
    userCount: 247,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
  },
  {
    id: 'seg_2',
    name: 'Engaged Learners',
    description: 'Users with high content completion',
    filters: { contentCompletion: '76-100' } as AudienceFilters,
    globalFilters: {} as AudienceGlobalFiltersState,
    userCount: 512,
    createdAt: '2024-01-08T14:30:00Z',
    updatedAt: '2024-01-08T14:30:00Z',
  },
  {
    id: 'seg_3',
    name: 'Inactive Users',
    description: 'Users who haven\'t been active in 30 days',
    filters: { lastActivity: 'inactive' } as AudienceFilters,
    globalFilters: {} as AudienceGlobalFiltersState,
    userCount: 189,
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-10T09:15:00Z',
  },
];

export function SegmentsProvider({ children }: { children: ReactNode }) {
  const [savedSegments, setSavedSegments] = useState<SavedSegment[]>(mockSegments);

  const addSegment = (segment: SavedSegment) => {
    setSavedSegments((prev) => [...prev, segment]);
  };

  const updateSegment = (id: string, updates: Partial<SavedSegment>) => {
    setSavedSegments((prev) =>
      prev.map((seg) =>
        seg.id === id
          ? { ...seg, ...updates, updatedAt: new Date().toISOString() }
          : seg
      )
    );
  };

  const removeSegment = (id: string) => {
    setSavedSegments((prev) => prev.filter((seg) => seg.id !== id));
  };

  return (
    <SegmentsContext.Provider
      value={{ savedSegments, addSegment, updateSegment, removeSegment }}
    >
      {children}
    </SegmentsContext.Provider>
  );
}

export function useSegments() {
  const context = useContext(SegmentsContext);
  if (context === undefined) {
    throw new Error('useSegments must be used within a SegmentsProvider');
  }
  return context;
}
