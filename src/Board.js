import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.7 }) {
	const [board, setBoard] = useState(createBoard());

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	function createBoard() {
		let initialBoard = [];
		// TODO: create array-of-arrays of true/false values
		for (let x = 0; x < nrows; x++) {
			let rows = [];
			for (let y = 0; y < ncols; y++) {
				rows.push(Math.random() < chanceLightStartsOn);
			}
			initialBoard.push(rows);
		}
		// let initialBoard = Array.from({ length: nrows }, () =>
		// 	Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn)
		// );

		return initialBoard;
	}

	function hasWon() {
		// TODO: check the board in state to determine whether the player has won.
		return board.every((row) => row.every((cell) => !cell));
	}

	function flipCellsAround(coord) {
		setBoard((oldBoard) => {
			const [y, x] = coord.split('-').map(Number);

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			// TODO: Make a (deep) copy of the oldBoard
			let boardCopy = [...oldBoard];

			// TODO: in the copy, flip this cell and the cells around it
			flipCell(y, x, boardCopy);
			flipCell(y, x - 1, boardCopy);
			flipCell(y, x + 1, boardCopy);
			flipCell(y - 1, x, boardCopy);
			flipCell(y + 1, x, boardCopy);

			// TODO: return the copy
			return boardCopy;
		});
	}

	// if the game is won, just show a winning msg & render nothing else

	// TODO
	if (hasWon()) {
		return <h2>You Won!</h2>;
	}

	// make table board
	let tableBoard = board.map((row, idOfy) => (
		<tr key={idOfy}>
			{row.map((cell, idOfx) => (
				<Cell
					key={`${idOfy}-${idOfx}`}
					flipCellsAroundMe={() => flipCellsAround(`${idOfy}-${idOfx}`)}
					isLit={cell}
				/>
			))}
		</tr>
	));

	// TODO
	return (
		<table className='Board'>
			<tbody>{tableBoard}</tbody>
		</table>
	);
}

export default Board;
