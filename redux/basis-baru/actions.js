import { GET_ALL_BASIS_BARU, ERROR_BASIS_BARU, SET_PAGE } from "./types";
import { getAll } from "../../services/basis-baru";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllBasisBaru = (allData, total_page) => {
  return {
    type: GET_ALL_BASIS_BARU,
    allData,
    total_page,
  };
};

const setErrorBasisBaru = (error) => {
  return {
    type: ERROR_BASIS_BARU,
    error,
  };
};

const fetchAllBasisBaru = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().basisBaruReducers?.page || 1,
      limit: getState().basisBaruReducers?.limit || 10,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllBasisBaru(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorBasisBaru(response));
    }
  };
};

export { fetchAllBasisBaru, setPage };
