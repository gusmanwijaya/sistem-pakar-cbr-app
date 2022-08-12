import {
  ERROR_IDENTIFIKASI,
  GET_RIWAYAT_IDENTIFIKASI,
  SET_PAGE,
} from "./types";
import { getRiwayatIdentifikasi } from "../../services/identifikasi";
import debounce from "debounce-promise";

const debouncedGetRiwayatIdentifikasi = debounce(getRiwayatIdentifikasi, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetRiwayatIdentifikasi = (allData, total_page) => {
  return {
    type: GET_RIWAYAT_IDENTIFIKASI,
    allData,
    total_page,
  };
};

const setErrorIdentifikasi = (error) => {
  return {
    type: ERROR_IDENTIFIKASI,
    error,
  };
};

const fetchRiwayatIdentifikasi = (user) => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().identifikasiReducers?.page || 1,
      limit: getState().identifikasiReducers?.limit || 10,
    };

    const response = await debouncedGetRiwayatIdentifikasi(
      user,
      params?.page,
      params?.limit
    );
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetRiwayatIdentifikasi(
          response?.data?.data,
          response?.data?.total_page
        )
      );
    } else {
      dispatch(setErrorIdentifikasi(response));
    }
  };
};

export { fetchRiwayatIdentifikasi, setPage };
