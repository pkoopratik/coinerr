import './App.css';
import React,{useState,useEffect} from 'react';
import  axios from 'axios';
import { selectOptions } from '@testing-library/user-event/dist/select-options';
import Coin from './Coin';
import './Coin.css';
import './App.css'


function App() {
  const[coins,setCoins]=useState([]);
  const[search,setSearch]=useState('');

  useEffect(()=>{

    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=25&page=1&sparkline=false')
    .then(res=>{
      setCoins(res.data);

    }).catch(error=>console.log(error));
  },[]);

const handleChange=e=>{setSearch(e.target.value)};


const filteredCoins = coins.filter(coin =>coin.name.toLowerCase().includes(search.toLowerCase())
);



  return (
    
    <div className="coin-app">
      <p className='head'>coinerr</p>
     <div className='coin-search'>

       <h1 className="coin-text">Search Currency</h1>
       <form>
         <input type="text" placeholder="search" className="coin-input" onChange={handleChange}/>

       </form>
     </div>
     {
       filteredCoins.map(coin=>{
         return(
           <Coin 
           key={coin.id}
           name={coin.name}
           image={coin.image}
           symbol={coin.symbol}
           volume={coin.market_cap}
           price={coin.current_price}
           priceChange={coin.price_change_percentage_24h}




           />
         );
         
       })
     }

    </div>
  );
}

export default App;
