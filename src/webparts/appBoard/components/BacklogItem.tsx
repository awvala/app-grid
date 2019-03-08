import * as React from 'react';
import styles from './AppBoard.module.scss';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';

export const BacklogItem = props => {

    // decrlare variable and store string with HTML to convert with the ReactHTMLParse module.
    const html = props.description;

    return (
        <div className={`rounded ${styles.backlogItem}`}>
            <header>
                <div className="ms-fontSize-m">
                    {props.title}
                </div>
            </header>
            <div className="ms-fontsize-s">
                <p className={styles.cardDescription}>{ReactHtmlParser(html)}</p>
                <div className={styles.cardDetail}>
                    <div className={styles.dateStyle}>
                        <i className="ms-Icon ms-Icon--AlarmClock" aria-hidden="true"></i> <Moment format="MM/DD/YY">{props.target}</Moment>
                    </div>
                </div>
            </div>
        </div>
    );
};