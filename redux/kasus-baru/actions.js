import { GET_ALL_KASUS_BARU, ERROR_KASUS_BARU, SET_PAGE } from "./types";
import { getAll } from "../../services/kasus-baru";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllKasusBaru = (allData, total_page) => {
  return {
    type: GET_ALL_KASUS_BARU,
    allData,
    total_page,
  };
};

const setErrorKasusBaru = (error) => {
  return {
    type: ERROR_KASUS_BARU,
    error,
  };
};

const fetchAllKasusBaru = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().kasusBaruReducers?.page || 1,
      limit: getState().kasusBaruReducers?.limit || 10,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllKasusBaru(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorKasusBaru(response));
    }
  };
};

export { fetchAllKasusBaru, setPage };
