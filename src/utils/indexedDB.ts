/* eslint-disable @typescript-eslint/no-explicit-any */
import { IResult } from '@/api/interface';
import TypeObjectStore from '@/database/type';

export default class Database {
  private databaseName: string; // 数据库名称
  private databaseVersion: number; // 数据库版本
  private database!: IDBDatabase; // 数据库对象

  constructor(databaseName: string, databaseVersion?: number) {
    this.databaseName = databaseName;
    this.databaseVersion = databaseVersion || 1;
  }

  public open(arrayStores: TypeObjectStore[]): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        console.log(
          "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
        );
        reject('fail');
      }

      // Open our database with the defined name and version
      // The call returns openRequest object
      const openRequest: IDBOpenDBRequest = window.indexedDB.open(
        this.databaseName,
        this.databaseVersion
      );

      // Database is ready, but its version is outdated
      // The upgradeneeded event also triggers when the database doesn’t yet exist (version 0)
      openRequest.onupgradeneeded = () => {
        console.log('数据库升级成功');

        // The result is an instance of an IDBDatabase
        this.database = openRequest.result;

        // Combine an array of objects with an empty object to create a new single object
        const objectStores = Object.assign({}, ...arrayStores);
        // 初始化多个 object store 对象仓库
        for (const storeName in objectStores) {
          // Get each single object store
          const { keyPath, indexs } = objectStores[storeName];
          if (!this.database.objectStoreNames.contains(storeName)) {
            // Create an object store in the database
            const objectStore = this.database.createObjectStore(storeName, {
              keyPath,
              autoIncrement: true
            });

            if (indexs && indexs.length > 0) {
              indexs.forEach((item: string) => {
                objectStore.createIndex(item, item, { unique: false });
              });
            }

            objectStore.transaction.oncomplete = () => {
              console.log('创建 object store 成功');
            };
          }
        }
      };

      // Database is ready, there’s the “database object” in openRequest.result
      // We should use it for further calls
      openRequest.onsuccess = () => {
        console.info('打开数据库成功');
        this.database = openRequest.result;
        resolve('success');
      };

      // Open a database failed
      openRequest.onerror = () => {
        console.error('打开数据库失败', openRequest.error);
        reject('fail');
      };
    });
  }

  // Add data to an object store
  addItem(storeName: string, data: any) {
    return new Promise((resolve, reject) => {
      const request = this.database
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)
        .add({
          ...data,
          created: new Date().getTime()
        });

      request.onsuccess = () => {
        console.log('数据写入成功', request);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('数据写入失败', request.error);
        reject(request.error);
      };
    });
  }

  // Update data in an object store
  updateItem(storeName: string, data: any) {
    return new Promise((resolve, reject) => {
      const request = this.database
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)
        .put(data);

      request.onsuccess = () => {
        console.log('数据修改成功', request.result);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('数据修改失败', request.error);
        reject(request.error);
      };
    });
  }

  // Remove data from an object store
  removeItem(storeName: string, key: number | string) {
    return new Promise((resolve, reject) => {
      const request = this.database
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)
        .delete(key);

      request.onsuccess = () => {
        console.log('数据删除成功', request.result);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('数据删除失败', request.error);
        reject(request.error);
      };
    });
  }

  // Get an object in an object store
  getItem(storeName: string, key: number | string) {
    return new Promise((resolve, reject) => {
      const request = this.database
        .transaction([storeName], 'readonly')
        .objectStore(storeName)
        .get(key);

      request.onsuccess = () => {
        console.log('查询数据成功', request.result);
        resolve(request.result as IResult);
      };

      request.onerror = () => {
        console.error('查询数据失败', request.error);
        reject(request.error);
      };
    });
  }

  // Get an array of all the objects in an object store
  getList(storeName: string) {
    return new Promise((resolve, reject) => {
      const request = this.database
        .transaction([storeName], 'readonly')
        .objectStore(storeName)
        .getAll();

      request.onsuccess = () => {
        console.log('查询所有数据成功', request.result);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('查询所有数据失败', request.error);
        reject(request.error);
      };
    });
  }
}
