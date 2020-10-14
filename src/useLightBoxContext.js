/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

import {
  createContext,
  useContext,
} from 'react';

export const LightBoxContext = createContext({});

function useLightBoxContext() {
  return useContext(LightBoxContext);
}

export default useLightBoxContext;
