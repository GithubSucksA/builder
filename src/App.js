import './App.css';
import { useState, useEffect } from 'react';

//SIDE COMPONENTS
function Resource(props) {
  return (
    <div className={`left-column ${props.hidden} ${props.classId} ${props.toned}`}>
        <p id={props.id}>{props.name}</p>
        <p id="coin-amount">{props.amount}/100</p>
        <p id="coin-per-second">0/s</p>
    </div>
  )
}

function Builders(props) {
  return (
    <button className={`${props.btn} ${props.maintool} ${props.hidden} ${props.remover}`} onClick={props.onclick}>Gather {props.name}<span className={props.tooltip}>{props.tooltext}</span></button>
  )
}

//MAIN COMPONENT APP
function App(props) {
  //USESTATE HOOKS RECOURCES
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem("coins");
    const initialValue = JSON.parse(saved);
    return initialValue || 0;
  });

  const [peasants, setPeasants] = useState(() => {
    const saved = localStorage.getItem('peasants');
    const initialValue = JSON.parse(saved);
    return initialValue || 0;
  });

  const [farms, setFarms] = useState(0)
  const [food, setFood] = useState(() => {
    const saved = localStorage.getItem('food');
    const initialValue = JSON.parse(saved);
    return initialValue || 0;
  });

  //PRICE USESTATES
  const [pricePeasant, setPricePeasant] = useState(5);

  //SHOWCASE USESTATES
  const [hiddenPeasant, setHiddenPeasant] = useState(() => {
    const saved = localStorage.getItem('ispeasantvisible');
    //const initialValue = JSON.parse(saved);
    //console.log(initialValue)
    return saved || 'hidden';
  })

  const [hiddenfood, setHiddenFood] = useState(() => {
    const saved = localStorage.getItem('isfoodvisible');
    //const initialValue = JSON.parse(saved);
    return saved || 'hidden'
  });

  const [hiddenFarm, setHiddenFarms] = useState(() => {
    const saved = localStorage.getItem('isfarmvisible');
    //const initialValue = JSON.parse(saved);
    return saved || 'hidden'
  })

  //USE EFFECT HOOKS SHOWCASE
  useEffect(() => {
    if (peasants > 1) {return}
    if (peasants > 0) {
      document.querySelector('.tabsinner').classList.remove('hidden');
      setHiddenFood(true);
      setHiddenFarms(true);
    }
  },[peasants])

  useEffect(() => {
    if (coins > 6) {return};
    if (coins == 5) {
      setHiddenPeasant(true);
  }},[coins])

  useEffect(() => {
    // storing input name
    localStorage.setItem("coins", JSON.stringify(coins));
  }, [coins]);
  useEffect(() => {
    localStorage.setItem('food', JSON.stringify(food));
  }, [food]);
  useEffect(() => {
    // storing input name
    localStorage.setItem("peasants", JSON.stringify(peasants));
  }, [peasants]);
  useEffect(() => {
    localStorage.setItem('ispeasantvisible', hiddenPeasant);
  });
  useEffect(() => {
    localStorage.setItem('isfoodvisible', hiddenfood);
  });
  useEffect(() => {
    localStorage.setItem('farms', farms);
  });
  useEffect(() => {
    localStorage.setItem('isfarmvisible', hiddenFarm);
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (food < 100) {
        setFood((food + 0.1 * peasants).toFixed(2) * 100 / 100);}
    }, 1000);
    return () => clearInterval(interval); 
      }, [food, peasants]);

  return (
      <>
        <div className="container">
            <div className="column">
                <Resource id='coins' name='coins' amount={coins}></Resource>
                <Resource toned='toned' classId='peasant' id='peasants' name='peasants' hidden={hiddenPeasant} amount={peasants}></Resource>
                <Resource classId='food' name='food' hidden={hiddenfood} amount={food}></Resource>
                <Resource hidden={hiddenFarm} toned='toned' name='farms' amount={farms}></Resource>
            </div>
            <div className="middle-column column">
                <div className="button">
                    <Builders btn='btn' onclick={() => {setCoins(coins + 1)}}  name='coin'></Builders>
                    <Builders  btn='btn' tooltext={`next peasant costs:  ${pricePeasant}`} hidden={hiddenPeasant} maintool={'tooltip'} tooltip={'tooltiptext peasanttool'} onclick={() => {if (coins >= pricePeasant) {setPeasants(peasants + 1); setCoins(coins - 5); setPricePeasant(pricePeasant * 1.2)}}} name='peasants'></Builders>
                    <Builders btn='btn' name='farms'></Builders>
                </div>
            </div>
            <div className="right-column column">
                <div id="reactbtn">
                    
                </div>
            </div>
        </div>
      </>
  );
}

export default App;
