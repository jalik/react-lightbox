/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
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

  const handleClickImage = useCallback(() => {
    dispatch({ type: ACTION_CLOSE });
  }, [dispatch]);

  const handleKeyPressImage = useCallback((event) => {
    if ([' ', 'Enter'].indexOf(event.key) !== -1) {
      dispatch({ type: ACTION_CLOSE });
    }
  }, [dispatch]);

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
    if (event.defaultPrevented || !show) {
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
  }, [dispatch, show]));

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
        onClick={handleClickImage}
        onKeyPress={handleKeyPressImage}
        role="button"
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
        }}
        tabIndex={0}
      >
        <img
          alt={items[activeIndex].alt}
          src={items[activeIndex].src}
          style={{ maxHeight: '100%', width: 'auto', maxWidth: '100%' }}
        />
      </div>
      <Thumbnails />
    </div>
  );
}

export default LightBox;
