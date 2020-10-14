/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
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
  const { dispatch } = useLightBoxContext();
  const memoizedPaths = useMemo(() => (
    items.map((item) => (decodeURIComponent(item.src)))
  ), [items]);

  useEventListener('click', (event) => {
    // Check if clicked element is an image declared in light box wrapper.
    if (event.target.nodeName === 'IMG') {
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
