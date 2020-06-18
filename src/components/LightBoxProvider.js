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

import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import reducer from '../reducer';
import { LightBoxContext } from '../useLightBoxContext';
import LightBox from './LightBox';

function LightBoxProvider(
  {
    children,
    duration,
    loop,
    playing,
  },
) {
  const [state, dispatch] = useReducer(reducer, {
    activeIndex: 0,
    duration: Math.max(0, duration),
    items: [],
    loop,
    playing,
  });
  return (
    <LightBoxContext.Provider value={{ ...state, dispatch }}>
      {children}
      <LightBox />
    </LightBoxContext.Provider>
  );
}

LightBoxProvider.propTypes = {
  children: PropTypes.node,
  duration: PropTypes.number,
  loop: PropTypes.bool,
  playing: PropTypes.bool,
};

LightBoxProvider.defaultProps = {
  children: null,
  duration: 3000,
  loop: false,
  playing: true,
};

export default LightBoxProvider;
