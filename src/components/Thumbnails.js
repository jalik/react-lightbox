/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
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
        {items.map((item, index) => {
          const goto = (event) => {
            event.preventDefault();
            dispatch({
              type: ACTION_GO_TO,
              data: { index, playing: false },
            });
          };
          return (
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              onClick={goto}
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
          );
        })}
      </div>
    </div>
  );
}

export default Thumbnails;
