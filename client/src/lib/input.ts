import React, { useState } from "react";

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState<string>(defaultValue);

  return {
    value,
    setValue,
    reset: () => setValue(defaultValue),
    bind: {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      },
    },
    bindSelect: {
      value,
      onChange: (e: React.FormEvent<HTMLSelectElement>) => {
        setValue((e.target as HTMLSelectElement).value);
      },
    },
  };
};

export default useInput;
