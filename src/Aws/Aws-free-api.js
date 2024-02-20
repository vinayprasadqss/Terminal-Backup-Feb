import axios from "axios";
import { useDispatch } from "react-redux";

export const checkSession = (error, dispatch) => {
  try {
    if (
      error?.response?.data.message ===
      "User is not authorized to access this resource"
    ) {
      swal({
        title: "Session Expired!",
        text: "Your login session expired! Please login again to continue.",
        icon: "warning",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            className: "swal-button--confirm",
          },
        },
      }).then(function (isConfirm) {
        if (isConfirm) {
          localStorage.clear();
          dispatch({ type: "logout", payload: {} });
          Navigate("/login");
        } else {
          dispatch({ type: "logout", payload: {} });
          Navigate("/login");
          localStorage.clear();
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchQuery = (
  query,
  multifilter,
  orderby,
  isAsc,
  currentPage,
  cancel,
  token
) => {
  try {
    return axios.get(
      `
${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/search?query=${query}`,
      {
        params: {
          filter: JSON.stringify(multifilter),
          orderby: orderby,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          matrix: "search",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const SearchByEin = (
  query,
  multiFilter,
  orderBy,
  isAsc,
  currentPage,
  cancel,
  token
) => {
  try {
    return axios.get(
      `${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/search?query=${query}`,
      {
        params: {
          bq_organization_ein: query,
          filter: JSON.stringify(multiFilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: "bq_organization_ein",
          matrix: "search",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error, "jjj");
    // checkSession(error);
  }
};
export const SearchByTickers = (
  query,
  multifilter,
  orderBy,
  isAsc,
  currentPage,
  token
) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_AWS_BASE_FREE_URL
      }/search_ticker?query=${query}`,
      {
        params: {
          bq_organization_ticker: query,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: "bq_organization_ticker",
          matrix: "Search_by_Ticker",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const SearchByCIKs = (
  newQuery,
  multifilter,
  orderBy,
  isAsc,
  currentPage,
  cancel,
  token
) => {
  try {
    // console.log(newQuery);
    return axios.get(
      `${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/search?query=${newQuery}`,
      {
        params: {
          bq_organization_cik: newQuery,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: "bq_organization_cik",
          matrix: "search",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const SearchByDomains = (
  query,
  multiFilter,
  orderBy,
  isAsc,
  currentPage,
  cancel,
  token
) => {
  try {
    return axios.get(
      `${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/search?query=${query}`,
      {
        params: {
          bq_organization_website: query,
          filter: JSON.stringify(multiFilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: "bq_organization_website",
          matrix: "search",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const SearchByOfficers = (
  query,
  multiFilter,
  orderBy,
  isAsc,
  currentPage,
  token
  // cancel,
) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_AWS_BASE_FREE_URL
      }/officer_details?query=${query}`,
      {
        params: {
          filter: JSON.stringify(multiFilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 100,
          hits: 100,
          matrix: "Search_by_officers",
        },
        // cancelToken: new axios.CancelToken(function executor(c) {
        //   cancel.subscribe(() => {
        //     c("Operation canceled by the user.");
        //   });
        // }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const DetailRecord = (id, token) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_AWS_BASE_FREE_URL
      }/parent_entity_details?query=${id}`,
      {
        params: {
          matrix: "Parent_Details",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const TestQuery = () => {
  try {
    return axios.get(`${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/`);
  } catch (error) {
    console.log(error);
  }
};

// `http://54.184.241.45:5000

export const LegalEntityPrincipal = (legal_entity_id, token) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_AWS_BASE_FREE_URL
      }/legal_entity_principal/${legal_entity_id}`,
      {
        params: {
          matrix: "Legal_Entity_principals",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const orgRevenueAndEmployment = (id, token) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_AWS_BASE_FREE_URL
      }/get_organization_history?query=${id}`,
      {
        params: {
          matrix: "Org_Revenue_Employment",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// export const EmailLogin = (data) => {
//   try {
//     return axios.post(`${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/emaillogin`, {
//       username: data?.email,
//       password: data?.password,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const linkedinLogin = () => {
//   return axios.get(`${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/linkedin/login`, {
//     headers: {
//       R_url: `${import.meta.env.VITE_REDIRECT_URL}`,
//     },
//   });
// };

// export const UserLogin = (auth) => {
//   return axios.get(
//     `${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/linkedin/callback?code=${auth}`,
//     {}
//   );
// };

// export const LoadUser = (token) => {
//   return axios.get(
//     `${
//       import.meta.env.VITE_APP_AWS_BASE_FREE_URL
//     }/linkedin/userdetails?access_token=${token}`
//   );
// };

// export const LoadEmail = (token) => {
//   return axios.get(
//     `${
//       import.meta.env.VITE_APP_AWS_BASE_FREE_URL
//     }/email_token_verifiction?token=${token}`
//   );
// };

export const SearchByNames = (
  query,
  multifilter,
  orderBy,
  isAsc,
  currentPage,
  nameSearch,
  cancel,
  token
) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_AWS_BASE_FREE_URL
      }/search_Name?query=${query}`,
      {
        params: {
          bq_organization_name: query,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: nameSearch,
          matrix: "company_name",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const LocationName = (
  query,
  multifilter,
  orderBy,
  isAsc,
  currentPage,
  nameSearch,
  cancel,
  token
) => {
  try {
    return axios.get(
      ` ${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/custom_link`,
      {
        params: {
          query: query,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: nameSearch,
          ult_selection: String(nameSearch),
          matrix: "search_by_bq_location_name",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const SearchByLEIs = (
  newQuery,
  multifilter,
  orderBy,
  isAsc,
  currentPage,
  cancel,
  token
) => {
  try {
    // console.log(newQuery);
    return axios.get(
      `${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/search?query=${newQuery}`,
      {
        params: {
          bq_organization_lei: newQuery,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: "bq_organization_lei",
          matrix: "search",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const dbFilters = (token) => {
  try {
    return axios.get(
      `${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/unique_values`,
      {
        params: {
          matrix: "db_filters",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const Sidebar = async (
  query,
  multifilter,
  field,
  tab,
  cancel,
  token,
  nameSearch
) => {
  try {
    return axios.get(`${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/side-bar`, {
      params: {
        query: query,
        filter: JSON.stringify(multifilter),
        field: field,
        tab: tab,
        matrix: "sidebar",
        // ult_selection: nameSearch,
      },
      cancelToken: new axios.CancelToken(function executor(c) {
        cancel.subscribe(() => {
          c("Operation canceled by the user.");
        });
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const SearchByTickers_prefix = (
  query,
  multifilter,
  orderBy,
  isAsc,
  currentPage,
  nameSearch,
  cancel,
  token
) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_AWS_BASE_FREE_URL
      }/search_ticker_prefix?query=${query}`,
      {
        params: {
          bq_organization_ticker: query,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: nameSearch,
          matrix: "search_by_ticker_prefix",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const SearchByTickers_matches = (
  query,
  multifilter,
  orderBy,
  isAsc,
  currentPage,
  nameSearch,
  cancel,
  token
) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_AWS_BASE_FREE_URL
      }/search_ticker_matches?query=${query}`,
      {
        params: {
          bq_organization_ticker: query,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: nameSearch,
          matrix: "search_by_ticker_matches",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const SearchByTickers_sidebar = (
  query,
  multifilter,
  field,
  cancel,
  token
) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_AWS_BASE_FREE_URL
      }/search_ticker_prefix?query=${query}`,
      {
        params: {
          bq_organization_ticker: query,
          filter: JSON.stringify(multifilter),
          hits: 20,
          field: field,
          side_bar: "enabled",
          matrix: "sidebar_ticker_prefix",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const SearchbyAddress = (
  query,
  multifilter,
  orderBy,
  isAsc,
  currentPage,
  nameSearch,
  cancel,
  token
) => {
  try {
    return axios.get(
      `${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/address?query=${query}`,
      {
        params: {
          bq_organization_name: query,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          ult_selection: String(nameSearch),
          matrix: "search_by_address",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const GetFSM = (query, token) => {
  try {
    return axios.get(
      ` ${
        import.meta.env.VITE_APP_AWS_BASE_FREE_URL
      }/get_financial_data?query=${query}`,
      {
        params: {
          matrix: "get_financial_data",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const GetLocations = (query, token) => {
  try {
    return axios.post(
      ` ${import.meta.env.VITE_APP_AWS_BASE_FREE_URL}/locationsearch`,
      {
        bq_id: query,
        matrix: "locationsearch",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchChildrenPrincipals = (bqid, id, status, token) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_AWS_BASE_FREE_URL
      }/officer_details?bq_legal_entity_id=${id}
      &bq_organization_id=${bqid}&bq_legal_entity_parent_status=${status}`,
      {
        params: {
          matrix: "officer_details",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const CreatePortfolio = async (token, email, portfolioName, org) => {
  try {
    return axios.post(
      import.meta.env.VITE_APP_AWS_BASE_FREE_URL + "/custom_link/",
      {
        portal: "terminal2",
        user_email: email,
        portfolio_name: portfolioName,
        data: org,
        matrix: "save_portfolio",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const Fetch_Portfolios = async (token, email, pageNumber, limit) => {
  try {
    return axios.post(
      import.meta.env.VITE_APP_AWS_BASE_FREE_URL + "/custom_link/",
      {
        portal: "terminal2",
        user_email: email,
        matrix: "fetch_portfolio",
        page_size: limit || 10,
        page_number: pageNumber || 1,
        names_only: true,
        // portfolio_name:""
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const Fetch_Portfolios_Detail = async (
  token,
  email,
  org,
  currentPage
) => {
  try {
    return axios.post(
      import.meta.env.VITE_APP_AWS_BASE_FREE_URL + "/custom_link/",
      {
        portal: "terminal2",
        user_email: email,
        matrix: "fetch_portfolio",
        page_size: 10,
        page_number: 1,
        portfolio_name: org,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const SelectPortfolio = (
  search,
  filters,
  currentPage,
  orderby,
  isAsc,
  searchSelect,
  token,
  user_id
) => {
  return axios.get(
    import.meta.env.VITE_APP_AWS_BASE_FREE_URL + "/custom_link/",
    {
      params: {
        filter: JSON.stringify(filters),
        offset: (currentPage === 0 ? 1 : currentPage) * 20,
        hits: 30,
        query: search,
        orderby: orderby,
        isAsc: isAsc,
        field: searchSelect,
        user_id: user_id,
        matrix: "for_search",
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const PortfolioDelete = async (token, email, org) => {
  try {
    return axios.post(
      import.meta.env.VITE_APP_AWS_BASE_FREE_URL + "/custom_link/",
      {
        portal: "terminal2",
        user_email: email,
        matrix: "delete_portfolio",
        portfolio_name: org,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const PortfolioUpdate = async (token, email, org, data) => {
  try {
    return axios.post(
      import.meta.env.VITE_APP_AWS_BASE_FREE_URL + "/custom_link/",
      {
        portal: "terminal2",
        user_email: email,
        matrix: "update_portfolio",
        portfolio_name: org,
        data: data,
        usage: "update_data",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const PortfolioRename = async (token, email, org, data) => {
  try {
    return axios.post(
      import.meta.env.VITE_APP_AWS_BASE_FREE_URL + "/custom_link/",
      {
        portal: "terminal2",
        user_email: email,
        matrix: "update_portfolio",
        portfolio_name: org,
        data: data,
        usage: "rename",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const CompanyDetailPortfolio = (search, searchSelect, token, email) => {
  return axios.get(import.meta.env.VITE_APP_AWS_BASE_FREE_URL + "/search", {
    params: {
      query: search,
      field: searchSelect,
      matrix: "search",
      user_id: email,
    },

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const SpeceficCompanyPortfolioDelete = (token, email, org, data) => {
  try {
    return axios.post(
      import.meta.env.VITE_APP_AWS_BASE_FREE_URL + "/custom_link/",
      {
        portal: "terminal2",
        user_email: email,
        matrix: "update_portfolio",
        portfolio_name: org,
        data: [data],
        usage: "remove_data",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
