import axios from "axios";
import Cookies from "js-cookie";

export default async function CallApi({
  url,
  method,
  data,
  token,
  serverToken,
}) {
  let headers = {};

  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const tokenCookies = Cookies.get("token");
    if (tokenCookies) {
      headers = {
        Authorization: `Bearer ${tokenCookies}`,
      };
    }
  }

  const response = await axios({
    url,
    method,
    data,
    headers,
  }).catch((error) => error.response);

  return response;
}
