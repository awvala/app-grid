import * as React from 'react';
import styles from '../AppBoard.module.scss';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { BacklogModal } from './BacklogModal';

export const BacklogItem = props => {

    // declare variable and store string with HTML to convert with the ReactHTMLParse module.
    const html = props.description;

    return (
        <div className={`${styles.card}`}>
            <header className={`ms-font-l ${styles.cardHeader}`}>
                {props.title}
            </header>
            <div className={`${styles.dateContainer}`}>
                {props.targetdate ? <Moment format="MM/DD/YY">{props.targetdate}</Moment>
                    : "TBD"
                }
            </div>
            <p className={`ms-fontSize-sPlus ${styles.cardDescription}`}>{ReactHtmlParser(html)}</p>
            <div className={styles.modalWrapper}>
                <BacklogModal
                    Title={props.title}
                    id={props.id}
                    html={html}
                />
            </div>
        </div>
    );
};