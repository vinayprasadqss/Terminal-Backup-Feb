import { Modal } from 'antd'
import millify from 'millify'
import React, { useEffect, useState } from 'react'
import MultiAreaGraph from './graphs/MultiAreaGraph'
import FSMLineAreaGraph from './graphs/FSMLineAreaGraph'
import { GetFSM } from '../redux/action'

const FinancialSummeryModal = ({ open, setOpen, fsmQuery }) => {
    const [state, setState] = useState([]);
    // console.log(fsmQuery)
    const fetchRecords = async () => {
        try {
            const result = await GetFSM(fsmQuery);
            // console.log(result)

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (fsmQuery) {
            fetchRecords()
        }

    }, [fsmQuery])



    return (
        <Modal
            title={<h4>FINANCIAL SUMMERY</h4>}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={false}
            className='fsm'
        >
            <div className="fwrap">
                <div className="left">
                    <h4>YEARLY BASED FINANCIAL SUMMERY</h4>
                    <p>The Annual Financial Summary provides a comprehensive overview of an organization's financial performance over the course of a year.
                    </p>
                    <table>
                        <thead>
                            <th>FINANCIALS</th>
                            <th>2019</th>
                            <th>2020</th>
                            <th>2021</th>
                            <th>2022</th>
                            <th>2023</th>

                        </thead>
                        <tbody>
                            <tr>
                                <td>Revenue</td>
                                <td>${millify(20000)}</td>
                                <td>${millify(78090)}</td>
                                <td>${millify(87654)}</td>
                                <td>${millify(99999)}</td>
                                <td>${millify(67706540)}</td>
                            </tr>
                            <tr>
                                <td>Headcount</td>
                                <td>{millify(200)}</td>
                                <td>{millify(780)}</td>
                                <td>{millify(876)}</td>
                                <td>{millify(999)}</td>
                                <td>{millify(677)}</td>
                            </tr>
                            <tr>
                                <td>Ebita</td>
                                <td>${millify(20000)}</td>
                                <td>${millify(78090)}</td>
                                <td>${millify(87654)}</td>
                                <td>${millify(99999)}</td>
                                <td>${millify(67706540)}</td>
                            </tr>

                        </tbody>
                    </table>
                </div><div className="right">
                    <FSMLineAreaGraph
                        height={250}
                        width={"400"}
                        containerId="container310"
                        linecolor={"#303c92"}
                        labelcolor={"#000"}
                        data1={[550, 200, 300, 400, 500]}
                        data2={[150, 250, 350, 450, 550]}
                        data3={[50, 180, 140, 500, 470]}
                    />
                </div>
            </div>
            <br></br>
            {/* <div className="fwrap">
                <div className="left">
                    <h4>MONTHLY BASED FINANCIAL SUMMERY</h4>
                    <p>The Annual Financial Summary provides a comprehensive overview of an organization's financial performance over the course of a year.
                    </p>
                    <table>
                        <thead>
                            <th>FINANCIALS</th>
                            <th>2019</th>
                            <th>2020</th>
                            <th>2021</th>
                            <th>2022</th>
                            <th>2023</th>

                        </thead>
                        <tbody>
                            <tr>
                                <td>Revenue</td>
                                <td>${millify(20000)}</td>
                                <td>${millify(78090)}</td>
                                <td>${millify(87654)}</td>
                                <td>${millify(99999)}</td>
                                <td>${millify(67706540)}</td>
                            </tr>
                            <tr>
                                <td>Headcount</td>
                                <td>{millify(200)}</td>
                                <td>{millify(780)}</td>
                                <td>{millify(876)}</td>
                                <td>{millify(999)}</td>
                                <td>{millify(677)}</td>
                            </tr>
                            <tr>
                                <td>Ebita</td>
                                <td>${millify(20000)}</td>
                                <td>${millify(78090)}</td>
                                <td>${millify(87654)}</td>
                                <td>${millify(99999)}</td>
                                <td>${millify(67706540)}</td>
                            </tr>

                        </tbody>
                    </table>
                </div><div className="right">
                    <FSMLineAreaGraph
                        height={200}
                        containerId="container3140"
                        linecolor={"#303c92"}
                        labelcolor={"#000"}
                        data1={[550, 200, 300, 400, 500]}
                        data2={[150, 250, 350, 450, 550]}
                        data3={[50, 180, 140, 500, 470]}
                    />
                </div>
            </div>
            <br></br>
            <div className="fwrap">
                <div className="left">
                    <h4>MONTHLY BASED FINANCIAL SUMMERY</h4>
                    <p>The Annual Financial Summary provides a comprehensive overview of an organization's financial performance over the course of a year.
                    </p>
                    <table>
                        <thead>
                            <th>FINANCIALS</th>
                            <th>2019</th>
                            <th>2020</th>
                            <th>2021</th>
                            <th>2022</th>
                            <th>2023</th>

                        </thead>
                        <tbody>
                            <tr>
                                <td>Revenue</td>
                                <td>${millify(20000)}</td>
                                <td>${millify(78090)}</td>
                                <td>${millify(87654)}</td>
                                <td>${millify(99999)}</td>
                                <td>${millify(67706540)}</td>
                            </tr>
                            <tr>
                                <td>Headcount</td>
                                <td>{millify(200)}</td>
                                <td>{millify(780)}</td>
                                <td>{millify(876)}</td>
                                <td>{millify(999)}</td>
                                <td>{millify(677)}</td>
                            </tr>
                            <tr>
                                <td>Ebita</td>
                                <td>${millify(20000)}</td>
                                <td>${millify(78090)}</td>
                                <td>${millify(87654)}</td>
                                <td>${millify(99999)}</td>
                                <td>${millify(67706540)}</td>
                            </tr>

                        </tbody>
                    </table>
                </div><div className="right">
                    <FSMLineAreaGraph
                        height={200}
                        containerId="container3140"
                        linecolor={"#303c92"}
                        labelcolor={"#000"}
                        data1={[550, 200, 300, 400, 500]}
                        data2={[150, 250, 350, 450, 550]}
                        data3={[50, 180, 140, 500, 470]}
                    />
                </div>
            </div> */}
        </Modal>
    )
}

export default FinancialSummeryModal