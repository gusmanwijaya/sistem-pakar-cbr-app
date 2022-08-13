import {
  GET_ALL_HAMA_PENYAKIT,
  ERROR_HAMA_PENYAKIT,
  SET_KEYWORD,
  SET_PAGE,
} from "./types";
import { getAll } from "../../services/hama-penyakit";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

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

const setGetAllHamaPenyakit = (allData, total_page) => {
  return {
    type: GET_ALL_HAMA_PENYAKIT,
    allData,
    total_page,
  };
};

const setErrorHamaPenyakit = (error) => {
  return {
    type: ERROR_HAMA_PENYAKIT,
    error,
  };
};

const fetchAllHamaPenyakit = () => {
  return async (dispatch, getState) => {
    const params = {
      keyword: getState().hamaPenyakitReducers.keyword || "",
      page: getState().hamaPenyakitReducers?.page || 1,
      limit: getState().hamaPenyakitReducers?.limit || 8,
    };

    const response = await debouncedGetAll(
      params?.keyword,
      params?.page,
      params?.limit
    );
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllHamaPenyakit(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorHamaPenyakit(response));
    }
  };
};

export { fetchAllHamaPenyakit, setKeyword, setPage };
