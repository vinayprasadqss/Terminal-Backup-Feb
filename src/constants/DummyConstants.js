import { Congression, partyName } from "./Congressional";
import IndustryName from "./IndustryName";
import { NaicsindustryNames } from "./NaicsIndistryName";
import { Metro } from "./Metro";
import { stateList, JstateList } from "./countryCodes";
import { newState } from "./DynamiCFilters";
import { jcode } from "./JudiciaryCodes";
import {
  bq_location_address_cbsa_name,
  bq_location_address_county_name,
  bq_location_address_state_name,
  bq_location_type,
} from "./LocationConstants";

export const multipleMarker = [
  {
    name: "Hyundai",
    address: "street road 212",
    industry: "Notors pvt ltd",
    lat: "34.79165",
    lng: "-116.94501",
  },
  {
    name: "Hyundai2",
    address: "street road 2122",
    industry: "Notors pvt ltd2",
    lat: "34.75165",
    lng: "-116.84501",
  },
  {
    name: "Maruti",
    address: "street road 512",
    industry: "Notors pvt ltd",
    lat: "34.76165",
    lng: "-116.94501",
  },
];

export const SearchSelectOption = [
  {
    id: "0",
    name: "",
    label: "All",
  },
  {
    id: "1",
    name: "bq_organization_name",
    label: "Name",
  },
  {
    id: "2",
    name: "bq_organization_ein",
    label: "EIN",
  },
  {
    id: "3",
    name: "bq_organization_website",
    label: "Website",
  },
  {
    id: "4",
    name: "bq_organization_address1_line_1",
    label: "Address",
  },
  {
    id: "5",
    name: "bq_organization_ticker",
    label: "Ticker",
  },
  {
    id: "6",
    name: "bq_organization_address1_state_name",
    label: "State Name",
  },
  {
    id: "7",
    name: "bq_organization_year_founded",
    label: "Year Founded",
  },
  {
    id: "8",
    name: "bq_organization_irs_industry_name",
    label: "Industry Name",
  },
  {
    id: "9",
    name: "bq_organization_cong_district_name",
    label: "Congressional District Name",
  },
  {
    id: "10",
    name: "bq_organization_cong_district_id",
    label: "Congressional District ID",
  },
  {
    id: "11",
    name: "bq_organization_cong_district_cd",
    label: "Congressional District CD",
  },
  {
    id: "12",
    name: "bq_organization_cong_district_representative_name_from_listing",
    label: "District representative name",
  },
];

export const distanceInMiles = [
  {
    id: 0,
    label: "5",
    name: "miles",
    options: [
      { value: "1", title: "1 mile" },
      { value: "5", title: "5 miles" },
      { value: "10", title: "10 miles" },
      { value: "15", title: "15 miles" },
      { value: "20", title: "20 miles" },
      { value: "25", title: "25 miles" },
    ],
  },
];

export const EinFilters = [
  {
    id: 1,
    label: "Filter by Organization Structure",
    name: "bq_organization_structure",
    text: "Filter by Organization Structure",
    options: [
      { value: "", title: "See All " },
      {
        value: "Multi-entity U.S. organization",
        title: "Multi-entity U.S. organization",
      },
      {
        value: "Single-entity organization",
        title: "Single-entity organization",
      },
    ],
  },
  {
    id: 2,
    label: "Filter by Type of Employer",
    name: "bq_organization_company_type",
    text: "Filter by Type of Employer",
    options: [
      { value: "", title: "See All" },
      { value: "Employer", title: "Employer" },
      { value: "Sole Proprietor", title: "Holding Company" },
    ],
  },
  {
    id: 3,
    label: "Filter by Legal Entity Type",
    name: "bq_legal_entity_parent_status",
    text: "Filter by Legal Entity Type",
    options: [
      { value: "", title: "See All" },
      { value: "Child", title: "Child" },
      { value: "Ultimate Parent", title: "Ultimate Parent" },
    ],
  },
  {
    id: 4,
    label: "Filter by States",
    name: "bq_organization_address1_state",
    text: "Filter by States",
    options: [{ value: "", title: "See All" }, ...stateList],
  },
  {
    id: 5,
    label: "Filter by Active Status",
    name: "bq_organization_isactive",
    text: "Filter by Active Status",
    options: [
      { value: "", title: "See All" },
      { value: "0", title: "Active" },
      { value: "1", title: "In Active" },
    ],
  },
  {
    id: 6,
    label: "Filter by NAICS Sector",
    name: "bq_organization_naics_sector_name",
    text: "Filter by NAICS Sector",
    options: [{ value: "", title: "See All" }],
  },
  {
    id: 7,
    label: "Filter by Private/Public",
    name: "bq_organization_is_public",
    text: "Filter by Private/Public",
    options: [
      { value: "", title: "See All" },
      { value: "0", title: "Public" },
      { value: "1", title: "Private" },
    ],
  },
];

export const TickerFilters = [
  {
    id: 1,
    label: "Filter by Organization Structure",
    name: "bq_organization_structure",
    text: "Filter by Organization Structure",
    options: [
      { value: "", title: "See All " },
      {
        value: "Multi-entity U.S. organization",
        title: "Multi-entity U.S. organization",
      },
      {
        value: "Single-entity organization",
        title: "Single-entity organization",
      },
    ],
  },
  {
    id: 2,
    label: "Filter by Type of Employer",
    name: "bq_organization_company_type",
    text: "Filter by Type of Employer",
    options: [
      { value: "", title: "See All" },
      { value: "Employer", title: "Employer" },
      { value: "Sole Proprietor", title: "Holding Company" },
    ],
  },

  {
    id: 3,
    label: "Filter by States",
    name: "bq_organization_address1_state",
    text: "Filter by States",
    options: [{ value: "", title: "See All" }, ...stateList],
  },
  {
    id: 4,
    label: "Filter by Active Status",
    name: "bq_organization_isactive",
    text: "Filter by Active Status",
    options: [
      { value: "", title: "See All" },
      { value: "0", title: "Active" },
      { value: "1", title: "Inactive" },
    ],
  },
  {
    id: 5,
    label: "Filter by NAICS Sector",
    name: "bq_organization_naics_sector_name",
    text: "Filter by NAICS Sector",
    options: [{ value: "", title: "See All" }],
  },
  {
    id: 6,
    label: "Filter by Private/Public",
    name: "bq_organization_is_public",
    text: "Filter by Private/Public",
    options: [
      { value: "", title: "See All" },
      { value: "0", title: "Public" },
      { value: "1", title: "Private" },
    ],
  },
];

export const DomainFilters = [
  {
    id: 1,
    label: "Filter by Organization Structure",
    name: "bq_organization_structure",
    text: "Filter by Organization Structure",
    options: [
      { value: "", title: "See All " },
      {
        value: "Multi-entity U.S. organization",
        title: "Multi-entity U.S. organization",
      },
      {
        value: "Single-entity organization",
        title: "Single-entity organization",
      },
    ],
  },
  {
    id: 2,
    label: "Filter by Type of Employer",
    name: "bq_organization_company_type",
    text: "Filter by Type of Employer",
    options: [
      { value: "", title: "See All" },
      { value: "Employer", title: "Employer" },
      { value: "Sole Proprietor", title: "Holding Company" },
    ],
  },
  {
    id: 3,
    label: "Filter by Legal Entity Type ",
    name: "bq_legal_entity_parent_status",
    text: "Filter by Legal Entity Type ",
    options: [
      { value: "", title: "See All" },
      { value: "Child", title: "Child" },
      { value: "Ultimate Parent", title: "Ultimate Parent" },
    ],
  },
  {
    id: 4,
    label: "Filter by States",
    name: "bq_organization_address1_state",
    text: "Filter by States",
    options: [{ value: "", title: "See All" }, ...stateList],
  },
  {
    id: 5,
    label: "Filter by Active Status",
    name: "bq_organization_isactive",
    text: "Filter by Active Status",
    options: [
      { value: "", title: "See All" },
      { value: "0", title: "Active" },
      { value: "1", title: "Inactive" },
    ],
  },
  {
    id: 6,
    label: "Filter by NAICS Sector",
    name: "bq_organization_naics_sector_name",
    text: "Filter by NAICS Sector",
    options: [{ value: "", title: "See All" }],
  },
  {
    id: 7,
    label: "Filter by Private/Public",
    name: "bq_organization_is_public",
    text: "Filter by Private/Public",
    options: [
      { value: "", title: "See All" },
      { value: "0", title: "Public" },
      { value: "1", title: "Private" },
    ],
  },
];

export const OfficerFilter = [
  {
    id: 1,
    label: "Location State",
    name: "bq_organization_structure",
    text: "Filter by Org Structure",
    options: [
      { value: "", title: "See All " },
      {
        value: "Multi-entity U.S. organization",
        title: "Multi-entity U.S. organization",
      },
      {
        value: "Single-entity organization",
        title: "Single-entity organization",
      },
    ],
  },
  {
    id: 2,
    label: "Company Type",
    name: "bq_organization_company_type",
    text: "Filter by Type of Employer",
    options: [
      { value: "", title: "See All" },
      { value: "Employer", title: "Employer" },
      { value: "Holding Company", title: "Holding Company" },
      { value: "Sole Proprietor", title: "Sole Proprietor" },
    ],
  },
  {
    id: 3,
    label: "Legal Entity Type",
    name: "bq_legal_entity_parent_status",
    text: "Filter by Legal Entity Type",
    options: [
      { value: "", title: "See All" },
      { value: "Child", title: "Child" },
      { value: "Ultimate Parent", title: "Ultimate Parent" },
    ],
  },
  {
    id: 4,
    label: "HQ State",
    name: "bq_organization_address1_state_name",
    text: "Filter by HQ State",
    type: "multi",
  },
  {
    id: 159,
    label: "Location Metro",
    name: "bq_organization_address1_cbsa_name",
    type: "multi",
    text: "Filter by Metro",
    // options: Metro,
  },
  {
    id: 1590,
    label: "State of Incorporation",
    name: "bq_organization_jurisdiction_code",
    type: "multi",
    text: "Filter by State of Incorporation",
    if: "officer",
    options: jcode,
  },
  {
    id: 5,
    label: "Status",
    name: "bq_organization_isactive",
    text: "Filter by Organization Status",
    options: [
      { value: "", title: "See All" },
      { value: "true", title: "Active" },
      { value: "false", title: "Inactive" },
    ],
  },
  {
    id: 31,
    label: "IRS Sector",
    text: "Filter by IRS Sector",
    type: "multi",
    name: "bq_organization_sector_name",
  },
  {
    id: 41,
    label: "IRS Sub Sector",
    text: "Filter by IRS Sub Sector",
    name: "bq_organization_subsector_name",
    type: "multi",
  },
  {
    id: 51,
    label: "IRS Industry Name",
    text: "Filter by IRS Industry Name",
    type: "multi",
    name: "bq_organization_irs_industry_name",
    options: IndustryName,
  },

  {
    id: 6,
    label: "NAICS Sector",
    name: "bq_organization_naics_sector_name",
    text: "Filter by NAICS Sector",
    type: "multi",
    options: [
      {
        value: "Accommodation and Food Services",
        title: "Accommodation and Food Services",
      },
      {
        value:
          "Administrative and Support and Waste Management and Remediation Services",
        title:
          "Administrative and Support and Waste Management and Remediation Services",
      },
      {
        value: "Agriculture, Forestry, Fishing and Hunting",
        title: "Agriculture, Forestry, Fishing and Hunting",
      },
      {
        value: "Arts, Entertainment, and Recreation",
        title: "Arts, Entertainment, and Recreation",
      },
      { value: "Construction", title: "Construction" },
      { value: "Educational Services", title: "Educational Services" },
      { value: "Finance and Insurance", title: "Finance and Insurance" },
      {
        value: "Governmental Instrumentality or Agency",
        title: "Governmental Instrumentality or Agency",
      },
      {
        value: "Health Care and Social Assistance",
        title: "Health Care and Social Assistance",
      },
      { value: "Information", title: "Information" },
      {
        value: "Management of Companies (Holding Companies)",
        title: "Management of Companies (Holding Companies)",
      },
      { value: "Manufacturing", title: "Manufacturing" },
      { value: "Mining", title: "Mining" },
      {
        value: "Mining, Quarrying, and Oil and Gas Extraction",
        title: "Mining, Quarrying, and Oil and Gas Extraction",
      },
      { value: "Other Services", title: "Other Services" },
      {
        value: "Other Services (except Public Administration)",
        title: "Other Services (except Public Administration)",
      },
      {
        value: "Professional, Scientific, and Technical Services",
        title: "Professional, Scientific, and Technical Services",
      },
      {
        value: "Real Estate and Rental and Leasing",
        title: "Real Estate and Rental and Leasing",
      },
      { value: "Retail Trade", title: "Retail Trade" },
      {
        value: "Transportation and Warehousing",
        title: "Transportation and Warehousing",
      },
      { value: "Utilities", title: "Utilities" },
      { value: "Wholesale Trade", title: "Wholesale Trade" },
      {
        value: "Management of Companies and Enterprises",
        title: "Management of Companies and Enterprises",
      },
      { value: "None", title: "None" },
    ],
  },
  {
    id: 600,
    label: "NAICS Industry Name",
    name: "bq_organization_naics_name",
    text: "Filter by NAICS Industry Name",
    type: "multi",
    options: NaicsindustryNames,
  },
  {
    id: 7,
    label: "Public or Private",
    name: "bq_organization_is_public",
    text: "Filter by Private/Public",
    options: [
      { value: "", title: "See All" },
      { value: true, title: "Public" },
      { value: false, title: "Private" },
    ],
  },
  {
    id: 8,
    label: "Revenue Range",
    name: "bq_revenue_mr",
    text: "Filter by Revenue Range",
    type: "multi",
    options: [
      { value: [">0", "<1000001"], title: "$0 - $1M" },
      { value: [">1000001", "<5000001"], title: "$1M - $5M" },
      { value: [">5000001", "<10000001"], title: "$5M - $10M" },
      { value: [">10000001", "<25000001"], title: "$10M - $25M" },
      { value: [">25000001", "<50000001"], title: "$25M - $50M" },
      { value: [">50000001", "<100000001"], title: "$50M - $100M" },
      { value: [">100000001", "<250000001"], title: "$100M - $250M" },
      { value: [">250000001", "<500000001"], title: "$250M - $500M" },
      { value: [">500000001", "<1000000001"], title: "$500M - $1B" },
      { value: [">1000000001"], title: "$1B+" },
    ],
  },
  {
    id: 12,
    label: "Headcount Range",
    name: "bq_current_employees_plan_mr",
    text: "Filter by Headcount Range",
    type: "multi",

    options: [
      { value: [">0", "<5"], title: "1-4" },
      { value: [">4", "<10"], title: "5-9" },
      { value: [">9", "<20"], title: "10-19" },
      { value: [">19", "<50"], title: "20-49" },
      { value: [">49", "<100"], title: "50-99" },
      { value: [">99", "<250"], title: "100-249" },
      { value: [">249", "<500"], title: "250-499" },
      { value: [">500"], title: "500+" },
    ],
  },
];

export const terminalFilter = [
  {
    id: 1,
    label: "Location State",
    name: "bq_organization_structure",
    text: "Filter by Org Structure",
    options: [
      { value: "", title: "See All " },
      {
        value: "Multi-entity U.S. organization",
        title: "Multi-entity U.S. organization",
      },
      {
        value: "Single-entity organization",
        title: "Single-entity organization",
      },
    ],
  },
  {
    id: 2,
    label: "Company Type",
    name: "bq_organization_company_type",
    text: "Filter by Type of Employer",
    options: [
      { value: "", title: "See All" },
      { value: "Employer", title: "Employer" },
      { value: "Holding Company", title: "Holding Company" },
      { value: "Sole Proprietor", title: "Sole Proprietor" },
    ],
  },
  {
    id: 3,
    label: "Legal Entity Type",
    name: "bq_legal_entity_parent_status",
    text: "Filter by Legal Entity Type",
    options: [
      { value: "", title: "See All" },
      { value: "Child", title: "Child" },
      { value: "Ultimate Parent", title: "Ultimate Parent" },
    ],
  },
  {
    id: 4,
    label: "HQ State",
    name: "bq_organization_address1_state_name",
    text: "Filter by HQ State",
    type: "multi",
    // options: [...stateList],
    // options: [...newState],
  },
  {
    id: 159,
    label: "Location Metro",
    name: "bq_organization_address1_cbsa_name",
    type: "multi",
    text: "Filter by Metro",
    // options: Metro,
  },
  {
    id: 5,
    label: "Status",
    name: "bq_organization_isactive",
    text: "Filter by Organization Status",
    options: [
      { value: "", title: "See All" },
      { value: "true", title: "Active" },
      { value: "false", title: "Inactive" },
    ],
  },
  {
    id: 31,
    label: "IRS Sector",
    text: "Filter by IRS Sector",
    type: "multi",
    name: "bq_organization_sector_name",
    // options: [
    //   // { value: '', title: 'IRS Sector' },
    //   {
    //     value: "Accommodation and Food Services",
    //     title: "Accommodation and Food Services",
    //   },
    //   {
    //     value:
    //       "Administrative and Support and Waste Management and Remediation Services",
    //     title:
    //       "Administrative and Support and Waste Management and Remediation Services",
    //   },
    //   {
    //     value: "Agriculture, Forestry, Fishing and Hunting",
    //     title: "Agriculture, Forestry, Fishing and Hunting",
    //   },
    //   {
    //     value: "Arts, Entertainment, and Recreation",
    //     title: "Arts, Entertainment, and Recreation",
    //   },
    //   { value: "Construction", title: "Construction" },
    //   { value: "Educational Services", title: "Educational Services" },
    //   { value: "Finance and Insurance", title: "Finance and Insurance" },
    //   {
    //     value: "Health Care and Social Assistance",
    //     title: "Health Care and Social Assistance",
    //   },
    //   { value: "Information", title: "Information" },
    //   {
    //     value: "Management of Companies (Holding Companies)",
    //     title: "Management of Companies (Holding Companies)",
    //   },
    //   { value: "Manufacturing", title: "Manufacturing" },
    //   { value: "Mining", title: "Mining" },
    //   { value: "Other Services", title: "Other Services" },
    //   {
    //     value: "Professional, Scientific, and Technical Services",
    //     title: "Professional, Scientific, and Technical Services",
    //   },
    //   {
    //     value: "Real Estate and Rental and Leasing",
    //     title: "Real Estate and Rental and Leasing",
    //   },
    //   {
    //     value: "Transportation and Warehousing",
    //     title: "Transportation and Warehousing",
    //   },
    //   { value: "Utilities", title: "Utilities" },
    //   { value: "Wholesale Trade", title: "Wholesale Trade" },
    // ],
  },
  {
    id: 41,
    label: "IRS Sub Sector",
    text: "Filter by IRS Sub Sector",
    name: "bq_organization_subsector_name",
    type: "multi",
    // options: [
    //   // { value: '', title: 'IRS Sub Sector' },
    //   { value: "Accommodation", title: "Accommodation" },
    //   {
    //     value: "Accounting, Tax Preparation, Bookkeeping, and Payroll Services",
    //     title: "Accounting, Tax Preparation, Bookkeeping, and Payroll Services",
    //   },
    //   {
    //     value: "Activities Related to Credit Intermediation",
    //     title: "Activities Related to Credit Intermediation",
    //   },
    //   {
    //     value: "Administrative and Support Services",
    //     title: "Administrative and Support Services",
    //   },
    //   {
    //     value: "Air, Rail, and Water Transportation",
    //     title: "Air, Rail, and Water Transportation",
    //   },
    //   {
    //     value: "Amusement, Gambling, and Recreation Industries",
    //     title: "Amusement, Gambling, and Recreation Industries",
    //   },
    //   { value: "Animal Production", title: "Animal Production" },
    //   { value: "Apparel Manufacturing", title: "Apparel Manufacturing" },
    //   {
    //     value: "Architectural, Engineering, and Related Services",
    //     title: "Architectural, Engineering, and Related Services",
    //   },
    //   {
    //     value: "Beverage and Tobacco Product Manufacturing",
    //     title: "Beverage and Tobacco Product Manufacturing",
    //   },
    //   {
    //     value: "Broadcasting (except Internet)",
    //     title: "Broadcasting (except Internet)",
    //   },
    //   {
    //     value: "Building Material and Garden Equipment and Supplies Dealers",
    //     title: "Building Material and Garden Equipment and Supplies Dealers",
    //   },
    //   { value: "Chemical Manufacturing", title: "Chemical Manufacturing" },
    //   {
    //     value: "Clothing and Clothing Accessories Stores",
    //     title: "Clothing and Clothing Accessories Stores",
    //   },
    //   {
    //     value: "Computer and Electronic Product Manufacturing",
    //     title: "Computer and Electronic Product Manufacturing",
    //   },
    //   {
    //     value: "Computer Systems Design and Related Services",
    //     title: "Computer Systems Design and Related Services",
    //   },
    //   {
    //     value: "Construction of Buildings",
    //     title: "Construction of Buildings",
    //   },
    //   {
    //     value: "Couriers and Messengers",
    //     title: "Couriers and Messengers",
    //   },
    //   { value: "Crop Production", title: "Crop Production" },
    //   {
    //     value: "Data Processing Services",
    //     title: "Data Processing Services",
    //   },
    //   {
    //     value: "Depository Credit Intermediation",
    //     title: "Depository Credit Intermediation",
    //   },
    //   { value: "Educational Services", title: "Educational Services" },
    //   {
    //     value: "Electrical Equipment, Appliance, and Component Manufacturing",
    //     title: "Electrical Equipment, Appliance, and Component Manufacturing",
    //   },
    //   {
    //     value: "Electronics and Appliance Stores",
    //     title: "Electronics and Appliance Stores",
    //   },
    //   {
    //     value: "Fabricated Metal Product Manufacturing",
    //     title: "Fabricated Metal Product Manufacturing",
    //   },
    //   {
    //     value: "Fishing, Hunting and Trapping",
    //     title: "Fishing, Hunting and Trapping",
    //   },
    //   {
    //     value: "Food and Beverage Stores",
    //     title: "Food and Beverage Stores",
    //   },
    //   { value: "Food Manufacturing", title: "Food Manufacturing" },
    //   {
    //     value: "Food Services and Drinking Places",
    //     title: "Food Services and Drinking Places",
    //   },
    //   { value: "Forestry and Logging", title: "Forestry and Logging" },
    //   {
    //     value: "Funds, Trusts, and Other Financial Vehicles",
    //     title: "Funds, Trusts, and Other Financial Vehicles",
    //   },
    //   {
    //     value: "Furniture and Home Furnishings Stores",
    //     title: "Furniture and Home Furnishings Stores",
    //   },
    //   {
    //     value: "Furniture and Related Product Manufacturing",
    //     title: "Furniture and Related Product Manufacturing",
    //   },
    //   { value: "Gasoline Stations", title: "Gasoline Stations" },
    //   {
    //     value: "General Merchandise Stores; ",
    //     title: "General Merchandise Stores; ",
    //   },
    //   {
    //     value: "Health and Personal Care Stores",
    //     title: "Health and Personal Care Stores",
    //   },
    //   {
    //     value: "Heavy and Civil Engineering Construction",
    //     title: "Heavy and Civil Engineering Construction",
    //   },
    //   {
    //     value: "Home Health Care Services",
    //     title: "Home Health Care Services",
    //   },
    //   { value: "Hospital", title: "Hospital" },
    //   {
    //     value: "Insurance Carriers and Related Activities",
    //     title: "Insurance Carriers and Related Activities",
    //   },
    //   {
    //     value: "Leather and Allied Product Manufacturing",
    //     title: "Leather and Allied Product Manufacturing",
    //   },
    //   { value: "Legal Services", title: "Legal Services" },
    //   {
    //     value:
    //       "Lessors of Nonfinancial Intangible Assets (except copyrighted works)",
    //     title:
    //       "Lessors of Nonfinancial Intangible Assets (except copyrighted works)",
    //   },
    //   {
    //     value: "Machinery Manufacturing",
    //     title: "Machinery Manufacturing",
    //   },
    //   {
    //     value: "Management of Companies (Holding Companies)",
    //     title: "Management of Companies (Holding Companies)",
    //   },
    //   {
    //     value: "Medical and Diagnostic Laboratories",
    //     title: "Medical and Diagnostic Laboratories",
    //   },
    //   {
    //     value: "Merchant Wholesalers, Durable Goods",
    //     title: "Merchant Wholesalers, Durable Goods",
    //   },
    //   {
    //     value: "Merchant Wholesalers, Nondurable Goods",
    //     title: "Merchant Wholesalers, Nondurable Goods",
    //   },
    //   { value: "Mining", title: "Mining" },
    //   {
    //     value: "Miscellaneous Manufacturing",
    //     title: "Miscellaneous Manufacturing",
    //   },
    //   {
    //     value: "Miscellaneous Store Retailers",
    //     title: "Miscellaneous Store Retailers",
    //   },
    //   {
    //     value: "Motion Picture and Sound Recording Industries",
    //     title: "Motion Picture and Sound Recording Industries",
    //   },
    //   {
    //     value: "Motor Vehicle and Parts Dealers",
    //     title: "Motor Vehicle and Parts Dealers",
    //   },
    //   {
    //     value: "Museums, Historical Sites, and Similar Institutions",
    //     title: "Museums, Historical Sites, and Similar Institutions",
    //   },
    //   { value: "No Classification", title: "No Classification" },
    //   {
    //     value: "Nondepository Credit Intermediation",
    //     title: "Nondepository Credit Intermediation",
    //   },
    //   {
    //     value: "Nonmetallic Mineral Product Manufacturing",
    //     title: "Nonmetallic Mineral Product Manufacturing",
    //   },
    //   { value: "Nonstore Retailers", title: "Nonstore Retailers" },
    //   {
    //     value: "Nursing and Residential Care Facilities",
    //     title: "Nursing and Residential Care Facilities",
    //   },
    //   {
    //     value: "Offices of Other Health Practitioners",
    //     title: "Offices of Other Health Practitioners",
    //   },
    //   {
    //     value: "Offices of Physicians and Dentists",
    //     title: "Offices of Physicians and Dentists",
    //   },
    //   {
    //     value: "Other Ambulatory Health Care Services",
    //     title: "Other Ambulatory Health Care Services",
    //   },
    //   {
    //     value: "Other Information Services",
    //     title: "Other Information Services",
    //   },
    //   {
    //     value: "Other Professional, Scientific, and Technical Services",
    //     title: "Other Professional, Scientific, and Technical Services",
    //   },
    //   {
    //     value: "Outpatient Care Centers",
    //     title: "Outpatient Care Centers",
    //   },
    //   { value: "Paper Manufacturing", title: "Paper Manufacturing" },
    //   {
    //     value: "Performing Arts, Spectator Sports, and Related Industries",
    //     title: "Performing Arts, Spectator Sports, and Related Industries",
    //   },
    //   {
    //     value: "Personal and Laundry Services",
    //     title: "Personal and Laundry Services",
    //   },
    //   {
    //     value: "Petroleum and Coal Products Manufacturing",
    //     title: "Petroleum and Coal Products Manufacturing",
    //   },
    //   {
    //     value: "Pipeline Transportation",
    //     title: "Pipeline Transportation",
    //   },
    //   {
    //     value: "Plastics and Rubber Products Manufacturing",
    //     title: "Plastics and Rubber Products Manufacturing",
    //   },
    //   {
    //     value: "Primary Metal Manufacturing",
    //     title: "Primary Metal Manufacturing",
    //   },
    //   {
    //     value: "Printing and Related Support Activities",
    //     title: "Printing and Related Support Activities",
    //   },
    //   { value: "Public Administration", title: "Public Administration" },
    //   {
    //     value: "Publishing Industries (except Internet)",
    //     title: "Publishing Industries (except Internet)",
    //   },
    //   { value: "Real Estate", title: "Real Estate" },
    //   {
    //     value:
    //       "Religious, Grantmaking, Civic, Professional, and Similar Organizations",
    //     title:
    //       "Religious, Grantmaking, Civic, Professional, and Similar Organizations",
    //   },
    //   {
    //     value: "Rental and Leasing Services",
    //     title: "Rental and Leasing Services",
    //   },
    //   { value: "Repair and Maintenance", title: "Repair and Maintenance" },
    //   {
    //     value: "Scenic & Sightseeing Transportation",
    //     title: "Scenic & Sightseeing Transportation",
    //   },
    //   {
    //     value:
    //       "Securities, Commodity Contracts, and Other Financial Investments and Related Activities",
    //     title:
    //       "Securities, Commodity Contracts, and Other Financial Investments and Related Activities",
    //   },
    //   { value: "Social Assistance", title: "Social Assistance" },
    //   {
    //     value: "Specialized Design Services",
    //     title: "Specialized Design Services",
    //   },
    //   {
    //     value: "Specialty Trade Contractors",
    //     title: "Specialty Trade Contractors",
    //   },
    //   {
    //     value: "Sporting Goods, Hobby, Book, and Music Stores",
    //     title: "Sporting Goods, Hobby, Book, and Music Stores",
    //   },
    //   {
    //     value: "Support Activities for Agriculture and Forestry",
    //     title: "Support Activities for Agriculture and Forestry",
    //   },
    //   {
    //     value: "Support Activities for Transportation",
    //     title: "Support Activities for Transportation",
    //   },
    //   { value: "Telecommunications", title: "Telecommunications" },
    //   {
    //     value: "Textile Mills and Textile Product Mills",
    //     title: "Textile Mills and Textile Product Mills",
    //   },
    //   {
    //     value: "Transit and Ground Passenger Transportation",
    //     title: "Transit and Ground Passenger Transportation",
    //   },
    //   {
    //     value: "Transportation Equipment Manufacturing",
    //     title: "Transportation Equipment Manufacturing",
    //   },
    //   { value: "Truck Transportation", title: "Truck Transportation" },
    //   { value: "Utilities", title: "Utilities" },
    //   {
    //     value: "Warehousing and Storage",
    //     title: "Warehousing and Storage",
    //   },
    //   {
    //     value: "Waste Management and Remediation Services",
    //     title: "Waste Management and Remediation Services",
    //   },
    //   {
    //     value: "Wholesale Electronic Markets and Agents and Brokers",
    //     title: "Wholesale Electronic Markets and Agents and Brokers",
    //   },
    //   {
    //     value: "Wood Product Manufacturing",
    //     title: "Wood Product Manufacturing",
    //   },
    // ],
  },
  {
    id: 51,
    label: "IRS Industry Name",
    text: "Filter by IRS Industry Name",
    type: "multi",
    name: "bq_organization_irs_industry_name",
    options: IndustryName,
  },

  {
    id: 6,
    label: "NAICS Sector",
    name: "bq_organization_naics_sector_name",
    text: "Filter by NAICS Sector",
    type: "multi",
    options: [
      {
        value: "Accommodation and Food Services",
        title: "Accommodation and Food Services",
      },
      {
        value:
          "Administrative and Support and Waste Management and Remediation Services",
        title:
          "Administrative and Support and Waste Management and Remediation Services",
      },
      {
        value: "Agriculture, Forestry, Fishing and Hunting",
        title: "Agriculture, Forestry, Fishing and Hunting",
      },
      {
        value: "Arts, Entertainment, and Recreation",
        title: "Arts, Entertainment, and Recreation",
      },
      { value: "Construction", title: "Construction" },
      { value: "Educational Services", title: "Educational Services" },
      { value: "Finance and Insurance", title: "Finance and Insurance" },
      {
        value: "Governmental Instrumentality or Agency",
        title: "Governmental Instrumentality or Agency",
      },
      {
        value: "Health Care and Social Assistance",
        title: "Health Care and Social Assistance",
      },
      { value: "Information", title: "Information" },
      {
        value: "Management of Companies (Holding Companies)",
        title: "Management of Companies (Holding Companies)",
      },
      { value: "Manufacturing", title: "Manufacturing" },
      { value: "Mining", title: "Mining" },
      {
        value: "Mining, Quarrying, and Oil and Gas Extraction",
        title: "Mining, Quarrying, and Oil and Gas Extraction",
      },
      { value: "Other Services", title: "Other Services" },
      {
        value: "Other Services (except Public Administration)",
        title: "Other Services (except Public Administration)",
      },
      {
        value: "Professional, Scientific, and Technical Services",
        title: "Professional, Scientific, and Technical Services",
      },
      {
        value: "Real Estate and Rental and Leasing",
        title: "Real Estate and Rental and Leasing",
      },
      { value: "Retail Trade", title: "Retail Trade" },
      {
        value: "Transportation and Warehousing",
        title: "Transportation and Warehousing",
      },
      { value: "Utilities", title: "Utilities" },
      { value: "Wholesale Trade", title: "Wholesale Trade" },
      {
        value: "Management of Companies and Enterprises",
        title: "Management of Companies and Enterprises",
      },
      { value: "None", title: "None" },
    ],
  },
  {
    id: 600,
    label: "NAICS Industry Name",
    name: "bq_organization_naics_name",
    text: "Filter by NAICS Industry Name",
    type: "multi",
    options: NaicsindustryNames,
  },
  {
    id: 7,
    label: "Public or Private",
    name: "bq_organization_is_public",
    text: "Filter by Private/Public",
    options: [
      { value: "", title: "See All" },
      { value: true, title: "Public" },
      { value: false, title: "Private" },
    ],
  },
  {
    id: 8,
    label: "Revenue Range",
    name: "bq_revenue_mr",
    text: "Filter by Revenue Range",
    type: "multi",
    options: [
      { value: [">0", "<1000001"], title: "$0 - $1M" },
      { value: [">1000001", "<5000001"], title: "$1M - $5M" },
      { value: [">5000001", "<10000001"], title: "$5M - $10M" },
      { value: [">10000001", "<25000001"], title: "$10M - $25M" },
      { value: [">25000001", "<50000001"], title: "$25M - $50M" },
      { value: [">50000001", "<100000001"], title: "$50M - $100M" },
      { value: [">100000001", "<250000001"], title: "$100M - $250M" },
      { value: [">250000001", "<500000001"], title: "$250M - $500M" },
      { value: [">500000001", "<1000000001"], title: "$500M - $1B" },
      { value: [">1000000001"], title: "$1B+" },
    ],
  },
  {
    id: 12,
    label: "Headcount Range",
    name: "bq_current_employees_plan_mr",
    text: "Filter by Headcount Range",
    type: "multi",

    options: [
      { value: [">0", "<5"], title: "1-4" },
      { value: [">4", "<10"], title: "5-9" },
      { value: [">9", "<20"], title: "10-19" },
      { value: [">19", "<50"], title: "20-49" },
      { value: [">49", "<100"], title: "50-99" },
      { value: [">99", "<250"], title: "100-249" },
      { value: [">249", "<500"], title: "250-499" },
      { value: [">500"], title: "500+" },
    ],
  },
];

export const LocationTabFilters = [
  {
    id: 1,
    label: "Location State",
    name: "bq_organization_structure",
    text: "Filter by Org Structure",
    options: [
      { value: "", title: "See All " },
      {
        value: "Multi-entity U.S. organization",
        title: "Multi-entity U.S. organization",
      },
      {
        value: "Single-entity organization",
        title: "Single-entity organization",
      },
    ],
  },
  {
    id: 2,
    label: "Company Type",
    name: "bq_organization_company_type",
    text: "Filter by Type of Employer",
    options: [
      { value: "", title: "See All" },
      { value: "Employer", title: "Employer" },
      { value: "Holding Company", title: "Holding Company" },
      { value: "Sole Proprietor", title: "Sole Proprietor" },
    ],
  },
  {
    id: 3,
    label: "Legal Entity Type",
    name: "bq_legal_entity_parent_status",
    text: "Filter by Legal Entity Type",
    type: "disable",
    options: [
      { value: "", title: "See All" },
      { value: "Child", title: "Child" },
      { value: "Ultimate Parent", title: "Ultimate Parent" },
    ],
  },
  {
    id: 4,
    label: "HQ State",
    name: "bq_organization_address1_state_name",
    text: "Filter by HQ State",
    type: "multi",
  },
  {
    id: 159,
    label: "Location Metro",
    name: "bq_organization_address1_cbsa_name",
    type: "multi",
    text: "Filter by Metro",
    // options: Metro,
  },
  {
    id: 12324,
    label: "Location State",
    name: "bq_location_address_state_name",
    text: "Filter by Location State",
    options: bq_location_address_state_name,
    type: "multi",
  },
  {
    id: 2222,
    label: "Location County",
    name: "bq_location_address_county_name",
    text: "Filter by Location County",
    options: bq_location_address_county_name,
    type: "multi",
  },
  {
    id: 32222,
    label: "CBSA Name",
    name: "bq_location_address_cbsa_name",
    text: "Filter by Location CBSA Name",
    options: bq_location_address_cbsa_name,
    type: "multi",
  },
  {
    id: 42443,
    label: "Location Class",
    name: "bq_location_type",
    text: "Filter by Location Class",
    options: bq_location_type,
    type: "multi",
  },

  {
    id: 1590,
    label: "State of Incorporation",
    name: "bq_organization_jurisdiction_code",
    type: "multi",
    text: "Filter by State of Incorporation",
    if: "officer",
    options: jcode,
  },
  {
    id: 5,
    label: "Status",
    name: "bq_organization_isactive",
    text: "Filter by Organization Status",
    options: [
      { value: "", title: "See All" },
      { value: "true", title: "Active" },
      { value: "false", title: "Inactive" },
    ],
  },
  {
    id: 31,
    label: "IRS Sector",
    text: "Filter by IRS Sector",
    type: "multi",
    name: "bq_organization_sector_name",
  },
  {
    id: 41,
    label: "IRS Sub Sector",
    text: "Filter by IRS Sub Sector",
    name: "bq_organization_subsector_name",
    type: "multi",
  },
  {
    id: 51,
    label: "IRS Industry Name",
    text: "Filter by IRS Industry Name",
    type: "multi",
    name: "bq_organization_irs_industry_name",
    options: IndustryName,
  },

  {
    id: 6,
    label: "NAICS Sector",
    name: "bq_organization_naics_sector_name",
    text: "Filter by NAICS Sector",
    type: "multi",
    options: [
      {
        value: "Accommodation and Food Services",
        title: "Accommodation and Food Services",
      },
      {
        value:
          "Administrative and Support and Waste Management and Remediation Services",
        title:
          "Administrative and Support and Waste Management and Remediation Services",
      },
      {
        value: "Agriculture, Forestry, Fishing and Hunting",
        title: "Agriculture, Forestry, Fishing and Hunting",
      },
      {
        value: "Arts, Entertainment, and Recreation",
        title: "Arts, Entertainment, and Recreation",
      },
      { value: "Construction", title: "Construction" },
      { value: "Educational Services", title: "Educational Services" },
      { value: "Finance and Insurance", title: "Finance and Insurance" },
      {
        value: "Governmental Instrumentality or Agency",
        title: "Governmental Instrumentality or Agency",
      },
      {
        value: "Health Care and Social Assistance",
        title: "Health Care and Social Assistance",
      },
      { value: "Information", title: "Information" },
      {
        value: "Management of Companies (Holding Companies)",
        title: "Management of Companies (Holding Companies)",
      },
      { value: "Manufacturing", title: "Manufacturing" },
      { value: "Mining", title: "Mining" },
      {
        value: "Mining, Quarrying, and Oil and Gas Extraction",
        title: "Mining, Quarrying, and Oil and Gas Extraction",
      },
      { value: "Other Services", title: "Other Services" },
      {
        value: "Other Services (except Public Administration)",
        title: "Other Services (except Public Administration)",
      },
      {
        value: "Professional, Scientific, and Technical Services",
        title: "Professional, Scientific, and Technical Services",
      },
      {
        value: "Real Estate and Rental and Leasing",
        title: "Real Estate and Rental and Leasing",
      },
      { value: "Retail Trade", title: "Retail Trade" },
      {
        value: "Transportation and Warehousing",
        title: "Transportation and Warehousing",
      },
      { value: "Utilities", title: "Utilities" },
      { value: "Wholesale Trade", title: "Wholesale Trade" },
      {
        value: "Management of Companies and Enterprises",
        title: "Management of Companies and Enterprises",
      },
      { value: "None", title: "None" },
    ],
  },
  {
    id: 600,
    label: "NAICS Industry Name",
    name: "bq_organization_naics_name",
    text: "Filter by NAICS Industry Name",
    type: "multi",
    options: NaicsindustryNames,
  },
  {
    id: 7,
    label: "Public or Private",
    name: "bq_organization_is_public",
    text: "Filter by Private/Public",
    options: [
      { value: "", title: "See All" },
      { value: true, title: "Public" },
      { value: false, title: "Private" },
    ],
  },
  {
    id: 8,
    label: "Revenue Range",
    name: "bq_revenue_mr",
    text: "Filter by Revenue Range",
    type: "multi",
    options: [
      { value: [">0", "<1000001"], title: "$0 - $1M" },
      { value: [">1000001", "<5000001"], title: "$1M - $5M" },
      { value: [">5000001", "<10000001"], title: "$5M - $10M" },
      { value: [">10000001", "<25000001"], title: "$10M - $25M" },
      { value: [">25000001", "<50000001"], title: "$25M - $50M" },
      { value: [">50000001", "<100000001"], title: "$50M - $100M" },
      { value: [">100000001", "<250000001"], title: "$100M - $250M" },
      { value: [">250000001", "<500000001"], title: "$250M - $500M" },
      { value: [">500000001", "<1000000001"], title: "$500M - $1B" },
      { value: [">1000000001"], title: "$1B+" },
    ],
  },
  {
    id: 12,
    label: "Headcount Range",
    name: "bq_current_employees_plan_mr",
    text: "Filter by Headcount Range",
    type: "multi",

    options: [
      { value: [">0", "<5"], title: "1-4" },
      { value: [">4", "<10"], title: "5-9" },
      { value: [">9", "<20"], title: "10-19" },
      { value: [">19", "<50"], title: "20-49" },
      { value: [">49", "<100"], title: "50-99" },
      { value: [">99", "<250"], title: "100-249" },
      { value: [">249", "<500"], title: "250-499" },
      { value: [">500"], title: "500+" },
    ],
  },
];
