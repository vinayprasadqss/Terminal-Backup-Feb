import React, { useState } from 'react'
import FooterModal from './FooterModal';

const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <footer className={`footer`}>
            {/*<p>© 2023 <a href="https://www.brightquery.ai/" target={"_blank"}>BrightQuery</a>, Inc All rights reserved.*/}
            {/*<p>© 2023 BrightQuery, Inc All rights reserved.</p>*/}

            <p>© 2024 BrightQuery, Inc. All rights reserved. U.S. patent pending. Contact:
                <a href="mailto:sales@brightquery.com"> sales@brightquery.com </a>
                or <a href="tel:1-888-BQDATA1"> 1-888-BQDATA1</a>.</p>

            <div style={{ display: "flex", flexDirection: "column", color: "#fff", alignItems: "flex-end" }}>
                <p className='link' onClick={() => setIsModalOpen(true)}>Note on BrightQuery (BQ) employment and financial methodologies</p>
                <a className='link' href='https://docs.brightquery.com/' target='_blank'>https://docs.brightquery.com</a>
            </div>


            <FooterModal
                isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
            />
        </footer>
    )
}

export default Footer
