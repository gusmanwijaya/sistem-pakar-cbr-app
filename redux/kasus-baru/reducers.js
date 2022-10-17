import { GET_ALL_KASUS_BARU, ERROR_KASUS_BARU, SET_PAGE } from "./types";

const initialState = {
  page: 1,
  limit: 10,
  total_page: 1,
  allData: [],
  error: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_KASUS_BARU:
      return {
        ...state,
        allData: action.allData,
        total_page: action.total_page,
      };

    case ERROR_KASUS_BARU:
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
