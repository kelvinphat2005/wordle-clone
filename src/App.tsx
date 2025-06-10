import { useState, useEffect } from 'react'

import Row from './components/Row.tsx'
import { checkIfWin, checkValid, getRandWord, inWordList } from './components/HelperFunctions.tsx';
import Keys from './components/Keyboard.tsx'

import type { validColor, GameState } from './Global.tsx';

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function App() {
  const [currGameState, changeCurrGameState] = useState<GameState>({
    selectedWord: getRandWord(),
    finished: false,
    win: false,
  });

  const [submittedRows, changeSubmittedRows] = useState<string[][]>([]);
  const [currRow, changeCurrRow] = useState<string[]>([]);

  const [keyboardMapping, changeKeyboardMapping] = useState<Map<string, validColor>>(new Map());

  const [showAlert, changeAlert] = useState(false);
  const triggerAlert = () => {
    changeAlert(true);
    // hide after 2 secs
    setTimeout( () => {
      changeAlert(false);
    }, 2000);
  };

  useEffect( () => {
    // listen for key presses
    const handleKeyDown = (event : KeyboardEvent) => {

      //console.log(currGameState.selectedWord);
      
      if (!currGameState.finished) {
        // type onto board
      const key = event.key.toLowerCase();
      if (ALPHABET.includes(key) && currRow.length < 5) {
        //console.log('Enter key pressed!', key);
        changeCurrRow(prev => [...prev, key]);
        //console.log(currRow);
      }
      else if (key == "backspace" && submittedRows.length < 6) {
        changeCurrRow(prev => prev.slice(0, -1));
      }
      else if (key == "enter" && submittedRows.length < 6 && currRow.length == 5) {
        if (!inWordList(currRow)) {
          triggerAlert();
          return;
        }
        changeSubmittedRows(prev => [...prev, currRow]);
        // change keyboard mapping so <keyboard> can get correct colors
        const colors = checkValid(currRow, currGameState.selectedWord.toLowerCase());
        const newMap = new Map(keyboardMapping);
        for(let i = 0; i < 5; i++) {
          if (newMap.get(currRow[i]) !== 3) {
            newMap.set(currRow[i], colors[i]);
          }
        }

        changeKeyboardMapping(newMap);

        // check if win
        if (checkIfWin(currRow, currGameState.selectedWord.toLowerCase())) {
          console.log("WIN WIN WIN!!");
          changeCurrGameState({
            ...currGameState,
            finished: true,
            win: true,
          });
        } else {
          if (submittedRows.length >= 5) {
            console.log("LOSE LOSE LOSE")
            changeCurrGameState({
              ...currGameState,
              finished: true,
              win: false,
            });
          }
        }

        changeCurrRow([]);
        }
      }
     

    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      // remove so multiple event listeners arent added
      // will cause many inputs per press
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [currRow, submittedRows, keyboardMapping, currGameState])

  return (
    <div className="min-h-screen min-w-screen py-10 my-10" >
      {/** Header bar thing */}
      <div className="flex">

      </div>

      {/** alert */}
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
          Not a valid word
        </div>
      )}

      {/** win/lose stuff */}
      {currGameState.finished && (
        <div className="flex flex-col justify-center items-center fixed top-4 left-1/2 transform -translate-x-1/2">
          {/** win/lose notification */}
          <div className="bg-black text-white px-4 py-2 rounded shadow-lg z-50">
          {currGameState.win ? (<h2>You Won!</h2>) : (<h2>You Lost.</h2>)}
          </div>
          {/** popup retry */}
          <div className="flex flex-col justify-center items-center gap-4 bg-black/80 m-5 p-5">
            
            <h1 className="">Want to retry?</h1>
            {/** show word if lost */}
            {!currGameState.win && (
              <h2>The word was {currGameState.selectedWord.toUpperCase()}</h2>
            )}
            {/** retry button */}
            <button onClick={() => resetGame(changeCurrGameState, changeSubmittedRows, changeCurrRow, changeKeyboardMapping)}>
              Play Again
            </button>
          </div>
        </div>
        )
      }

      <div className="flex flex-col items-center justify-center">
        
        {Array.from({length : submittedRows.length}, (_, i) => {
          {/* submitted rows */}
          return(
            <Row key={i} values={submittedRows[i]} colors={checkValid(submittedRows[i], currGameState.selectedWord.toLowerCase())} submitted={true}/>
          )}
        )}
        
        
        {/** input row, if all rows submitted, dont show */}
        {submittedRows.length < 6 ? <Row values={currRow} colors={[]} submitted={true}/> : <></>}
        
        {Array.from({length : 6 - submittedRows.length - 1}, (_, i) => {
          {/* filler rows */}
          return(
            <Row key={i} values={[]} colors={[]} submitted={false}/>
          )}
        )}

        {/** keyboard */}
        <div className="py-10">
          <Keys mapping={keyboardMapping}></Keys>
        </div>
      </div>
    </div>
  )
}

function resetGame(
  changeCurrGameState : React.Dispatch<React.SetStateAction<GameState>>,
  changeSubmittedRows : React.Dispatch<React.SetStateAction<string[][]>>,
  changeCurrRow : React.Dispatch<React.SetStateAction<string[]>>,
  changeKeyboardMapping : React.Dispatch<React.SetStateAction<Map<string, validColor>>>) {

  console.log("Resetting Game");
  changeCurrGameState({
    selectedWord: getRandWord(),
    finished: false,
    win: false,
  });

  changeSubmittedRows([]);
  changeCurrRow([]);
  changeKeyboardMapping(new Map());
}

export default App
