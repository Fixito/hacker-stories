export const STORIES_FETCH_INIT = 'STORIES_FETCH_INIT';
export const STORIES_FETCH_SUCCESS = 'STORIES_FETCH_SUCCESS';
export const STORIES_FETCH_FAILURE = 'STORIES_FETCH_FAILURE';
export const REMOVE_STORY = 'REMOVE_STORY';

export const initialState = {
  data: [],
  isLoading: true,
  isError: false,
};

export function storiesReducer(state, action) {
  switch (action.type) {
    case STORIES_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case STORIES_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case STORIES_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REMOVE_STORY:
      return {
        ...state,
        data: state.data.filter((s) => s.objectID !== action.payload),
      };
    default:
      throw new Error();
  }
}
