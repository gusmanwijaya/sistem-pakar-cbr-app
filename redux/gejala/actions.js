import { GET_ALL_GEJALA, ERROR_GEJALA, SET_PAGE } from "./types";
import { getAll } from "../../services/gejala";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllGejala = (allData, total_page) => {
  return {
    type: GET_ALL_GEJALA,
    allData,
    total_page,
  };
};

const setErrorGejala = (error) => {
  return {
    type: ERROR_GEJALA,
    error,
  };
};

const fetchAllGejala = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().gejalaReducers?.page || 1,
      limit: getState().gejalaReducers?.limit || 10,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllGejala(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorGejala(response));
    }
  };
};

export { fetchAllGejala, setPage };
