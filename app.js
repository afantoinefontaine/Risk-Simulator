let historyCollapsed = false;
let lastAttackerTroops = 4;
let lastDefenderTroops = 2;

// Initialiser les dropdowns au chargement de la page
function initializeDropdowns() {
    const attackerSelect = document.getElementById('attackerTroops');
    const defenderSelect = document.getElementById('defenderTroops');

    // Attaquant : de 2 à 50
    for (let i = 2; i <= 50; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === 4) option.selected = true; // Valeur par défaut
        attackerSelect.appendChild(option);
    }

    // Défenseur : de 1 à 50
    for (let i = 1; i <= 50; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === 2) option.selected = true; // Valeur par défaut
        defenderSelect.appendChild(option);
    }
}

// Appeler l'initialisation au chargement
initializeDropdowns();

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

function rollDice(count) {
    return Array.from({length: count}, () => rollDie()).sort((a, b) => b - a);
}

function simulateRound(attackerTroops, defenderTroops) {
    // Déterminer le nombre de dés selon les règles du Risk Blitz
    // L'attaquant garde toujours 1 troupe sur son territoire, donc il lance avec troupes-1
    // Avec 4 troupes -> lance 3 dés, avec 3 troupes -> lance 2 dés, avec 2 troupes -> lance 1 dé
    const attackerDice = Math.min(3, attackerTroops - 1);
    // Le défenseur lance max 2 dés selon ses troupes (2+ troupes = 2 dés, 1 troupe = 1 dé)
    const defenderDice = Math.min(2, defenderTroops);

    const attackerRolls = rollDice(attackerDice);
    const defenderRolls = rollDice(defenderDice);

    let attackerLosses = 0;
    let defenderLosses = 0;

    // En mode Blitz équilibré : on compare seulement les dés les plus hauts
    // Le dé le plus haut est toujours en position 0 car on a trié en ordre décroissant
    if (attackerRolls[0] > defenderRolls[0]) {
        defenderLosses = 1;
    } else {
        // En cas d'égalité, le défenseur gagne
        attackerLosses = 1;
    }

    return {
        attackerRolls,
        defenderRolls,
        attackerLosses,
        defenderLosses
    };
}

function startBlitz() {
    const attackerTroopsInput = parseInt(document.getElementById('attackerTroops').value);
    const defenderTroopsInput = parseInt(document.getElementById('defenderTroops').value);

    if (attackerTroopsInput < 2) {
        alert("L'attaquant doit avoir au moins 2 troupes pour attaquer !");
        return;
    }

    if (defenderTroopsInput < 1) {
        alert("Le défenseur doit avoir au moins 1 troupe !");
        return;
    }

    // Sauvegarder les dernières valeurs utilisées
    lastAttackerTroops = attackerTroopsInput;
    lastDefenderTroops = defenderTroopsInput;

    let attackerTroops = attackerTroopsInput;
    let defenderTroops = defenderTroopsInput;
    let rounds = [];
    let roundNumber = 0;

    // Simuler tous les rounds jusqu'à la fin
    // L'attaquant continue tant qu'il a au moins 2 troupes et que le défenseur a des troupes
    while (attackerTroops > 1 && defenderTroops > 0) {
        roundNumber++;
        const round = simulateRound(attackerTroops, defenderTroops);
        
        attackerTroops -= round.attackerLosses;
        defenderTroops -= round.defenderLosses;

        rounds.push({
            number: roundNumber,
            ...round,
            attackerTroopsAfter: attackerTroops,
            defenderTroopsAfter: defenderTroops
        });
    }

    displayResults(rounds, attackerTroops, defenderTroops, attackerTroopsInput, defenderTroopsInput);
}

function displayResults(rounds, finalAttacker, finalDefender, initialAttacker, initialDefender) {
    const compactResultDiv = document.getElementById('compactResult');
    const commentBoxDiv = document.getElementById('commentBox');
    const historyDiv = document.getElementById('history');
    const historySectionDiv = document.getElementById('historySection');

    const attackerLosses = initialAttacker - finalAttacker;
    const defenderLosses = initialDefender - finalDefender;
    const attackerLossPercentage = (attackerLosses / initialAttacker) * 100;

    let compactText = '';
    let commentText = '';
    let resultClass = '';

    // Fonction pour choisir un commentaire aléatoire
    const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

    if (finalDefender === 0) {
        // VICTOIRE
        resultClass = 'victory';
        compactText = `✅ VICTOIRE • ${attackerLosses} perdu(s) • ${finalAttacker} restant(s)`;
        
        // Messages selon les pertes de l'attaquant avec 5 variantes chacun
        if (attackerLossPercentage === 0) {
            commentText = randomChoice([
                "💎 Flawless victory ! Tu as même pas transpiré.",
                "💎 Victoire parfaite ! Les dieux du Risk te sourient.",
                "💎 Domination totale. Aucune perte. Tu joues contre des bots ?",
                "💎 Zéro mort. Soit t'es un génie, soit t'as triché.",
                "💎 Impeccable. On dirait une partie truquée tellement c'est propre."
            ]);
        } else if (attackerLossPercentage < 20) {
            commentText = randomChoice([
                "👍 Propre et efficace. Respectable.",
                "👍 Victoire convaincante. Quelques égratignures, rien de grave.",
                "👍 Bien joué. Les pertes sont acceptables.",
                "👍 Solide. Un bon ratio coût/bénéfice.",
                "👍 Victoire tactique. Tu gères."
            ]);
        } else if (attackerLossPercentage < 40) {
            commentText = randomChoice([
                "😅 C'est passé, mais ça sent le sapin.",
                "😅 Victoire en sueur. T'as eu chaud aux fesses.",
                "😅 Gagné, mais à quel prix ? Ah oui, presque la moitié de tes troupes.",
                "😅 On va dire que c'est une victoire. Techniquement.",
                "😅 Ils sont morts pour la patrie. Enfin, surtout pour rien en fait."
            ]);
        } else if (attackerLossPercentage < 60) {
            commentText = randomChoice([
                "🎭 Victoire à la Pyrrhus : félicitations, tu as gagné le droit de perdre le prochain combat.",
                "🎭 Bravo champion ! Avec des victoires comme ça, t'auras plus d'armée avant la fin de la partie.",
                "🎭 Tu appelles ça une victoire ? Moi j'appelle ça un suicide collectif réussi.",
                "🎭 Gagné ! Maintenant explique à tes 2 survivants qu'ils doivent conquérir l'Asie.",
                "🎭 La bonne nouvelle : tu as gagné. La mauvaise : il te reste que dalle."
            ]);
        } else if (attackerLossPercentage < 80) {
            commentText = randomChoice([
                "🩹 Victoire technique. On va appeler ça une victoire par charité. L'hécatombe était réelle.",
                "🩹 C'est pas une victoire, c'est un carnage qui s'est terminé en ta faveur.",
                "🩹 Bravo, tu as transformé une armée en champ de bataille. Mission accomplie ?",
                "🩹 Les statisticiens vont débattre pendant des années pour savoir si on peut appeler ça une victoire.",
                "🩹 Victoire ? Le mot que tu cherches c'est 'massacre mutuel'."
            ]);
        } else {
            commentText = randomChoice([
                `⚰️ Victoire... si on peut dire. Il reste ${finalAttacker} survivant(s). Ils vont faire de superbes témoins pour le procès.`,
                `⚰️ Félicitations pour ta 'victoire'. Les ${finalAttacker} survivant(s) te remercient de les avoir laissés en vie pour porter le deuil.`,
                `⚰️ Techniquement c'est une victoire. Moralement, c'est un génocide. ${finalAttacker} rescapé(s) traumatisé(s).`,
                `⚰️ On devrait renommer ça 'victoire apocalyptique'. ${finalAttacker} survivant(s) sur ${initialAttacker}. Bravo.`,
                `⚰️ Les ${finalAttacker} pauvre(s) type(s) qui reste(nt) vont développer un stress post-traumatique sévère.`
            ]);
        }
    } else {
        // DÉFAITE
        resultClass = 'defeat';
        compactText = `❌ DÉFAITE • ${finalDefender} défenseur(s) restant(s)`;
        
        // Messages selon l'ampleur de la défaite avec 5 variantes chacun
        if (finalAttacker === 1 && attackerLossPercentage > 80) {
            commentText = randomChoice([
                "💀 Massacre intégral. Le seul survivant va pouvoir raconter comment il a vu tous ses potes mourir. Sympa pour le moral.",
                "💀 Un seul survivant. Il va raconter cette histoire traumatisante à ses petits-enfants.",
                "💀 Bravo, tu as créé le soldat le plus déprimé de l'histoire du Risk.",
                "💀 Anéanti. Le rescapé unique va développer une aversion pour les dés à vie.",
                "💀 Total annihilation. Un survivant solitaire pour pleurer tous les autres."
            ]);
        } else if (attackerLossPercentage > 70) {
            commentText = randomChoice([
                "🤡 Défaite humiliante. Le défenseur a à peine bougé son petit doigt. Pathétique.",
                "🤡 Ridiculisé. Le défenseur devait même pas être concentré.",
                "🤡 Niveau stratégie militaire, on repassera. C'était pitoyable.",
                "🤡 Le défenseur a probablement bâillé pendant ton attaque tellement c'était facile.",
                "🤡 Humiliation complète. Prochaine fois, essaie de lancer les dés plutôt que de les manger."
            ]);
        } else if (attackerLossPercentage > 50) {
            commentText = randomChoice([
                "🔥 Défaite cuisante. Stratégie douteuse. Résultat prévisible. Désastre garanti.",
                "🔥 Catastrophe annoncée. Avec ces chiffres, même un enfant de 5 ans aurait vu le désastre arriver.",
                "🔥 Échec cuisant. T'as foncé tête baissée dans un mur. Bravo.",
                "🔥 Désastre tactique. Ton prof de stratégie pleure quelque part.",
                "🔥 Défaite lourde. On appelle ça comment déjà ? Ah oui, un fiasco."
            ]);
        } else if (attackerLossPercentage > 30) {
            commentText = randomChoice([
                "💩 Pas de bol. Ou plutôt si, beaucoup de bols. Des bols de merde.",
                "💩 Les dés t'aiment pas. Ou alors t'as vraiment pas de chance. Ou les deux.",
                "💩 Malchance ou incompétence ? Spoiler : probablement les deux.",
                "💩 Défaite moche. Les probabilités étaient pas avec toi aujourd'hui.",
                "💩 Raté. C'est ça de jouer avec des dés qui te détestent."
            ]);
        } else {
            commentText = randomChoice([
                "😢 T'étais presque. Presque compte pas, mais bon courage pour expliquer ça aux familles.",
                "😢 Si près du but. Les familles des victimes apprécieront le 'presque'.",
                "😢 Presque gagné. Mais presque, c'est comme totalement raté en fait.",
                "😢 À deux doigts de la victoire. Dommage, t'avais juste pas assez de doigts.",
                "😢 Raté de peu. L'histoire ne retient que les gagnants, désolé."
            ]);
        }
    }

    compactResultDiv.className = `compact-result ${resultClass} show`;
    compactResultDiv.textContent = compactText;
    
    commentBoxDiv.className = 'comment-box show';
    commentBoxDiv.textContent = commentText;

    // Historique
    historyDiv.innerHTML = rounds.map(round => {
        // En mode Blitz équilibré, on compare seulement les dés les plus hauts (index 0)
        const attackerDiceHTML = round.attackerRolls.map((roll, index) => {
            let className = 'die';
            if (index === 0) {
                // Seul le dé le plus haut est comparé
                className += roll > round.defenderRolls[0] ? ' winner' : ' loser';
            }
            return `<div class="${className}">${roll}</div>`;
        }).join('');

        const defenderDiceHTML = round.defenderRolls.map((roll, index) => {
            let className = 'die';
            if (index === 0) {
                // Seul le dé le plus haut est comparé
                className += round.attackerRolls[0] <= roll ? ' winner' : ' loser';
            }
            return `<div class="${className}">${roll}</div>`;
        }).join('');

        let roundResultClass = '';
        let roundResultText = '';

        if (round.attackerLosses > 0) {
            roundResultClass = 'defender-wins';
            roundResultText = `Défenseur gagne : Attaquant perd 1 troupe (${round.attackerRolls[0]} vs ${round.defenderRolls[0]})`;
        } else {
            roundResultClass = 'attacker-wins';
            roundResultText = `Attaquant gagne : Défenseur perd 1 troupe (${round.attackerRolls[0]} vs ${round.defenderRolls[0]})`;
        }

        return `
            <div class="round">
                <div class="round-header">
                    <span>Round ${round.number}</span>
                </div>
                <div class="dice-comparison">
                    <div class="dice-group">
                        ${attackerDiceHTML}
                    </div>
                    <div class="vs">VS</div>
                    <div class="dice-group">
                        ${defenderDiceHTML}
                    </div>
                </div>
                <div class="round-result ${roundResultClass}">
                    ${roundResultText}
                </div>
                <div class="troops-remaining">
                    <span class="attacker-troops">⚔️ Attaquant: ${round.attackerTroopsAfter}</span>
                    <span class="defender-troops">🛡️ Défenseur: ${round.defenderTroopsAfter}</span>
                </div>
            </div>
        `;
    }).join('');

    historySectionDiv.style.display = 'block';
    historyCollapsed = true;
    historyDiv.classList.add('collapsed');
    document.getElementById('toggleText').textContent = 'Afficher';
}

function toggleHistory() {
    const historyDiv = document.getElementById('history');
    historyCollapsed = !historyCollapsed;
    
    if (historyCollapsed) {
        historyDiv.classList.add('collapsed');
        document.getElementById('toggleText').textContent = 'Afficher';
    } else {
        historyDiv.classList.remove('collapsed');
        document.getElementById('toggleText').textContent = 'Masquer';
    }
}

function reset() {
    document.getElementById('compactResult').classList.remove('show');
    document.getElementById('commentBox').style.display = 'none';
    document.getElementById('historySection').style.display = 'none';
}

function testRandomness() {
    const iterations = 10000;
    const results = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0};
    
    for (let i = 0; i < iterations; i++) {
        const roll = rollDie();
        results[roll]++;
    }
    
    const testDiv = document.getElementById('randomnessTest');
    const expected = (iterations / 6).toFixed(1);
    
    let html = `<div style="text-align: left; max-width: 400px; margin: 0 auto;">`;
    html += `<strong>Résultats sur ${iterations.toLocaleString()} lancers :</strong><br><br>`;
    html += `Attendu par face : ~${expected} (16.67%)<br><br>`;
    
    for (let i = 1; i <= 6; i++) {
        const count = results[i];
        const percentage = ((count / iterations) * 100).toFixed(2);
        const deviation = ((count - iterations/6) / (iterations/6) * 100).toFixed(1);
        const barWidth = (count / iterations * 600).toFixed(0);
        
        html += `<div style="margin-bottom: 8px;">`;
        html += `<strong>${i}:</strong> ${count} fois (${percentage}%)`;
        html += `<div style="background: #667eea; height: 20px; width: ${barWidth}px; border-radius: 3px; margin-top: 3px;"></div>`;
        html += `<span style="font-size: 0.85em; color: ${Math.abs(deviation) > 5 ? '#dc3545' : '#28a745'};">Écart: ${deviation > 0 ? '+' : ''}${deviation}%</span>`;
        html += `</div>`;
    }
    
    html += `<br><em style="font-size: 0.85em; color: #666;">Un écart de ±5% est normal. Au-delà, il y aurait un problème.</em>`;
    html += `</div>`;
    
    testDiv.innerHTML = html;
}

// Permettre de lancer avec la touche Entrée
document.getElementById('attackerTroops').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') startBlitz();
});

document.getElementById('defenderTroops').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') startBlitz();
});
