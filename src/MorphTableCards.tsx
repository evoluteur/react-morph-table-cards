"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import "./MorphTableCards.css";
import ThemeToggle, { useThemeState } from "./ThemeToggle";
import type { Theme } from "./ThemeToggle";

const DEFAULT_ROW_HEIGHT = 31;
const DEFAULT_CARD_HEIGHT = 94;
const DEFAULT_CARD_WIDTH = 210;
const DEFAULT_CARD_GAP = 10;
const CATEGORY_PALETTE_SIZE = 7;

export interface TableCardItem {
  id?: string | number;
  name: string;
  description: string;
  category: string;
}

type ItemKey = string | number;

type View = "cards" | "table";

type SortField = "name" | "category";

interface Position {
  top: number;
  left: number;
}

const itemKey = (item: TableCardItem): ItemKey => item.id ?? item.name;

// Same icon set (mdi:view-list/card-text-outline) as the Cards/List toggle
// on evoluteur-blog's post grid.
const VIEW_ICONS: Record<View, JSX.Element> = {
  table: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z" />
    </svg>
  ),
  cards: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20M4,6V18H20V6H4M6,9H18V11H6V9M6,13H16V15H6V13Z" />
    </svg>
  ),
};

export interface MorphTableCardsProps {
  /** Items to display. `id` is optional; when omitted, `name` is used as the item's identity, so `name` should be unique. */
  data: TableCardItem[];
  disabled?: boolean;
  className?: string;
  onItemClick?: (
    item: TableCardItem,
    event: ReactMouseEvent | ReactKeyboardEvent,
  ) => void;

  /** Initial view. Defaults to `"cards"`. */
  defaultView?: View;
  /** Card width in pixels (also used as the "Name" column width in table view). */
  cardWidth?: number;
  /** Card height in pixels. */
  cardHeight?: number;
  /** Gap between cards, in pixels (cards view only). */
  cardGap?: number;
  /** Row height in pixels (table view). */
  rowHeight?: number;

  theme?: Theme;
  defaultTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
  themeStorageKey?: string;
  /** Set to `false` to hide the built-in theme toggle. */
  showThemeToggle?: boolean;
}

/**
 * MorphTableCards
 *
 * Displays a list of items as a table or as cards, with animated
 * transitions between the two layouts, on sort, and on resize.
 *
 * Ported from the vanilla-JS "isomorphic-table-cards" project
 * (https://github.com/evoluteur/isomorphic-table-cards) as a
 * self-contained, idiomatic React component.
 */
export default function MorphTableCards({
  data,
  disabled = false,
  className = "",
  onItemClick,
  defaultView = "cards",
  cardWidth = DEFAULT_CARD_WIDTH,
  cardHeight = DEFAULT_CARD_HEIGHT,
  cardGap = DEFAULT_CARD_GAP,
  rowHeight = DEFAULT_ROW_HEIGHT,
  theme,
  defaultTheme,
  onThemeChange,
  themeStorageKey,
  showThemeToggle = true,
}: MorphTableCardsProps) {
  const [view, setView] = useState<View>(defaultView);
  const [currentTheme, setTheme] = useThemeState({
    theme,
    defaultTheme,
    onThemeChange,
    storageKey: themeStorageKey,
  });
  const [sortField, setSortField] = useState<SortField>("category");
  const [sortDirection, setSortDirection] = useState(1);
  const [cardsPerRow, setCardsPerRow] = useState(1);
  const holderRef = useRef<HTMLDivElement | null>(null);

  // Order categories by first appearance, used both for the default
  // sort and to assign a stable color from the palette.
  const categoryOrder = useMemo(() => {
    const order: string[] = [];
    data.forEach((item) => {
      if (item.category && !order.includes(item.category)) {
        order.push(item.category);
      }
    });
    return order;
  }, [data]);

  const sortedData = useMemo(() => {
    const copy = [...data];
    if (sortField === "category") {
      copy.sort((a, b) => {
        const diff =
          categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
        return sortDirection * (diff || a.name.localeCompare(b.name));
      });
    } else {
      copy.sort((a, b) => sortDirection * a.name.localeCompare(b.name));
    }
    return copy;
  }, [data, sortField, sortDirection, categoryOrder]);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return undefined;

    const updateCardsPerRow = () => {
      setCardsPerRow(
        Math.max(
          1,
          Math.floor((holder.clientWidth + cardGap) / (cardWidth + cardGap)),
        ),
      );
    };

    updateCardsPerRow();
    const observer = new ResizeObserver(updateCardsPerRow);
    observer.observe(holder);
    return () => observer.disconnect();
  }, [cardWidth, cardGap]);

  const isCards = view === "cards";

  const positions = useMemo(() => {
    const map = new Map<ItemKey, Position>();
    sortedData.forEach((item, idx) => {
      const top = isCards
        ? Math.floor(idx / cardsPerRow) * (cardHeight + cardGap)
        : 40 + idx * rowHeight;
      const left = isCards ? (idx % cardsPerRow) * (cardWidth + cardGap) : 0;
      map.set(itemKey(item), { top, left });
    });
    return map;
  }, [sortedData, isCards, cardsPerRow, cardHeight, cardWidth, cardGap, rowHeight]);

  const cardRows = Math.ceil(sortedData.length / cardsPerRow);
  const totalHeight = isCards
    ? 20 + cardRows * cardHeight + Math.max(cardRows - 1, 0) * cardGap
    : 20 + 40 + sortedData.length * rowHeight;

  const handleSort = (field: SortField) => {
    if (disabled) return;
    setSortDirection(field === sortField ? -sortDirection : 1);
    setSortField(field);
  };

  const sortCaret = (field: SortField) =>
    sortField === field ? (
      <svg
        className="rmtc-sort-caret"
        viewBox="0 0 10 6"
        width="8"
        height="8"
        aria-hidden="true"
        style={sortDirection === -1 ? { transform: "rotate(180deg)" } : undefined}
      >
        <path d="M5 0L10 6H0Z" fill="currentColor" />
      </svg>
    ) : null;

  const canClickItems = !disabled && typeof onItemClick === "function";

  const handleItemClick = (
    item: TableCardItem,
    event: ReactMouseEvent<HTMLDivElement>,
  ) => {
    if (!canClickItems) return;
    onItemClick?.(item, event);
  };

  const handleItemKeyDown = (
    item: TableCardItem,
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (!canClickItems) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onItemClick?.(item, event);
    }
  };

  const categoryClassName = (category: string) => {
    if (!category) return "";
    const paletteIndex =
      (categoryOrder.indexOf(category) % CATEGORY_PALETTE_SIZE) + 1;
    return ` rmtc-category-${paletteIndex}`;
  };

  const rootClassName = [
    "rmtc",
    isCards ? "rmtc--cards" : "rmtc--table",
    disabled ? "rmtc--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName} data-theme={currentTheme}>
      <div className="rmtc-toolbar">
        <div className="rmtc-controls">
          <div className="rmtc-sort" role="group" aria-label="Sort by">
            <span className="rmtc-toolbar-label">Sort:</span>
            <button
              type="button"
              disabled={disabled}
              aria-pressed={sortField === "name"}
              onClick={() => handleSort("name")}
            >
              Name
              {sortCaret("name")}
            </button>
            <button
              type="button"
              disabled={disabled}
              aria-pressed={sortField === "category"}
              onClick={() => handleSort("category")}
            >
              Category
              {sortCaret("category")}
            </button>
          </div>
          <div className="rmtc-view-toggle" role="group" aria-label="View">
            <button
              type="button"
              disabled={disabled}
              aria-pressed={view === "table"}
              onClick={() => !disabled && setView("table")}
            >
              {VIEW_ICONS.table} Table
            </button>
            <button
              type="button"
              disabled={disabled}
              aria-pressed={view === "cards"}
              onClick={() => !disabled && setView("cards")}
            >
              {VIEW_ICONS.cards} Cards
            </button>
          </div>
        </div>
        {showThemeToggle && (
          <ThemeToggle
            theme={currentTheme}
            onChange={setTheme}
            disabled={disabled}
          />
        )}
      </div>

      <div
        className="rmtc-body"
        style={{ height: totalHeight }}
        ref={holderRef}
      >
        <div className={`rmtc-header${isCards ? " rmtc-header--hidden" : ""}`}>
          <div onClick={() => handleSort("name")}>Name</div>
          <div onClick={() => handleSort("category")}>Category</div>
        </div>

        {/* Render in the original `data` order, not `sortedData`: items are
            positioned absolutely via left/top, so DOM order doesn't affect
            layout, but reordering DOM siblings in the same commit as a
            left/top change makes Chromium skip the CSS transition for the
            moved nodes. Keeping DOM order stable avoids that entirely. */}
        {data.map((item) => {
          const key = itemKey(item);
          const pos = positions.get(key);
          if (!pos) return null;
          return (
            <div
              key={key}
              className={`rmtc-item${categoryClassName(item.category)}`}
              style={{
                left: pos.left,
                top: pos.top,
              }}
              onClick={(event) => handleItemClick(item, event)}
              onKeyDown={(event) => handleItemKeyDown(item, event)}
              role={canClickItems ? "button" : undefined}
              tabIndex={canClickItems ? 0 : undefined}
              aria-disabled={disabled || undefined}
            >
              <div className="rmtc-c1">{item.name}</div>
              <div className="rmtc-c2">{item.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
