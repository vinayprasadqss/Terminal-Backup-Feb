import { Checkbox } from 'antd';
import React, { useEffect } from 'react'

const SelectAll = ({
    result, setPortfolioItems, portfolioItem, currentPage, portfolioLoading, setPortfolioLoading,
    dispatch, Navigate, checked, setChecked, flag }) => {



    const selectAll = async () => {
        try {


            if (checked?.find((f) => f?.page === currentPage)) {
                setPortfolioLoading(true)
                let map = []
                let temp = result?.slice(0, 50)?.map((d) => (
                    {
                        id: (flag === "bq_location_name" ? d?.fields?.bq_location_id : d?.fields?.bq_organization_id) || "N/A",
                        name: d?.fields?.bq_organization_name || "N/A",
                        revenue: d?.fields?.bq_revenue_mr || "N/A",
                        headcount: d?.fields?.bq_current_employees_plan_mr || "N/A",
                        valuation: d?.fields?.bq_organization_valuation || "N/A",
                        credit_score: d?.fields?.bq_score || "N/A"
                    }

                ));
                setPortfolioItems((prev) => {
                    let set = [...temp, ...map]
                    const newItems = set.filter((item) => !prev.some((prevItem) => prevItem.id === item.id));
                    return [...prev, ...newItems];
                });

            }
        } catch (error) {
            console.log(error);
            checkSession(error, dispatch, Navigate)
        } finally {
            setPortfolioLoading(false)
        }

    };
    const deselectDuplicates = () => {

        if (portfolioItem?.length > 0) {
            setPortfolioItems((prev) => {
                let temp = result?.slice(0, 50)?.map((d) => ({
                    id: (flag === "bq_location_name" ? d?.fields?.bq_location_id : d?.fields?.bq_organization_id) || "N/A",
                    name: d?.fields?.bq_organization_name || "N/A",
                    revenue: d?.fields?.bq_revenue_mr || "N/A",
                    headcount: d?.fields?.bq_current_employees_plan_mr || "N/A",
                    valuation: d?.fields?.bq_organization_valuation || "N/A",
                    credit_score: d?.fields?.bq_score || "N/A"
                }));

                const newItems = prev.filter((item) => !temp.some((prevItem) => prevItem.id === item.id));

                return [...newItems];
            });
            console.log("herrr")
        }
    };


    useEffect(() => {
        if (checked) {

            selectAll()
        }

    }, [checked]);

    const handleChange = (e) => {


        checked?.find((f) => f?.page === currentPage) ? setChecked((prev) => {
            let temp = prev?.filter((f) => f?.page !== currentPage)
            deselectDuplicates()
            return temp
        }) : setChecked((prev) => [...prev, { page: currentPage, check: e.target.checked }])


    }




    const checkstatus = () => {
        if (checked?.find((f) => f?.page === currentPage)) {
            return true
        } else {
            portfolioItem?.length > result?.length
        }
    }


    return (
        <Checkbox disabled={portfolioLoading}
            onChange={(e) => handleChange(e)}
            checked={checked?.find((f) => f.page === currentPage)} />
    )
}

export default SelectAll