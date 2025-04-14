import { useState } from 'react';
import useSWR from 'swr';
import { RegionSelect } from './RegionSelect';
import { Region, REGIONS } from '../types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// La función getRankImage no necesita cambios
const getRankImage = (rankedRank: number): string => {
  const rankImages: { [key: number]: string } = {
    1: '/src/initiate.png',
    2: '/src/seeker.png',
    3: '/src/alchemist.png',
    4: '/src/arcanist.png',
    5: '/src/ritualist.png',
    6: '/src/emissary.png',
    7: '/src/archon.png',
    8: '/src/oracle.png',
    9: '/src/phantom.png',
    10: '/src/ascendant.png',
    11: '/src/eternus.png'
    // Puedes agregar más imágenes si tienes rangos superiores al 11
    // o dejar que use la imagen por defecto (rango 1)
  };
  // Si el rango es mayor que las imágenes definidas, usa la imagen del rango 1
  // O podrías definir una imagen genérica o la del último rango conocido (eternus)
  return rankImages[rankedRank] || rankImages[11] || rankImages[1];
};

export function Leaderboard() {
  const [selectedRegion, setSelectedRegion] = useState<Region>(REGIONS[0]);

  const { data, error, isLoading } = useSWR(
    // Asume que la API devuelve suficientes datos (al menos 100 si existen)
    `https://api.deadlock-api.com/v1/leaderboard/${selectedRegion.id}`,
    fetcher
  );

  // El manejo de errores no necesita cambios
  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              Failed to load leaderboard data. Please try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- CAMBIO PRINCIPAL AQUÍ ---
  // Cambia slice(0, 10) a slice(0, 100)
  // Asegúrate de que la API realmente devuelva más de 10 jugadores.
  // Si la API devuelve los jugadores ya ordenados por 'rank', este sort es redundante
  // pero no hace daño. Si no vienen ordenados, este sort asegura que los
  // primeros 100 (si existen) estén ordenados correctamente.
  const topPlayers = data?.entries
    ?.slice(0, 100) // <-- Cambiado de 10 a 100
    .sort((a: any, b: any) => a.rank - b.rank) || [];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Leaderboard</h1>
          {/* --- CAMBIO DE TEXTO AQUÍ --- */}
          <p className="mt-2 text-sm text-gray-700">
            {/* Cambiado de "Top 10" a "Top 100" */}
            Top {topPlayers.length > 0 ? Math.min(topPlayers.length, 100) : 100} players ranked by performance in {selectedRegion.name}
            {/* O simplemente: Top 100 players ranked by performance in {selectedRegion.name} */}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <RegionSelect selected={selectedRegion} onChange={setSelectedRegion} />
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                {/* Las cabeceras de la tabla no necesitan cambios */}
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Rank
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Player
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Badge Level
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Ranked Rank
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  // --- CAMBIO OPCIONAL PERO RECOMENDADO AQUÍ ---
                  // Muestra 100 placeholders mientras carga
                  Array.from({ length: 100 }).map((_, index) => ( // <-- Cambiado de 10 a 100
                    <tr key={index}>
                      <td colSpan={4} className="text-center py-4">
                        <div className="animate-pulse flex space-x-4 px-4 sm:px-0">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : topPlayers.length === 0 ? (
                  // Añadir un mensaje si no hay jugadores después de cargar
                  <tr>
                     <td colSpan={4} className="text-center py-4 text-sm text-gray-500">
                        No players found for this region or leaderboard is empty.
                     </td>
                  </tr>
                ) : (
                  // El mapeo de jugadores ahora renderizará hasta 100
                  topPlayers.map((entry: any) => (
                    <tr key={entry.account_name} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        #{entry.rank}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {entry.account_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {entry.badge_level}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <img
                            src={getRankImage(entry.ranked_rank)}
                            alt={`Rank ${entry.ranked_rank}`}
                            className="w-8 h-8 object-contain" // Asegúrate que 'object-contain' sea adecuado
                          />
                          {/* Muestra el número de rango junto a la imagen */}
                          <span>{entry.ranked_rank}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}