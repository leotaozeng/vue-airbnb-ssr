/* eslint-disable @typescript-eslint/no-explicit-any */
// code: '000000' 表示 '操作成功'
// code: '000001' 表示 '手机号已存在'
// code: '000002' 表示 '手机号不存在'
// code: '000003' 表示 '密码不正确'
// code: '000004' 表示 '其他异常'
// code: '000005' 表示 '登录过期'

import { airbnbDB, usersObjectStore } from '@/database';
import { deleteCookie, getCookie } from '@/utils/util';
import { ElLoading, ElMessage } from 'element-plus';
import { IResult } from '../interface';

const storeName = Object.keys(usersObjectStore)[0];

// Mock接口：用户注册
export const userSignUpAPI = async (
  params: any
): Promise<IResult | undefined> => {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    const allUsers = (await airbnbDB.getList(storeName)) as any[];
    const user = allUsers.find((item) => {
      return item.phone === params.phone;
    });

    if (!user) {
      const token = new Date().getTime().toString();
      document.cookie = `token=${token}`;
      const userId = await airbnbDB.addItem(storeName, {
        ...params,
        status: 1,
        token
      });

      return {
        code: '000000',
        message: '注册成功',
        success: true,
        result: { status: 1, userId }
      };
    } else {
      // 存在相同手机号
      return {
        code: '000001',
        message: '手机号已存在',
        success: false,
        result: null
      };
    }
  } catch (error) {
    const message = `数据库操作出现异常: ${error}`;
    ElMessage({ message, type: 'error', showClose: true });
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};

// Mock接口：用户登录
export const userSignInAPI = async (
  params: any
): Promise<IResult | undefined> => {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    const allUsers = (await airbnbDB.getList(storeName)) as any[];
    const user = allUsers.find((item) => {
      return item.phone === params.phone;
    });

    if (!user) {
      // 用户输入的手机号不存在
      return {
        code: '000002',
        message: '手机号不存在',
        success: false,
        result: null
      };
    } else if (user.password !== params.password) {
      // 用户输入的密码不正确
      return {
        code: '000003',
        message: '密码不正确',
        success: false,
        result: null
      };
    } else {
      const token = new Date().getTime().toString();
      document.cookie = `token=${token}`;
      const userId = await airbnbDB.updateItem(storeName, {
        ...user,
        status: 1,
        token
      });

      return {
        code: '000000',
        message: '登录成功',
        success: true,
        result: { status: 1, userId }
      };
    }
  } catch (error) {
    const message = `数据库操作出现异常: ${error}`;
    ElMessage({ message, type: 'error', showClose: true });
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};

// Mock接口：用户登出
export const userSignOutAPI = async (): Promise<IResult | undefined> => {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    const token = getCookie('token');
    const allUsers = (await airbnbDB.getList(storeName)) as any[];
    const user = allUsers.find((item) => {
      return item.token && item.token.includes(token);
    });

    if (user) {
      deleteCookie('token');
      await airbnbDB.updateItem(storeName, { ...user, status: 0, token: null });

      return {
        code: '000000',
        message: '退出成功',
        success: true,
        result: { status: 0 }
      };
    }
  } catch (error) {
    const message = `数据库操作出现异常: ${error}`;
    ElMessage({ message, type: 'error', showClose: true });
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};
