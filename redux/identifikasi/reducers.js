import {
  ERROR_IDENTIFIKASI,
  GET_RIWAYAT_IDENTIFIKASI,
  SET_PAGE,
} from "./types";

const initialState = {
  page: 1,
  limit: 10,
  total_page: 1,
  allData: [],
  error: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_RIWAYAT_IDENTIFIKASI:
      return {
        ...state,
        allData: action.allData,
        total_page: action.total_page,
      };

    case ERROR_IDENTIFIKASI:
      return {
        ...state,
        error: action.error,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    default:
      return state;
  }
};

export default reducers;
