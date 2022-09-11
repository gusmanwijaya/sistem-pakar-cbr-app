import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function getInformasi(keyword, page, limit) {
  const url = `${ROOT_API}/${API}/informasi/get?keyword=${keyword}&page=${page}&limit=${limit}`;
  return CallApi({ url, method: "GET", token: true });
}

export async function getOneInformasi(id, token) {
  const url = `${ROOT_API}/${API}/informasi/get-one/${id}`;
  return CallApi({ url, method: "GET", serverToken: token });
}
