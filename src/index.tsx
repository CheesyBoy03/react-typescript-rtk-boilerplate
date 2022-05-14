import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale/ru_RU';

import { store } from './store';
import { Routes } from './Routes';

// Styles
import 'antd/dist/antd.less';
import 'shared/styles/customizeComponent.scss';
import 'shared/styles/common.scss';

if (
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_ENABLE_MOCKS === 'YES'
) {
  const { worker } = require('./mocks/browser');
  worker.start();
}

const appContainer = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider locale={ru_RU}>
        <Routes />
      </ConfigProvider>
    </Provider>
  </BrowserRouter>,
  appContainer,
);
