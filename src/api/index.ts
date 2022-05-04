import IndexedDB from '@/utils/indexedDB';

const airbnbDB = new IndexedDB('airbnb');

// * Mock接口：获取 elephant object store
export const getElephantAPI = async () => {
  try {
    await airbnbDB.open('elephant', 'id', ['nose', 'ear']);
    const response = await airbnbDB.getList('elephant');

    return {
      code: '000000',
      message: '操作成功',
      result: response,
      success: true
    };
  } catch (error) {
    console.error('getElephant Error', error);
  }
};
