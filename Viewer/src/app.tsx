import Footer from '@/components/Footer';
import type {RequestConfig} from '@@/plugin-request/request';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from '@umijs/max';
import {history} from '@umijs/max';
import qs from 'qs';
import defaultSettings from '../config/defaultSettings';
import {message} from "antd";

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  loading?: boolean;
}> {
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    return {
      settings: defaultSettings,
    };
  }
  return {
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState}) => {
  return {
    // rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer/>,
    // onPageChange: () => {
    //   const { location } = history;
    //   console.log(history);
    //   // 如果没有登录，重定向到 login
    //   if (!initialState?.currentUser && location.pathname !== loginPath) {
    //     history.push(loginPath);
    //   }
    // },
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return <>
        {children}
        {/*{!props.location?.pathname?.includes('/login') && (*/}
        {/*  <SettingDrawer*/}
        {/*    disableUrlParams*/}
        {/*    enableDarkTheme*/}
        {/*    settings={initialState?.settings}*/}
        {/*    onSettingChange={(settings) => {*/}
        {/*      setInitialState((preInitialState) => ({*/}
        {/*        ...preInitialState,*/}
        {/*        settings,*/}
        {/*      }));*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
      </>

    },
    ...initialState?.settings,
  };
};

export const request: RequestConfig = {
  errorConfig: {
    errorThrower: (resData: any) => {
      message.error(resData.msgInfo)
      // resData 是我们自己的数据
      return {
        ...resData,
        data: resData.data,
        total: resData.total,
        success: resData.success,
        errorCode: resData.msgCode,
        errorMessage: resData.msgInfo,
      };
    }
  },

  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      config.paramsSerializer = function (params: any) {
        return qs.stringify(params, {indices: false})
      }
      // 拦截请求配置，进行个性化处理。
      const url = config.url;
      return {...config, url};
    }
  ],
};
