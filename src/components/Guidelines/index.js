
import React, { useState } from 'react';
import Modal from '../../ui/Modal';
import Regulations from './Regulations';
import styles from './guidelines.module.less';


const ExcelGuidelines = (props) => {

    const [openModal, setOpenModal] = useState(false);

    const handleGuidelines = () => {
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <>
            <div className="clearfix"></div>
            <div className="col-12 text-right pt-1 pr-3">
                <a onClick={handleGuidelines} className={styles.excelGuidelineTxt}>Excel Guidelines</a>
            </div>

            <Modal openModal={openModal}
                modalTitle="Excel Guidelines" handleCloseAction={handleClose}
                closeBtnLabel="Close">
                <Regulations></Regulations>
            </Modal>
            <div className="clearfix"></div>
        </>
    )
}

export default ExcelGuidelines;