import * as React from 'react';
export * from 'react';

export const useEffectEvent = React.useEffectEvent || function useEffectEvent(fn) {
  const ref = React.useRef(fn);
  React.useInsertionEffect(() => {
    ref.current = fn;
  });
  return React.useCallback((...args) => {
    return ref.current(...args);
  }, []);
};

const ReactShim = {
  ...React,
  useEffectEvent
};
export default ReactShim;
