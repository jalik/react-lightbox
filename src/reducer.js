/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

export const ACTION_CLOSE = 'CLOSE';
export const ACTION_GO_TO = 'GO_TO';
export const ACTION_FIRST = 'FIRST';
export const ACTION_LAST = 'LAST';
export const ACTION_NEXT = 'NEXT';
export const ACTION_OPEN = 'OPEN';
export const ACTION_PAUSE = 'PAUSE';
export const ACTION_PLAY = 'PLAY';
export const ACTION_PREVIOUS = 'PREVIOUS';
export const ACTION_TOGGLE_PLAY = 'TOGGLE_PLAY';

function getBoolean(value, defaultValue) {
  return typeof value === 'boolean' ? value : defaultValue === true;
}

function reducer(state, action) {
  switch (action.type) {
    case ACTION_CLOSE:
      return { ...state, show: false };
    case ACTION_FIRST:
      return {
        ...state,
        activeIndex: 0,
        playing: getBoolean(action.data?.playing, state.playing),
      };
    case ACTION_GO_TO: {
      return {
        ...state,
        activeIndex: action.data.index,
        playing: getBoolean(action.data?.playing, state.playing),
      };
    }
    case ACTION_LAST:
      return {
        ...state,
        activeIndex: state.items.length - 1,
        playing: getBoolean(action.data?.playing, state.playing),
      };
    case ACTION_NEXT: {
      let { activeIndex } = state;
      let playing = getBoolean(action.data?.playing, state.playing);

      if (state.activeIndex < state.items.length - 1) {
        activeIndex = state.activeIndex + 1;
      } else if (state.loop) {
        activeIndex = 0;
      } else {
        playing = false;
      }
      return {
        ...state,
        activeIndex,
        playing,
      };
    }
    case ACTION_OPEN:
      return {
        ...state,
        activeIndex: action.data?.activeIndex >= 0 ? action.data?.activeIndex : state.activeIndex,
        items: action.data?.items || [],
        show: true,
      };
    case ACTION_PAUSE:
      return { ...state, playing: false };
    case ACTION_PLAY:
      return { ...state, playing: true };
    case ACTION_PREVIOUS: {
      let { activeIndex } = state;

      if (state.activeIndex > 0) {
        activeIndex = state.activeIndex - 1;
      } else if (state.loop) {
        activeIndex = state.items.length - 1;
      }
      return {
        ...state,
        activeIndex,
        playing: getBoolean(action.data?.playing, state.playing),
      };
    }
    case ACTION_TOGGLE_PLAY:
      return {
        ...state,
        playing: !state.playing,
        // Go back to first image if starting autoplay at the end.
        activeIndex: state.activeIndex === state.items.length - 1 ? 0 : state.activeIndex,
      };
    default:
      throw new Error(`invalid action ${action.type}`);
  }
}

export default reducer;
