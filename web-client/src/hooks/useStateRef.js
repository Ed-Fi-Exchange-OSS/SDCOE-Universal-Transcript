import React from 'react';

// ref https://www.npmjs.com/package/react-usestateref
export default function useStateRef(defaultValue) {
  const [state, setState] = React.useState(defaultValue);
  const ref = React.useRef(state);

  const dispatch = React.useCallback(function (val) {
    ref.current = typeof val === 'function' ? val(ref.current) : val;

    setState(ref.current);
  }, []);

  return [state, dispatch, ref];
}
