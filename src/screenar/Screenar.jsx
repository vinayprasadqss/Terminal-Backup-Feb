import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "../assets/scss/screenar.scss"
import ScreenarCard from './ScreenarCard';
import { checkSession, createBucket, fetchScreenarRecord, fetchScreenarSidebar, getBucket } from '../Aws/Aws-api';
import { OfficerFilter } from '../constants/DummyConstants';
import ScreenarCard2 from './ScreenarCard2';
import { useDispatch, useSelector } from 'react-redux';
import ResponsivePagination from "react-responsive-pagination";
import millify from 'millify';
import {
    CbsaName, CityNames, ZipCodes, activeorinactive, companyType,
    irsIndustry, irsSector, irsSubSector, naicsIndustry,
    naicssector, orgstructure, publicorprivate, revenueRange,
} from '../constants/screenConstants';
import { Checkbox, Tooltip } from 'antd';
import img2 from "../assets/images/no.svg";
import img3 from "../assets/images/spin.gif"
import { Resizable } from "re-resizable";
import { MAXLIMITERROR } from '../constants/Tooltip';
import ScreenerCard3 from './ScreenerCard3';
import SideBar from './SideBar';
import { newState } from '../constants/DynamiCFilters';
import IRSScreenarCard from './IRSScreenCard';
import NAICSScreenCard from './NAICSScreenCard';
import { screenstates } from '../utils/state_filter';
import ScreenarCard4 from './ScreenCard4';
import swal from 'sweetalert';
import BucketPop from './BucketPop';
import BalanceHead from './table_components/BalanceHead';
import BalanceBody from './table_components/BalanceBody';
import NormalHead from './table_components/NormalHead';
import NormalBody from './table_components/NormalBody';
import GrowthRangeBody from './table_components/GrowthRangeBody';
import GrowthHead from './table_components/GrowthHead';
import Header from '../components2/controls/Header';
import { LoadingOutlined } from "@ant-design/icons";
import bucketimg from "../assets/images/bucket.png"


const Screenar = () => {
    const { user } = useSelector(state => state.user)
    const [query, setQuery] = useState("");
    const [state, setState] = useState([]);
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false);
    const [floading, setFloading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0)
    const [filters, setFilters] = useState(screenstates);
    const [sidebar, setSidebar] = useState()
    const [flag, setFlag] = useState(false);
    const [All, setAll] = useState(false);
    const [checks, setChecks] = useState([]);
    const [unChecks, setUnchecks] = useState([]);
    const [msgFlag, setMsgFlag] = useState(false)
    const [isAsc, setIsAsc] = useState("False");
    const [orderBy, setOrderBy] = useState("");
    const [field, setField] = useState("");
    const [trigger, setTrigger] = useState(false);
    const [bucketOpen, setBucketOpen] = useState(false);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [bucketLoading, setBucketLoading] = useState(false);
    const [bucketCount, setBucketCount] = useState(0);
    const [bucketCountLoading, setBucketCountLoading] = useState(false)







    const webcheck = (d) => {
        if (d?.fields?.bq_organization_website?.startsWith("http://www.")) {
            return d?.fields?.bq_organization_website;
        } else if (
            d?.fields?.bq_organization_website?.startsWith("https://www.")
        ) {
            return d?.fields?.bq_organization_website;
        } else if (d?.fields?.bq_organization_website?.startsWith("http://")) {
            return d?.fields?.bq_organization_website?.replace(
                "http://",
                "http://www."
            );
        } else if (d?.fields?.bq_organization_website?.startsWith("https://")) {
            return d?.fields?.bq_organization_website?.replace(
                "https://",
                "https://www."
            );
        } else if (d?.fields?.bq_organization_website?.startsWith("www.")) {
            return d?.fields?.bq_organization_website?.replace(
                "www.",
                "https://www."
            );
        } else if (d?.fields?.bq_organization_website?.startsWith("www-")) {
            return d?.fields?.bq_organization_website?.replace(
                "www-",
                "https://www-"
            );
        } else if (
            !d?.fields?.bq_organization_website?.startsWith("http://www.") ||
            !d?.fields?.bq_organization_website?.startsWith("https://www.") ||
            !d?.fields?.bq_organization_website?.startsWith("http://") ||
            !d?.fields?.bq_organization_website?.startsWith("https://") ||
            !d?.fields?.bq_organization_website?.startsWith("www.") ||
            !d?.fields?.bq_organization_website?.startsWith("www") ||
            !d?.fields?.bq_organization_website?.startsWith("www-")
        ) {
            return `http://www.${d?.fields?.bq_organization_website}`;
        } else {
            return d?.fields?.bq_organization_website;
        }
    };




    const handleServerSort = (column) => {
        setOrderBy(column.toString());
        setIsAsc(isAsc === "False" ? "True" : "False");
        setCurrentPage(1);
    };



    const submit = () => {
        setOrderBy("");
        setIsAsc("False")
        handleSubmit()
    }


    const handleSubmit = async () => {
        try {
            setLoading(true);

            const filteredStates = Object.fromEntries(
                Object.entries(filters).filter(([key, value]) => value.length > 0)
            );
            const result = await fetchScreenarRecord(query, filteredStates, currentPage, isAsc, orderBy, field, token);
            setTrigger(true)
            if (result?.data) {
                if (result?.data?.flag === false) {

                    setMsgFlag(true)
                    setState([])
                    setTotal(0)
                    setCount(0)

                } else {
                    if (result?.data?.root?.children) {
                        setState(result?.data?.root?.children);
                        setTotal(result?.data?.root?.fields?.totalCount)
                        setCount(result?.data?.root?.fields?.totalCount);
                        setMsgFlag(false)

                    } else {
                        setState([])
                        setTotal(0)
                        setCount(0);
                        setMsgFlag(false)
                    }

                }
            }
            else {
                setState([])
            }

        } catch (error) {
            console.log(error);
            checkSession(error, dispatch, Navigate)
        } finally {
            setLoading(false);

        }
    }

    const handleSelectAll = (value) => {
        if (total > 99) {
            return sweetAlert(
                "Max limit reached!",
                "You can select a maximum of 100 companies at a time in your bucket",
                "error"
            );
        }
        setAll(value)
    }

    const handleCheck = (id) => {
        if (All) {
            setChecks([])
        }
        // Toggle "Select All"
        if (id === "all") {
            setAll(!All);
            return;
        }

        // Check if the item is in the unChecks array
        const isInUnChecks = unChecks.includes(id);

        if (!All) {
            if (isInUnChecks) {
                // Remove item from unChecks array if it's already present
                const updatedUnChecks = unChecks.filter((d) => d !== id);
                setUnchecks(updatedUnChecks);
            } else {
                // Toggle checkbox state
                const updatedChecks = checks.includes(id)
                    ? checks.filter((d) => d !== id)
                    : [...checks, id];
                setChecks(updatedChecks);
            }
        } else {
            // Update unChecks array based on the "Select All" state
            if (isInUnChecks) {
                // Remove item from unChecks array if it's already present
                const updatedUnChecks = unChecks.filter((d) => d !== id);
                setUnchecks(updatedUnChecks);
            } else {
                // Add item to unChecks array
                setUnchecks([...unChecks, id]);
            }
        }
    };


    const CreateBucket = async () => {
        try {


            if (All === false && checks?.length === 0) {
                return sweetAlert(
                    "Company Selection Required",
                    "To proceed with creating a bucket, please select a company first",
                    "error"
                );
            }
            setBucketLoading(true)
            const filteredStates = Object.fromEntries(
                Object.entries(filters).filter(([key, value]) => value.length > 0)
            );
            let data;
            if (All === true) {
                data = {
                    flag: "All",
                    filters: filteredStates,
                    query: query || "",
                    deselect: unChecks,
                    field: field,
                }
            } else {
                data = {
                    bq_id: checks,
                }
            }
            let ts = All ? total : checks?.length
            const result = await createBucket(user?.email, data, token);
            if (result?.data?.response) {
                if (result?.data?.response?.message === "Entry updated successfully.") {
                    if (result?.data?.response?.duplicate_entries === 0) {
                        return swal("Success!", "Items added to bucket successfully", "success");
                    }
                    swal(
                        "Duplicate Companies Found",
                        `Based on your selection ${ts - result?.data?.response?.duplicate_entries
                        } companies added successfully and ${result?.data?.response?.duplicate_entries
                        } ${result?.data?.response?.duplicate_entries === 0
                            ? "was"
                            : "were"
                        } rejected due to duplicacy, Now there are ${result?.data?.response?.item_in_bucket
                        } companies in this Bucket.`,
                        "warning"
                    );
                } else if (result?.data?.response?.message === "Given elements are already present in the bucket") {
                    swal("Items already exist!", "Given elements are already present in the bucket", "warning");
                } else {
                    swal("Success!", result?.data?.response?.message, "success");
                }

                setChecks([]);
                setAll(false);

            }

        } catch (error) {
            console.log(error);
        } finally {
            setBucketLoading(false);
            fetchBucketCounts();
            setChecks([])
        }
    }


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
    };









    const geographicData = [
        {
            id: 1,
            title: "State",
            // result: record?.bq_organization_address1_state_name?.slice(1),
            result: newState,
            name: "bq_organization_address1_state_name"
        },
        {
            id: 2,
            title: "City Name",
            // result: record?.bq_organization_jurisdiction_code?.slice(1),
            result: CityNames,
            name: "bq_organization_address1_city"
        },
        {
            id: 21,
            title: "Zip Code",
            // result: record?.bq_organization_jurisdiction_code?.slice(1),
            result: ZipCodes,
            name: "bq_organization_address1_zip5"
        },
        {
            id: 2,
            title: "Jurisdication Code",
            // result: record?.bq_organization_jurisdiction_code?.slice(1),
            result: newState,
            name: "bq_organization_jurisdiction_code"
        }
    ]

    const orgData = [
        {
            id: 1,
            title: "Org Structure",
            // result: record?.bq_organization_structure,
            result: orgstructure,
            name: "bq_organization_structure",
        },
        {
            id: 2,
            title: "Type of Employer",
            // result: record?.bq_organization_company_type,
            result: companyType,
            name: "bq_organization_company_type",
        }
    ]

    const locationData = [
        {
            id: 1,
            title: "Metro",
            // result: record?.bq_organization_address1_cbsa_name?.slice(1),
            result: CbsaName,
            name: "bq_organization_address1_cbsa_name",
        },
    ]

    const naicsData = [
        {
            id: 1,
            title: "NAICS Sector Name",
            // result: record?.bq_organization_naics_sector_name?.slice(1),
            result: naicssector,
            name: "bq_organization_naics_sector_name",
        },
        {
            id: 2,
            title: "NAICS Industry Name",
            // result: record?.bq_organization_naics_name?.slice(1),
            result: naicsIndustry,
            name: "bq_organization_naics_name",
        }
    ]


    const companyStractureData = [
        {
            id: 1,
            title: "Public or Private",
            // result: record?.bq_organization_is_public,
            result: publicorprivate,
            name: "bq_organization_is_public"
        },
        {
            id: 2,
            title: "Active or Inactive",
            // result: record?.bq_organization_isactive,
            result: activeorinactive,
            name: "bq_organization_isactive"
        },

    ]

    const sizeRangeData = [
        {
            id: 1,
            title: "Revenue",
            // result: OfficerFilter[13]?.options,
            result: revenueRange,
            name: "bq_revenue_mr"
        },
        {
            id: 11,
            title: "Full-Time Headcount",
            result: OfficerFilter[14]?.options,
            name: "bq_current_employees_plan_mr"
        },
        {
            id: 111,
            title: "EBITDA",
            result: [],
            name: "bq_ebitda_mr"
        },
        {
            id: 2,
            title: "Total Assets",
            result: [],
            name: "bq_total_assets_mr"
        },
        {
            id: 3,
            title: "Net Income",
            result: [],
            name: "bq_net_income_mr"
        },
        {
            id: 45,
            title: "Cost of Revenue (COR)",
            result: [],
            name: "bq_cor_mr"
        },
        {
            id: 451,
            title: "Gross Profit",
            result: [],
            name: "bq_gross_profit_mr"
        },
        {
            id: 452,
            title: "Payroll ",
            result: [],
            name: "bq_payroll_mr"
        },
        {
            id: 453,
            title: "Operating Expenses  ",
            result: [],
            name: "bq_operating_expenses_mr"
        },
        {
            id: 454,
            title: "Operating Income",
            result: [],
            name: "bq_operating_income_mr"
        },
        {
            id: 455,
            title: "Tax And Interest",
            result: [],
            name: "bq_tax_and_interest_mr"
        },
        {
            id: 456,
            title: "Asset Turnover",
            result: [],
            name: "bq_asset_turnover_mr"
        },
        {
            id: 457,
            title: "Return On Assets",
            result: [],
            name: "bq_return_on_assets_mr"
        },
        {
            id: 458,
            title: "Return On Sales ",
            result: [],
            name: "bq_return_on_sales_mr"
        },
    ]

    const marginRangeData = [
        {
            id: 1,
            title: "EBITDA Margin (%)",
            result: [],
            name: "bq_ebitda_margin_mr"
        },
        {
            id: 2,
            title: "Net Income Margin (%)",
            result: [],
            name: "bq_net_profit_margin_mr"
        },
    ]
    const growthRangeData = [
        {
            id: 1,
            title: "Full-Time Headcount Growth (%)",
            result: [],
            name: "bq_current_employees_plan_growth_yoy_mr"
        },
        {
            id: 2,
            title: "Revenue Growth (%)",
            result: [],
            name: "bq_revenue_growth_yoy_mr"
        },
        {
            id: 3,
            title: "Revenue Growth Quarterly Year Over Year (YOY) (%)",
            result: [],
            name: "bq_revenue_growth_quarterly_yoy_mr"
        },
        {
            id: 4,
            title: "Full-Time Headcount Growth Quarterly Year Over Year (YOY) (%)",
            result: [],
            name: "bq_current_employees_plan_growth_quarterly_yoy_mr"
        },
        {
            id: 5,
            title: "Full-Time Headcount Growth Monthly Year Over Year (YOY) (%)",
            result: [],
            name: "bq_current_employees_plan_growth_monthly_yoy_mr"
        },
        {
            id: 6,
            title: "Revenue Growth Quarter Over Quarter (QOQ) (%)",
            result: [],
            name: "bq_revenue_growth_qoq_mr"
        },
        {
            id: 7,
            title: "Full-Time Headcount Growth Quarter Over Quarter (QOQ) (%)",
            result: [],
            name: "bq_current_employees_plan_growth_qoq_mr"
        },
        {
            id: 8,
            title: "Full-Time Headcount Growth Month Over Month (MOM) (%)",
            result: [],
            name: "bq_current_employees_plan_growth_mom_mr"
        },
    ]
    const CIKData = [
        {
            id: 1,
            title: "CIK",
            result: [],
            name: "bq_organization_cik"
        },
    ]


    const irsData = [
        {
            id: "1",
            title: "IRS Sector Name",
            // result: record?.bq_organization_sector_name?.slice(1),
            result: irsSector,
            name: "bq_organization_sector_name"
        },
        {
            id: "2",
            title: "IRS Sub Sector Name",
            // result: record?.bq_organization_subsector_name?.slice(1),
            result: irsSubSector,
            name: "bq_organization_subsector_name"
        },
        {
            id: "3",
            title: "IRS Industry Name",
            // result: record?.bq_organization_irs_industry_name?.slice(1),
            result: irsIndustry,
            name: "bq_organization_irs_industry_name"
        },
    ]

    const BalanceData = [
        {
            id: 1,
            title: "Current Assets",
            result: [],
            name: "bq_current_assets_mr"
        },
        {
            id: 2,
            title: "Cash",
            result: [],
            name: "bq_cash_mr"
        },
        {
            id: 3,
            title: "Trade Notes and Accounts Receivable ",
            result: [],
            name: "bq_trade_notes_and_accounts_receivable_mr"
        },
        {
            id: 4,
            title: "Less Allowance for Bad Debts",
            result: [],
            name: "bq_less_allowance_for_bad_debts_mr"
        },
        {
            id: 5,
            title: "Inventories ",
            result: [],
            name: "bq_inventories_mr"
        },
        {
            id: 6,
            title: "U.S. Government Obligations",
            result: [],
            name: "bq_us_government_obligations_mr"
        },
        {
            id: 7,
            title: "Tax Exempt Securities",
            result: [],
            name: "bq_tax_exempt_securities_mr"
        },
        {
            id: 8,
            title: "Other Current Assets",
            result: [],
            name: "bq_other_current_assets_mr"
        },
        {
            id: 9,
            title: "Non Current Assets",
            result: [],
            name: "bq_non_current_assets_mr"
        },
        {
            id: 10,
            title: "Loans to Shareholders ",
            result: [],
            name: "bq_loans_to_shareholders_mr"
        },
        {
            id: 11,
            title: "U.S. Government Obligations",
            result: [],
            name: "bq_us_government_obligations_mr"
        },
        {
            id: 12,
            title: "Mortgage and Real Estate Loans",
            result: [],
            name: "bq_mortgage_and_real_estate_loans_mr"
        },
        {
            id: 13,
            title: "Other Investments",
            result: [],
            name: "bq_other_investments_mr"
        },
        {
            id: 14,
            title: "Buildings and Other Depreciable Assets",
            result: [],
            name: "bq_buildings_and_other_depreciable_assets_mr"
        },
        {
            id: 15,
            title: "Less Accumulated Depreciation ",
            result: [],
            name: "bq_less_accumulated_depreciation_mr"
        },
        {
            id: 16,
            title: "Depletable Assets",
            result: [],
            name: "bq_depletable_assets_mr"
        },
        {
            id: 17,
            title: "Less Accumulate Depletion",
            result: [],
            name: "bq_less_accumulated_depletion_mr"
        },
        {
            id: 18,
            title: "Land (Net of Any Amortization)",
            result: [],
            name: "bq_land_mr"
        },
        {
            id: 19,
            title: "Intangible Assets (Amortizable Only)",
            result: [],
            name: "bq_intangible_assets_amortizable_mr"
        },
        {
            id: 20,
            title: "Less Accumulated Amortization",
            result: [],
            name: "bq_less_accumulated_amortization_mr"
        },
        {
            id: 21,
            title: "Other Non Current Assets",
            result: [],
            name: "bq_other_non_current_assets_mr"
        },
        {
            id: 22,
            title: "Total Liabilities and Shareholders Equity",
            result: [],
            name: "bq_total_liabilities_and_equity_mr"
        },
        {
            id: 23,
            title: "Current Liabilities",
            result: [],
            name: "bq_current_liabilities_mr"
        },
        {
            id: 24,
            title: "Accounts Payable",
            result: [],
            name: "bq_accounts_payable_mr"
        },
        {
            id: 25,
            title: "Mortgages, Notes, Bonds Payable in Less Than 1 Year",
            result: [],
            name: "bq_mortgages_notes_bonds_payable_less_than_1year_mr"
        },
        {
            id: 26,
            title: "Other Current Liabilities",
            result: [],
            name: "bq_other_current_liabilities_mr"
        },
        {
            id: 27,
            title: "Non Current Liabilities ",
            result: [],
            name: "bq_non_current_liabilities_mr"
        },
        {
            id: 28,
            title: "Loans from Shareholders",
            result: [],
            name: "bq_loans_from_shareholders_mr"
        },
        {
            id: 29,
            title: "Mortgages, Notes, Bonds Payable in 1 Year or More ",
            result: [],
            name: "bq_mortgages_notes_bonds_payable_more_than_1year_mr"
        },
        {
            id: 30,
            title: "Other Non Current Liabilities",
            result: [],
            name: "bq_other_non_current_liabilities_mr"
        },
        {
            id: 31,
            title: "Shareholders Equity",
            result: [],
            name: "bq_shareholders_equity_mr"
        },
    ]









    const fetchCounts = async () => {
        try {
            setLoading2(true);
            const filteredStates = Object.fromEntries(
                Object.entries(filters).filter(([key, value]) => value.length > 0)
            );
            const result = await fetchScreenarSidebar(query, filteredStates, currentPage, field, token);
            if (result?.data?.response) {
                setSidebar(result?.data?.response)
            } else {
                setSidebar(null)
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading2(false)
        }
    }




    useEffect(() => {
        if (!All) {
            setChecks([]);
            setUnchecks([])
        }
    }, [All])


    useEffect(() => {
        const hasNonEmptyProperty = Object.values(filters).some(prop => prop.length > 0);
        if (hasNonEmptyProperty || query) {
            handleSubmit()
        } else {
            console.log("else call")
        }

    }, [filters, flag, currentPage, isAsc, orderBy, field])

    useEffect(() => {
        const hasNonEmptyProperty = Object.values(filters).some(prop => prop.length > 0);
        if (hasNonEmptyProperty || query) {

            fetchCounts()
        } else {
            console.log("else call")
        }

    }, [filters, flag, field, trigger]);


    const fetchBucketCounts = async () => {
        try {
            setBucketCountLoading(true)
            const result = await getBucket(user?.email, token, 0);
            if (result?.data?.response) {
                setBucketCount(result?.data?.response?.item_in_bucket)
            }

        } catch (error) {
            console.log(error);
            checkSession(error, dispatch, Navigate);
        }
        finally {
            setBucketCountLoading(false)
        }
    }


    useEffect(() => {
        if (user?.email)
            fetchBucketCounts()
    }, [user])


    // useEffect(() => {
    //     setFilters({
    //         bq_organization_address1_state_name: [],
    //         bq_organization_is_public: [],
    //         bq_organization_isactive: [],
    //         bq_organization_sector_name: [],
    //         bq_organization_subsector_name: [],
    //         bq_organization_irs_industry_name: [],
    //         bq_current_employees_plan_mr: [],
    //         bq_revenue_mr: [],
    //         bq_ebitda_mr: [],
    //         bq_total_assets_mr: [],
    //         bq_net_income_mr: [],
    //         bq_ebitda_margin_mr: [],
    //         bq_net_profit_margin_mr: [],
    //         bq_organization_address1_cbsa_name: [],
    //         bq_organization_address1_city: [],
    //         bq_organization_company_type: [],
    //         bq_organization_structure: [],
    //         bq_organization_jurisdiction_code: [],
    //         bq_organization_naics_name: [],
    //         bq_organization_naics_sector_name: [],
    //         bq_organization_address1_zip5: [],
    //         bq_revenue_growth_yoy_mr: [],
    //         bq_current_employees_plan_growth_yoy_mr: [],
    //         bq_organization_cik: [],
    //         //balancesheet
    //         bq_current_assets_mr: [],
    //         bq_cash_mr: [],
    //         bq_trade_notes_and_accounts_receivable_mr: [],
    //         bq_less_allowance_for_bad_debts_mr: [],
    //         bq_inventories_mr: [],
    //         bq_us_government_obligations_mr: [],
    //         bq_tax_exempt_securities_mr: [],
    //         bq_other_current_assets_mr: [],
    //         bq_non_current_assets_mr: [],
    //         bq_loans_to_shareholders_mr: [],
    //         bq_mortgage_and_real_estate_loans_mr: [],
    //         bq_other_investments_mr: [],
    //         bq_buildings_and_other_depreciable_assets_mr: [],
    //         bq_less_accumulated_depreciation_mr: [],
    //         bq_depletable_assets_mr: [],
    //         bq_less_accumulated_depletion_mr: [],
    //         bq_land_mr: [],
    //         bq_intangible_assets_amortizable_mr: [],
    //         bq_less_accumulated_amortization_mr: [],
    //         bq_other_non_current_assets_mr: [],
    //         bq_total_liabilities_and_equity_mr: [],
    //         bq_current_liabilities_mr: [],
    //         bq_accounts_payable_mr: [],
    //         bq_mortgages_notes_bonds_payable_less_than_1year_mr: [],
    //         bq_other_current_liabilities_mr: [],
    //         bq_non_current_liabilities_mr: [],
    //         bq_loans_from_shareholders_mr: [],
    //         bq_mortgages_notes_bonds_payable_more_than_1year_mr: [],
    //         bq_other_non_current_liabilities_mr: [],
    //         bq_shareholders_equity_mr: [],
    //         //notlink

    //         bq_cor_mr: [],
    //         bq_gross_profit_mr: [],
    //         bq_payroll_mr: [],
    //         bq_operating_expenses_mr: [],
    //         bq_operating_income_mr: [],
    //         bq_tax_and_interest_mr: [],
    //         bq_asset_turnover_mr: [],
    //         bq_return_on_assets_mr: [],
    //         bq_return_on_sales_mr: [],
    //         ///Growth
    //         bq_revenue_growth_quarterly_yoy_mr: [],
    //         bq_current_employees_plan_growth_quarterly_yoy_mr: [],
    //         bq_current_employees_plan_growth_monthly_yoy_mr: [],
    //         bq_revenue_growth_qoq_mr: [],
    //         bq_current_employees_plan_growth_qoq_mr: [],
    //         bq_current_employees_plan_growth_mom_mr: [],
    //     });
    // }, [])

    const clear = () => {
        setFilters({
            bq_organization_address1_state_name: [],
            bq_organization_is_public: [],
            bq_organization_isactive: [],
            bq_organization_sector_name: [],
            bq_organization_subsector_name: [],
            bq_organization_irs_industry_name: [],
            bq_current_employees_plan_mr: [],
            bq_revenue_mr: [],
            bq_ebitda_mr: [],
            bq_total_assets_mr: [],
            bq_net_income_mr: [],
            bq_ebitda_margin_mr: [],
            bq_net_profit_margin_mr: [],
            bq_organization_address1_cbsa_name: [],
            bq_organization_address1_city: [],
            bq_organization_company_type: [],
            bq_organization_structure: [],
            bq_organization_jurisdiction_code: [],
            bq_organization_naics_name: [],
            bq_organization_naics_sector_name: [],
            bq_organization_address1_zip5: [],
            bq_revenue_growth_yoy_mr: [],
            bq_current_employees_plan_growth_yoy_mr: [],
            bq_organization_cik: [],
            //balancesheet
            bq_current_assets_mr: [],
            bq_cash_mr: [],
            bq_trade_notes_and_accounts_receivable_mr: [],
            bq_less_allowance_for_bad_debts_mr: [],
            bq_inventories_mr: [],
            bq_us_government_obligations_mr: [],
            bq_tax_exempt_securities_mr: [],
            bq_other_current_assets_mr: [],
            bq_non_current_assets_mr: [],
            bq_loans_to_shareholders_mr: [],
            bq_mortgage_and_real_estate_loans_mr: [],
            bq_other_investments_mr: [],
            bq_buildings_and_other_depreciable_assets_mr: [],
            bq_less_accumulated_depreciation_mr: [],
            bq_depletable_assets_mr: [],
            bq_less_accumulated_depletion_mr: [],
            bq_land_mr: [],
            bq_intangible_assets_amortizable_mr: [],
            bq_less_accumulated_amortization_mr: [],
            bq_other_non_current_assets_mr: [],
            bq_total_liabilities_and_equity_mr: [],
            bq_current_liabilities_mr: [],
            bq_accounts_payable_mr: [],
            bq_mortgages_notes_bonds_payable_less_than_1year_mr: [],
            bq_other_current_liabilities_mr: [],
            bq_non_current_liabilities_mr: [],
            bq_loans_from_shareholders_mr: [],
            bq_mortgages_notes_bonds_payable_more_than_1year_mr: [],
            bq_other_non_current_liabilities_mr: [],
            bq_shareholders_equity_mr: [],
            //notlink

            bq_cor_mr: [],
            bq_gross_profit_mr: [],
            bq_payroll_mr: [],
            bq_operating_expenses_mr: [],
            bq_operating_income_mr: [],
            bq_tax_and_interest_mr: [],
            bq_asset_turnover_mr: [],
            bq_return_on_assets_mr: [],
            bq_return_on_sales_mr: [],
            ///Growth
            bq_revenue_growth_quarterly_yoy_mr: [],
            bq_current_employees_plan_growth_quarterly_yoy_mr: [],
            bq_current_employees_plan_growth_monthly_yoy_mr: [],
            bq_revenue_growth_qoq_mr: [],
            bq_current_employees_plan_growth_qoq_mr: [],
            bq_current_employees_plan_growth_mom_mr: [],
        });
    }




    return (
        <div className="home">
            <Header />
            <section className='screen'>

                <div className="search-bar" onKeyDown={handleKeyPress}>
                    <div className="search-bar-left">
                        <input value={query} onChange={(e) => setQuery(e.target.value)} type='text' placeholder='Search' />
                        <select value={field} onChange={(e) => setField(e.target.value)}>
                            <option value="">All</option>
                            <option value="bq_organization_name">Search by Name</option>
                            <option value="bq_organization_website">Search by Website</option>
                            <option value="bq_orgnization_address">Search by Address</option>
                        </select>
                    </div>
                    <div className="search-bar-right">

                        <button onClick={submit}>{loading ?
                            "Searching..." : "Search"}</button>


                        <button onClick={clear}>
                            Clear</button>

                    </div>
                </div>
                <div className="screen-wrapper">
                    <div className='h4-top'>
                        <h4>Select Filters to create the list of companies</h4>
                    </div>

                    <div className="imediate-wrap">

                        <div className="screen-wrap-left">
                            <div className="screen-filter-content">
                                <div className="screen-filter-content-left">
                                    <ScreenerCard3 data={companyStractureData}
                                        floading={floading} filters={filters}
                                        setFilters={setFilters}
                                        setFlag={setFlag} flag={flag} classname={"companyStructureInner"} />

                                    <NAICSScreenCard
                                        data={naicsData}
                                        floading={floading} filters={filters}
                                        setFilters={setFilters} title={"NAICS Filters"} setFlag={setFlag} flag={flag}

                                    />
                                    <IRSScreenarCard data={irsData}
                                        title={"Sector & Industry Filters"}
                                        floading={floading}
                                        filters={filters}
                                        setFilters={setFilters}
                                        setFlag={setFlag} flag={flag}
                                    />
                                    <ScreenarCard data={orgData}
                                        title={"Organization Filters"}
                                        floading={floading}
                                        filters={filters}
                                        setFilters={setFilters}
                                        setFlag={setFlag} flag={flag}
                                    />
                                    <ScreenarCard2 title={"Growth Range Filters"}
                                        data={growthRangeData}
                                        floading={floading}
                                        filters={filters}
                                        setFilters={setFilters}
                                        setFlag={setFlag} flag={flag}
                                    />
                                    <ScreenarCard title={"Geographic Filters"}
                                        data={geographicData}
                                        filters={filters}
                                        setFilters={setFilters}
                                        floading={floading}
                                        setFlag={setFlag} flag={flag}
                                    />
                                </div>
                                <div className="screen-filter-content-left">
                                    <ScreenarCard2 title={"Size / Age Range Filters"}
                                        data={sizeRangeData}
                                        floading={floading}
                                        filters={filters}
                                        setFilters={setFilters}
                                        setFlag={setFlag} flag={flag}
                                        classname={"sizeAgeRangeInner"}
                                    />

                                    <ScreenarCard2 title={"CIK Filter"}
                                        data={CIKData}
                                        floading={floading}
                                        filters={filters}
                                        setFilters={setFilters}
                                        setFlag={setFlag} flag={flag}
                                    />

                                    <ScreenarCard data={locationData}
                                        title={"Location Filters"}
                                        floading={floading}
                                        filters={filters}
                                        setFilters={setFilters}
                                        setFlag={setFlag} flag={flag}
                                    />

                                    <ScreenarCard2 title={"Margin Range Filters"}
                                        data={marginRangeData}
                                        floading={floading}
                                        filters={filters}
                                        setFilters={setFilters}
                                        setFlag={setFlag} flag={flag}
                                    />
                                    <ScreenarCard4 title={"Balance Sheet Filters"}
                                        data={BalanceData}
                                        floading={floading}
                                        filters={filters}
                                        setFilters={setFilters}
                                        setFlag={setFlag} flag={flag}
                                    />

                                </div>
                            </div>
                        </div>
                        <Resizable
                            className={'screen-right-wrapper'}
                            defaultSize={{
                                width: "50%",
                            }}
                            enable={{
                                left: true,
                            }}
                            maxWidth={"80%"}
                            minWidth={"20%"}
                        >
                            <div className="screen-wrap-right">
                                <div className="right-top">
                                    <p>Display {state?.length} of {millify(count)} Records</p>
                                    <Tooltip placement='top' title="You can select a maximum of 100 companies at a time in your bucket ">
                                        <button onClick={CreateBucket} disabled={bucketLoading}
                                            style={{ cursor: "pointer" }}>
                                            {bucketLoading ? <i className='bx bx-loader-alt bx-spin' ></i> :
                                                <i className='bx bx-cart-add bx-flip-horizontal' ></i>}
                                            Add to Bucket</button>
                                    </Tooltip>
                                </div>
                                {
                                    loading ? <div className="loader">
                                        <img src={img3} alt='img' />
                                    </div> : <div className="right-content">
                                        {
                                            state?.length === 0 ? <div className="nodata">
                                                <img src={img2} alt='img' />
                                                {
                                                    msgFlag ? <>
                                                        <h4>Maximum Data Limit Reached</h4>
                                                        <p>{MAXLIMITERROR}</p>
                                                    </> : <h4>No Records</h4>

                                                }

                                            </div> : <table>
                                                <thead>
                                                    <th><Checkbox onClick={() => All ? handleSelectAll(false) : handleSelectAll(true)} checked={All && unChecks?.length === 0 ? true : false} /></th>
                                                    <th>Company</th>
                                                    <th><span onClick={() => handleServerSort("bq_revenue_mr")}>
                                                        {orderBy === "bq_revenue_mr" ? (
                                                            isAsc === "True" ? (
                                                                <i
                                                                    className="bx bx-sort-up"
                                                                ></i>
                                                            ) : (
                                                                <i
                                                                    className="bx bx-sort-down"

                                                                ></i>
                                                            )
                                                        ) : (
                                                            ""
                                                        )}

                                                        <i className='bx bxs-sort-alt'></i>U.S Revenue</span></th>
                                                    <th><span onClick={() => handleServerSort("bq_current_employees_plan_mr")}>
                                                        {orderBy === "bq_current_employees_plan_mr" ? (
                                                            isAsc === "True" ? (
                                                                <i
                                                                    className="bx bx-sort-up"

                                                                ></i>
                                                            ) : (
                                                                <i
                                                                    className="bx bx-sort-down"

                                                                ></i>
                                                            )
                                                        ) : (
                                                            ""
                                                        )}

                                                        <i className='bx bxs-sort-alt'></i>U.S Fulltime Headcount</span></th>



                                                    <NormalHead filters={filters}
                                                        handleServerSort={handleServerSort}
                                                        orderBy={orderBy} isAsc={isAsc} />

                                                    <BalanceHead filters={filters}
                                                        handleServerSort={handleServerSort}
                                                        orderBy={orderBy} isAsc={isAsc} />
                                                    <GrowthHead filters={filters}
                                                        handleServerSort={handleServerSort}
                                                        orderBy={orderBy} isAsc={isAsc} />



                                                </thead>
                                                <tbody>
                                                    {

                                                        state?.map((d) => (
                                                            <tr key={d?.fields?.bq_id}>
                                                                <td >
                                                                    <Checkbox
                                                                        onClick={() => handleCheck(d?.fields?.bq_organization_id)}
                                                                        checked={
                                                                            (All && !unChecks.includes(d?.fields?.bq_organization_id)) ||
                                                                            checks.includes(d?.fields?.bq_organization_id)
                                                                        } /></td>
                                                                <td className='detail'>
                                                                    <h4>{d?.fields?.bq_organization_name}</h4>
                                                                    <p><span>BQ ID:</span> {d?.fields?.bq_organization_id}</p>
                                                                    <p><span>Year Founded:</span> {d?.fields?.hasOwnProperty("bq_organization_year_founded") ?
                                                                        d?.fields?.bq_organization_year_founded : "N/A"}</p>
                                                                    <p><span>Unverified Website:</span> {d?.fields?.hasOwnProperty("bq_organization_website") ?
                                                                        <a className='link' target='blank' href={webcheck(d)}>{webcheck(d)}</a> : "N/A"}</p>

                                                                    <p><span>Capital Market Status:</span> {d?.fields?.hasOwnProperty("bq_company_capital_markets_universe") ?
                                                                        d?.fields?.bq_company_capital_markets_universe === 1 ||
                                                                            d?.fields?.bq_company_capital_markets_universe === true ? "Active" : "Inactive" : "N/A"}</p>
                                                                    {
                                                                        filters?.bq_organization_sector_name?.length > 0
                                                                        && <p><span>IRS Sector:</span> {d?.fields?.hasOwnProperty("bq_organization_sector_name") ?
                                                                            d?.fields?.bq_organization_sector_name : "N/A"}</p>
                                                                    }
                                                                    {
                                                                        filters?.bq_organization_subsector_name?.length > 0 &&
                                                                        <p><span>IRS Sub Sector:</span> {d?.fields?.hasOwnProperty("bq_organization_subsector_name") ?
                                                                            d?.fields?.bq_organization_subsector_name : "N/A"}</p>
                                                                    }
                                                                    {
                                                                        filters?.bq_organization_irs_industry_name?.length > 0 &&
                                                                        <p><span>IRS Industry Name:</span> {d?.fields?.hasOwnProperty("bq_organization_irs_industry_name") ?
                                                                            d?.fields?.bq_organization_irs_industry_name : "N/A"}</p>
                                                                    }

                                                                    {
                                                                        filters?.bq_organization_naics_sector_name?.length > 0 &&
                                                                        <p><span> NAICS Sector Name:</span> {d?.fields?.hasOwnProperty("bq_organization_naics_sector_name") ?
                                                                            d?.fields?.bq_organization_naics_sector_name : "N/A"}</p>
                                                                    }
                                                                    {
                                                                        filters?.bq_organization_naics_name?.length > 0 &&
                                                                        <p><span> NAICS Industry Name:</span> {d?.fields?.hasOwnProperty("bq_organization_naics_name") ?
                                                                            d?.fields?.bq_organization_naics_name : "N/A"}</p>
                                                                    }
                                                                    {
                                                                        filters?.bq_organization_address1_state_name?.length > 0 &&
                                                                        <p><span>HQ State Name:</span> {d?.fields?.hasOwnProperty("bq_organization_address1_state_name") ?
                                                                            d?.fields?.bq_organization_address1_state_name : "N/A"}</p>
                                                                    }
                                                                    {
                                                                        filters?.bq_organization_isactive?.length > 0 &&
                                                                        <p><span> Org Active:</span> {d?.fields?.hasOwnProperty("bq_organization_isactive") ?
                                                                            d?.fields?.bq_organization_isactive === true ? "Active" : "Inactive" : "N/A"}</p>
                                                                    }
                                                                    {
                                                                        filters?.bq_organization_address1_city?.length > 0 &&
                                                                        <p><span> City Name:</span> {d?.fields?.hasOwnProperty("bq_organization_address1_city") ?
                                                                            d?.fields?.bq_organization_address1_city : "N/A"}</p>
                                                                    }
                                                                    {
                                                                        filters?.bq_organization_jurisdiction_code?.length > 0 &&
                                                                        <p><span> Jurisdiction code:</span> {d?.fields?.hasOwnProperty("bq_organization_jurisdiction_code") ?
                                                                            d?.fields?.bq_organization_jurisdiction_code : "N/A"}</p>
                                                                    }
                                                                    {
                                                                        filters?.bq_organization_structure?.length > 0 &&
                                                                        <p><span> Org Structure:</span> {d?.fields?.hasOwnProperty("bq_organization_structure") ?
                                                                            d?.fields?.bq_organization_structure : "N/A"}</p>
                                                                    }
                                                                    {
                                                                        filters?.bq_organization_company_type?.length > 0 &&
                                                                        <p><span> Org Type:</span> {d?.fields?.hasOwnProperty("bq_organization_company_type") ?
                                                                            d?.fields?.bq_organization_company_type : "N/A"}</p>
                                                                    }

                                                                    {
                                                                        filters?.bq_organization_address1_zip5?.length > 0 &&
                                                                        <p><span>Zip Code:</span> {d?.fields?.hasOwnProperty("bq_organization_address1_zip5") ?
                                                                            d?.fields?.bq_organization_address1_zip5 : "N/A"}</p>
                                                                    }
                                                                    {
                                                                        filters?.bq_organization_is_public?.length > 0 &&
                                                                        <p><span>Org Status:</span> {d?.fields?.hasOwnProperty("bq_organization_is_public") ?
                                                                            d?.fields?.bq_organization_is_public === false ? "Private" : "Public" : "N/A"}</p>
                                                                    }
                                                                    {
                                                                        filters?.bq_organization_address1_cbsa_name?.length > 0 &&
                                                                        <p><span>Metro:</span> {d?.fields?.hasOwnProperty("bq_organization_address1_cbsa_name") ?
                                                                            d?.fields?.bq_organization_address1_cbsa_name : "N/A"}</p>
                                                                    }

                                                                </td>

                                                                <NormalBody filters={filters} d={d} />
                                                                <BalanceBody filters={filters} d={d} />
                                                                <GrowthRangeBody filters={filters} d={d} />
                                                            </tr>
                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                        }

                                        <br />
                                        {
                                            total > 20 && <div className="page-setz">
                                                <ResponsivePagination
                                                    current={currentPage}
                                                    total={Math.ceil(total / 20)}
                                                    onPageChange={setCurrentPage}
                                                    maxWidth={"200px"}
                                                    nextLabel="Next"
                                                    previousLabel="Prev"
                                                />
                                            </div>
                                        }




                                    </div>
                                }


                            </div>
                        </Resizable>
                    </div>




                </div>

                <SideBar loading2={loading2} sidebar={sidebar} img3={img3} />



            </section>
            <div className="end">
                <div className="end-left">
                    <p><span>Total Search Items:</span> {millify(total)}</p>
                    <p><span>Total Selected Items:</span> {All ? millify(total - unChecks?.length) : millify(checks?.length)}</p>
                    {/* <p><span>Items in Bucket:</span> {All ? millify(total - unChecks?.length) : millify(checks?.length)}</p> */}
                </div>
                <div className="end-right">

                    {/* <button className='bucket' onClick={() => Navigate("/screener/bucket")} style={{ cursor: "pointer" }}>
                        View Bucket
                        <div className="badge">
                            {bucketCountLoading ? <LoadingOutlined /> : bucketCount}
                        </div>

                    </button> */}
                    <div className="bucket" onClick={() => { console.log(filters); Navigate("/screener/bucket", { state: filters }) }}>
                        <img className='bucket-img' src={bucketimg} />
                        <h4>View Bucket</h4>
                        <div className="badge">
                            {bucketCountLoading ? <LoadingOutlined /> : bucketCount}
                        </div>
                    </div>


                </div>
            </div>
            {
                bucketOpen && <BucketPop token={token} email={user?.email} bucketOpen={bucketOpen} setBucketOpen={setBucketOpen} />
            }
        </div>
    )
}

export default Screenar
