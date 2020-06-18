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

import React, {
  useCallback,
  useEffect,
} from 'react';
import {
  ACTION_CLOSE,
  ACTION_FIRST,
  ACTION_LAST,
  ACTION_NEXT,
  ACTION_PREVIOUS,
  ACTION_TOGGLE_PLAY,
} from '../reducer';
import useEventListener from '../useEventListener';
import useLightBoxContext from '../useLightBoxContext';
import Thumbnails from './Thumbnails';

function LightBox() {
  const {
    activeIndex,
    dispatch,
    duration,
    items,
    playing,
    show,
  } = useLightBoxContext();

  // Changes image automatically.
  useEffect(() => {
    let timer;

    if (show && playing) {
      // todo start timer on image loaded
      timer = setInterval(() => {
        dispatch({ type: ACTION_NEXT });
      }, duration);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [dispatch, duration, playing, show]);

  useEventListener('keydown', useCallback((event) => {
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        event.stopPropagation();
        dispatch({
          type: ACTION_PREVIOUS,
          data: { playing: false },
        });
        break;
      case 'ArrowRight':
        event.preventDefault();
        event.stopPropagation();
        dispatch({
          type: ACTION_NEXT,
          data: { playing: false },
        });
        break;
      case 'End':
        event.preventDefault();
        event.stopPropagation();
        dispatch({
          type: ACTION_LAST,
          data: { playing: false },
        });
        break;
      case 'Escape':
        event.preventDefault();
        event.stopPropagation();
        dispatch({ type: ACTION_CLOSE });
        break;
      case 'Home':
        event.preventDefault();
        event.stopPropagation();
        dispatch({
          type: ACTION_FIRST,
          data: { playing: false },
        });
        break;
      case ' ':
        event.preventDefault();
        event.stopPropagation();
        dispatch({ type: ACTION_TOGGLE_PLAY });
        break;
      default:
    }
  }, [dispatch]));

  if (!show) {
    return null;
  }
  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,1.0)',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        textAlign: 'center',
        transitionProperty: 'opacity',
        transitionDuration: '1s',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 0,
        }}
      />

      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
        }}
      >
        <img
          alt={items[activeIndex].alt}
          src={items[activeIndex].src}
          onClick={() => dispatch({ type: ACTION_CLOSE })}
          style={{ maxHeight: '100%', width: 'auto', maxWidth: '100%' }}
        />
      </div>
      <Thumbnails />
    </div>
  );
}

export default LightBox;
