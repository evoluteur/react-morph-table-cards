import { useState } from "react";
import MorphTableCards from "../src/MorphTableCards";
import type { TableCardItem } from "../src/MorphTableCards";
import ThemeToggle, { useThemeState } from "../src/ThemeToggle";
import { data } from "./data";
import Docs from "./Docs";

export default function App() {
  const [disabled, setDisabled] = useState(false);
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const [theme, setTheme] = useThemeState({});

  const handleItemClick = (item: TableCardItem) => setLastClicked(item.name);

  return (
    <div className="demo-page" data-theme={theme}>
      <header className="demo-header">
        <div>
          <h1>React-Morph-Table-Cards</h1>
          <p className="demo-subtitle">
            React/TypeScript component for animated morphing between table and
            card views, and on sort.
          </p>
        </div>
        <ThemeToggle theme={theme} onChange={setTheme} />
      </header>

      <h2>Demo</h2>

      <p>Click "Table" / "Cards" or a sort button.</p>

      <MorphTableCards
        data={data}
        disabled={disabled}
        className="demo-table-cards"
        onItemClick={handleItemClick}
        theme={theme}
        showThemeToggle={false}
      />

      <p className="demo-log">
        {lastClicked ? `Last clicked: ${lastClicked}` : "Click an item…"}
      </p>

      <label>
        <input
          type="checkbox"
          checked={disabled}
          onChange={(e) => setDisabled(e.target.checked)}
        />{" "}
        disabled
      </label>

      <Docs />
    </div>
  );
}
