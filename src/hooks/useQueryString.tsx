import { useSearchParams } from 'react-router-dom';
type paramsKeyType = 'mode';

const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = (key: paramsKeyType) => {
    return searchParams.get(key) || '';
  };

  const setParams = (key: paramsKeyType, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  const deleteAllParams = () => {
    setSearchParams('');
  };

  return {
    searchParams,
    getParams,
    setParams,
    deleteAllParams,
  };
};

export default useQueryString;
