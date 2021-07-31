import { useState, useEffect } from 'react';

export const useGetData = func => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await func();
      setData(data);
    };
    fetch();
  }, []);
  return data;
};
