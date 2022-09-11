import {
  GET_ALL_INFORMASI,
  ERROR_INFORMASI,
  SET_KEYWORD,
  SET_PAGE,
} from "./types";
import { getInformasi } from "../../services/informasi";
import debounce from "debounce-promise";

const debouncedGetInformasi = debounce(getInformasi, 1000);

const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetInformasi = (allData, total_page) => {
  return {
    type: GET_ALL_INFORMASI,
    allData,
    total_page,
  };
};

const setErrorInformasi = (error) => {
  return {
    type: ERROR_INFORMASI,
    error,
  };
};

const fetchAllInformasi = () => {
  return async (dispatch, getState) => {
    const params = {
      keyword: getState().informasiReducers.keyword || "",
      page: getState().informasiReducers?.page || 1,
      limit: getState().informasiReducers?.limit || 8,
    };

    const response = await debouncedGetInformasi(
      params?.keyword,
      params?.page,
      params?.limit
    );
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetInformasi(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorInformasi(response));
    }
  };
};

export { fetchAllInformasi, setKeyword, setPage };
