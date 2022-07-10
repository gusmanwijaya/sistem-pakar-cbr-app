import { GET_ALL_PENGGUNA, ERROR_PENGGUNA, SET_PAGE } from "./types";
import { getAll } from "../../services/pengguna";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllPengguna = (allData, total_page) => {
  return {
    type: GET_ALL_PENGGUNA,
    allData,
    total_page,
  };
};

const setErrorPengguna = (error) => {
  return {
    type: ERROR_PENGGUNA,
    error,
  };
};

const fetchAllPengguna = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().penggunaReducers?.page || 1,
      limit: getState().penggunaReducers?.limit || 10,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllPengguna(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorPengguna(response));
    }
  };
};

export { fetchAllPengguna, setPage };
