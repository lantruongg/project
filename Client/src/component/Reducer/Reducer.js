export default function reducer(state, action) {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return { ...state, loading: true };
    case "FETCH_USER_SUCCESS":
      return { ...state, users: action.payload, loading: false };
    case "FETCH_USER_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
