import axios from "axios";

export const searchQuery = (
  query,
  multifilter,
  orderby,
  isAsc,
  currentPage,
  cancel
) => {
  try {
    return axios.get(
      `
${import.meta.env.VITE_APP_BASE_URL}/search?query=${query}`,
      {
        params: {
          filter: JSON.stringify(multifilter),
          orderby: orderby,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
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
  cancel
) => {
  try {
    return axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/search?query=${query}`,
      {
        params: {
          bq_organization_ein: query,
          filter: JSON.stringify(multiFilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: "bq_organization_ein",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const SearchByTickers = (
  query,
  multifilter,
  orderBy,
  isAsc,
  currentPage
) => {
  try {
    return axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/search_ticker?query=${query}`,
      {
        params: {
          bq_organization_ticker: query,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: "bq_organization_ticker",
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
  cancel
) => {
  try {
    console.log(newQuery);
    return axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/search?query=${newQuery}`,
      {
        params: {
          bq_organization_cik: newQuery,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: "bq_organization_cik",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
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
  cancel
) => {
  try {
    return axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/search?query=${query}`,
      {
        params: {
          bq_organization_website: query,
          filter: JSON.stringify(multiFilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: "bq_organization_website",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
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
  currentPage
  // cancel
) => {
  try {
    return axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/officer_details?query=${query}`,
      {
        params: {
          filter: JSON.stringify(multiFilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 100,
          hits: 100,
        },
        // cancelToken: new axios.CancelToken(function executor(c) {
        //   cancel.subscribe(() => {
        //     c("Operation canceled by the user.");
        //   });
        // }),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const DetailRecord = (id) => {
  try {
    return axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/parent_entity_details?query=${id}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const TestQuery = () => {
  try {
    return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/`);
  } catch (error) {
    console.log(error);
  }
};

// `http://54.184.241.45:5000

export const LegalEntityPrincipal = (legal_entity_id) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_BASE_URL
      }/legal_entity_principal/${legal_entity_id}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const orgRevenueAndEmployment = (id) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_BASE_URL
      }/get_organization_history?query=${id}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const EmailLogin = (data) => {
  try {
    return axios.post(`${import.meta.env.VITE_APP_BASE_URL}/emaillogin`, {
      username: data?.email,
      password: data?.password,
    });
  } catch (error) {
    console.log(error);
  }
};

export const linkedinLogin = () => {
  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/linkedin/login`, {
    headers: {
      R_url: `${import.meta.env.VITE_REDIRECT_URL}`,
    },
  });
};

export const UserLogin = (auth) => {
  return axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/linkedin/callback?code=${auth}`,
    {}
  );
};

export const LoadUser = (token) => {
  return axios.get(
    `${
      import.meta.env.VITE_APP_BASE_URL
    }/linkedin/userdetails?access_token=${token}`
  );
};

export const LoadEmail = (token) => {
  return axios.get(
    `${
      import.meta.env.VITE_APP_BASE_URL
    }/email_token_verifiction?token=${token}`
  );
};

export const SearchByNames = (
  query,
  multifilter,
  orderBy,
  isAsc,
  currentPage,
  nameSearch,
  cancel
) => {
  try {
    return axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/search_Name?query=${query}`,
      {
        params: {
          bq_organization_name: query,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: nameSearch,
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
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
  cancel
) => {
  try {
    console.log(newQuery);
    return axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/search?query=${newQuery}`,
      {
        params: {
          bq_organization_lei: newQuery,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: "bq_organization_lei",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const dbFilters = () => {
  try {
    return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/unique_values`, {});
  } catch (error) {
    console.log(error);
  }
};

export const Sidebar = async (query, multifilter, field, tab, cancel) => {
  try {
    return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/side-bar`, {
      params: {
        query: query,
        filter: JSON.stringify(multifilter),
        field: field,
        tab: tab,
      },
      cancelToken: new axios.CancelToken(function executor(c) {
        cancel.subscribe(() => {
          c("Operation canceled by the user.");
        });
      }),
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
  cancel
) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_BASE_URL
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
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
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
  cancel
) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_BASE_URL
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
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const SearchByTickers_sidebar = (query, multifilter, field, cancel) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_BASE_URL
      }/search_ticker_prefix?query=${query}`,
      {
        params: {
          bq_organization_ticker: query,
          filter: JSON.stringify(multifilter),
          hits: 20,
          field: field,
          side_bar: "enabled",
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
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
  cancel
) => {
  try {
    return axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/address?query=${query}`,
      {
        params: {
          bq_organization_name: query,
          filter: JSON.stringify(multifilter),
          orderby: orderBy,
          isAsc: isAsc,
          offset: (currentPage === 0 ? currentPage : currentPage - 1) * 20,
          hits: 20,
          field: nameSearch,
        },
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.subscribe(() => {
            c("Operation canceled by the user.");
          });
        }),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const GetFSM = (query) => {
  try {
    return axios.get(
      ` ${import.meta.env.VITE_APP_BASE_URL}/get_financial_data?query=${query}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const GetLocations = (query) => {
  try {
    return axios.post(` ${import.meta.env.VITE_APP_BASE_URL}/locationsearch`, {
      bq_id: query,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchChildrenPrincipals = (bqid, id, status) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_BASE_URL
      }/officer_details?bq_legal_entity_id=${id}
      &bq_organization_id=${bqid}&bq_legal_entity_parent_status=${status}`
    );
  } catch (error) {
    console.log(error);
  }
};
export const fetchParentPrincipals = (bqid, status) => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_APP_BASE_URL
      }/officer_details?bq_organization_id=${bqid}&bq_legal_entity_parent_status=${status}`
    );
  } catch (error) {
    console.log(error);
  }
};
