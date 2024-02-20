import axios from "axios";
import { Sidebar } from "../Aws/Aws-api";

export const fetchcounts = async (
  isMounted,
  CancelToken,
  query,
  multiFilter,
  nameSearch,
  z,
  dispatch,
  setCountLoading,
  token
) => {
  try {
    setCountLoading(true);
    let field = nameSearch;
    const result = await Sidebar(
      query,
      multiFilter,
      field,
      z,
      CancelToken,
      token
    );

    dispatch({ type: "sidebar", payload: result?.data });
  } catch (error) {
    if (axios.isCancel(error)) {
      // console.log("Request canceled", error.message);
      dispatch({ type: "sidebar", payload: [] });
    } else {
      console.log(error);
      if (error?.name === "AxiosError") {
        dispatch({ type: "sidebar", payload: ["error"] });
      }
    }
  } finally {
    // if (isMounted) {
    //   setCountLoading(false);
    // }
  }
};
