import { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  //
  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  };

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);
  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <BoardComponent
        currentPlayer={currentPlayer}
        switchPlayer={switchPlayer}
        board={board}
        setBoard={setBoard}
      />
      <div>
        <LostFigures title="Чёрные фигуры" figures={board.lostBlackFigures} />
        <LostFigures title="Белые фигуры" figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
};

export default App;
