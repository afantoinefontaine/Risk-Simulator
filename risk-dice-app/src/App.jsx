import React, { useState } from 'react';
import { Sword, Shield, RotateCcw } from 'lucide-react';

export default function App() {
  const [attackerDice, setAttackerDice] = useState(3);
  const [defenderDice, setDefenderDice] = useState(2);
  const [attackerRolls, setAttackerRolls] = useState([]);
  const [defenderRolls, setDefenderRolls] = useState([]);
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({
    attackerLosses: 0,
    defenderLosses: 0,
    totalRolls: 0
  });

  const rollDice = (count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1)
      .sort((a, b) => b - a);
  };

  const simulateBattle = () => {
    const attacker = rollDice(attackerDice);
    const defender = rollDice(defenderDice);
    
    const battleResults = [];
    const comparisons = Math.min(attacker.length, defender.length);
    
    let attackerLoss = 0;
    let defenderLoss = 0;
    
    for (let i = 0; i < comparisons; i++) {
      if (attacker[i] > defender[i]) {
        battleResults.push({ attacker: attacker[i], defender: defender[i], winner: 'attacker' });
        defenderLoss++;
      } else {
        battleResults.push({ attacker: attacker[i], defender: defender[i], winner: 'defender' });
        attackerLoss++;
      }
    }
    
    setAttackerRolls(attacker);
    setDefenderRolls(defender);
    setResults(battleResults);
    setStats(prev => ({
      attackerLosses: prev.attackerLosses + attackerLoss,
      defenderLosses: prev.defenderLosses + defenderLoss,
      totalRolls: prev.totalRolls + 1
    }));
  };

  const reset = () => {
    setAttackerRolls([]);
    setDefenderRolls([]);
    setResults([]);
    setStats({
      attackerLosses: 0,
      defenderLosses: 0,
      totalRolls: 0
    });
  };

  const getDiceColor = (value) => {
    if (value === 6) return 'bg-red-600';
    if (value >= 4) return 'bg-orange-500';
    return 'bg-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          🎲 Simulateur de Dés Risk
        </h1>
        
        {/* Configuration */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 shadow-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-white mb-2">
                <Sword className="text-red-500" size={20} />
                Dés de l'attaquant
              </label>
              <select 
                value={attackerDice} 
                onChange={(e) => setAttackerDice(Number(e.target.value))}
                className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600"
              >
                <option value={1}>1 dé</option>
                <option value={2}>2 dés</option>
                <option value={3}>3 dés</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-white mb-2">
                <Shield className="text-blue-500" size={20} />
                Dés du défenseur
              </label>
              <select 
                value={defenderDice} 
                onChange={(e) => setDefenderDice(Number(e.target.value))}
                className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600"
              >
                <option value={1}>1 dé</option>
                <option value={2}>2 dés</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button 
              onClick={simulateBattle}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg"
            >
              🎲 Lancer les dés
            </button>
            <button 
              onClick={reset}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg flex items-center gap-2"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>
        </div>

        {/* Résultats */}
        {results.length > 0 && (
          <div className="bg-slate-800 rounded-lg p-6 mb-6 shadow-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Résultats du combat</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                  <Sword size={18} />
                  Attaquant
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {attackerRolls.map((roll, idx) => (
                    <div 
                      key={idx}
                      className={`w-16 h-16 ${getDiceColor(roll)} rounded-lg flex items-center justify-center text-2xl font-bold text-white shadow-lg`}
                    >
                      {roll}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                  <Shield size={18} />
                  Défenseur
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {defenderRolls.map((roll, idx) => (
                    <div 
                      key={idx}
                      className={`w-16 h-16 ${getDiceColor(roll)} rounded-lg flex items-center justify-center text-2xl font-bold text-white shadow-lg`}
                    >
                      {roll}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-4">
              <h3 className="text-white font-semibold mb-3">Comparaisons</h3>
              {results.map((result, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded mb-2 ${
                    result.winner === 'attacker' 
                      ? 'bg-red-900/30 border border-red-700' 
                      : 'bg-blue-900/30 border border-blue-700'
                  }`}
                >
                  <span className="text-white">
                    Attaquant: <span className="font-bold text-red-400">{result.attacker}</span>
                    {' vs '}
                    Défenseur: <span className="font-bold text-blue-400">{result.defender}</span>
                    {' → '}
                    <span className={result.winner === 'attacker' ? 'text-red-400' : 'text-blue-400'}>
                      {result.winner === 'attacker' ? '🗡️ Attaquant gagne' : '🛡️ Défenseur gagne'}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistiques */}
        {stats.totalRolls > 0 && (
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Statistiques de la session</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{stats.attackerLosses}</div>
                <div className="text-sm text-gray-400">Pertes attaquant</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{stats.defenderLosses}</div>
                <div className="text-sm text-gray-400">Pertes défenseur</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{stats.totalRolls}</div>
                <div className="text-sm text-gray-400">Combats totaux</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
