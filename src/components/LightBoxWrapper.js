/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import {
  arrayOf,
  node,
  shape,
  string,
} from 'prop-types';
import React, { useMemo } from 'react';
import { ACTION_OPEN } from '../reducer';
import useEventListener from '../useEventListener';
import useLightBoxContext from '../useLightBoxContext';

function LightBoxWrapper({ children, items }) {
  const { dispatch, show } = useLightBoxContext();
  const memoizedPaths = useMemo(() => (
    items.map((item) => (decodeURIComponent(item.src)))
  ), [items]);

  useEventListener('click', (event) => {
    // Check if clicked element is an image declared in light box wrapper.
    if (!show && event.target.nodeName === 'IMG') {
      const activeIndex = memoizedPaths.indexOf(decodeURIComponent(event.target.src));

      if (activeIndex !== -1) {
        dispatch({
          type: ACTION_OPEN,
          data: {
            activeIndex,
            items: items || [{
              alt: event.target.alt,
              src: event.target.src,
            }],
          },
        });
      }
    }
  });

  if (children.type === 'img') {
    const { alt, src, ...imgProps } = children.props;
    return (
      <img
        alt={alt}
        src={src}
        {...imgProps}
      />
    );
  }
  return children;
}

LightBoxWrapper.propTypes = {
  children: node,
  items: arrayOf(shape({
    alt: string,
    src: string.isRequired,
  })),
};

LightBoxWrapper.defaultProps = {
  children: null,
  items: [],
};

export default LightBoxWrapper;
