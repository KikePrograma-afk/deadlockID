import { useState } from 'react';
import { GamepadIcon } from 'lucide-react';
import { Tabs } from './components/Tabs';
import { MatchLookup } from './components/MatchLookup';
import { Leaderboard } from './components/Leaderboard';
import { News } from './components/News';

function App() {
  const [activeTab, setActiveTab] = useState('match');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <GamepadIcon className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Deadlock Stats</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8">
            <Tabs activeTab={activeTab} onChange={setActiveTab} />
          </div>

          <div className="mt-8">
            {activeTab === 'match' && <MatchLookup />}
            {activeTab === 'leaderboard' && <Leaderboard />}
            {activeTab === 'news' && <News />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;