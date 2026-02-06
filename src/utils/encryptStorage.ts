import EncryptedStorage from "react-native-encrypted-storage";

// refreshToken 토큰 값 저장
async function setEncryptStorage<T>(key: string, data: T) {
  await EncryptedStorage.setItem(key, JSON.stringify(data));
}

// refreshToken 토큰 파싱 후 반환
async function getEncryptStorage(key: string) {
  const storedData = await EncryptedStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
}

// refreshToken 제거
async function removeEncryptStorage(key: string) {
  const data = await getEncryptStorage(key);

  if (data) {
    await EncryptedStorage.removeItem(key);
  }
}

export { setEncryptStorage, getEncryptStorage, removeEncryptStorage };
