
export function statsGame() {
    const el = document.createElement('div');
    let cellsFilled = 0;
    board.board.forEach((row)=>{
        cellsFilled += row.filter(n=> Number.isInteger(n) && n > 0).length
    });

    el.innerHTML =` 
                    <span class="stat">Difficulty:</span><span class="stat">${board.difficulty}</span>
                    <span class="stat">Total moves:</span><span class="stat">${board.moves}</span>
                    <span class="stat">Total errors:</span><span class="stat">${board.errors}</span>
                    <span class="stat">Hints used:</span><span class="stat">${3 - board.hints}</span>
                    <span class="stat">Progress</span><span class="stat">${((cellsFilled/81)*100).toFixed(2)}%</span>
                    `
    chainAnimationDelays(el.children, 0.08)
    el.id = ids.STATS_GAME;
    el.className = "stats-window";
    return el;
}
export function statsOveral() {
    const el = document.createElement('div');
    const profile = storage().activeUser.overalStats;
    el.innerHTML =` 
                    <span class="stat">Level:</span><span class="stat">${profile.level}</span>
                    <span class="stat">XP:</span><span class="stat">${profile.xpPoints}</span>
                    <span class="stat">Overal Difficulty</span><span class="stat">${profile.overallDifficulty}</span>
                    <span class="stat">Puzzles Solved:</span><span class="stat">${profile.sudokusSolved}</span>
                    <span class="stat">Best Time</span><span class="stat">${profile.bestTime.formated}</span>
                    <span class="stat">Least Moves</span><span class="stat">${profile.leastMoves}</span>
                    <span class="stat">Clean Games</span><span class="stat">${profile.cleanGames}</span>
                    `
    el.className = "stats-window";
    chainAnimationDelays(el.children, 0.08)
    el.id = ids.STATS_OVERAL;
    return el;
}