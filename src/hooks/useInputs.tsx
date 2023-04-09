import { useState } from 'react';

type DefaultType = {
  [key: string]: number;
};

type ReturnType = [DefaultType, (event: React.ChangeEvent<HTMLInputElement>) => void];

const useInputs = (initialValue: DefaultType): ReturnType => {
  const [values, setValues] = useState<DefaultType>(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: Number(event.target.value),
    });
  };

  return [values, onChange];
};

export default useInputs;
