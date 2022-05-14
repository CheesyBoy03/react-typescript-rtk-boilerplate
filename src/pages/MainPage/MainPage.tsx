import React, { FC, ReactElement } from 'react';

import { useBem } from 'shared/hooks';

export const MainPage: FC = (): ReactElement => {
  const bem = useBem('MainPage');

  return <div className={bem('container')}>Hello world!</div>;
};
