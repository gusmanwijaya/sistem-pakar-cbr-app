import { GET_ALL_BASIS_KASUS, ERROR_BASIS_KASUS, SET_PAGE } from "./types";
import { getAll } from "../../services/basis-kasus";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllBasisKasus = (allData, total_page) => {
  return {
    type: GET_ALL_BASIS_KASUS,
    allData,
    total_page,
  };
};

const setErrorBasisKasus = (error) => {
  return {
    type: ERROR_BASIS_KASUS,
    error,
  };
};

const fetchAllBasisKasus = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().basisKasusReducers?.page || 1,
      limit: getState().basisKasusReducers?.limit || 10,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllBasisKasus(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorBasisKasus(response));
    }
  };
};

export { fetchAllBasisKasus, setPage };
