import {
  GET_ALL_BASIS_PENGETAHUAN,
  ERROR_BASIS_PENGETAHUAN,
  SET_PAGE,
} from "./types";
import { getAll } from "../../services/basis-pengetahuan";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllBasisPengetahuan = (allData, total_page) => {
  return {
    type: GET_ALL_BASIS_PENGETAHUAN,
    allData,
    total_page,
  };
};

const setErrorBasisPengetahuan = (error) => {
  return {
    type: ERROR_BASIS_PENGETAHUAN,
    error,
  };
};

const fetchAllBasisPengetahuan = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().basisPengetahuanReducers?.page || 1,
      limit: getState().basisPengetahuanReducers?.limit || 10,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllBasisPengetahuan(
          response?.data?.data,
          response?.data?.total_page
        )
      );
    } else {
      dispatch(setErrorBasisPengetahuan(response));
    }
  };
};

export { fetchAllBasisPengetahuan, setPage };
