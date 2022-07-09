import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function getForSelect(token) {
  const url = `${ROOT_API}/${API}/gejala/get-for-select`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function getAll(page, limit) {
  const url = `${ROOT_API}/${API}/gejala/get-all?page=${page}&limit=${limit}`;
  return CallApi({ url, method: "GET", token: true });
}

export async function getOne(id, token) {
  const url = `${ROOT_API}/${API}/gejala/get-one/${id}`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function create(data) {
  const url = `${ROOT_API}/${API}/gejala/create`;
  return CallApi({ url, method: "POST", token: true, data });
}

export async function update(id, data) {
  const url = `${ROOT_API}/${API}/gejala/update/${id}`;
  return CallApi({ url, method: "PUT", token: true, data });
}

export async function destroy(id) {
  const url = `${ROOT_API}/${API}/gejala/destroy/${id}`;
  return CallApi({ url, method: "DELETE", token: true });
}
