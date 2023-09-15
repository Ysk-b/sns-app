import axios from 'axios';

// axios.create(): 新規HTTPクライアントを生成
export const apiClient = axios.create({
  // baseURL: API クライアントがリクエストを送信する先のbaseURL
  // リクエストのエンドポイントを指定する際、baseURLに対して相対パスを指定する
  // headers: リクエストヘッダーに追加される情報
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;