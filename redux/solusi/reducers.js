import { GET_ALL_SOLUSI, ERROR_SOLUSI, SET_PAGE } from "./types";

const initialState = {
  page: 1,
  limit: 10,
  total_page: 1,
  allData: [],
  error: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SOLUSI:
      return {
        ...state,
        allData: action.allData,
        total_page: action.total_page,
      };

    case ERROR_SOLUSI:
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
