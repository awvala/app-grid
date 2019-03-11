import * as React from 'react';
import styles from '../AppBoard.module.scss';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export const CompleteItem = props => {

    // decrlare variable and store string with HTML to convert with the ReactHTMLParse module.
    const html = props.description;

    return (
        <div className={`${styles.card} ${styles.blueHover}`}>
                <header className={`ms-font-l ${styles.cardHeader}`}>
                    {props.title}
                </header>
                <div className={`${styles.dateContainer}`}>
                    <Moment format="MM/DD/YY">{props.target}</Moment>
                </div>
                    <p className={`ms-fontSize-sPlus ${styles.cardDescription}`}>{ReactHtmlParser(html)}</p>
                <PrimaryButton
                    className={styles.cardButton}
                    data-automation-id={props.id}
                    text="Read More"
                    onClick={this._alertClicked}
                    allowDisabledFocus={true}
                />
            </div>
    );
};

