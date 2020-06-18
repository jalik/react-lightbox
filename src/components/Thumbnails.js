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

import React from 'react';
import { ACTION_GO_TO } from '../reducer';
import useLightBoxContext from '../useLightBoxContext';

function Thumbnails() {
  const margin = 5;
  const size = 100;
  const { activeIndex, dispatch, items } = useLightBoxContext();
  return (
    <div
      style={{
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '100%',
        padding: margin,
        textAlign: 'center',
        overflow: 'hidden',
        minHeight: size,
        height: size,
        whiteSpace: 'nowrap',
      }}
    >
      <div
        style={{
          height: '100%',
          position: 'relative',
          left: -size * activeIndex,
          transitionProperty: 'left',
          transitionDuration: '0.3s',
        }}
      >
        {items.map((item, index) => (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            onClick={() => {
              dispatch({
                type: ACTION_GO_TO,
                data: { index, playing: false },
              });
            }}
            style={{
              backgroundColor: '#FFFFFF',
              width: 'auto',
              height: '100%',
              marginRight: index < items.length - 1 ? margin : 0,
              opacity: activeIndex === index ? 1 : 0.3,
              transitionProperty: 'opacity',
              transitionDuration: '0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Thumbnails;
