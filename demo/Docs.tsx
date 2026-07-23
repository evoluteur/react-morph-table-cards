export default function Docs() {
  return (
    <section className="demo-docs">
      <h2>Documentation</h2>

      <p>
        A reusable React component that displays a list of items as a{" "}
        <strong>table</strong> or as <strong>cards</strong>, with animated
        transitions between the two layouts, on sorting, and on window resize.
      </p>

      <p>
        It's a React port of{" "}
        <a
          href="https://github.com/evoluteur/isomorphic-table-cards"
          target="_blank"
          rel="noreferrer"
        >
          isomorphic-table-cards
        </a>
        , a vanilla-JS/CSS project that achieves the morphing effect with
        absolutely positioned items and CSS transitions on{" "}
        <code>transform</code> which was a port of{" "}
        <a
          href="https://github.com/evoluteur/d3-table-cards"
          target="_blank"
          rel="noreferrer"
        >
          d3-table-cards
        </a>
        .
      </p>

      <h3>Install</h3>
      <pre>
        <code>npm install react-morph-table-cards</code>
      </pre>

      <h3>Usage</h3>
      <pre>
        <code>{`import { MorphTableCards } from "react-morph-table-cards";
import "react-morph-table-cards/style.css";

const data = [
  { id: 1, name: "Espresso", description: "Bold shot pulled under pressure.", category: "Coffee" },
  { id: 2, name: "Green Tea", description: "Light, grassy, and antioxidant-rich.", category: "Tea" },
  // ...
];

function App() {
  return (
    <MorphTableCards
      data={data}
      onItemClick={(item) => console.log("clicked", item)}
    />
  );
}`}</code>
      </pre>

      <p>
        The component renders its own toolbar (Sort by Name/Category, a
        Table/Cards view toggle, and a light/dark/omg theme toggle) above the
        list, so it works as a drop-in, self-contained widget.
      </p>

      <h3>Props</h3>
      <div className="demo-docs-table">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>data</code>
              </td>
              <td>
                <code>{`Array<{ id?, name, description, category }>`}</code>
              </td>
              <td>yes</td>
              <td>
                Items to display. <code>id</code> is optional; when omitted,{" "}
                <code>name</code> is used as the item's identity, so{" "}
                <code>name</code> should be unique.
              </td>
            </tr>
            <tr>
              <td>
                <code>disabled</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>no</td>
              <td>
                When <code>true</code>, dims the component and disables sorting,
                view toggling, and <code>onItemClick</code>. Defaults to{" "}
                <code>false</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>className</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>no</td>
              <td>Extra class name(s) applied to the root element.</td>
            </tr>
            <tr>
              <td>
                <code>onItemClick</code>
              </td>
              <td>
                <code>{`(item, event) => void`}</code>
              </td>
              <td>no</td>
              <td>
                Called when an item (card or row) is clicked or activated via
                keyboard.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Additional (optional) props</h4>
      <p>
        These have sensible defaults and don't need to be set for typical use:
      </p>
      <div className="demo-docs-table">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>defaultView</code>
              </td>
              <td>
                <code>{`"cards" | "table"`}</code>
              </td>
              <td>
                <code>"cards"</code>
              </td>
              <td>Initial view.</td>
            </tr>
            <tr>
              <td>
                <code>cardWidth</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>210</code>
              </td>
              <td>
                Card width in pixels (also used as the "Name" column width in
                table view).
              </td>
            </tr>
            <tr>
              <td>
                <code>cardHeight</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>94</code>
              </td>
              <td>Card height in pixels.</td>
            </tr>
            <tr>
              <td>
                <code>cardGap</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>10</code>
              </td>
              <td>Gap between cards, in pixels (cards view only).</td>
            </tr>
            <tr>
              <td>
                <code>rowHeight</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>31</code>
              </td>
              <td>Row height in pixels (table view).</td>
            </tr>
            <tr>
              <td>
                <code>theme</code>
              </td>
              <td>
                <code>{`"light" | "dark" | "omg"`}</code>
              </td>
              <td>—</td>
              <td>
                Controls the theme externally. Omit to let the component manage
                its own theme state (uncontrolled).
              </td>
            </tr>
            <tr>
              <td>
                <code>defaultTheme</code>
              </td>
              <td>
                <code>{`"light" | "dark" | "omg"`}</code>
              </td>
              <td>system preference</td>
              <td>
                Initial theme when uncontrolled and nothing is in{" "}
                <code>localStorage</code> yet.
              </td>
            </tr>
            <tr>
              <td>
                <code>onThemeChange</code>
              </td>
              <td>
                <code>{`(theme) => void`}</code>
              </td>
              <td>—</td>
              <td>
                Called whenever the theme changes (controlled or uncontrolled).
              </td>
            </tr>
            <tr>
              <td>
                <code>themeStorageKey</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>—</td>
              <td>
                When set, the chosen theme is persisted to{" "}
                <code>localStorage</code> under this key and restored on mount.
                Off by default so the component doesn't write to storage
                unasked.
              </td>
            </tr>
            <tr>
              <td>
                <code>showThemeToggle</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>
                Set to <code>false</code> to hide the built-in theme toggle
                (e.g. if the host page drives <code>theme</code> itself).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Theming</h3>
      <p>
        The component ships with three themes — <strong>light</strong>,{" "}
        <strong>dark</strong>, and <strong>omg</strong> (the blue theme from{" "}
        <a href="https://evoluteur.github.io/" target="_blank" rel="noreferrer">
          evoluteur.github.io
        </a>
        ) — toggled with the same three-icon control (sun / moon / spiral) used
        on{" "}
        <a
          href="https://github.com/evoluteur/evoluteur-blog"
          target="_blank"
          rel="noreferrer"
        >
          evoluteur-blog
        </a>
        , rendered at the top right of the toolbar.
      </p>
      <p>
        Theming is scoped to the component via a <code>data-theme</code>{" "}
        attribute on the root <code>.rmtc</code> element — it never touches{" "}
        <code>document.documentElement</code> — so it's safe to drop into a page
        that has its own theming system. Colors are driven by CSS custom
        properties (<code>--rmtc-bg</code>, <code>--rmtc-panel-bg</code>,{" "}
        <code>--rmtc-text</code>, <code>--rmtc-text-secondary</code>,{" "}
        <code>--rmtc-border</code>, <code>--rmtc-primary</code>,{" "}
        <code>--rmtc-toggle-bg</code>), overridable per theme via{" "}
        <code>{`.rmtc[data-theme="..."]`}</code> if you want to restyle or add a
        theme.
      </p>

      <h3>Styling</h3>
      <p>
        Items are color-coded by <code>category</code>, cycling through a
        7-color default palette (<code>.rmtc-category-1</code> through{" "}
        <code>.rmtc-category-7</code>, unaffected by theme since they're always
        light pastel chips) defined in <code>style.css</code>. Override these
        classes, or the CSS custom properties <code>--rmtc-card-width</code>,{" "}
        <code>--rmtc-card-height</code>, and <code>--rmtc-row-height</code> on
        the root <code>.rmtc</code> element, to customize appearance.
      </p>

      <h3>Local development</h3>
      <pre>
        <code>{`npm install
npm run dev      # runs the demo app in ./demo
npm run build    # builds the library to ./dist`}</code>
      </pre>

      <h3>License</h3>
      <p>react-morph-table-cards is released under the MIT license.</p>
      <p>
        Encourage this project by becoming a{" "}
        <a
          href="https://github.com/sponsors/evoluteur"
          target="_blank"
          rel="noreferrer"
        >
          sponsor
        </a>
        .
      </p>

      <p>
        You may want to also check out{" "}
        <a
          href="https://github.com/evoluteur/react-morph-charts"
          target="_blank"
          rel="noreferrer"
        >
          React-Morph-Charts
        </a>
        , a similar project for animated transitions between bubble, bars, and
        pie charts.
      </p>

      <p>
        &#169; 2026{" "}
        <a href="https://evoluteur.github.io/" target="_blank" rel="noreferrer">
          Olivier Giulieri
        </a>
        .
      </p>
    </section>
  );
}
