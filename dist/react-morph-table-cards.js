import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { useState as y, useRef as J, useMemo as N, useEffect as Q } from "react";
const k = ["light", "dark", "omg"], X = {
  light: /* @__PURE__ */ o("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ o("path", { d: "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" }) }),
  dark: /* @__PURE__ */ o("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ o("path", { d: "M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" }) }),
  omg: /* @__PURE__ */ o(
    "svg",
    {
      viewBox: "0 0 20 20",
      width: "18",
      height: "18",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ o("path", { d: "M10 10 10.18 10.07 10.28 10.25 10.26 10.5 10.09 10.74 9.78 10.91 9.37 10.93 8.93 10.75 8.55 10.37 8.32 9.81 8.33 9.15 8.61 8.47 9.17 7.91 9.96 7.56 10.89 7.53 11.83 7.86 12.63 8.55 13.16 9.55 13.29 10.74 12.98 11.96 12.2 13.03 11.04 13.8 9.61 14.11 8.1 13.87 6.72 13.08 5.67 11.79 5.13 10.15 5.21 8.36 5.95 6.65 7.31 5.28 9.12 4.44 11.18 4.31 13.21 4.93 14.95 6.28 16.12 8.22 16.54 10.51 16.11 12.87 14.83 14.98 12.83 16.54 10.34 17.3 7.68 17.13" })
    }
  )
};
function G() {
  return typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function ee({
  theme: n,
  defaultTheme: c,
  onThemeChange: d,
  storageKey: r
}) {
  const g = n !== void 0, [u, C] = y(() => {
    if (g) return n;
    if (r && typeof localStorage < "u") {
      const i = localStorage.getItem(r);
      if (i && k.includes(i))
        return i;
    }
    return c ?? G();
  });
  return [g ? n : u, (i) => {
    g || (C(i), r && typeof localStorage < "u" && localStorage.setItem(r, i)), d == null || d(i);
  }];
}
function te({ theme: n, onChange: c, disabled: d }) {
  return /* @__PURE__ */ o("div", { className: "rmtc-theme-toggle", role: "radiogroup", "aria-label": "Theme", children: k.map((r) => /* @__PURE__ */ s(
    "label",
    {
      className: r === n ? "rmtc-theme-checked" : "",
      title: `Use ${r} theme`,
      children: [
        X[r],
        /* @__PURE__ */ o(
          "input",
          {
            type: "radio",
            name: "rmtc-theme-toggle",
            checked: r === n,
            value: r,
            disabled: d,
            "aria-label": `Use ${r} theme`,
            onChange: () => c(r)
          }
        )
      ]
    },
    r
  )) });
}
const re = 31, oe = 94, ne = 210, ce = 10, ae = 7, x = (n) => n.id ?? n.name, R = {
  table: /* @__PURE__ */ o("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ o("path", { d: "M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z" }) }),
  cards: /* @__PURE__ */ o("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ o("path", { d: "M20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20M4,6V18H20V6H4M6,9H18V11H6V9M6,13H16V15H6V13Z" }) })
};
function le({
  data: n,
  disabled: c = !1,
  className: d = "",
  onItemClick: r,
  defaultView: g = "cards",
  cardWidth: u = ne,
  cardHeight: C = oe,
  cardGap: l = ce,
  rowHeight: v = re,
  theme: i,
  defaultTheme: _,
  onThemeChange: O,
  themeStorageKey: B,
  showThemeToggle: F = !0
}) {
  const [b, L] = y(g), [V, I] = ee({
    theme: i,
    defaultTheme: _,
    onThemeChange: O,
    storageKey: B
  }), [m, U] = y("category"), [p, Z] = y(1), [M, P] = y(1), E = J(null), w = N(() => {
    const e = [];
    return n.forEach((t) => {
      t.category && !e.includes(t.category) && e.push(t.category);
    }), e;
  }, [n]), H = N(() => {
    const e = [...n];
    return m === "category" ? e.sort((t, a) => {
      const h = w.indexOf(t.category) - w.indexOf(a.category);
      return p * (h || t.name.localeCompare(a.name));
    }) : e.sort((t, a) => p * t.name.localeCompare(a.name)), e;
  }, [n, m, p, w]);
  Q(() => {
    const e = E.current;
    if (!e) return;
    const t = () => {
      P(
        Math.max(
          1,
          Math.floor((e.clientWidth + l) / (u + l))
        )
      );
    };
    t();
    const a = new ResizeObserver(t);
    return a.observe(e), () => a.disconnect();
  }, [u, l]);
  const f = b === "cards", $ = N(() => {
    const e = /* @__PURE__ */ new Map();
    return H.forEach((t, a) => {
      const h = f ? Math.floor(a / M) * (C + l) : 40 + a * v, q = f ? a % M * (u + l) : 0;
      e.set(x(t), { top: h, left: q });
    }), e;
  }, [H, f, M, C, u, l, v]), S = Math.ceil(H.length / M), j = f ? 20 + S * C + Math.max(S - 1, 0) * l : 60 + H.length * v, A = (e) => {
    c || (Z(e === m ? -p : 1), U(e));
  }, D = (e) => m === e ? /* @__PURE__ */ o(
    "svg",
    {
      className: "rmtc-sort-caret",
      viewBox: "0 0 10 6",
      width: "8",
      height: "8",
      "aria-hidden": "true",
      style: p === -1 ? { transform: "rotate(180deg)" } : void 0,
      children: /* @__PURE__ */ o("path", { d: "M5 0L10 6H0Z", fill: "currentColor" })
    }
  ) : null, T = !c && typeof r == "function", W = (e, t) => {
    T && (r == null || r(e, t));
  }, z = (e, t) => {
    T && (t.key === "Enter" || t.key === " ") && (t.preventDefault(), r == null || r(e, t));
  }, K = (e) => e ? ` rmtc-category-${w.indexOf(e) % ae + 1}` : "", Y = [
    "rmtc",
    f ? "rmtc--cards" : "rmtc--table",
    c ? "rmtc--disabled" : "",
    d
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ s("div", { className: Y, "data-theme": V, children: [
    /* @__PURE__ */ s("div", { className: "rmtc-toolbar", children: [
      /* @__PURE__ */ s("div", { className: "rmtc-controls", children: [
        /* @__PURE__ */ s("div", { className: "rmtc-sort", role: "group", "aria-label": "Sort by", children: [
          /* @__PURE__ */ o("span", { className: "rmtc-toolbar-label", children: "Sort:" }),
          /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              disabled: c,
              "aria-pressed": m === "name",
              onClick: () => A("name"),
              children: [
                "Name",
                D("name")
              ]
            }
          ),
          /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              disabled: c,
              "aria-pressed": m === "category",
              onClick: () => A("category"),
              children: [
                "Category",
                D("category")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { className: "rmtc-view-toggle", role: "group", "aria-label": "View", children: [
          /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              disabled: c,
              "aria-pressed": b === "table",
              onClick: () => !c && L("table"),
              children: [
                R.table,
                " Table"
              ]
            }
          ),
          /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              disabled: c,
              "aria-pressed": b === "cards",
              onClick: () => !c && L("cards"),
              children: [
                R.cards,
                " Cards"
              ]
            }
          )
        ] })
      ] }),
      F && /* @__PURE__ */ o(
        te,
        {
          theme: V,
          onChange: I,
          disabled: c
        }
      )
    ] }),
    /* @__PURE__ */ s(
      "div",
      {
        className: "rmtc-body",
        style: { height: j },
        ref: E,
        children: [
          /* @__PURE__ */ s("div", { className: `rmtc-header${f ? " rmtc-header--hidden" : ""}`, children: [
            /* @__PURE__ */ o("div", { onClick: () => A("name"), children: "Name" }),
            /* @__PURE__ */ o("div", { onClick: () => A("category"), children: "Category" })
          ] }),
          n.map((e) => {
            const t = x(e), a = $.get(t);
            return a ? /* @__PURE__ */ s(
              "div",
              {
                className: `rmtc-item${K(e.category)}`,
                style: {
                  left: a.left,
                  top: a.top
                },
                onClick: (h) => W(e, h),
                onKeyDown: (h) => z(e, h),
                role: T ? "button" : void 0,
                tabIndex: T ? 0 : void 0,
                "aria-disabled": c || void 0,
                children: [
                  /* @__PURE__ */ o("div", { className: "rmtc-c1", children: e.name }),
                  /* @__PURE__ */ o("div", { className: "rmtc-c2", children: e.description })
                ]
              },
              t
            ) : null;
          })
        ]
      }
    )
  ] });
}
export {
  le as MorphTableCards,
  k as THEMES,
  te as ThemeToggle,
  le as default,
  ee as useThemeState
};
