import React,{useCallback, useEffect, useState} from 'react';
import style from './App.module.css';

import dice from './images/icon-dice.svg';
import divider from './images/pattern-divider-desktop.svg';

const axios = require('axios');


function App() {
  const [advice, setAdvice] = useState();
  const [number, setNumber] = useState(); 


  const getAdvice = () => {
    axios.get('https://api.adviceslip.com/advice')
      .then((response) => {
        return response
      })
      .then((data) => {
          const adviceNumber = "#" + data.data.slip.id;
          const adviceParag = '"' + data.data.slip.advice + '"';
          setAdvice(adviceParag);
          setNumber(adviceNumber)
          
      })
  };


  useEffect(() => {
    getAdvice()
  }, [] )
  
  const clickHandler = useCallback(() => {
    
    getAdvice();

  },[])

  return (
    <div className={style.app}>
      <div className={style.container}>
        <p className={style.title}> ADVICE {number} </p>
        <p className={style.parag}> {advice} </p>
        <img src={divider} alt='divider' className={style.dividerImg} />
        <div className={style.diceDiv} onClick={clickHandler} >
          <img src={dice} alt='dice' className={style.diceImg} />
        </div>
      </div>
    </div>
  );
}

export default App;
