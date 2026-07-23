import { JSX as JSX_2 } from 'react';
import { KeyboardEvent as KeyboardEvent_2 } from 'react';
import { MouseEvent as MouseEvent_2 } from 'react';

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
declare function MorphTableCards({ data, disabled, className, onItemClick, defaultView, cardWidth, cardHeight, cardGap, rowHeight, theme, defaultTheme, onThemeChange, themeStorageKey, showThemeToggle, }: MorphTableCardsProps): JSX_2.Element;
export { MorphTableCards }
export default MorphTableCards;

export declare interface MorphTableCardsProps {
    /** Items to display. `id` is optional; when omitted, `name` is used as the item's identity, so `name` should be unique. */
    data: TableCardItem[];
    disabled?: boolean;
    className?: string;
    onItemClick?: (item: TableCardItem, event: MouseEvent_2 | KeyboardEvent_2) => void;
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

export declare interface TableCardItem {
    id?: string | number;
    name: string;
    description: string;
    category: string;
}

export declare type Theme = (typeof THEMES)[number];

export declare const THEMES: readonly ["light", "dark", "omg"];

export declare function ThemeToggle({ theme, onChange, disabled }: ThemeToggleProps): JSX_2.Element;

export declare interface ThemeToggleProps {
    theme: Theme;
    onChange: (theme: Theme) => void;
    disabled?: boolean;
}

/**
 * Manages the light/dark/omg theme state for MorphTableCards.
 * Uncontrolled by default (persists to localStorage under `storageKey`
 * when provided); pass `theme` to control it externally instead.
 */
export declare function useThemeState({ theme, defaultTheme, onThemeChange, storageKey, }: UseThemeStateOptions): [Theme, (next: Theme) => void];

export declare interface UseThemeStateOptions {
    theme?: Theme;
    defaultTheme?: Theme;
    onThemeChange?: (theme: Theme) => void;
    storageKey?: string;
}

declare type View = "cards" | "table";

export { }
