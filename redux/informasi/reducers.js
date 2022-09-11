import {
  GET_ALL_INFORMASI,
  ERROR_INFORMASI,
  SET_KEYWORD,
  SET_PAGE,
} from "./types";

const initialState = {
  keyword: "",
  page: 1,
  limit: 8,
  total_page: 1,
  allData: [],
  error: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INFORMASI:
      return {
        ...state,
        allData: action.allData,
        total_page: action.total_page,
      };

    case ERROR_INFORMASI:
      return {
        ...state,
        error: action.error,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
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
