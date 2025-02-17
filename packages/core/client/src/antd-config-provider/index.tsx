import { ConfigProvider, Spin } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRequest } from '../api-client';

export function AntdConfigProvider(props) {
  const { remoteLocale, ...others } = props;
  const { i18n } = useTranslation();
  const { loading } = useRequest(
    {
      url: 'app:getLang',
    },
    {
      onSuccess(data) {
        const locale = localStorage.getItem('NOCOBASE_LANG');
        if (data?.data?.lang && !locale) {
          i18n.changeLanguage(data?.data?.lang);
        }
      },
      manual: !remoteLocale,
    },
  );
  if (loading) {
    return <Spin />;
  }
  return (
    <ConfigProvider {...others} locale={i18n.language === 'zh-CN' ? zhCN : enUS}>
      {props.children}
    </ConfigProvider>
  );
}
