import React, { useEffect, useMemo, useRef, useState } from 'react';

// A working version of the action panel from Erica's Figma file
// "handoff - Dynamic Action Panel (DAP)" (key c9Z6zBIcGyB1VWPtbh9WPJ).
// Erica, 2026-11-18: "i want to create a version of this as a prototype they
// can click around in", then "need to make them editable", pointing at the
// page "Item Level DAP".
//
// What it does: the menu is a tree you can open and close. Tick a row and the
// action panel opens with what you can do to that kind of row. Apply puts the
// change in the tree, marked, before anything is published.
//
// Every kind of row can be edited. The panels follow
// the screenshots Erica sent on 2026-11-18 from the Figma page "Item Level
// DAP" (saved in CaseStudy/assets/figma-dap/item-level/):
//   Bundle    remove from menu, add to a category, price, add choices
//   Choice    remove from bundle, plus "Add product variants" from Flows frame 6
//   Product   remove from menu, add to a category
//   Slot      remove from variant, price or range pricing, plus "Add
//             modifiers" from the final screen on the case study page
//   Variant   remove from product, add slots, price
//   Modifier  remove from slot, add weights with a price
//   Weight    remove from modifier, price
// Tick more than one row and the panel becomes "Multiple items selected".
// The connector could not read that page itself: a View seat gets 20 Figma
// MCP calls a month on that file's plan, and they ran out on 2026-11-18.
//
// It keeps the product's own look (white, blue, dense rows), so it stays
// light in dark mode, like a screenshot would. Type is Inter.
//
// The names in the tree are a made-up pizza menu. Erica, 2026-11-18: "send
// names based on pizza". The Figma file only has placeholders ("Bundle",
// "Choice", "Picke Me!"). They are generic on purpose, not a real brand's items.
// TODO(Erica): change any name you don't like, in `TREE` and the option lists.
// TODO(Erica): the guide lines above the frame (`GUIDE`) are my wording.
// TODO(Erica): in frame 14 "Auto-Select Affected Items" highlights the changed
// price cells. That is all it does here. Say if it should do more.
// TODO(Erica): no screen I have shows what a removed row looks like. Here it
// turns red with a line through the name. Say what it should be.
// TODO(Erica): the config buttons and the "Open ... definition" links only say
// they open another screen. I have no screens for where they go.
// TODO(Erica): the tree has no categories, so "Add to category" shows the
// category beside the row's name. Say if it should show somewhere else.
// TODO(Erica): "Remove from category" (on the bundle and product panels) is
// not built.

const TREE = [
  { id: 'b1', type: 'Bundle', name: 'Family Meal Deal', code: '1234', price: ['Label', '$0.00'], children: [] },
  {
    id: 'b2', type: 'Bundle', name: 'Pizza Combo', code: '1235', price: ['Price', '$0.00'],
    children: [
      { id: 'c1', type: 'Choice', name: 'Drink', meta: ['Count', '1'], code: '234322', price: ['Upcharge', '$0.00'], children: [] },
      {
        id: 'c2', type: 'Choice', name: 'Pizza', code: '234322', price: ['Upcharge', '$0.00'],
        children: [
          { id: 'p1', type: 'Product', name: 'Cheese Pizza', code: '3224', children: [] },
          {
            id: 'p2', type: 'Product', name: 'Pepperoni Pizza', code: '23432',
            children: [
              { id: 'v1', type: 'Variant', name: 'Medium', meta: ['Count', '1'], code: '234322', price: ['Price', '$0.00'], children: [] },
              {
                id: 'v2', type: 'Variant', name: 'Large', meta: ['Count', '0'], code: '45r43', price: ['Price', '$0.00'],
                children: [
                  { id: 's1', type: 'Slot', name: 'Crust', code: '234322', price: ['Price', '$0.00'], children: [] },
                  {
                    id: 's2', type: 'Slot', name: 'Toppings', code: '234322', price: ['Range 1-2', '$0.00'],
                    children: [
                      { id: 'm1', type: 'Modifier', name: 'Mushrooms', code: '234322', start: true, children: [] },
                      {
                        id: 'm2', type: 'Modifier', name: 'Extra Cheese', code: '234322',
                        children: [
                          { id: 'w1', type: 'Weight', name: 'Light', meta: ['Value', '1'], code: '234322', price: ['Upcharge', '$0.00'] },
                          { id: 'w2', type: 'Weight', name: 'Regular', meta: ['Value', '1'], code: '234322', price: ['Upcharge', '$0.00'] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const OPEN_AT_START = ['b2', 'c2', 'p2', 'v2', 's2', 'm2'];
const DEFAULT_PRICE = '1.99';

// What each panel offers to add. A slot takes a modifier with a weight, a
// choice takes a product with a variant, as the chips in the Figma say
// ("Modifier | Weight", "Products | Variant").
const WEIGHT_OPTIONS = ['Regular', 'Extra'];
const MODIFIER_OPTIONS = ['Olives | Regular', 'Onions | Regular', 'Green Peppers | Regular'];
const PRODUCT_OPTIONS = ['Veggie Pizza | Large', 'Hawaiian Pizza | Large', 'Meat Lovers Pizza | Medium'];

const CATEGORY_OPTIONS = ['Deals', 'Pizzas', 'Family Meals'];
const SLOT_OPTIONS = ['Sauce', 'Cheese', 'Extras'];
const CHOICE_OPTIONS = ['Side | 1', 'Dessert | 1', 'Dipping Sauce | 2'];

// The three steps above the frame, and what the line under them says.
const STEPS = ['Tick a row', 'Make a change', 'Review and publish'];

const GUIDE = {
  start: 'Start here: tick the modifier called "Mushrooms". Or tick any other row.',
  other: 'This row is marked to be removed, so there is nothing more to do to it.',
  Bundle: 'This is what you can do to a bundle. Change its price, add a choice, or put it in a category.',
  Choice: 'This is what you can do to a choice. Add a product, or remove the choice from its bundle.',
  Product: 'This is what you can do to a product. Put it in a category, or remove it from the menu.',
  Variant: 'This is what you can do to a variant. Set a price, add a slot, or remove it from its product.',
  Slot: 'This is what you can do to a slot. Set a price, switch on range pricing, or add a modifier.',
  Modifier: 'This is what you can do to a modifier. Pick a weight and press Enter.',
  Weight: 'This is what you can do to a weight. Set its price, or remove it from its modifier.',
  multi: 'With more than one row ticked, the panel only shows what applies to all of them.',
  draftModifier: 'Set a price, then press Apply.',
  draft: 'Press Apply to put the change in the tree.',
  done: 'Your change is marked in the tree and nothing is live yet. Make another, or press Review & publish.',
  review: 'These are your changes in plain words. Take any of them back, or publish.',
  published: 'Published. The marks are gone because the changes are part of the menu now. Nothing was really saved.',
  elsewhere: "In the product that opens another screen. It's not part of this prototype.",
};

// "Either price or named price": a number becomes dollars, anything else is
// kept as the name it is.
const money = (value) => {
  const text = String(value ?? '').trim().replace(/^\$/, '');
  if (!text) return '$0.00';
  const n = Number(text);
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : text;
};

// Walk the tree to the rows that are showing, with their depth and parents.
// `live` is what has been published in this session: it is part of the menu
// now, so it carries no marks, and a row removed there is gone. `edits` is
// what is staged and still marked. Pass `open` as null to walk every row.
function flatten(nodes, open, live, edits, depth = 0, parents = [], out = []) {
  nodes.forEach((node) => {
    if (live.removed.includes(node.id)) return;
    const children = [...(node.children || []), ...(live.added[node.id] || []), ...(edits.added[node.id] || [])];
    const basePrices = live.prices[node.id] || (node.price ? [node.price] : []);
    out.push({
      ...node,
      depth,
      parents,
      canOpen: node.type !== 'Weight',
      removed: edits.removed.includes(node.id),
      basePrices,
      prices: edits.prices[node.id] || basePrices,
      marked: node.marked || Boolean(edits.prices[node.id]),
      // A category from an edit sits beside the row's own Count or Value.
      category: edits.meta[node.id] || live.meta[node.id] || null,
      categoryMarked: Boolean(edits.meta[node.id]),
    });
    if ((!open || open.has(node.id)) && children.length) {
      flatten(children, open, live, edits, depth + 1, [...parents, node], out);
    }
  });
  return out;
}

const NO_EDITS = { added: {}, removed: [], prices: {}, meta: {} };

// Published rows lose their marks.
const settle = (row) => ({ ...row, added: false, marked: false, children: row.children ? row.children.map(settle) : undefined });

// Fold staged edits into what is published.
function merge(live, edits) {
  const added = { ...live.added };
  Object.entries(edits.added).forEach(([id, rows]) => {
    added[id] = [...(added[id] || []), ...rows.map(settle)];
  });
  return {
    added,
    removed: [...live.removed, ...edits.removed],
    prices: { ...live.prices, ...edits.prices },
    meta: { ...live.meta, ...edits.meta },
  };
}

// The staged edits as a list a person can read, each with a way to take it
// back. `all` is every row by id.
function listChanges(edits, all) {
  const items = [];
  const label = (row) => `${row.type} "${row.name}"`;
  const within = (row) => (row.parents.length ? ` in ${row.parents[row.parents.length - 1].name}` : '');

  Object.entries(edits.added).forEach(([parentId, rows]) => {
    rows.forEach((r) => {
      items.push({
        key: `add-${r.id}`,
        tag: 'Added',
        text: `${label(r)} in ${all.get(parentId)?.name || 'the menu'}`,
        detail: r.price ? `${r.price[0]} ${r.price[1]}` : null,
        revert: (e) => {
          const left = e.added[parentId].filter((x) => x.id !== r.id);
          const added = { ...e.added };
          if (left.length) added[parentId] = left;
          else delete added[parentId];
          return { ...e, added };
        },
      });
    });
  });
  edits.removed.forEach((id) => {
    const row = all.get(id);
    if (!row) return;
    items.push({
      key: `remove-${id}`,
      tag: 'Removed',
      text: `${label(row)}${within(row)}`,
      detail: null,
      revert: (e) => ({ ...e, removed: e.removed.filter((x) => x !== id) }),
    });
  });
  Object.entries(edits.prices).forEach(([id, prices]) => {
    const row = all.get(id);
    if (!row) return;
    const show = (list) => list.map(([l, v]) => (list.length > 1 ? `${l} ${v}` : v)).join(', ') || 'none';
    items.push({
      key: `price-${id}`,
      tag: 'Changed',
      text: `Price of ${label(row)}`,
      detail: `${show(row.basePrices)} → ${show(prices)}`,
      revert: (e) => {
        const next = { ...e.prices };
        delete next[id];
        return { ...e, prices: next };
      },
    });
  });
  Object.entries(edits.meta).forEach(([id, meta]) => {
    const row = all.get(id);
    if (!row) return;
    items.push({
      key: `meta-${id}`,
      tag: 'Changed',
      text: `${label(row)} added to ${meta[1]}`,
      detail: null,
      revert: (e) => {
        const next = { ...e.meta };
        delete next[id];
        return { ...e, meta: next };
      },
    });
  });
  return items;
}

const Chevron = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-90' : ''}`}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 6l6 6-6 6" />
  </svg>
);

const fieldLabel = 'block text-[11px] leading-4 text-slate-500';
const chip = 'inline-flex items-center gap-1 rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-700';
const ring = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';
const outlineBtn = `rounded border border-blue-500 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-600
  hover:bg-blue-50 disabled:border-slate-300 disabled:text-slate-400 disabled:hover:bg-transparent ${ring}`;
const selectClass =
  'mt-0.5 w-full cursor-pointer border-0 border-b border-slate-400 bg-transparent py-1 text-sm text-slate-800 outline-none focus:border-blue-600 disabled:text-slate-400';
const section = 'mt-4 border-t border-slate-200 pt-3';

function Row({ row, isOpen, checked, onToggle, onCheck, showStart }) {
  const tone = row.removed ? 'bg-red-50' : row.added ? 'bg-green-50' : checked ? 'bg-blue-50' : 'bg-white';
  const sign = row.removed ? '−' : row.added ? '+' : '';
  return (
    <div className={`flex items-stretch border-b border-slate-200 text-[13px] text-slate-800 ${tone}`}>
      <div className="flex flex-1 min-w-0 items-center gap-1.5 py-1.5 pr-2" style={{ paddingLeft: `calc(8px + ${row.depth} * var(--indent))` }}>
        <span className={`w-3 shrink-0 font-semibold ${row.removed ? 'text-red-600' : 'text-green-600'}`} aria-hidden="true">{sign}</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onCheck(row)}
          aria-label={`Select ${row.type} ${row.name}`}
          className="h-4 w-4 shrink-0 accent-blue-600 cursor-pointer"
        />
        {row.canOpen ? (
          <button
            type="button"
            onClick={() => onToggle(row.id)}
            aria-expanded={isOpen}
            aria-label={`${isOpen ? 'Close' : 'Open'} ${row.name}`}
            className={`grid h-6 w-6 shrink-0 place-items-center rounded text-slate-600 hover:bg-slate-200 ${ring}`}
          >
            <Chevron open={isOpen} />
          </button>
        ) : (
          <span className="w-6 shrink-0" />
        )}
        <span className="min-w-0">
          <span className="block text-[10px] leading-3 text-slate-500">
            {row.type}
            {row.removed && <span className="sr-only">, removed</span>}
            {row.added && <span className="sr-only">, added</span>}
          </span>
          {/* The name looks like a link in the product. Here it ticks the row,
              so there is a bigger thing to press than the checkbox. */}
          <button
            type="button"
            onClick={() => onCheck(row)}
            tabIndex={-1}
            aria-hidden="true"
            className={`block max-w-full truncate text-left underline decoration-slate-400 underline-offset-2 hover:decoration-blue-600 hover:text-blue-700 ${row.removed ? 'line-through decoration-red-500' : ''}`}
          >
            {row.name}
          </button>
        </span>
        {showStart && (
          <span className="relative ml-1 flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
          </span>
        )}
        {(row.category || row.meta) && (
          <span className="ml-auto flex shrink-0 items-center gap-2 pl-2 text-right">
            {row.category && (
              <span className={row.categoryMarked ? 'rounded bg-amber-100 px-1.5' : ''}>
                <span className="block text-[10px] leading-3 text-slate-500">{row.category[0]}</span>
                <span className="block">{row.category[1]}</span>
              </span>
            )}
            {row.meta && (
              <span>
                <span className="block text-[10px] leading-3 text-slate-500">{row.meta[0]}</span>
                <span className="block">{row.meta[1]}</span>
              </span>
            )}
          </span>
        )}
      </div>
      <div className="hidden sm:flex w-[84px] shrink-0 items-center border-l border-slate-200 px-2 text-slate-700">{row.code}</div>
      <div className={`flex w-[92px] shrink-0 flex-col items-end justify-center gap-0.5 border-l border-slate-200 px-2 py-1 ${row.marked ? 'bg-amber-100' : ''}`}>
        {row.prices.map(([label, value]) => (
          <span key={label} className="text-right">
            <span className="block text-[10px] leading-3 text-slate-500">{label}</span>
            <span className="block leading-4">{value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Shared pieces of the panels.

const PriceInput = ({ value, onChange, label, hint = false, placeholder = '' }) => (
  <>
    <label className="mt-1 flex items-center border-b border-slate-400 text-sm text-slate-800 focus-within:border-blue-600">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">$</span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 bg-transparent py-1 pl-0.5 outline-none placeholder:text-slate-400"
      />
    </label>
    {hint && <span className="mt-0.5 block text-[10px] leading-4 text-slate-500">Either price or named price</span>}
  </>
);

const RemoveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const IconButton = ({ label, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`grid h-6 w-6 shrink-0 place-items-center rounded text-slate-500 hover:bg-slate-200 ${ring}`}
  >
    {children}
  </button>
);

const Title = ({ children, sub }) => (
  <>
    <h4 className="m-0 text-sm font-semibold text-slate-900">{children}</h4>
    {sub && <p className="m-0 mt-1 text-xs text-slate-600">{sub}</p>}
  </>
);

// The first button on every panel: take the row out of where it sits.
const RemoveToggle = ({ on, onChange, label, undo }) => (
  <button type="button" aria-pressed={on} onClick={() => onChange(!on)} className={`${outlineBtn} mt-3 w-full ${on ? 'bg-blue-50' : ''}`}>
    {on ? undo : label}
  </button>
);

const Caution = ({ children }) => <p className="m-0 mt-1.5 text-[11px] leading-4 text-slate-600">Caution: {children}</p>;

// Buttons and links that open another screen in the product.
const ConfigButton = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className={`${outlineBtn} w-full`}>{children}</button>
);
const DefinitionLink = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className={`mt-3 w-full py-1 text-sm text-blue-600 underline underline-offset-2 hover:no-underline ${ring}`}>
    {children}
  </button>
);

// A dropdown, an Enter button, and the chips for what has been entered.
function Picker({ id, label, placeholder, options, picked, onChange, note }) {
  const [pick, setPick] = useState('');
  const left = options.filter((o) => !picked.includes(o));
  const enter = () => {
    if (!pick) return;
    onChange([...picked, pick]);
    setPick('');
  };
  return (
    <div>
      <label className={fieldLabel} htmlFor={id}>{label}</label>
      {picked.length > 0 && (
        <ul className="m-0 mt-1 flex list-none flex-wrap gap-1 p-0">
          {picked.map((p) => (
            <li key={p} className={chip}>
              {p}
              <button
                type="button"
                onClick={() => onChange(picked.filter((x) => x !== p))}
                aria-label={`Remove ${p}`}
                className={`grid h-4 w-4 place-items-center rounded-full bg-slate-400 text-white hover:bg-slate-500 ${ring}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="h-2.5 w-2.5">
                  <path strokeLinecap="round" strokeWidth={3.5} d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
      <select id={id} value={pick} onChange={(e) => setPick(e.target.value)} disabled={!left.length} className={selectClass}>
        <option value="">{left.length ? placeholder : 'All added'}</option>
        {left.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {note && picked.length > 0 && <Caution>{note}</Caution>}
      <button type="button" onClick={enter} disabled={!pick} className={`${outlineBtn} mt-2 w-full`}>Enter</button>
    </div>
  );
}

const CategoryPicker = ({ id, picked, onChange }) => (
  <Picker id={id} label="Add to category or subcategory" placeholder="Choose a category" options={CATEGORY_OPTIONS} picked={picked} onChange={onChange} />
);
const categoryMeta = (picked) => (picked.length ? ['Category', picked.join(', ')] : null);

// Cancel beside Apply, as on a bulk edit panel: a way out that changes nothing.
function PanelFooter({ autoSelect, setAutoSelect, canApply, onApply, onCancel }) {
  return (
    <>
      <label className="mt-4 flex cursor-pointer items-center gap-2 text-xs text-slate-700">
        <input type="checkbox" checked={autoSelect} onChange={(e) => setAutoSelect(e.target.checked)} className="h-4 w-4 accent-blue-600 cursor-pointer" />
        Auto-select affected items
      </label>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className={`rounded px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 hover:bg-slate-100 ${ring}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onApply}
          disabled={!canApply}
          className={`flex-1 rounded bg-blue-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-blue-700 disabled:bg-slate-300 ${ring}`}
        >
          Apply
        </button>
      </div>
    </>
  );
}

// Each panel keeps its own draft and hands `onApply` a change:
// { remove, add: [rows to put under this row], prices: [[label, value]],
//   meta: [label, value] }.
// `onDraft` tells the frame whether there is something to apply yet.
// `footer` is the props for PanelFooter. `onElsewhere` is for controls that
// open another screen in the product.

// "Item Level Bundle".
function BundlePanel({ row, footer, onDraft, onApply, onElsewhere }) {
  const [remove, setRemove] = useState(false);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState('');
  const [choices, setChoices] = useState([]);
  const ready = remove || categories.length > 0 || price.trim() !== '' || choices.length > 0;
  useEffect(() => onDraft(ready), [ready, onDraft]);

  const apply = () =>
    onApply({
      remove,
      meta: remove ? null : categoryMeta(categories),
      prices: !remove && price.trim() ? [[row.prices[0]?.[0] || 'Price', money(price)]] : null,
      add: remove
        ? []
        : choices.map((c) => {
            const [name, count] = c.split(' | ');
            return { type: 'Choice', name, meta: ['Count', count], code: '234323', price: ['Upcharge', '$0.00'], children: [] };
          }),
    });

  return (
    <>
      <Title>Item Level Bundle</Title>
      <RemoveToggle on={remove} onChange={setRemove} label="Remove from menu" undo="Keep on menu" />
      {!remove && (
        <>
          <div className="mt-3"><CategoryPicker id="proto-bundle-category" picked={categories} onChange={setCategories} /></div>
          <div className={section}>
            <span className={fieldLabel}>Price</span>
            <PriceInput value={price} onChange={setPrice} label="Bundle price" placeholder={(row.prices[0]?.[1] || '').replace('$', '')} hint />
            <p className="m-0 mt-1.5 text-[11px] leading-4 text-slate-600">
              Changing this entity&apos;s price will update all instances where the entity occurs, ie: across multiple categories or bundles.
            </p>
          </div>
          <div className={section}>
            <Picker id="proto-bundle-choice" label="Add choices" placeholder="Choose a choice" options={CHOICE_OPTIONS} picked={choices} onChange={setChoices} />
          </div>
          <div className={section}>
            <ConfigButton onClick={onElsewhere}>Choice configurations</ConfigButton>
            <DefinitionLink onClick={onElsewhere}>Open choice definition</DefinitionLink>
          </div>
        </>
      )}
      <PanelFooter {...footer} canApply={ready} onApply={apply} />
    </>
  );
}

// "Item Level Choices". "Add product variants" is from Flows frame 6.
function ChoicePanel({ row, footer, onDraft, onApply, onElsewhere }) {
  const [products, setProducts] = useState([]);
  const [remove, setRemove] = useState(false);
  const bundle = [...row.parents].reverse().find((p) => p.type === 'Bundle');
  const ready = remove || products.length > 0;
  useEffect(() => onDraft(ready), [ready, onDraft]);

  const apply = () =>
    onApply({
      remove,
      add: remove
        ? []
        : products.map((p) => {
            const [product, variant] = p.split(' | ');
            return {
              type: 'Product',
              name: product,
              code: '3225',
              children: [{ type: 'Variant', name: variant, meta: ['Count', '1'], code: '234322', price: ['Price', '$0.00'], children: [] }],
            };
          }),
    });

  return (
    <>
      <Title sub={`${row.name}${bundle ? ` in ${bundle.name}` : ''}`}>Item Level Choices</Title>
      <RemoveToggle on={remove} onChange={setRemove} label="Remove from bundle" undo="Keep in bundle" />
      {!remove && (
        <>
          <div className="mt-3">
            <Picker
              id="proto-product"
              label="Add product variants"
              placeholder="Choose a product"
              options={PRODUCT_OPTIONS}
              picked={products}
              onChange={setProducts}
              note="introducing product variants will trigger changes across all instances of this bundle at the organizational level."
            />
          </div>
          <div className={section}>
            <ConfigButton onClick={onElsewhere}>Choice definition config</ConfigButton>
            <Caution>adding product variants will affect all choices within the menu across different instances of this bundle.</Caution>
          </div>
          <div className={section}>
            <ConfigButton onClick={onElsewhere}>Bundle choice config</ConfigButton>
            <DefinitionLink onClick={onElsewhere}>Open choice definition</DefinitionLink>
          </div>
        </>
      )}
      <PanelFooter {...footer} canApply={ready} onApply={apply} />
    </>
  );
}

// "Item Level Product".
function ProductPanel({ footer, onDraft, onApply, onElsewhere }) {
  const [remove, setRemove] = useState(false);
  const [categories, setCategories] = useState([]);
  const ready = remove || categories.length > 0;
  useEffect(() => onDraft(ready), [ready, onDraft]);

  return (
    <>
      <Title>Item Level Product</Title>
      <RemoveToggle on={remove} onChange={setRemove} label="Remove from menu" undo="Keep on menu" />
      {!remove && (
        <>
          <div className="mt-3"><CategoryPicker id="proto-product-category" picked={categories} onChange={setCategories} /></div>
          <div className={section}><DefinitionLink onClick={onElsewhere}>Open product definition</DefinitionLink></div>
        </>
      )}
      <PanelFooter {...footer} canApply={ready} onApply={() => onApply({ remove, meta: remove ? null : categoryMeta(categories) })} />
    </>
  );
}

// "Item Level Slot". "Add modifiers" is from the final screen at the top of
// the solution section.
function SlotPanel({ row, footer, onDraft, onApply, onElsewhere }) {
  const [modifiers, setModifiers] = useState([]);
  const [remove, setRemove] = useState(false);
  const [price, setPrice] = useState('');
  const [rangeOn, setRangeOn] = useState(false);
  const [ranges, setRanges] = useState([{ end: '1', price: DEFAULT_PRICE }]);
  const variant = [...row.parents].reverse().find((p) => p.type === 'Variant');
  const ready = remove || modifiers.length > 0 || rangeOn || price.trim() !== '';
  useEffect(() => onDraft(ready), [ready, onDraft]);

  const startOf = (i) => (i === 0 ? '0' : ranges[i - 1].end || '0');
  const setRange = (i, patch) => setRanges(ranges.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const addRange = () => {
    const last = Number.parseFloat(ranges[ranges.length - 1]?.end) || 0;
    setRanges([...ranges, { end: String(last + 1), price: '' }]);
  };

  const newPrices = () => {
    if (remove) return null;
    if (rangeOn) return ranges.map((r, i) => [`Range ${startOf(i)}-${r.end || '?'}`, money(r.price)]);
    return price.trim() ? [['Price', money(price)]] : null;
  };

  const apply = () =>
    onApply({
      remove,
      prices: newPrices(),
      add: remove
        ? []
        : modifiers.map((m) => {
            const [modifier, weight] = m.split(' | ');
            return {
              type: 'Modifier',
              name: modifier,
              code: '234322',
              children: [{ type: 'Weight', name: weight, meta: ['Value', '1'], code: '234322', price: ['Upcharge', '$0.00'] }],
            };
          }),
    });

  return (
    <>
      <Title sub={`${row.name}${variant ? ` in ${variant.name}` : ''}`}>Item Level Slot</Title>
      <RemoveToggle on={remove} onChange={setRemove} label="Remove from variant" undo="Keep in variant" />
      {!remove && (
        <>
          <div className="mt-3">
            <Picker id="proto-modifier" label="Add modifiers" placeholder="Choose a modifier" options={MODIFIER_OPTIONS} picked={modifiers} onChange={setModifiers} />
          </div>

          <div className={section}>
            <ConfigButton onClick={onElsewhere}>Modifier weight config</ConfigButton>
            <Caution>introducing modifier weights will trigger changes across all instances of slot at the organizational level.</Caution>
          </div>

          {!rangeOn && (
            <div className={section}>
              <span className={fieldLabel}>Price</span>
              <PriceInput value={price} onChange={setPrice} label="Slot price" placeholder={DEFAULT_PRICE} hint />
            </div>
          )}

          <div className={section}>
            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-700">
              <input type="checkbox" role="switch" checked={rangeOn} onChange={(e) => setRangeOn(e.target.checked)} className="h-4 w-4 accent-blue-600 cursor-pointer" />
              Range pricing
            </label>

            {rangeOn && (
              <>
                <p className="m-0 mt-2 text-xs text-slate-800">Range price</p>
                <ul className="m-0 mt-1 list-none space-y-2 p-0">
                  {ranges.map((r, i) => (
                    <li key={i} className="flex items-end gap-1.5">
                      <span className="w-8 shrink-0">
                        <span className={fieldLabel}>Start</span>
                        <span className="block border-b border-dotted border-slate-300 py-1 text-sm text-slate-400">{startOf(i)}</span>
                      </span>
                      <label className="w-10 shrink-0">
                        <span className={fieldLabel}>End</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={r.end}
                          onChange={(e) => setRange(i, { end: e.target.value })}
                          aria-label={`End of range ${i + 1}`}
                          className="w-full border-0 border-b border-slate-400 bg-transparent py-1 text-sm outline-none focus:border-blue-600"
                        />
                      </label>
                      <span className="min-w-0 flex-1">
                        <span className={fieldLabel}>Price</span>
                        <PriceInput value={r.price} onChange={(value) => setRange(i, { price: value })} label={`Price for range ${i + 1}`} />
                      </span>
                      {ranges.length > 1 && (
                        <IconButton label={`Remove range ${i + 1}`} onClick={() => setRanges(ranges.filter((_, j) => j !== i))}>
                          <RemoveIcon />
                        </IconButton>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="m-0 mt-1.5 text-[10px] leading-4 text-slate-500">Either price or named price</p>
                <button type="button" onClick={addRange} disabled={ranges.length >= 3} className={`${outlineBtn} mt-2 w-full`}>Add range</button>
              </>
            )}
            <DefinitionLink onClick={onElsewhere}>Open slot definition</DefinitionLink>
          </div>
        </>
      )}
      <PanelFooter {...footer} canApply={ready} onApply={apply} />
    </>
  );
}

// "Item Level Slot Modifier".
function ModifierPanel({ row, footer, onDraft, onApply, onElsewhere }) {
  const [remove, setRemove] = useState(false);
  const [weights, setWeights] = useState([]);
  const [priceAll, setPriceAll] = useState(false);
  const [allPrice, setAllPrice] = useState(DEFAULT_PRICE);
  const [pick, setPick] = useState('');
  const left = WEIGHT_OPTIONS.filter((w) => !weights.some((x) => x.name === w));
  const slot = [...row.parents].reverse().find((p) => p.type === 'Slot');
  const ready = remove || weights.length > 0;
  useEffect(() => onDraft(ready), [ready, onDraft]);

  const enter = () => {
    if (!pick) return;
    setWeights([...weights, { name: pick, price: DEFAULT_PRICE }]);
    setPick('');
  };

  const apply = () =>
    onApply({
      remove,
      add: remove
        ? []
        : weights.map((w) => ({
            type: 'Weight',
            name: w.name,
            meta: ['Value', '1'],
            code: row.code,
            price: ['Upcharge', money(priceAll ? allPrice : w.price)],
          })),
    });

  return (
    <>
      <Title sub={`${row.name}${slot ? ` in ${slot.name}` : ''}`}>Item Level Slot Modifier</Title>
      <RemoveToggle on={remove} onChange={setRemove} label="Remove from slot" undo="Keep in slot" />

      {!remove && (
        <>
          <div className="mt-3">
            <label className={fieldLabel} htmlFor="proto-weight">Add weight</label>
            <select id="proto-weight" value={pick} onChange={(e) => setPick(e.target.value)} disabled={!left.length} className={selectClass}>
              <option value="">{left.length ? 'Choose a weight' : 'All weights added'}</option>
              {left.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
            <button type="button" onClick={enter} disabled={!pick} className={`${outlineBtn} mt-2 w-full`}>Enter</button>
          </div>

          {weights.length > 0 && (
            <div className={section}>
              <p className="m-0 text-[11px] text-slate-500">Weight pricing</p>
              <label className="mt-1.5 flex cursor-pointer items-center gap-2 text-xs text-slate-700">
                <input type="checkbox" role="switch" checked={priceAll} onChange={(e) => setPriceAll(e.target.checked)} className="h-4 w-4 accent-blue-600 cursor-pointer" />
                Price all weights
              </label>

              {priceAll && (
                <div className="mt-2">
                  <span className={fieldLabel}>Price</span>
                  <PriceInput value={allPrice} onChange={setAllPrice} label="Price for all weights" hint />
                </div>
              )}
              <ul className="m-0 mt-2 list-none space-y-2 p-0">
                {weights.map((w, i) => (
                  <li key={w.name} className="rounded bg-slate-100 px-2 py-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-800">
                      {w.name}
                      <IconButton label={`Remove ${w.name}`} onClick={() => setWeights(weights.filter((x) => x.name !== w.name))}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7h12M9 7V5h6v2m-7 0l1 12h6l1-12" />
                        </svg>
                      </IconButton>
                    </div>
                    {/* With "Price all weights" on, each weight shows the one price, greyed out. */}
                    {priceAll ? (
                      <p className="m-0 mt-1 border-b border-slate-300 py-1 text-sm text-slate-400">{money(allPrice)}</p>
                    ) : (
                      <PriceInput
                        value={w.price}
                        onChange={(value) => setWeights(weights.map((x, j) => (j === i ? { ...x, price: value } : x)))}
                        label={`Price for ${w.name}`}
                        hint
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={section}>
            <ConfigButton onClick={onElsewhere}>Modifier weight config</ConfigButton>
            <Caution>introducing modifier weights will trigger changes across all instances of slot at the organizational level.</Caution>
            <DefinitionLink onClick={onElsewhere}>Open modifier definition</DefinitionLink>
          </div>
        </>
      )}

      <PanelFooter {...footer} canApply={ready} onApply={apply} />
    </>
  );
}

// "Item Level Variant".
function VariantPanel({ row, footer, onDraft, onApply, onElsewhere }) {
  const [remove, setRemove] = useState(false);
  const [slots, setSlots] = useState([]);
  const [price, setPrice] = useState('');
  const product = [...row.parents].reverse().find((p) => p.type === 'Product');
  const ready = remove || slots.length > 0 || price.trim() !== '';
  useEffect(() => onDraft(ready), [ready, onDraft]);

  const apply = () =>
    onApply({
      remove,
      prices: !remove && price.trim() ? [['Price', money(price)]] : null,
      add: remove ? [] : slots.map((name) => ({ type: 'Slot', name, code: '234324', price: ['Price', '$0.00'], children: [] })),
    });

  return (
    <>
      <Title sub={`${row.name}${product ? ` in ${product.name}` : ''}`}>Item Level Variant</Title>
      <RemoveToggle on={remove} onChange={setRemove} label="Remove from product" undo="Keep in product" />
      {!remove && (
        <>
          <div className="mt-3">
            <Picker id="proto-slot" label="Add slots" placeholder="Choose a slot" options={SLOT_OPTIONS} picked={slots} onChange={setSlots} />
          </div>
          <div className={section}>
            <ConfigButton onClick={onElsewhere}>Edit modifiable</ConfigButton>
            <div className="mt-3">
              <span className={fieldLabel}>Price</span>
              <PriceInput value={price} onChange={setPrice} label="Variant price" placeholder={DEFAULT_PRICE} hint />
            </div>
          </div>
          <div className={section}><DefinitionLink onClick={onElsewhere}>Open variant definition</DefinitionLink></div>
        </>
      )}
      <PanelFooter {...footer} canApply={ready} onApply={apply} />
    </>
  );
}

// "Item Level Weight".
function WeightPanel({ row, footer, onDraft, onApply, onElsewhere }) {
  const [remove, setRemove] = useState(false);
  const [price, setPrice] = useState('');
  const modifier = [...row.parents].reverse().find((p) => p.type === 'Modifier');
  const ready = remove || price.trim() !== '';
  useEffect(() => onDraft(ready), [ready, onDraft]);

  return (
    <>
      <Title sub={`${row.name}${modifier ? ` in ${modifier.name}` : ''}`}>Item Level Weight</Title>
      <RemoveToggle on={remove} onChange={setRemove} label="Remove from modifier" undo="Keep in modifier" />
      {!remove && (
        <>
          <div className={section}>
            <span className={fieldLabel}>Price</span>
            <PriceInput value={price} onChange={setPrice} label="Weight price" placeholder={DEFAULT_PRICE} hint />
          </div>
          <div className={section}><DefinitionLink onClick={onElsewhere}>Open weight definition</DefinitionLink></div>
        </>
      )}
      <PanelFooter
        {...footer}
        canApply={ready}
        onApply={() => onApply({ remove, prices: !remove && price.trim() ? [[row.prices[0]?.[0] || 'Upcharge', money(price)]] : null })}
      />
    </>
  );
}

// "Multiple Items selected": only what applies to every row that is ticked.
function MultiPanel({ count, footer, onDraft, onApply }) {
  const [remove, setRemove] = useState(false);
  const [categories, setCategories] = useState([]);
  const ready = remove || categories.length > 0;
  useEffect(() => onDraft(ready), [ready, onDraft]);

  return (
    <>
      <Title sub={`${count} rows`}>Multiple items selected</Title>
      <RemoveToggle on={remove} onChange={setRemove} label="Remove from menu" undo="Keep on menu" />
      {!remove && <div className="mt-3"><CategoryPicker id="proto-multi-category" picked={categories} onChange={setCategories} /></div>}
      <PanelFooter {...footer} canApply={ready} onApply={() => onApply({ remove, meta: remove ? null : categoryMeta(categories) })} />
    </>
  );
}

const PANELS = {
  Bundle: BundlePanel,
  Choice: ChoicePanel,
  Product: ProductPanel,
  Variant: VariantPanel,
  Slot: SlotPanel,
  Modifier: ModifierPanel,
  Weight: WeightPanel,
};
const TAG = {
  Added: 'bg-green-100 text-green-800',
  Changed: 'bg-amber-100 text-amber-800',
  Removed: 'bg-red-100 text-red-800',
};

// Every staged change in plain words, each with Revert, then Discard all and
// Publish. It takes the tree's place inside the frame.
function Review({ items, onRevert, onDiscard, onPublish, onBack }) {
  return (
    <div className="p-3 sm:p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="m-0 text-sm font-semibold text-slate-900">Review changes</h4>
        <p className="m-0 text-xs text-slate-500">{items.length} {items.length === 1 ? 'change' : 'changes'}, not live yet</p>
      </div>

      {items.length ? (
        <ul className="m-0 mt-3 list-none divide-y divide-slate-200 rounded border border-slate-200 p-0">
          {items.map((item) => (
            <li key={item.key} className="flex items-center gap-3 px-3 py-2">
              <span className={`w-[68px] shrink-0 rounded px-1.5 py-0.5 text-center text-[11px] font-semibold ${TAG[item.tag]}`}>{item.tag}</span>
              <span className="min-w-0 flex-1 text-[13px] text-slate-800">
                {item.text}
                {item.detail && <span className="block text-xs text-slate-500">{item.detail}</span>}
              </span>
              <button type="button" onClick={() => onRevert(item)} className={`shrink-0 rounded border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100 ${ring}`}>
                Revert
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 mt-3 rounded border border-dashed border-slate-300 px-3 py-4 text-center text-[13px] text-slate-600">
          Nothing left to publish.
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <button type="button" onClick={onBack} className={`rounded px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 hover:bg-slate-100 ${ring}`}>
          Back to the menu
        </button>
        <div className="flex gap-2">
          <button type="button" onClick={onDiscard} disabled={!items.length} className={outlineBtn}>Discard all</button>
          <button
            type="button"
            onClick={onPublish}
            disabled={!items.length}
            className={`rounded bg-blue-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-blue-700 disabled:bg-slate-300 ${ring}`}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuPrototype({ caption }) {
  const [open, setOpen] = useState(() => new Set(OPEN_AT_START));
  const [selected, setSelected] = useState([]);
  const [live, setLive] = useState(NO_EDITS);
  const [edits, setEdits] = useState(NO_EDITS);
  const [hasDraft, setHasDraft] = useState(false);
  const [autoSelect, setAutoSelect] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [published, setPublished] = useState(false);
  const [note, setNote] = useState(null); // 'elsewhere'
  const frameRef = useRef(null);
  const panelRef = useRef(null);
  const nextId = useRef(0);

  const rows = useMemo(() => flatten(TREE, open, live, edits), [open, live, edits]);
  const changes = useMemo(() => {
    const all = new Map(flatten(TREE, null, live, edits).map((r) => [r.id, r]));
    return listChanges(edits, all);
  }, [live, edits]);
  const picked = rows.filter((r) => selected.includes(r.id));
  const one = picked.length === 1 ? picked[0] : null;
  const many = picked.length > 1;
  const staged = changes.length;
  const Panel = one && !one.removed ? PANELS[one.type] : null;

  // Which of the three steps the visitor is on. Steps before it are done.
  const step = published && !staged && !picked.length ? 3 : staged ? 2 : picked.length ? 1 : 0;

  const guide = note
    ? GUIDE[note]
    : reviewing
      ? GUIDE.review
      : hasDraft
        ? one?.type === 'Modifier' ? GUIDE.draftModifier : GUIDE.draft
        : many
          ? GUIDE.multi
          : one
            ? Panel ? GUIDE[one.type] : GUIDE.other
            : staged
              ? GUIDE.done
              : published
                ? GUIDE.published
                : GUIDE.start;

  const toggle = (id) => {
    const next = new Set(open);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpen(next);
  };

  const clearSelection = () => {
    setSelected([]);
    setHasDraft(false);
    setNote(null);
  };

  const check = (row) => {
    setNote(null);
    setHasDraft(false);
    if (selected.includes(row.id)) {
      setSelected(selected.filter((id) => id !== row.id));
      return;
    }
    setSelected([...selected, row.id]);
    // On a phone the panel is under the tree, so bring it into view.
    requestAnimationFrame(() => {
      if (window.matchMedia('(max-width: 767px)').matches) {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  };

  // New rows get an id, the green mark, and the same for their children.
  const stamp = (row) => {
    nextId.current += 1;
    return {
      ...row,
      id: `new-${nextId.current}`,
      added: true,
      marked: autoSelect && Boolean(row.price),
      children: row.children ? row.children.map(stamp) : undefined,
    };
  };

  // One change, put on every row that is ticked. New rows only ever go under
  // a single row.
  const apply = ({ add = [], prices = null, remove = false, meta = null }) => {
    if (!picked.length) return;
    const ids = picked.map((r) => r.id);
    const fresh = one ? add.map(stamp) : [];
    const next = {
      added: { ...edits.added },
      removed: remove ? [...edits.removed, ...ids.filter((id) => !edits.removed.includes(id))] : edits.removed,
      prices: { ...edits.prices },
      meta: { ...edits.meta },
    };
    if (fresh.length) next.added[one.id] = [...(next.added[one.id] || []), ...fresh];
    ids.forEach((id) => {
      if (prices) next.prices[id] = prices;
      if (meta) next.meta[id] = meta;
    });
    setEdits(next);
    if (fresh.length) setOpen(new Set([...open, one.id, ...fresh.map((r) => r.id)]));
    clearSelection();
  };

  // The frame can be taller than the screen, so a change of view starts at its top.
  const toTop = () => {
    requestAnimationFrame(() => {
      const top = frameRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) frameRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const review = () => {
    clearSelection();
    setReviewing(true);
    toTop();
  };

  const publish = () => {
    setLive(merge(live, edits));
    setEdits(NO_EDITS);
    setReviewing(false);
    setPublished(true);
    toTop();
  };

  const reset = () => {
    setOpen(new Set(OPEN_AT_START));
    setSelected([]);
    setLive(NO_EDITS);
    setEdits(NO_EDITS);
    setHasDraft(false);
    setAutoSelect(false);
    setReviewing(false);
    setPublished(false);
    setNote(null);
  };

  const footer = { autoSelect, setAutoSelect, onCancel: clearSelection };
  const elsewhere = () => setNote('elsewhere');

  return (
    <figure ref={frameRef} className="my-2 scroll-mt-4 lg:-mx-20">
      {/* The steps, then the one thing to do next. */}
      <div className="mb-2 rounded-md border px-2.5 py-2
        border-surface-outline-light dark:border-surface-outline-dark
        bg-surface-background100-light dark:bg-surface-background100-dark">
        <div className="flex items-center justify-between gap-3">
          <ol className="m-0 flex list-none flex-wrap items-center gap-x-3 gap-y-1 p-0 font-inter text-xs">
            {STEPS.map((label, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li
                  key={label}
                  aria-current={current ? 'step' : undefined}
                  className={`flex items-center gap-1.5 ${current
                    ? 'font-semibold text-surface-foreground100-light dark:text-surface-foreground100-dark'
                    : 'text-surface-foreground400-light dark:text-surface-foreground400-dark'}`}
                >
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-semibold ${done
                      ? 'bg-primary-surface-light text-primary-foreground-light dark:bg-primary-surface-dark dark:text-primary-foreground-dark'
                      : current
                        ? 'bg-surface-foreground100-light text-surface-background100-light dark:bg-surface-foreground100-dark dark:text-surface-background100-dark'
                        : 'border border-surface-outline-light dark:border-surface-outline-dark'}`}
                  >
                    {done ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12l5 5 9-10" />
                      </svg>
                    ) : i + 1}
                  </span>
                  {label}
                  {done && <span className="sr-only">, done</span>}
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            onClick={reset}
            className="shrink-0 font-inter text-sm underline underline-offset-2 text-surface-foreground300-light dark:text-surface-foreground300-dark hover:no-underline"
          >
            Start over
          </button>
        </div>
        <p aria-live="polite" className="m-0 mt-1.5 font-inter text-sm font-medium text-surface-foreground100-light dark:text-surface-foreground100-dark">
          {guide}
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white font-inter text-slate-800">
        {/* The page header, as in the handoff frames. */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-3 py-2.5">
          <div className="min-w-0">
            <p className="m-0 text-base leading-5 text-slate-900">National Menu All Stores</p>
            <p className="m-0 text-xs text-slate-500">In-Store · Working Menu</p>
          </div>
          <div className="flex gap-2">
            <button type="button" disabled={!staged || reviewing} onClick={elsewhere} className={outlineBtn}>Save patch</button>
            <button type="button" disabled={!staged || reviewing} onClick={review} className={`${outlineBtn} inline-flex items-center gap-1.5`}>
              Review &amp; publish
              {staged > 0 && (
                <span className="grid h-4 min-w-[16px] place-items-center rounded-full bg-blue-600 px-1 text-[10px] leading-none text-white">
                  {staged}<span className="sr-only"> {staged === 1 ? 'change' : 'changes'}</span>
                </span>
              )}
            </button>
          </div>
        </div>

        {reviewing ? (
          <Review
            items={changes}
            onRevert={(item) => setEdits(item.revert(edits))}
            onDiscard={() => setEdits(NO_EDITS)}
            onPublish={publish}
            onBack={() => setReviewing(false)}
          />
        ) : (
        <div className="md:flex">
          <div className="min-w-0 flex-1 [--indent:8px] sm:[--indent:14px]">
            <div className="flex border-b border-slate-300 bg-slate-50 text-xs font-semibold text-slate-700">
              <div className="flex flex-1 items-center gap-2 px-3 py-2">
                Item
                {/* How many rows are ticked, and one press to untick them all. */}
                {picked.length > 0 && (
                  <button
                    type="button"
                    onClick={clearSelection}
                    className={`inline-flex items-center gap-1 rounded-full bg-blue-600 py-0.5 pl-2 pr-1.5 text-[11px] font-semibold text-white hover:bg-blue-700 ${ring}`}
                  >
                    {picked.length} selected
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className="h-3 w-3">
                      <path strokeLinecap="round" strokeWidth={3} d="M6 6l12 12M18 6L6 18" />
                    </svg>
                    <span className="sr-only">, clear</span>
                  </button>
                )}
              </div>
              <div className="hidden sm:block w-[84px] shrink-0 border-l border-slate-200 px-2 py-2">Item code</div>
              <div className="w-[92px] shrink-0 border-l border-slate-200 px-2 py-2 text-right">Price</div>
            </div>
            {rows.map((row) => (
              <Row
                key={row.id}
                row={row}
                isOpen={open.has(row.id)}
                checked={selected.includes(row.id)}
                onToggle={toggle}
                onCheck={check}
                showStart={row.start && !staged && !published && !selected.length}
              />
            ))}
          </div>

          {picked.length > 0 && (
            <aside
              ref={panelRef}
              aria-label="Action panel"
              className="border-t border-slate-300 bg-white p-3 md:w-[236px] md:shrink-0 md:border-l md:border-t-0"
            >
              {/* On a phone the panel is under the tree and the line above the
                  frame has scrolled away, so the next step is said again here. */}
              <p className="m-0 mb-3 rounded bg-blue-50 px-2 py-1.5 text-xs leading-5 text-slate-700 md:hidden">{guide}</p>
              {many ? (
                <MultiPanel key={selected.join('-')} count={picked.length} footer={footer} onDraft={setHasDraft} onApply={apply} />
              ) : Panel ? (
                <Panel key={one.id} row={one} footer={footer} onDraft={setHasDraft} onApply={apply} onElsewhere={elsewhere} />
              ) : (
                <>
                  <Title>{one.type} actions</Title>
                  <p className="m-0 mt-2 text-xs leading-5 text-slate-600">
                    This {one.type.toLowerCase()} is marked to be removed. Review &amp; publish is where you can take that back.
                  </p>
                  <button type="button" onClick={clearSelection} className={`${outlineBtn} mt-3 w-full`}>Close</button>
                </>
              )}
            </aside>
          )}
        </div>
        )}
      </div>

      {caption && (
        <figcaption className="mt-2 text-sm font-inter text-surface-foreground400-light dark:text-surface-foreground400-dark">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default MenuPrototype;
