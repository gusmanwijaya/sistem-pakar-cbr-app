import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function getPertanyaan(token) {
  const url = `${ROOT_API}/${API}/identifikasi/get-pertanyaan`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function processIdentifikasi(data) {
  const url = `${ROOT_API}/${API}/identifikasi/proses`;
  return CallApi({ url, method: "POST", token: true, data });
}

export async function getRiwayatIdentifikasi(user, page, limit) {
  const url = `${ROOT_API}/${API}/identifikasi/get-riwayat-identifikasi?user=${user}&page=${page}&limit=${limit}`;
  return CallApi({ url, method: "GET", token: true });
}

export async function getOneRiwayatIdentifikasi(token, id) {
  const url = `${ROOT_API}/${API}/identifikasi/get-one-riwayat-identifikasi/${id}`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function destroy(id) {
  const url = `${ROOT_API}/${API}/identifikasi/destroy/${id}`;
  return CallApi({ url, method: "DELETE", token: true });
}
