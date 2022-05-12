/* eslint-disable @typescript-eslint/no-explicit-any */
// * code: '000000' 表示 '操作成功'
// * code: '000001' 表示 '手机号已存在'
// * code: '000002' 表示 '手机号不存在'
// * code: '000003' 表示 '密码不正确'
// * code: '000004' 表示 '其他异常'
// * code: '000005' 表示 '登录过期'

import { airbnbDB } from '@/db';
import usersObjectStore from '@/db/objectStores/users';
import i18n from '@/i18n';
import { getCookie } from '@/utils/util';
import { ElLoading, ElMessage } from 'element-plus';
import 'element-plus/es/components/loading/style/css';
import 'element-plus/es/components/message/style/css';

const storeName = Object.keys(usersObjectStore)[0];

// * Mock接口：用户注册
export const userSignUpAPI = async (params: any) => {
  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('loading'),
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    const users = (await airbnbDB.getList(storeName)) as any[];
    const result = users.find((user) => user.phone === params.phone);

    if (!result) {
      const token = new Date().getTime().toString();
      document.cookie = `token=${token}`;

      await airbnbDB.addItem(storeName, {
        ...params,
        status: 1,
        token
      });

      return {
        code: '000000',
        message: '注册成功',
        success: true,
        result: {
          status: 1
        }
      };
    } else {
      // * 存在相同手机号
      return {
        code: '000001',
        message: '手机号已存在',
        success: false,
        result: null
      };
    }
  } catch (error) {
    console.error(error);
    ElMessage({
      showClose: true,
      message: `数据库查询出现异常: ${error}`,
      type: 'error'
    });
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};

// * Mock接口：用户登录
export const userSignInAPI = async (params: any) => {
  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('loading'),
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    const users = (await airbnbDB.getList(storeName)) as any[];
    const result = users.find((user) => user.phone === params.phone);

    if (!result) {
      // * 用户输入的手机号不存在
      return {
        code: '000002',
        message: '手机号不存在',
        success: false,
        result: null
      };
    } else if (result.password !== params.password) {
      // * 用户输入的密码不正确
      return {
        code: '000003',
        message: '密码不正确',
        success: false,
        result: null
      };
    } else {
      const token = new Date().getTime().toString();
      document.cookie = `token=${token}`;

      await airbnbDB.updateItem(storeName, {
        ...result,
        status: 1,
        token
      });

      return {
        code: '000000',
        message: '登录成功',
        success: true,
        result: {
          status: 1
        }
      };
    }
  } catch (error) {
    console.error(error);
    ElMessage({
      showClose: true,
      message: `数据库查询出现异常: ${error}`,
      type: 'error'
    });
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};

// * Mock接口：用户登出
export const userSignOutAPI = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('loading'),
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    const users = (await airbnbDB.getList(storeName)) as any[];
    const token = getCookie('token');
    const result = users.find((user) => user.token.includes(token));

    if (result) {
      await airbnbDB.updateItem(storeName, {
        ...result,
        status: 0,
        token: null
      });

      return {
        code: '000000',
        message: '退出成功',
        success: true,
        result: {
          status: 0
        }
      };
    }
  } catch (error) {
    console.error(error);
    ElMessage({
      showClose: true,
      message: `数据库查询出现异常: ${error}`,
      type: 'error'
    });
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};
