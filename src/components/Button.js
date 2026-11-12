import React from 'react';
import { Loop } from './sketch/Sketch';

// The design system's Button. Same anatomy as shadcn: one element, a variant
// and a size. Styles are the sk-button classes in styles/sketch.css.
//
//   variant  default    solid teal. One per view, for the thing the page is for.
//            secondary  pale teal with a teal border.
//            outline    no CSS border. A hand-drawn loop that shivers on hover.
//            ghost      no edge until hover.
//            link       underlined text.
//   size     default (36px), sm (32px), xs (24px), icon, icon-sm, icon-xs
//   as       the element or component to render, such as Link. Defaults to button.
//
// Icon-only buttons need an aria-label.
const SIZES = {
  sm: 'sk-button--sm',
  xs: 'sk-button--xs',
  icon: 'sk-button--icon',
  'icon-sm': 'sk-button--icon sk-button--sm',
  'icon-xs': 'sk-button--icon sk-button--xs',
};

function Button({ as: Tag = 'button', variant = 'default', size = 'default', className = '', children, ...props }) {
  const classes = [
    'sk-button',
    variant !== 'default' && `sk-button--${variant}`,
    SIZES[size],
    variant === 'outline' && 'sk-boil',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...(Tag === 'button' ? { type: 'button' } : {})} {...props}>
      {variant === 'outline' && <Loop rx={size === 'xs' || size === 'icon-xs' ? 4 : 6} />}
      {children}
    </Tag>
  );
}

export default Button;
