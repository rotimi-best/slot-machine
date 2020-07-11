const win = new Audio("sounds/win.mp3");
const lose = new Audio("sounds/lose.mp3");
const spin = Array.from({ length: numberOfSymbols })
  .map(() => new Audio("sounds/spin.mp3"));
const coin =  Array.from({ length: 3 })
  .map(() => new Audio("sounds/coin.mp3"));
let sound = 0;
let coinCount = 0;

const stopRollAfter = 2000;
const rollEvery = 50;

// Show 2 or 3 symbols in 1 render
function Slot(props) {
  const {
    id,
    defaultSymbolsToDisplay,
    delay,
    start,
    onCompleteSpin,
    fixedSymbol,
    lastSlot = false,
    toggleReels
  } = props;
  const interval = React.useRef();
  const symbolsToDisplay = React.useRef(defaultSymbolsToDisplay);
  const [symbols, setSymbols] = React.useState([]);

  const updateSymbols = calcForFixed => {
    const _symbols = [];
    const existingRandValues = [];

    if (calcForFixed && fixedSymbol) {
      const {
        position,
        symbol
      } = fixedSymbol;
      const fixedSymbolIndex = images.findIndex(image => image.alt === symbol);
      symbolsToDisplay.current = 3;

      for (let i = 0; i < symbolsToDisplay.current; i++) {
        let randValue = randomInt(0, 4);
        if (position === POSITIONS.TOP) {
            existingRandValues.push(fixedSymbolIndex);
            if (i === 0) {
            _symbols.push(images[fixedSymbolIndex]);
          } else {
            while(existingRandValues.includes(randValue)) {
              randValue = randomInt(0, 4);
            }
            existingRandValues.push(randValue);
            _symbols.push(images[randValue]);
          }
        } else if (position === POSITIONS.CENTER) {
            existingRandValues.push(fixedSymbolIndex);
            if (i === 1) {
            _symbols.push(images[fixedSymbolIndex]);
          } else {
            while(existingRandValues.includes(randValue)) {
              randValue = randomInt(0, 4);
            }
            existingRandValues.push(randValue);
            _symbols.push(images[randValue]);
          }
        } else if (position === POSITIONS.BOTTOM) {
          existingRandValues.push(fixedSymbolIndex);
            if (i === 2) {
            _symbols.push(images[fixedSymbolIndex]);
          } else {
            while(existingRandValues.includes(randValue)) {
              randValue = randomInt(0, 4);
            }
            existingRandValues.push(randValue);
            _symbols.push(images[randValue]);
          }
        }
      }

      setSymbols([ ..._symbols ]);
      if (lastSlot && toggleReels) {
        toggleReels()
      }
    } else {
      symbolsToDisplay.current = randomInt(2, 3);

      for (let i = 0; i < symbolsToDisplay.current; i++) {
        let randValue = randomInt(0, 4);
        while(existingRandValues.includes(randValue)) {
          randValue = randomInt(0, 4);
        }

        existingRandValues.push(randValue);
        _symbols.push(images[randValue]);
      }
      setSymbols([ ..._symbols ]);
      sound++;
      if (sound===spin.length){
        sound=0;
      }
      spin[sound].play();
    }
  }

  // componentDidMount
  React.useEffect(() => {
    updateSymbols();
  }, []);

  // componentDidUpdate - on 'start' value change
  React.useEffect(() => {
    if (start) {
      // Start rolling depending on the delay value
      setTimeout(() => {
        // Roll every 50 millisecond
        interval.current = setInterval(() => {
          updateSymbols()
        }, rollEvery);

        // Stop roll after 2 seconds
        setTimeout(() => {
          clearInterval(interval.current);
          coin[coinCount].play();
          coinCount++;
          if (coinCount=== 2){
            coinCount=0;
          }

          if (fixedSymbol) {
            updateSymbols(true);
          } else {
            if (lastSlot && toggleReels) {
              toggleReels()
            }
          }
        }, stopRollAfter);
      }, delay);
    } else {
      if (symbols.length) {
        onCompleteSpin({
          slotId: id,
          slotSymbols: symbols
        }, lastSlot);
      }
    }
  }, [start]);

  return (
    <div id={id} className={symbolsToDisplay.current === 2 ? "two" : "three"}>
      {symbols.map(symbol => (
        <img src={symbol.src} alt={symbol.alt} />
      ))}
    </div>
  );
}

function SlotContainer({
  toggleReels,
  rolling,
  checkResult,
  debug
}) {
  const [, setSlotResults] = useStateCallback({
    slot1: [],
    slot2: [],
    slot3: [],
  });

  const [fixedSymbols, setFixedSymbols] = React.useState({
    slot1: {
      position: POSITIONS.TOP,
      symbol: SYMBOLS.bar
    },
    slot2: {
      position: POSITIONS.TOP,
      symbol: SYMBOLS.bar
    },
    slot3: {
      position: POSITIONS.TOP,
      symbol: SYMBOLS.bar
    },
  });

  const onCompleteSpin = (
    { slotId, slotSymbols },
    shouldCheckResult
  ) => {
    const updateState = currentState => ({
      ...currentState,
      [slotId]: slotSymbols
    });

    const onUpdated = slotResults => {
      if (shouldCheckResult) {
        checkResult(Object.values(slotResults));
      }
    }

    setSlotResults(updateState, onUpdated);
  };

  return (
    <div>
      {debug && <DebugMenu symbols={fixedSymbols} setSymbols={setFixedSymbols} />}
      <section id="SlotsContainer">
        <div
          id="payLine"
        />
        <Slot
          id="slot1"
          defaultSymbolsToDisplay={3}
          delay={0}
          onCompleteSpin={onCompleteSpin}
          start={rolling}
          fixedSymbol={debug ? fixedSymbols.slot1 : null}
        />
        <Slot
          id="slot2"
          defaultSymbolsToDisplay={3}
          delay={500}
          onCompleteSpin={onCompleteSpin}
          start={rolling}
          fixedSymbol={debug ? fixedSymbols.slot2 : null}
        />
        <Slot
          id="slot3"
          defaultSymbolsToDisplay={3}
          delay={1000}
          onCompleteSpin={onCompleteSpin}
          start={rolling}
          toggleReels={toggleReels}
          fixedSymbol={debug ? fixedSymbols.slot3 : null}
          lastSlot
        />
      </section>
    </div>
  )
}

function App() {
  const [audio, setAudio] = React.useState(true);
  const [debug, setDebug] = React.useState(false);
  const [rolling, setRolling] = React.useState(false);
  const [balance, setBalance] = useStateCallback(100);
  const [credit, setCredit] = React.useState(0);
  const [counting, setCounting] = React.useState(false)
  const inteval = React.useRef();

  const toggleReels = () => {
    if (!rolling) {
      setCredit(0);
      setBalance(balance - 1);
    }
    setRolling(!rolling);
  }

  const toggleAudio = () => {
    if (!audio){
      setAudio(!audio);

      for (const x of spin){
        x.volume = 0.5;
      }

      for (const x of coin){
        x.volume = 0.5;
      }

      win.volume = 1.0;
      lose.volume = 1.0;
    } else {
      setAudio(!audio);
      for (const x of spin){
        x.volume = 0;
      }
      for (const x of coin){
        x.volume = 0;
      }

      win.volume = 0;
      lose.volume = 0;
    }
  }

  const checkResult = slotResults => {
    const credit = totalScoresWon(slotResults);
    if (credit === 0) return;

    setCredit(`+ ${credit}`);
    win.play();
    setCounting(true);

    const nextBalance = balance + credit;
    inteval.current = setInterval(() => {
        setBalance(balance => {
          const newBalance = balance + 1;
          if (newBalance > nextBalance) {
            clearInterval(inteval.current)
            setCounting(false);
            return balance;
          }

          return newBalance;
        });
    }, 100);
  }

  const handleDebugMode = () => {
    setDebug(!debug);
  }

  const handleBalance = event => {
    if (event.target.value >= 1 && event.target.value <= 5000) {
      setBalance(event.target.value)
    } else if (!event.target.value) {
      setBalance(event.target.value)
    }
  }

  return (
    <main>
      <section id="status">
        Derivco Slot Machine
      </section>
      <SlotContainer
        debug={debug}
        rolling={rolling}
        toggleReels={toggleReels}
        checkResult={checkResult}
      />
      <section id="actions">
        <div>
          <p>Credit: {credit}</p>
        </div>
        <div id="balance">
          <p>Balance:  {
            !rolling && !counting
              ? <input type="text" value={balance} onChange={handleBalance}/>
              : balance
          }</p>
        </div>
      </section>
      <section id="actions">
        <button id="spinBtn" className={(rolling || counting) ? "disabled" : ""} onClick={(rolling || counting) ? null : toggleReels}>
          Spin
        </button>
        <div>
          <label htmlFor="debug">Debug mode</label>
          <input
            type="checkbox"
            id="debug"
            name="debug"
            onChange={handleDebugMode}
            checked={debug}
          />
        </div>
      </section>
      <section id="options">
        <img src={`icons/audio${audio ? 'On' : 'Off'}.png`} id="audio" className="option" onClick={toggleAudio} />
      </section>
    </main>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
