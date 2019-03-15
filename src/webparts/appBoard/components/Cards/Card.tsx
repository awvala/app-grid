import * as React from 'react';
import styles from '../AppBoard.module.scss';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { BacklogModal } from '../Modals/BacklogModal';

export const Card = props => {

    // declare variable and store string with HTML to convert with the ReactHTMLParse module.
    const html = props.description;

    return (
        <div className={`${styles.card}`}>
            <header className={`ms-font-l ${styles.cardHeader}`}>
                {props.title}
            </header>
            <div className = {`${styles.cardBody}`}>
                <div className={`ms-fontSize-s ${styles.dateContainer}`}>
                    {props.targetdate ? <Moment format="MM/DD/YY">{props.targetdate}</Moment>
                        : "TBD"
                    }
                </div>
                <div className={`${styles.cardDescription}`}>
                    {ReactHtmlParser(html)}
                </div>
            </div>
            <div className={styles.modalWrapper}>
                <BacklogModal
                    Title={props.title}
                    id={props.id}
                    html={html}
                    TargetDate={props.TargetDate}
                    Video={props.Video}
                />
            </div>
        </div>
    );
};