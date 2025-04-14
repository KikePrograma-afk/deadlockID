import { useState } from 'react';
import { Search, Trophy, Newspaper } from 'lucide-react';
import clsx from 'clsx';

interface Tab {
  id: string;
  name: string;
  icon: typeof Search;
}

const tabs: Tab[] = [
  { id: 'match', name: 'Match Lookup', icon: Search },
  { id: 'leaderboard', name: 'Leaderboard', icon: Trophy },
  { id: 'news', name: 'Latest News', icon: Newspaper }
];

interface TabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

export function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={clsx(
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
              )}
            >
              <Icon
                className={clsx(
                  activeTab === tab.id ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                  '-ml-0.5 mr-2 h-5 w-5'
                )}
                aria-hidden="true"
              />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}