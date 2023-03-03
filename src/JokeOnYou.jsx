import './JokeOnYou.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

function JokeOnYou() {
  const [joke, setJoke] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  useEffect(() => {
    axios.get('https://v2.jokeapi.dev/joke/Programming?amount=10')
    .then(res => {
        setJoke(res.data.jokes.map(j => (j.type === 'single'? 
        {type: 's', joke: j.joke}: 
        {type: 'tp', setup: j.setup, delivery:j.delivery}
        )));
    });
  }, [lastRefresh]);

  return (
    <div className="joke-box">
      <h1 className='heading'>10 Programming jokes</h1>
      <ol className='joke-list'>
      {
        joke?.map(j=> (
          j.type === 's'? 
          <li className='single-joke'>{j.joke}</li>:
          <li className='two_part-joke'>
            <div>Setup: {j.setup}</div>
            <div>Delivery: {j.delivery}</div>
          </li>
        ))
      }
      </ol>
      <button className='btn' onClick={()=>setLastRefresh(Date.now())}>New jokes</button>
    </div>
  );
}

export default JokeOnYou;
