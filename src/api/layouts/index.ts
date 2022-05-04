import IndexedDB from '@/utils/indexedDB';

const airbnbDB = new IndexedDB('airbnb');

interface Result {
  id: number;
  el: any;
  name: string;
  created: Date;
}

// * Mock接口：保存当前语言包
export const saveLanguageAPI = async (language: any) => {
  try {
    await airbnbDB.open('language', 'id', ['name']);
    const result = (await airbnbDB.getItem('language', 1)) as Result;

    if (!result) {
      // * 数据不存在，新增数据
      await airbnbDB.addItem('language', {
        created: new Date(),
        el: language.el,
        name: language.name
      });
    } else {
      // * 数据已存在，更新数据
      await airbnbDB.updateItem('language', {
        ...result,
        el: language.el,
        name: language.name
      });
    }

    return {
      code: '000000',
      message: '操作成功',
      result: null,
      success: true
    };
  } catch (error) {
    console.error('saveLanguageApi Error', error);
  }
};

// * Mock接口：获取当前语言包
export const getLanguageApi = async () => {
  try {
    await airbnbDB.open('language', 'id', ['name']);
    const result = (await airbnbDB.getItem('language', 1)) as Result;

    return {
      code: '000000',
      message: '操作成功',
      result: result || null,
      success: true
    };
  } catch (error) {
    console.error('getLanguageApi Error', error);
  }
};
