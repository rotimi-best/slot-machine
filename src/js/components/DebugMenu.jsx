function DebugMenu({ symbols, setSymbols }) {

  const handleSelect = (slotId, slotProperty) => event => {
    setSymbols({
      ...symbols,
      [slotId]: {
        ...symbols[slotId],
        [slotProperty]: event.target.value
      }
    });
  }

  return (
    <section id="debugMenu">
      <div className="slot">
        <select className="debug-selector" value={symbols.slot1.symbol} onChange={handleSelect('slot1', 'symbol')}>
          <option defaultValue value={SYMBOLS.bar}>Bar</option>
          <option value={SYMBOLS.twoBar}>2XBAR</option>
          <option value={SYMBOLS.threeBar}>3XBAR</option>
          <option value={SYMBOLS.seven}>7</option>
          <option value={SYMBOLS.cherry}>Cherry</option>
        </select>
        <select className="debug-selector" value={symbols.slot1.postion} onChange={handleSelect('slot1', 'position')}>
          <option defaultValue value={POSITIONS.TOP}>TOP</option>
          <option value={POSITIONS.CENTER}>CENTER</option>
          <option value={POSITIONS.BOTTOM}>BOTTOM</option>
        </select>
      </div>
      <div className="slot">
        <select className="debug-selector" value={symbols.slot2.symbol} onChange={handleSelect('slot2', 'symbol')}>
          <option defaultValue value={SYMBOLS.bar}>Bar</option>
          <option value={SYMBOLS.twoBar}>2XBAR</option>
          <option value={SYMBOLS.threeBar}>3XBAR</option>
          <option value={SYMBOLS.seven}>7</option>
          <option value={SYMBOLS.cherry}>Cherry</option>
        </select>
        <select className="debug-selector" value={symbols.slot2.postion} onChange={handleSelect('slot2', 'position')}>
          <option defaultValue value={POSITIONS.TOP}>TOP</option>
          <option value={POSITIONS.CENTER}>CENTER</option>
          <option value={POSITIONS.BOTTOM}>BOTTOM</option>
        </select>
      </div>
      <div className="slot">
        <select className="debug-selector" value={symbols.slot3.symbol} onChange={handleSelect('slot3', 'symbol')}>
          <option defaultValue value={SYMBOLS.bar}>Bar</option>
          <option value={SYMBOLS.twoBar}>2XBAR</option>
          <option value={SYMBOLS.threeBar}>3XBAR</option>
          <option value={SYMBOLS.seven}>7</option>
          <option value={SYMBOLS.cherry}>Cherry</option>
        </select>
        <select className="debug-selector" value={symbols.slot3.postion} onChange={handleSelect('slot3', 'position')}>
          <option defaultValue value={POSITIONS.TOP}>TOP</option>
          <option value={POSITIONS.CENTER}>CENTER</option>
          <option value={POSITIONS.BOTTOM}>BOTTOM</option>
        </select>
      </div>
    </section>
  )
}