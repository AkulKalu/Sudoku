
export function statsGame() {
    const el = document.createElement('div');
    let cellsFilled = 0;
    board.board.forEach((row)=>{
        cellsFilled += row.filter(n=> Number.isInteger(n) && n > 0).length
    });

    el.innerHTML =` 
                    <span class=${classNames.STAT}>Difficulty:</span><span class=${classNames.STAT}>${board.difficulty}</span>
                    <span class=${classNames.STAT}>Total moves:</span><span class=${classNames.STAT}>${board.moves}</span>
                    <span class=${classNames.STAT}>Total errors:</span><span class=${classNames.STAT}>${board.errors}</span>
                    <span class=${classNames.STAT}>Hints used:</span><span class=${classNames.STAT}>${3 - board.hints}</span>
                    <span class=${classNames.STAT}>Progress</span><span class=${classNames.STAT}>${((cellsFilled/81)*100).toFixed(2)}%</span>
                    `
    chainAnimationDelays(el.children, 0.08)
    el.id = ids.STATS_GAME;
    el.classList.add(classNames.STATS_WINDOW)
    return el;
}
export function statsOveral() {
    const el = document.createElement('div');
    const profile = storage().activeUser.overalStats;
    el.innerHTML =` 
                    <span class=${classNames.STAT}>Level:</span><span class=${classNames.STAT}>${profile.level}</span>
                    <span class=${classNames.STAT}>XP:</span><span class=${classNames.STAT}>${profile.xpPoints}</span>
                    <span class=${classNames.STAT}>Overal Difficulty</span><span class=${classNames.STAT}>${profile.overallDifficulty}</span>
                    <span class=${classNames.STAT}>Puzzles Solved:</span><span class=${classNames.STAT}>${profile.sudokusSolved}</span>
                    <span class=${classNames.STAT}>Best Time</span><span class=${classNames.STAT}>${profile.bestTime.formated}</span>
                    <span class=${classNames.STAT}>Least Moves</span><span class=${classNames.STAT}>${profile.leastMoves}</span>
                    <span class=${classNames.STAT}>Clean Games</span><span class=${classNames.STAT}>${profile.cleanGames}</span>
                    `
    el.classList.add(classNames.STATS_WINDOW);
    chainAnimationDelays(el.children, 0.08)
    el.id = ids.STATS_OVERAL;
    return el;
}