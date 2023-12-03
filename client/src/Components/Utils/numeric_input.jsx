import { Input, Tooltip } from 'antd';
import { useRef } from 'react';

const NumericInput = (props) => {
  const { value, onChange } = props;
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };

  return (
    <Tooltip trigger={['focus']} placement="topLeft" overlayClassName="numeric-input">
      <Input
        {...props}
        ref={inputRef}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="0"
        maxLength={16}
      />
    </Tooltip>
  );
};

export default NumericInput;
