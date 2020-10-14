/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

import { useEffect } from 'react';

function useEventListener(eventName, listener) {
  useEffect(() => {
    const callback = (event) => { listener(event); };
    document.body.addEventListener(eventName, callback);
    return () => {
      document.body.removeEventListener(eventName, callback);
    };
  }, [eventName, listener]);
}

export default useEventListener;
