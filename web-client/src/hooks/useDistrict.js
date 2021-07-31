import { useState, useEffect } from 'react';

import { getDistricts } from 'services/district';

const useDistrict = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDistirctNames = async () => {
      const data = await getDistricts();
      setData(data);
    };

    getDistirctNames();
    
    return function cleanup() {
      setData([]);
    }
  }, []);
  let districtNames = [];
  let cdsCode = {};
  data.messages &&
    data.messages.forEach(value => {
      districtNames = [...districtNames, { label: value.districtName, value: value.districtName }];
      cdsCode = { ...cdsCode, [value.districtName]: value.CDSCode };
    });

  return {
    districtNames,
    cdsCode,
  };
};

export default useDistrict;
