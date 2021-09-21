/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React, { useCallback } from 'react';
import { ACTION_GO_TO } from '../reducer';
import useLightBoxContext from '../useLightBoxContext';

function Thumbnails() {
  const margin = 5;
  const size = 100;
  const { activeIndex, dispatch, items } = useLightBoxContext();

  const handleClickImage = useCallback((index) => (
    (event) => {
      event.preventDefault();
      dispatch({
        type: ACTION_GO_TO,
        data: { index, playing: false },
      });
    }
  ), [dispatch]);

  const handleKeyPressImage = useCallback((index) => (
    (event) => {
      if ([' ', 'Enter'].indexOf(event.key) !== -1) {
        event.preventDefault();
        dispatch({
          type: ACTION_GO_TO,
          data: { index, playing: false },
        });
      }
    }
  ), [dispatch]);

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
          display: 'flex',
          height: '100%',
          position: 'relative',
          left: -size * activeIndex,
          transitionProperty: 'left',
          transitionDuration: '0.3s',
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.src}
            onClick={handleClickImage(index)}
            onKeyPress={handleKeyPressImage(index)}
            role="button"
            tabIndex={0}
            style={{
              height: '100%',
              // marginRight: index < items.length - 1 ? margin : 0,
            }}
          >
            <img
              alt={item.alt}
              src={item.src}
              style={{
                backgroundColor: '#FFFFFF',
                width: 'auto',
                height: '100%',
                opacity: activeIndex === index ? 1 : 0.3,
                transitionProperty: 'opacity',
                transitionDuration: '0.3s',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Thumbnails;
