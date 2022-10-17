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

const setGetRiwayatIdentifikasi = (allData, total_page, total_data) => {
  return {
    type: GET_RIWAYAT_IDENTIFIKASI,
    allData,
    total_page,
    total_data,
  };
};

const setErrorIdentifikasi = (error) => {
  return {
    type: ERROR_IDENTIFIKASI,
    error,
  };
};

const fetchRiwayatIdentifikasi = (user, isVerified) => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().identifikasiReducers?.page || 1,
      limit: getState().identifikasiReducers?.limit || 10,
    };

    const response = await debouncedGetRiwayatIdentifikasi(
      user,
      params?.page,
      params?.limit,
      isVerified
    );
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetRiwayatIdentifikasi(
          response?.data?.data,
          response?.data?.total_page,
          response?.data?.total_data
        )
      );
    } else {
      dispatch(setErrorIdentifikasi(response));
    }
  };
};

export { fetchRiwayatIdentifikasi, setPage };
