/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import reducer from '../reducer';
import { LightBoxContext } from '../useLightBoxContext';
import LightBox from './LightBox';

function LightBoxProvider(props) {
  const {
    children,
    duration,
    loop,
    playing,
  } = props;

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
