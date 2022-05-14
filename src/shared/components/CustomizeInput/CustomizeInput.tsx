import React, { FC, ReactElement, useState } from 'react';
import { Input } from 'antd';
import cn from 'classnames';
import { InputProps } from 'antd/lib/input';

import { useBem } from 'shared/hooks';

import './CustomizeInput.scss';

interface IProps extends InputProps {
  label?: string;
  isPassword?: boolean;
}

export const CustomizeInput: FC<IProps> = ({
  label,
  value,
  isPassword = false,
  ...props
}): ReactElement => {
  const [focus, setFocus] = useState(false);
  const bem = useBem('CustomizeInput');

  return (
    <div
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
      className={bem()}
    >
      {isPassword ? (
        <Input.Password className={bem('input')} value={value} {...props} />
      ) : (
        <Input className={bem('input')} value={value} {...props} />
      )}

      <label
        className={cn(
          bem('label'),
          (focus || value) && bem('label', { float: true }),
        )}
      >
        {label}
      </label>
    </div>
  );
};
