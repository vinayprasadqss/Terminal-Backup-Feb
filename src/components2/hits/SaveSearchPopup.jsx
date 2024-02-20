
import React, { useState } from 'react';
import { Modal } from 'antd';
import { SaveSearchQuery, checkSession } from '../../Aws/Aws-api';
import { SaveSearch_Utillity } from '../../utils/utility';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from "@ant-design/icons";

const SaveSearchPopup = ({ isModalOpen, setIsModalOpen, query, nameSearch, activeTab, prefix, multiFilter, token }) => {

    const [name, setName] = useState(query);
    const [loading, setLoading] = useState(false);
    // const [overwrite, setOverwrite] = useState(false)
    const email = localStorage.getItem("aws-email")
    const dispatch = useDispatch();
    const Navigate = useNavigate();


    const saveRec = async (overwrite, req) => {
        try {
            const res = await SaveSearchQuery(req.query, email, req.category, overwrite, name, token)
            return res
        } catch (error) {
            console.log(error);
        }
    }



    const saveSearchx = async () => {
        try {
            if (query === undefined) {
                return sweetAlert("Oops...", "Query is empty", "error");
            }

            setLoading(false);
            const req = SaveSearch_Utillity(query, nameSearch, activeTab, prefix, multiFilter);
            const result = await saveRec(false, req);

            if (result?.data?.response === "Search saved successfully.") {
                sweetAlert({
                    title: "Search saved successfully",
                    icon: "success",
                });
                Navigate("/save_search");
            } else if (result?.data?.response === "Same name already exists.") {
                const isConfirm = await swal({
                    title: "Already Exist!",
                    text: "A Saved Search with the exact same name already exists in the Records. Do you want to overwrite?",
                    icon: "warning",
                    buttons: {
                        cancel: {
                            text: "Cancel",
                            value: null,
                            visible: true,
                            className: "swal-button--cancel",
                        },
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "swal-button--confirm",
                        },
                    },
                });

                if (isConfirm) {
                    const res = await saveRec(true, req);
                    if (res?.data?.response === "Data updated successfully.") {
                        sweetAlert({
                            title: "Data updated successfully.",
                            icon: "success",
                        });
                        setIsModalOpen(false);
                        Navigate("/save_search");
                    } else {
                        sweetAlert("Oops...", "Something went wrong", "error");
                    }
                }
            } else {
                sweetAlert("Oops...", "Something went wrong", "error");
            }
        } catch (error) {
            console.log(error);
            checkSession(error, dispatch, Navigate);
        } finally {
            setLoading(false);
        }
    };




    return (
        <Modal className='save-search-modal' width={600} title={<div className='head-save-search'>Save Search</div>
        } open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={false} centered>
            <div className="save-search-wrap">
                <div className="save-search-group">
                    <label>Please provide the name by which you want your query to be saved.</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Sample Name' />
                </div>
                <button disabled={loading} onClick={saveSearchx}>{loading ? <LoadingOutlined /> : "Submit"}</button>
            </div>

        </Modal>
    )
}

export default SaveSearchPopup