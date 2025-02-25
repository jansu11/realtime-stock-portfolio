export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("marketDataDB", 1);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("stocks")) {
        db.createObjectStore("stocks", { keyPath: "symbol" });
      }
      if (!db.objectStoreNames.contains("sectors")) {
        db.createObjectStore("sectors", { keyPath: "indexCode" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveData = async (storeName: string, data: any[]) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    data.forEach(item => store.put(item));

    tx.oncomplete = () => resolve("Data saved successfully");
    tx.onerror = () => reject("Error saving data");
  });
};

export const getData = async (storeName: string): Promise<any[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject("Error fetching data");
  });
};
