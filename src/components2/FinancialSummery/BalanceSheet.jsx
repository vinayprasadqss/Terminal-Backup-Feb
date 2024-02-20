import { Switch } from "antd";
import millify from "millify";
import React, { useEffect, useState } from "react";

const leftHead = [
  "Revenue",
  "Cost of Revenue",
  "Gross Profit",
  "Operating Expenses",
  "Operating Income",
  "Tax and Interest Expenses",
  "Net Income",
  "EBITDA",
  "Employment",
  "Payroll",
];

const BalanceSheet = ({ state, loading, img, toggle, setToggle }) => {
  const [years, setYears] = useState(); /// for quarters

  const [ny, setNy] = useState(); ///For Years

  const [assets, setAssets] = useState([]);

  const calculationOfTotalAssets1 = () => {
    let totalassets = [];
    let t1, t2, t3, t4, t5, t6, t7;
    let t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19;

    let cash = 0,
      accountReciveable = 0,
      baddebt = 0,
      inventories = 0,
      govObligations = 0,
      taxexceptsecurities = 0,
      othercurrentAsset = 0;
    let loan = 0,
      mortage = 0,
      otherInvestments = 0,
      buildingdepresult = 0,
      lad = 0,
      da = 0,
      ladeplition = 0,
      land = 0,
      intangiable = 0,
      lessaamotization = 0,
      otherAssets = 0;
    let total1 = 0;

    // Current Assets

    years?.map((d, i) => {
      //Total Cash
      t1 = state?.quarterly_bq_cash?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      // console.log(t1, "t1")
      cash = t1?.hasOwnProperty("bq_cash") ? (t1?.bq_cash === "-654801000.0" ? 0 : Number(t1?.bq_cash)) : 0;
      // console.log(t1?.bq_cash, "cash", i)
      //
      t2 = state?.quarterly_bq_trade_notes_and_accounts_receivable?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      accountReciveable = t2?.hasOwnProperty(
        "bq_trade_notes_and_accounts_receivable"
      )
        ? t2?.bq_trade_notes_and_accounts_receivable === "-654801000.0" ? 0 : Number(t2?.bq_trade_notes_and_accounts_receivable)
        : 0;

      //
      t3 = state?.quarterly_bq_less_allowance_for_bad_debts?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      baddebt =
        baddebt + t3?.hasOwnProperty("bq_less_allowance_for_bad_debts")
          ? t3?.bq_less_allowance_for_bad_debts === "-654801000.0" ? 0 : Number(t3?.bq_less_allowance_for_bad_debts)
          : 0;
      //
      t4 = state?.quarterly_bq_inventories?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      inventories = t4?.hasOwnProperty("bq_inventories")
        ? t4?.bq_inventories === "-654801000.0" ? 0 : Number(t4?.bq_inventories)
        : 0;

      //
      t5 = state?.quarterly_bq_us_government_obligations?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      govObligations = t5?.hasOwnProperty("bq_us_government_obligations")
        ? t5?.bq_us_government_obligations === "-654801000.0" ? 0 : Number(t5?.bq_us_government_obligations)
        : 0;
      //
      t6 = state?.quarterly_bq_tax_exempt_securities?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      taxexceptsecurities = t6?.hasOwnProperty("bq_tax_exempt_securities")
        ? t6?.bq_tax_exempt_securities === "-654801000.0" ? 0 : Number(t6?.bq_tax_exempt_securities)
        : 0;
      //
      t7 = state?.quarterly_bq_other_current_assets?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      othercurrentAsset = t7?.hasOwnProperty("bq_other_current_assets")
        ? t7?.bq_other_current_assets === "-654801000.0" ? 0 : Number(t7?.bq_other_current_assets)
        : 0;

      /// non Current Assets

      t8 = state?.quarterly_bq_loans_to_shareholders?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      loan = t8?.hasOwnProperty("bq_loans_to_shareholders")
        ? t8?.bq_loans_to_shareholders === "-654801000.0" ? 0 : Number(t8?.bq_loans_to_shareholders)
        : 0;
      ///

      t9 = state?.quarterly_bq_mortgage_and_real_estate_loans?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      mortage = t9?.hasOwnProperty("bq_mortgage_and_real_estate_loans")
        ? t9?.bq_mortgage_and_real_estate_loans === "-654801000.0" ? 0 : Number(t9?.bq_mortgage_and_real_estate_loans)
        : 0;

      //
      t10 = state?.quarterly_bq_other_investments?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      otherInvestments = t10?.hasOwnProperty("bq_other_investments")
        ? t10?.bq_other_investments === "-654801000.0" ? 0 : Number(t10?.bq_other_investments)
        : 0;
      ///
      t11 = state?.quarterly_bq_buildings_and_other_depreciable_assets?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      buildingdepresult = t11?.hasOwnProperty(
        "bq_buildings_and_other_depreciable_assets"
      )
        ? t11?.bq_buildings_and_other_depreciable_assets === "-654801000.0" ? 0 : Number(t11?.bq_buildings_and_other_depreciable_assets)
        : 0;
      ///
      t12 = state?.quarterly_bq_less_accumulated_depreciation?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      lad = t12?.hasOwnProperty("bq_less_accumulated_depreciation")
        ? t12?.bq_less_accumulated_depreciation === "-654801000.0" ? 0 : Number(t12?.bq_less_accumulated_depreciation)
        : 0;
      ///
      t13 = state?.quarterly_bq_depletable_assets?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      da = t13?.hasOwnProperty("bq_depletable_assets")
        ? t13?.bq_depletable_assets === "-654801000.0" ? 0 : Number(t13?.bq_depletable_assets)
        : 0;
      ///
      t14 = state?.quarterly_bq_less_accumulated_depletion?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      ladeplition = t14?.hasOwnProperty("bq_less_accumulated_depletion")
        ? t14?.bq_less_accumulated_depletion === "-654801000.0" ? 0 : Number(t14?.bq_less_accumulated_depletion)
        : 0;
      ///
      t16 = state?.quarterly_bq_land?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      land = t16?.hasOwnProperty("bq_land") ? t16?.bq_land === "-654801000.0" ? 0 : Number(t16?.bq_land) : 0;

      ///
      t17 = state?.quarterly_bq_intangible_assets_amortizable?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      intangiable = t17?.hasOwnProperty("bq_intangible_assets_amortizable")
        ? t17?.bq_intangible_assets_amortizable === "-654801000.0" ? 0 : Number(t17?.bq_intangible_assets_amortizable)
        : 0;

      ///
      t18 = state?.quarterly_bq_less_accumulated_amortization?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      lessaamotization = t18?.hasOwnProperty("bq_less_accumulated_amortization")
        ? t18?.bq_less_accumulated_amortization === "-654801000.0" ? 0 : Number(t18?.bq_less_accumulated_amortization)
        : 0;
      ///
      t19 = state?.quarterly_bq_other_non_current_assets?.find(
        (f) => f?.year === d?.year && f?.quarter === d?.quarter
      );
      otherAssets = t19?.hasOwnProperty("bq_other_non_current_assets")
        ? t19?.bq_other_non_current_assets === "-654801000.0" ? 0 : Number(t19?.bq_other_non_current_assets)
        : 0;

      total1 =
        cash +
        accountReciveable +
        baddebt +
        inventories +
        govObligations +
        taxexceptsecurities +
        othercurrentAsset +
        loan +
        mortage +
        otherInvestments +
        buildingdepresult +
        lad +
        da +
        ladeplition +
        land +
        intangiable +
        lessaamotization +
        otherAssets;

      totalassets.push({ id: i, data: Number(total1) });
      // console.log(totalassets, i)
    });
    // console.log(totalassets)
    setAssets(totalassets);
  };

  const calculationOfTotalAssets2 = () => {
    let totalassets = [];
    let t1, t2, t3, t4, t5, t6, t7;
    let t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19;

    let cash = 0,
      accountReciveable = 0,
      baddebt = 0,
      inventories = 0,
      govObligations = 0,
      taxexceptsecurities = 0,
      othercurrentAsset = 0;
    let loan = 0,
      mortage = 0,
      otherInvestments = 0,
      buildingdepresult = 0,
      lad = 0,
      da = 0,
      ladeplition = 0,
      land = 0,
      intangiable = 0,
      lessaamotization = 0,
      otherAssets = 0;
    let total1 = 0;

    ny?.map((d, i) => {
      //Total Cash
      t1 = state?.yearly_bq_cash?.find((f) => f?.year === d);
      // console.log(t1, "t1")
      cash = t1?.hasOwnProperty("bq_cash") ? t1?.bq_cash === "-654801000.0" ? 0 : Number(t1?.bq_cash) : 0;
      // console.log(t1?.bq_cash, "cash", i)
      //
      t2 = state?.yearly_bq_trade_notes_and_accounts_receivable?.find(
        (f) => f?.year === d
      );
      accountReciveable = t2?.hasOwnProperty(
        "bq_trade_notes_and_accounts_receivable"
      )
        ? t2?.bq_trade_notes_and_accounts_receivable === "-654801000.0" ? 0 : Number(t2?.bq_trade_notes_and_accounts_receivable)
        : 0;

      //
      t3 = state?.yearly_bq_less_allowance_for_bad_debts?.find(
        (f) => f?.year === d
      );
      baddebt =
        baddebt + t3?.hasOwnProperty("bq_less_allowance_for_bad_debts")
          ? t3?.bq_less_allowance_for_bad_debts === "-654801000.0" ? 0 : Number(t3?.bq_less_allowance_for_bad_debts)
          : 0;
      //
      t4 = state?.yearly_bq_inventories?.find((f) => f?.year === d);
      inventories = t4?.hasOwnProperty("bq_inventories")
        ? t4?.bq_inventories === "-654801000.0" ? 0 : Number(t4?.bq_inventories)
        : 0;

      //
      t5 = state?.yearly_bq_us_government_obligations?.find(
        (f) => f?.year === d
      );
      govObligations = t5?.hasOwnProperty("bq_us_government_obligations")
        ? t5?.bq_us_government_obligations === "-654801000.0" ? 0 : Number(t5?.bq_us_government_obligations)
        : 0;
      //
      t6 = state?.yearly_bq_tax_exempt_securities?.find((f) => f?.year === d);
      taxexceptsecurities = t6?.hasOwnProperty("bq_tax_exempt_securities")
        ? t6?.bq_tax_exempt_securities === "-654801000.0" ? 0 : Number(t6?.bq_tax_exempt_securities)
        : 0;
      //
      t7 = state?.yearly_bq_other_current_assets?.find((f) => f?.year === d);
      othercurrentAsset = t7?.hasOwnProperty("bq_other_current_assets")
        ? t7?.bq_other_current_assets === "-654801000.0" ? 0 : Number(t7?.bq_other_current_assets)
        : 0;

      /// non Current Assets

      t8 = state?.yearly_bq_loans_to_shareholders?.find((f) => f?.year === d);
      loan = t8?.hasOwnProperty("bq_loans_to_shareholders")
        ? t8?.bq_loans_to_shareholders === "-654801000.0" ? 0 : Number(t8?.bq_loans_to_shareholders)
        : 0;
      ///

      t9 = state?.yearly_bq_mortgage_and_real_estate_loans?.find(
        (f) => f?.year === d
      );
      mortage = t9?.hasOwnProperty("bq_mortgage_and_real_estate_loans")
        ? t9?.bq_mortgage_and_real_estate_loans === "-654801000.0" ? 0 : Number(t9?.bq_mortgage_and_real_estate_loans)
        : 0;

      //
      t10 = state?.yearly_bq_other_investments?.find((f) => f?.year === d);
      otherInvestments = t10?.hasOwnProperty("bq_other_investments")
        ? t10?.bq_other_investments === "-654801000.0" ? 0 : Number(t10?.bq_other_investments)
        : 0;
      ///
      t11 = state?.yearly_bq_buildings_and_other_depreciable_assets?.find(
        (f) => f?.year === d
      );
      buildingdepresult = t11?.hasOwnProperty(
        "bq_buildings_and_other_depreciable_assets"
      )
        ? t11?.bq_buildings_and_other_depreciable_assets === "-654801000.0" ? 0 : Number(t11?.bq_buildings_and_other_depreciable_assets)
        : 0;
      ///
      t12 = state?.yearly_bq_less_accumulated_depreciation?.find(
        (f) => f?.year === d
      );
      lad = t12?.hasOwnProperty("bq_less_accumulated_depreciation")
        ? t12?.bq_less_accumulated_depreciation === "-654801000.0" ? 0 : Number(t12?.bq_less_accumulated_depreciation)
        : 0;
      ///
      t13 = state?.yearly_bq_depletable_assets?.find((f) => f?.year === d);
      da = t13?.hasOwnProperty("bq_depletable_assets")
        ? t13?.bq_depletable_assets === "-654801000.0" ? 0 : Number(t13?.bq_depletable_assets)
        : 0;
      ///
      t14 = state?.yearly_bq_less_accumulated_depletion?.find(
        (f) => f?.year === d
      );
      ladeplition = t14?.hasOwnProperty("bq_less_accumulated_depletion")
        ? t14?.bq_less_accumulated_depletion === "-654801000.0" ? 0 : Number(t14?.bq_less_accumulated_depletion)
        : 0;
      ///
      t16 = state?.yearly_bq_land?.find((f) => f?.year === d);
      land = t16?.hasOwnProperty("bq_land") ? t16?.bq_land === "-654801000.0" ? 0 : Number(t16?.bq_land) : 0;

      ///
      t17 = state?.yearly_bq_intangible_assets_amortizable?.find(
        (f) => f?.year === d
      );
      intangiable = t17?.hasOwnProperty("bq_intangible_assets_amortizable")
        ? t17?.bq_intangible_assets_amortizable === "-654801000.0" ? 0 : Number(t17?.bq_intangible_assets_amortizable)
        : 0;

      ///
      t18 = state?.yearly_bq_less_accumulated_amortization?.find(
        (f) => f?.year === d
      );
      lessaamotization = t18?.hasOwnProperty("bq_less_accumulated_amortization")
        ? t18?.bq_less_accumulated_amortization === "-654801000.0" ? 0 : Number(t18?.bq_less_accumulated_amortization)
        : 0;
      ///
      t19 = state?.yearly_bq_other_non_current_assets?.find(
        (f) => f?.year === d
      );
      otherAssets = t19?.hasOwnProperty("bq_other_non_current_assets")
        ? t19?.bq_other_non_current_assets === "-654801000.0" ? 0 : Number(t19?.bq_other_non_current_assets)
        : 0;

      total1 =
        cash +
        accountReciveable +
        baddebt +
        inventories +
        govObligations +
        taxexceptsecurities +
        othercurrentAsset +
        loan +
        mortage +
        otherInvestments +
        buildingdepresult +
        lad +
        da +
        ladeplition +
        land +
        intangiable +
        lessaamotization +
        otherAssets;

      totalassets.push({ id: i, data: Number(total1) });
    });
    // console.log(totalassets)
    setAssets(totalassets);
  };



  // console.log(toggle, "togg")
  useEffect(() => {
    if (toggle === false) {
      // console.log("hhhh")
      setAssets([]);
      calculationOfTotalAssets1();
    } else {
      // console.log("hhhh2")
      setAssets([]);
      calculationOfTotalAssets2();
    }
  }, [toggle, state, years, ny]);

  ///For Quarters
  const checkYear = () => {
    let temp2 = [];
    if (state?.hasOwnProperty("quarterly_revenue")) {
      if (
        state?.quarterly_revenue?.length > 0 &&
        state?.quarterly_revenue[0]?.hasOwnProperty("year")
      ) {
        temp2 = state?.quarterly_revenue?.sort((a, b) => {
          if (a?.year !== b?.year) {
            return b?.year - a?.year;
          }
          return b?.quarter - a?.quarter;
        });
        if (temp2?.length > 3) {
          // console.log(temp2)
          setYears(
            [
              { year: temp2[3]?.year, quarter: temp2[3]?.quarter },
              { year: temp2[2]?.year, quarter: temp2[2]?.quarter },
              { year: temp2[1]?.year, quarter: temp2[1]?.quarter },
              { year: temp2[0]?.year, quarter: temp2[0]?.quarter },
            ]?.reverse()
          );
        } else if (temp2?.length === 3) {
          setYears(
            [
              { year: temp2[2]?.year - 1, quarter: temp2[2]?.quarter },
              { year: temp2[2]?.year, quarter: temp2[2]?.quarter },
              { year: temp2[1]?.year, quarter: temp2[1]?.quarter },
              { year: temp2[0]?.year - 1, quarter: temp2[0]?.quarter },
            ]?.reverse()
          );
        } else if (temp2?.length === 2) {
          setYears(
            [
              { year: temp2[1]?.year - 2, quarter: temp2[1]?.quarter },
              { year: temp2[1]?.year - 1, quarter: temp2[1]?.quarter },
              { year: temp2[1]?.year, quarter: temp2[1]?.quarter },
              { year: temp2[0]?.year, quarter: temp2[0]?.quarter },
            ]?.reverse()
          );
        } else if (temp2?.length === 1) {
          // console.log("hhhh", temp2)
          setYears(
            [
              {
                year: temp2[temp2?.length - 1]?.year - 3,
                quarter: temp2[temp2?.length - 1]?.quarter,
              },
              {
                year: temp2[temp2?.length - 1]?.year - 2,
                quarter: temp2[temp2?.length - 1]?.quarter,
              },
              {
                year: temp2[temp2?.length - 1]?.year - 1,
                quarter: temp2[temp2?.length - 1]?.quarter,
              },
              {
                year: temp2[temp2?.length - 1]?.year,
                quarter: temp2[temp2?.length - 1]?.quarter,
              },
            ]?.reverse()
          );
        }
      } else {
        setYears(
          [
            { year: 2022, quarter: 4 },
            { year: 2023, quarter: 1 },
            { year: 2023, quarter: 2 },
            { year: 2023, quarter: 3 },
          ]?.reverse()
        );
      }
    } else {
      setYears(
        [
          { year: 2022, quarter: 4 },
          { year: 2023, quarter: 1 },
          { year: 2023, quarter: 2 },
          { year: 2023, quarter: 3 },
        ]?.reverse()
      );
    }
  };

  //For Years
  const checkNYear = () => {
    let temp2;
    if (state?.hasOwnProperty("yearly_revenue")) {
      if (
        state?.yearly_revenue?.length > 0 &&
        state?.yearly_revenue[0]?.hasOwnProperty("year")
      ) {
        temp2 = state?.yearly_revenue?.sort((a, b) => b?.year - a?.year);

        if (temp2?.length > 3) {
          setNy(
            [
              temp2[3]?.year,
              temp2[2]?.year,
              temp2[1]?.year,
              temp2[0]?.year,
            ]?.reverse()
          );
        } else if (temp2?.length === 3) {
          setNy(
            [
              temp2[2]?.year - 1,
              temp2[2]?.year,
              temp2[1]?.year,
              temp2[0]?.year,
            ]?.reverse()
          );
        } else if (temp2?.length === 2) {
          // console.log(temp2);
          setNy(
            [
              temp2[1]?.year - 2,
              temp2[1]?.year - 1,
              temp2[1]?.year,
              temp2[0]?.year,
            ]?.reverse()
          );
        } else if (temp2?.length === 1) {
          setNy(
            [
              temp2[0]?.year - 3,
              temp2[0]?.year - 2,
              temp2[0]?.year - 1,
              temp2[0]?.year,
            ]?.reverse()
          );
        }
      } else {
        setNy([2020, 2021, 2022, 2023]?.reverse());
      }
    } else {
      setNy([2020, 2021, 2022, 2023]?.reverse());
    }
  };

  useEffect(() => {
    checkYear();
    if (toggle) {
    }
    checkNYear();
  }, [state, toggle]);

  return (
    <>
      <div className="switch">
        Quarterly{" "}
        <Switch
          checked={toggle}
          onChange={(e) => {
            setToggle(e);
          }}
          size="small"
        />{" "}
        Yearly
      </div>
      <div className={"tableWrapper"}>
        {loading ? (
          <div className="loader">
            <img src={img} />
          </div>
        ) : (
          <table cellPadding={"0"} cellSpacing={"0"} style={{ userSelect: "none" }}>
            <thead>
              <tr>
                <th></th>
                {toggle === true
                  ? ny?.map((d, i) => (
                    <th key={i + "head"}>
                      <strong>{d}</strong>
                    </th>
                  ))
                  : years?.map((d, i) => (
                    <th key={i + "headz"}>
                      <strong>
                        Q{d?.quarter} {d?.year}
                      </strong>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <strong>Current Assets</strong>
                </th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_current_assets?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_current_assets) {
                      return (
                        <td key={i + "yearly_bq_current_assets"}>
                          {t?.bq_current_assets < 0
                            ? t?.bq_current_assets === "-654801000.0" ? "-" : "-$" + millify(Math.abs(t?.bq_current_assets))
                            : "$" + millify(Math.abs(t?.bq_current_assets))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_current_assets?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_current_assets) {
                      return (
                        <td key={i + "bq_current_assets"}>
                          {t?.bq_current_assets < 0
                            ? t?.bq_current_assets === "-654801000.0" ? "-" : "-$" + millify(Math.abs(t?.bq_current_assets))
                            : "$" + millify(Math.abs(t?.bq_current_assets))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
                {/* {
                            years?.map((d, i) => {
                                let t = 0;
                                t = state?.quarterly_bq_other_current_assets?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                if (t?.bq_other_current_assets1) {

                                    return <td key={i + "CA"}>{t?.bq_other_current_assets < 0 ? "-$" + millify(Math.abs(t?.bq_other_current_assets)) :
                                        "$" + millify(Math.abs(t?.bq_other_current_assets))}</td>
                                } else {
                                    return <td>N/A</td>
                                }
                            })
                        } */}
                {/* <th></th>
                <th></th>
                <th></th>
                <th></th> */}
                {/* <td></td>
                        <td></td>
                        <td></td> */}
              </tr>
              <tr>
                <th>Cash</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_cash?.find((f) => f?.year === d);
                    if (t?.bq_cash) {
                      return (
                        <td key={i + "bq_cash"}>
                          {t?.bq_cash < 0
                            ? t?.bq_cash === "-654801000.0" ? "-" : "-$" + millify(Math.abs(t?.bq_cash))
                            : "$" + millify(Math.abs(t?.bq_cash))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_cash?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_cash) {
                      return (
                        <td key={i + "bq_cash"}>
                          {t?.bq_cash < 0
                            ? t?.bq_cash === "-654801000.0" ? "-" : "-$" + millify(Math.abs(t?.bq_cash))
                            : "$" + millify(Math.abs(t?.bq_cash))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Trade Notes and Accounts Receivable</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.yearly_bq_trade_notes_and_accounts_receivable?.find(
                        (f) => f?.year === d
                      );
                    if (t?.bq_trade_notes_and_accounts_receivable) {
                      return (
                        <td key={i + "trade"}>
                          {t?.bq_trade_notes_and_accounts_receivable < 0
                            ? t?.bq_trade_notes_and_accounts_receivable === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(
                                  t?.bq_trade_notes_and_accounts_receivable
                                )
                              )
                            : "$" +
                            millify(
                              Math.abs(
                                t?.bq_trade_notes_and_accounts_receivable
                              )
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.quarterly_bq_trade_notes_and_accounts_receivable?.find(
                        (f) =>
                          f?.year === d?.year && f?.quarter === d?.quarter
                      );
                    if (t?.bq_trade_notes_and_accounts_receivable) {
                      return (
                        <td key={i + "trade"}>
                          {t?.bq_trade_notes_and_accounts_receivable < 0
                            ? t?.bq_trade_notes_and_accounts_receivable === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(
                                  t?.bq_trade_notes_and_accounts_receivable
                                )
                              )
                            : "$" +
                            millify(
                              Math.abs(
                                t?.bq_trade_notes_and_accounts_receivable
                              )
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Less Allowance for Bad Debts</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_less_allowance_for_bad_debts?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_less_allowance_for_bad_debts) {
                      return (
                        <td key={i + "bad"}>
                          {t?.bq_less_allowance_for_bad_debts < 0
                            ? t?.bq_less_allowance_for_bad_debts === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_less_allowance_for_bad_debts)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_less_allowance_for_bad_debts)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.quarterly_bq_less_allowance_for_bad_debts?.find(
                        (f) =>
                          f?.year === d?.year && f?.quarter === d?.quarter
                      );
                    if (t?.bq_less_allowance_for_bad_debts) {
                      return (
                        <td key={i + "bad"}>
                          {t?.bq_less_allowance_for_bad_debts < 0
                            ? t?.bq_less_allowance_for_bad_debts === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_less_allowance_for_bad_debts)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_less_allowance_for_bad_debts)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Inventories</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_inventories?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_inventories) {
                      return (
                        <td key={i + "yINvent"}>
                          {t?.bq_inventories < 0
                            ? t?.bq_inventories === "-654801000.0" ? "-" : "-$" + millify(Math.abs(t?.bq_inventories))
                            : "$" + millify(Math.abs(t?.bq_inventories))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_inventories?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_inventories) {
                      return (
                        <td key={i + "INvent"}>
                          {t?.bq_inventories < 0
                            ? t?.bq_inventories === "-654801000.0" ? "-" : "-$" + millify(Math.abs(t?.bq_inventories))
                            : "$" + millify(Math.abs(t?.bq_inventories))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>U.S. Government Obligations</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_us_government_obligations?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_us_government_obligations) {
                      return (
                        <td key={i + "gov"}>
                          {t?.bq_us_government_obligations < 0
                            ? t?.bq_us_government_obligations === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_us_government_obligations)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_us_government_obligations)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_us_government_obligations?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_us_government_obligations) {
                      return (
                        <td key={i + "gov"}>
                          {t?.bq_us_government_obligations < 0
                            ? t?.bq_us_government_obligations === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_us_government_obligations)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_us_government_obligations)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Tax-Exempt Securities</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_tax_exempt_securities?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_tax_exempt_securities) {
                      return (
                        <td key={i + "yTES"}>
                          {t?.bq_tax_exempt_securities < 0
                            ? t?.bq_tax_exempt_securities === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_tax_exempt_securities))
                            : "$" +
                            millify(Math.abs(t?.bq_tax_exempt_securities))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_tax_exempt_securities?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_tax_exempt_securities) {
                      return (
                        <td key={i + "TES"}>
                          {t?.bq_tax_exempt_securities < 0
                            ? t?.bq_tax_exempt_securities === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_tax_exempt_securities))
                            : "$" +
                            millify(Math.abs(t?.bq_tax_exempt_securities))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Other Current Assets</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_other_current_assets?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_other_current_assets) {
                      return (
                        <td key={i + "yoca"}>
                          {t?.bq_other_current_assets < 0
                            ? t?.bq_other_current_assets === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_other_current_assets))
                            : "$" +
                            millify(Math.abs(t?.bq_other_current_assets))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_other_current_assets?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_other_current_assets) {
                      return (
                        <td key={i + "oca"}>
                          {t?.bq_other_current_assets < 0
                            ? t?.bq_other_current_assets === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_other_current_assets))
                            : "$" +
                            millify(Math.abs(t?.bq_other_current_assets))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <td colSpan={"5"}></td>
              </tr>
              <tr>
                <th>
                  <strong>Non-Current Assets</strong>
                </th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_non_current_assets?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_non_current_assets) {
                      return (
                        <td key={i + "yearly_bq_non_current_assets"}>
                          {t?.bq_non_current_assets < 0
                            ? t?.bq_non_current_assets === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_non_current_assets))
                            : "$" +
                            millify(Math.abs(t?.bq_non_current_assets))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_non_current_assets?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_non_current_assets) {
                      return (
                        <td key={i + "bq_non_current_assets"}>
                          {t?.bq_non_current_assets < 0
                            ? t?.bq_non_current_assets === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_non_current_assets))
                            : "$" +
                            millify(Math.abs(t?.bq_non_current_assets))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
                {/* {
                            years?.map((d, i) => {
                                let t = 0;
                                t = state?.quarterly_bq_other_assets?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                if (t?.bq_other_assets) {

                                    return <td key={i + "Nca"}>{t?.bq_other_assets < 0 ? "-$" + millify(Math.abs(t?.bq_other_assets)) :
                                        "$" + millify(Math.abs(t?.bq_other_assets))}</td>
                                } else {
                                    return <td>N/A</td>
                                }
                            })
                        } */}
                {/* <th></th>
                <th></th>
                <th></th>
                <th></th> */}
              </tr>

              <tr>
                <th>Loans to Shareholders</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_loans_to_shareholders?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_loans_to_shareholders) {
                      return (
                        <td key={i + "l2s"}>
                          {t?.bq_loans_to_shareholders < 0
                            ? t?.bq_loans_to_shareholders === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_loans_to_shareholders))
                            : "$" +
                            millify(Math.abs(t?.bq_loans_to_shareholders))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_loans_to_shareholders?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_loans_to_shareholders) {
                      return (
                        <td key={i + "l2s"}>
                          {t?.bq_loans_to_shareholders < 0
                            ? t?.bq_loans_to_shareholders === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_loans_to_shareholders))
                            : "$" +
                            millify(Math.abs(t?.bq_loans_to_shareholders))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>

              <tr>
                <th>Mortgage and Real Estate Loans</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_mortgage_and_real_estate_loans?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_mortgage_and_real_estate_loans) {
                      return (
                        <td key={i + "mrel"}>
                          {t?.bq_mortgage_and_real_estate_loans < 0
                            ? t?.bq_mortgage_and_real_estate_loans === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_mortgage_and_real_estate_loans)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_mortgage_and_real_estate_loans)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.quarterly_bq_mortgage_and_real_estate_loans?.find(
                        (f) =>
                          f?.year === d?.year && f?.quarter === d?.quarter
                      );
                    if (t?.bq_mortgage_and_real_estate_loans) {
                      return (
                        <td key={i + "mrel"}>
                          {t?.bq_mortgage_and_real_estate_loans < 0
                            ? t?.bq_mortgage_and_real_estate_loans === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_mortgage_and_real_estate_loans)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_mortgage_and_real_estate_loans)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Other Investments</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_other_investments?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_other_investments) {
                      return (
                        <td key={i + "oiy2"}>
                          {t?.bq_other_investments < 0
                            ? t?.bq_other_investments === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_other_investments))
                            : "$" +
                            millify(Math.abs(t?.bq_other_investments))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_other_investments?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_other_investments) {
                      return (
                        <td key={i + "oi2"}>
                          {t?.bq_other_investments < 0
                            ? t?.bq_other_investments === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_other_investments))
                            : "$" +
                            millify(Math.abs(t?.bq_other_investments))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Buildings and Other Depreciable Assets</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.yearly_bq_buildings_and_other_depreciable_assets?.find(
                        (f) => f?.year === d
                      );
                    if (t?.bq_buildings_and_other_depreciable_assets) {
                      return (
                        <td key={i + "Boadp"}>
                          {t?.bq_buildings_and_other_depreciable_assets < 0
                            ? t?.bq_buildings_and_other_depreciable_assets === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(
                                  t?.bq_buildings_and_other_depreciable_assets
                                )
                              )
                            : "$" +
                            millify(
                              Math.abs(
                                t?.bq_buildings_and_other_depreciable_assets
                              )
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.quarterly_bq_buildings_and_other_depreciable_assets?.find(
                        (f) =>
                          f?.year === d?.year && f?.quarter === d?.quarter
                      );
                    if (t?.bq_buildings_and_other_depreciable_assets) {
                      return (
                        <td key={i + "Boadp"}>
                          {t?.bq_buildings_and_other_depreciable_assets < 0
                            ? t?.bq_buildings_and_other_depreciable_assets === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(
                                  t?.bq_buildings_and_other_depreciable_assets
                                )
                              )
                            : "$" +
                            millify(
                              Math.abs(
                                t?.bq_buildings_and_other_depreciable_assets
                              )
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Less Accumulated Depreciation</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_less_accumulated_depreciation?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_less_accumulated_depreciation) {
                      return (
                        <td key={i + "bq_less_accumulated_depreciation"}>
                          {t?.bq_less_accumulated_depreciation < 0
                            ? t?.bq_less_accumulated_depreciation === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_less_accumulated_depreciation)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_less_accumulated_depreciation)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.quarterly_bq_less_accumulated_depreciation?.find(
                        (f) =>
                          f?.year === d?.year && f?.quarter === d?.quarter
                      );
                    if (t?.bq_less_accumulated_depreciation) {
                      return (
                        <td key={i + "bq_less_accumulated_depreciation"}>
                          {t?.bq_less_accumulated_depreciation < 0
                            ? t?.bq_less_accumulated_depreciation === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_less_accumulated_depreciation)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_less_accumulated_depreciation)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Depletable Assets</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_depletable_assets?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_depletable_assets) {
                      return (
                        <td key={i + "bq_depletable_assets"}>
                          {t?.bq_depletable_assets < 0
                            ? t?.bq_depletable_assets === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_depletable_assets))
                            : "$" +
                            millify(Math.abs(t?.bq_depletable_assets))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_depletable_assets?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_depletable_assets) {
                      return (
                        <td key={i + "bq_depletable_assets"}>
                          {t?.bq_depletable_assets < 0
                            ? t?.bq_depletable_assets === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_depletable_assets))
                            : "$" +
                            millify(Math.abs(t?.bq_depletable_assets))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Less Accumulated Depletion</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_less_accumulated_depletion?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_less_accumulated_depletion) {
                      return (
                        <td key={i + "bq_less_accumulated_depletion"}>
                          {t?.bq_less_accumulated_depletion < 0
                            ? t?.bq_less_accumulated_depletion === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_less_accumulated_depletion)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_less_accumulated_depletion)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_less_accumulated_depletion?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_less_accumulated_depletion) {
                      return (
                        <td key={i + "bq_less_accumulated_depletion"}>
                          {t?.bq_less_accumulated_depletion < 0
                            ? t?.bq_less_accumulated_depletion === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_less_accumulated_depletion)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_less_accumulated_depletion)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Land (Net of Any Amortization)</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_land?.find((f) => f?.year === d);
                    if (t?.bq_land) {
                      return (
                        <td key={i + "bq_land"}>
                          {t?.bq_land < 0
                            ? t?.bq_land === "-654801000.0" ? "-" : "-$" + millify(Math.abs(t?.bq_land))
                            : "$" + millify(Math.abs(t?.bq_land))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_land?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_land) {
                      return (
                        <td key={i + "bq_land"}>
                          {t?.bq_land < 0
                            ? t?.bq_land === "-654801000.0" ? "-" : "-$" + millify(Math.abs(t?.bq_land))
                            : "$" + millify(Math.abs(t?.bq_land))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Intangible Assets (Amortizable Only)</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_intangible_assets_amortizable?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_intangible_assets_amortizable) {
                      return (
                        <td key={i + "bq_intangible_assets_amortizable"}>
                          {t?.bq_intangible_assets_amortizable < 0
                            ? t?.bq_intangible_assets_amortizable === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_intangible_assets_amortizable)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_intangible_assets_amortizable)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.quarterly_bq_intangible_assets_amortizable?.find(
                        (f) =>
                          f?.year === d?.year && f?.quarter === d?.quarter
                      );
                    if (t?.bq_intangible_assets_amortizable) {
                      return (
                        <td key={i + "bq_intangible_assets_amortizable"}>
                          {t?.bq_intangible_assets_amortizable < 0
                            ? t?.bq_intangible_assets_amortizable === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_intangible_assets_amortizable)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_intangible_assets_amortizable)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Less Accumulated Amortization</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_less_accumulated_amortization?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_less_accumulated_amortization) {
                      return (
                        <td key={i + "bq_less_accumulated_amortization"}>
                          {t?.bq_less_accumulated_amortization < 0
                            ? t?.bq_less_accumulated_amortization === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_less_accumulated_amortization)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_less_accumulated_amortization)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.quarterly_bq_less_accumulated_amortization?.find(
                        (f) =>
                          f?.year === d?.year && f?.quarter === d?.quarter
                      );
                    if (t?.bq_less_accumulated_amortization) {
                      return (
                        <td key={i + "bq_less_accumulated_amortization"}>
                          {t?.bq_less_accumulated_amortization < 0
                            ? t?.bq_less_accumulated_amortization === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_less_accumulated_amortization)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_less_accumulated_amortization)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Other Non-Current Assets</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_other_non_current_assets?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_other_non_current_assets) {
                      return (
                        <td key={i + "bq_other_assets"}>
                          {t?.bq_other_non_current_assets < 0
                            ? t?.bq_other_non_current_assets === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_other_non_current_assets)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_other_non_current_assets)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_other_non_current_assets?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_other_non_current_assets) {
                      return (
                        <td key={i + "bq_other_non_current_assets"}>
                          {t?.bq_other_non_current_assets < 0
                            ? t?.bq_other_non_current_assets === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_other_non_current_assets)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_other_non_current_assets)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <td colSpan={"5"}></td>
              </tr>
              <tr>
                <th>
                  <strong>Total Assets</strong>
                </th>
                {/* {
                            years?.map((d, i) => {
                                let t = 0;
                                t = state?.quarterly_bq_less_accumulated_amortization?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                if (t?.bq_less_accumulated_amortization1) {

                                    return <td key={i + "bq_Ta"}>{t?.bq_less_accumulated_amortization < 0 ?
                                        "-$" + millify(Math.abs(t?.bq_less_accumulated_amortization)) :
                                        "$" + millify(Math.abs(t?.bq_less_accumulated_amortization))}</td>
                                } else {
                                    return <td>N/A</td>
                                }
                            })
                        } */}
                {assets?.map((d, i) => (
                  <td key={i + "assets"}>
                    {d?.data === 0
                      ? "-"
                      : d?.data < 0
                        ? "-$" + millify(Math.abs(d?.data))
                        : "$" + millify(Math.abs(d?.data))}
                  </td>
                ))}
              </tr>
              <tr>
                <td colSpan={"5"}></td>
              </tr>
              <tr>
                <th>
                  <strong>Current Liabilities</strong>
                </th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_current_liabilities?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_current_liabilities) {
                      return (
                        <td key={i + "bq_current_liabilities"}>
                          {t?.bq_current_liabilities < 0
                            ? t?.bq_current_liabilities === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_current_liabilities))
                            : "$" +
                            millify(Math.abs(t?.bq_current_liabilities))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_current_liabilities?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_current_liabilities) {
                      return (
                        <td key={i + "bq_current_liabilitiesdd"}>
                          {t?.bq_current_liabilities < 0
                            ? t?.bq_current_liabilities === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_current_liabilities))
                            : "$" +
                            millify(Math.abs(t?.bq_current_liabilities))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
                {/* {
                            years?.map((d, i) => {
                                let t = 0;
                                t = state?.quarterly_bq_less_accumulated_amortization?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                if (t?.bq_less_accumulated_amortization1) {

                                    return <td key={i + "cul"}>{t?.bq_less_accumulated_amortization < 0 ?
                                        "-$" + millify(Math.abs(t?.bq_less_accumulated_amortization)) :
                                        "$" + millify(Math.abs(t?.bq_less_accumulated_amortization))}</td>
                                } else {
                                    return <td>-</td>
                                }
                            })
                        } */}
                {/* <th></th>
                <th></th>
                <th></th>
                <th></th> */}
              </tr>
              <tr>
                <th>Accounts Payable</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_accounts_payable?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_accounts_payable) {
                      return (
                        <td key={i + "bq_accounts_payable"}>
                          {t?.bq_accounts_payable < 0
                            ? t?.bq_accounts_payable === "-654801000.0" ? "-" : "-$" + millify(Math.abs(t?.bq_accounts_payable))
                            : "$" + millify(Math.abs(t?.bq_accounts_payable))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_accounts_payable?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_accounts_payable) {
                      return (
                        <td key={i + "bq_accounts_payable"}>
                          {t?.bq_accounts_payable < 0
                            ? t?.bq_accounts_payable === "-654801000.0" ? "-" : "-$" + millify(Math.abs(t?.bq_accounts_payable))
                            : "$" + millify(Math.abs(t?.bq_accounts_payable))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Mortgages, Notes, and Bonds Payable in Less Than 1 Year</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.yearly_bq_mortgages_notes_bonds_payable_less_than_1year?.find(
                        (f) => f?.year === d
                      );
                    if (t?.bq_mortgages_notes_bonds_payable_less_than_1year) {
                      return (
                        <td
                          key={
                            i +
                            "bq_mortgages_notes_bonds_payable_less_than_1year"
                          }
                        >
                          {t?.bq_mortgages_notes_bonds_payable_less_than_1year <
                            0
                            ? t?.bq_mortgages_notes_bonds_payable_less_than_1year === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(
                                  t?.bq_mortgages_notes_bonds_payable_less_than_1year
                                )
                              )
                            : "$" +
                            millify(
                              Math.abs(
                                t?.bq_mortgages_notes_bonds_payable_less_than_1year
                              )
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.quarterly_bq_mortgages_notes_bonds_payable_less_than_1year?.find(
                        (f) =>
                          f?.year === d?.year && f?.quarter === d?.quarter
                      );
                    if (t?.bq_mortgages_notes_bonds_payable_less_than_1year) {
                      return (
                        <td
                          key={
                            i +
                            "bq_mortgages_notes_bonds_payable_less_than_1year"
                          }
                        >
                          {t?.bq_mortgages_notes_bonds_payable_less_than_1year <
                            0
                            ? t?.bq_mortgages_notes_bonds_payable_less_than_1year === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(
                                  t?.bq_mortgages_notes_bonds_payable_less_than_1year
                                )
                              )
                            : "$" +
                            millify(
                              Math.abs(
                                t?.bq_mortgages_notes_bonds_payable_less_than_1year
                              )
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Other Current Liabilities</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_other_current_liabilities?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_other_current_liabilities) {
                      return (
                        <td key={i + "bq_other_current_liabilities"}>
                          {t?.bq_other_current_liabilities < 0
                            ? t?.bq_other_current_liabilities === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_other_current_liabilities)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_other_current_liabilities)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_other_current_liabilities?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_other_current_liabilities) {
                      return (
                        <td key={i + "bq_other_current_liabilities"}>
                          {t?.bq_other_current_liabilities < 0
                            ? t?.bq_other_current_liabilities === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_other_current_liabilities)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_other_current_liabilities)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <td colSpan={"5"}></td>
              </tr>
              <tr>
                <th>
                  <strong>Non-Current Liabilities</strong>
                </th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_non_current_liabilities?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_non_current_liabilities) {
                      return (
                        <td key={i + "bq_non_current_liabilities"}>
                          {t?.bq_non_current_liabilities < 0
                            ? t?.bq_non_current_liabilities === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_non_current_liabilities))
                            : "$" +
                            millify(
                              Math.abs(t?.bq_non_current_liabilities)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_non_current_liabilities?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_non_current_liabilities) {
                      return (
                        <td key={i + "bq_non_current_liabilitiesff"}>
                          {t?.bq_non_current_liabilities < 0
                            ? t?.bq_non_current_liabilities === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_non_current_liabilities))
                            : "$" +
                            millify(
                              Math.abs(t?.bq_non_current_liabilities)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
                {/* {
                            years?.map((d, i) => {
                                let t = 0;
                                t = state?.quarterly_bq_other_current_liabilities?.find((f) => (f?.year === d?.year) && (f?.quarter === d?.quarter))
                                if (t?.bq_other_current_liabilities1) {

                                    return <td key={i + "bq_other_current_liabilities"}>{t?.bq_other_current_liabilities < 0 ?
                                        "-$" + millify(Math.abs(t?.bq_other_current_liabilities)) :
                                        "$" + millify(Math.abs(t?.bq_other_current_liabilities))}</td>
                                } else {
                                    return <td>-</td>
                                }
                            })
                        } */}
                {/* <th></th>
                <th></th>
                <th></th>
                <th></th> */}
              </tr>
              <tr>
                <th>Loans from Shareholders</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_loans_from_shareholders?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_loans_from_shareholders) {
                      return (
                        <td key={i + "bq_loans_from_shareholders"}>
                          {t?.bq_loans_from_shareholders < 0
                            ? t?.bq_loans_from_shareholders === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_loans_from_shareholders))
                            : "$" +
                            millify(
                              Math.abs(t?.bq_loans_from_shareholders)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_loans_from_shareholders?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_loans_from_shareholders) {
                      return (
                        <td key={i + "bq_loans_from_shareholders"}>
                          {t?.bq_loans_from_shareholders < 0
                            ? t?.bq_loans_from_shareholders === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_loans_from_shareholders))
                            : "$" +
                            millify(
                              Math.abs(t?.bq_loans_from_shareholders)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <th>Mortgages, Notes, and Bonds Payable in 1 Year or More</th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.yearly_bq_mortgages_notes_bonds_payable_more_than_1year?.find(
                        (f) => f?.year === d
                      );
                    if (t?.bq_mortgages_notes_bonds_payable_more_than_1year) {
                      return (
                        <td
                          key={
                            i +
                            "bq_mortgages_notes_bonds_payable_more_than_1year"
                          }
                        >
                          {t?.bq_mortgages_notes_bonds_payable_more_than_1year <
                            0
                            ? t?.bq_mortgages_notes_bonds_payable_more_than_1year === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(
                                  t?.bq_mortgages_notes_bonds_payable_more_than_1year
                                )
                              )
                            : "$" +
                            millify(
                              Math.abs(
                                t?.bq_mortgages_notes_bonds_payable_more_than_1year
                              )
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.quarterly_bq_mortgages_notes_bonds_payable_more_than_1year?.find(
                        (f) =>
                          f?.year === d?.year && f?.quarter === d?.quarter
                      );
                    if (t?.bq_mortgages_notes_bonds_payable_more_than_1year) {
                      return (
                        <td
                          key={
                            i +
                            "bq_mortgages_notes_bonds_payable_more_than_1year"
                          }
                        >
                          {t?.bq_mortgages_notes_bonds_payable_more_than_1year <
                            0
                            ? t?.bq_mortgages_notes_bonds_payable_more_than_1year === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(
                                  t?.bq_mortgages_notes_bonds_payable_more_than_1year
                                )
                              )
                            : "$" +
                            millify(
                              Math.abs(
                                t?.bq_mortgages_notes_bonds_payable_more_than_1year
                              )
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <td colSpan={"5"}></td>
              </tr>
              <tr>
                <th>
                  <strong>Other Non-Current Liabilities</strong>
                </th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_other_non_current_liabilities?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_other_non_current_liabilities) {
                      return (
                        <td key={i + "bq_other_non_current_liabilities"}>
                          {t?.bq_other_non_current_liabilities < 0
                            ? t?.bq_other_non_current_liabilities === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_other_non_current_liabilities)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_other_non_current_liabilities)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t =
                      state?.quarterly_bq_other_non_current_liabilities?.find(
                        (f) =>
                          f?.year === d?.year && f?.quarter === d?.quarter
                      );
                    if (t?.bq_other_non_current_liabilities) {
                      return (
                        <td key={i + "bq_other_non_current_liabilities"}>
                          {t?.bq_other_non_current_liabilities < 0
                            ? t?.bq_other_non_current_liabilities === "-654801000.0" ? "-" : "-$" +
                              millify(
                                Math.abs(t?.bq_other_non_current_liabilities)
                              )
                            : "$" +
                            millify(
                              Math.abs(t?.bq_other_non_current_liabilities)
                            )}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
              <tr>
                <td colSpan={"5"}></td>
              </tr>
              {/* <tr>
                <th>
                  <strong>Total Liabilities and Shareholders Equity</strong>
                </th>
                {toggle === true
                  ? ny?.map((d, i) => {
                      let t = 0;
                      t = state?.yearly_bq_total_liabilities_and_equity?.find(
                        (f) => f?.year === d
                      );
                      if (t?.bq_total_liabilities_and_equity) {
                        return (
                          <td key={i + "bq_total_liabilities_and_equity"}>
                            {t?.bq_total_liabilities_and_equity < 0
                              ? "-$" +
                                millify(
                                  Math.abs(t?.bq_total_liabilities_and_equity)
                                )
                              : "$" +
                                millify(
                                  Math.abs(t?.bq_total_liabilities_and_equity)
                                )}
                          </td>
                        );
                      } else {
                        return <td>-</td>;
                      }
                    })
                  : years?.map((d, i) => {
                      let t = 0;
                      t =
                        state?.quarterly_bq_total_liabilities_and_equity?.find(
                          (f) =>
                            f?.year === d?.year && f?.quarter === d?.quarter
                        );
                      if (t?.bq_total_liabilities_and_equity) {
                        return (
                          <td key={i + "bq_total_liabilities_and_equity"}>
                            {t?.bq_total_liabilities_and_equity < 0
                              ? "-$" +
                                millify(
                                  Math.abs(t?.bq_total_liabilities_and_equity)
                                )
                              : "$" +
                                millify(
                                  Math.abs(t?.bq_total_liabilities_and_equity)
                                )}
                          </td>
                        );
                      } else {
                        return <td>-</td>;
                      }
                    })}
              </tr> */}
              <tr>
                <th>
                  <strong>Total Liabilities</strong>
                </th>
                {toggle === true
                  ? ny?.map((d, i) => {
                    let t = 0;
                    t = state?.yearly_bq_total_liabilities?.find(
                      (f) => f?.year === d
                    );
                    if (t?.bq_total_liabilities) {
                      return (
                        <td key={i + "bq_total_liabilities"}>
                          {t?.bq_total_liabilities < 0
                            ? t?.bq_total_liabilities === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_total_liabilities))
                            : "$" +
                            millify(Math.abs(t?.bq_total_liabilities))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })
                  : years?.map((d, i) => {
                    let t = 0;
                    t = state?.quarterly_bq_total_liabilities?.find(
                      (f) => f?.year === d?.year && f?.quarter === d?.quarter
                    );
                    if (t?.bq_total_liabilities) {
                      return (
                        <td key={i + "bq_total_liabilities"}>
                          {t?.bq_total_liabilities < 0
                            ? t?.bq_total_liabilities === "-654801000.0" ? "-" : "-$" +
                              millify(Math.abs(t?.bq_total_liabilities))
                            : "$" +
                            millify(Math.abs(t?.bq_total_liabilities))}
                        </td>
                      );
                    } else {
                      return <td>-</td>;
                    }
                  })}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default BalanceSheet;
