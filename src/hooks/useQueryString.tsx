import { useSearchParams } from 'react-router-dom';
type paramsKeyType = 'mode' | 'w' | 'h' | 'm';

const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = (key: paramsKeyType) => {
    return searchParams.get(key) || '';
  };

  const setParams = (key: paramsKeyType, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return {
    searchParams,
    getParams,
    setParams,
  };
};

export default useQueryString;
