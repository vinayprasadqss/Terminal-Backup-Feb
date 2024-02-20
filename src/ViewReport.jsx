import React, { useState } from 'react'
import ReportModal from './components2/ReportModal'

const ViewReport = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>View Report</button>
            <ReportModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>

    )
}

export default ViewReport