
import { useEffect, useState } from 'react';

import { HangImage } from './components/HangImage';
import { letters} from './helpers/letters';
import { getRandomWord } from './helpers/getRandomWord';

import Swal from 'sweetalert2'

import './App.css'

function App() {

  //el estado es como se encuentra el valor de una variable
  const [word, setWord] = useState( getRandomWord() );
  const [ hiddenWord, setHiddenWord ] = useState('_ '.repeat( word.length ) );
  const [ attempts, setAttempts ] = useState(0);
  const [ lose, setLose ] = useState( false );
  const [ won, setWon] = useState(false);

  //Determina si la persona perdio
  useEffect( () => {
    if( attempts >=9 ){
      setLose(true);
      Swal.fire({
        title: 'la palabra correcta era: ' + word,
        icon: 'error',
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
      });
    }
  }, [attempts]);


  //Determinar is  la persona gano
  useEffect( () => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if (currentHiddenWord === word ){
      setWon(true);
      Swal.fire({
        title: '¡Ganaste!',
        icon: 'success',
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
      })
    }
  }, [ hiddenWord ])


  const checkLetter = ( letter: string ) => {
    
    if( lose ) return;
    if( won ) return;
    
    if( !word.includes(letter)){
      setAttempts( Math.min( attempts + 1, 9 ) );
      return;
    } 

    const hiddenWordArray = hiddenWord.split(' ');
    
    for( let i= 0; i < word.length; i++) {
      if( word[i] === letter ){
          hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '));
  }

  const newGame = () =>{
    const newWord = getRandomWord();

    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }
  return (
    <div className="App container">

      <h3>¡Bienvenido!</h3>
      {/* Contador intentos */}
      <p className='text-danger fw-bold'>Este es el total de intentos que haz tenido:  {attempts}</p>
      <div className='row align-items-center'>
        <div className='col-6'>
          {/* Imagenes */}
          <HangImage imageNumber={attempts} />
          {/* Palabra oculta */}
          <div className="card border border-0 shadow-sm">
            <div className="card-body">
              <h3>{hiddenWord}</h3>
            </div>
          </div>
          
        </div>

        <div className='col-6 '>
          {/* Botones de letras */}
          {
            letters.map((letter) => (
              <button
                onClick={() => checkLetter(letter)}
                key={letter}
                className="btn btn-light"
              >
                {letter}
              </button>
            ))
          }
          <br />
          <br />
          <button onClick={newGame} className="btn btn-primary"> Reiniciar Juego </button>
        </div>
     </div>
     
    </div>
  )
}

export default App
