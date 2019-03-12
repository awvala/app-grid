import * as React from 'react';
import styles from '../AppBoard.module.scss';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import Modal from 'react-awesome-modal';

export default class CardModal extends React.Component<{ Title: string, id: string, html: any, visible: boolean }, { /*visible: boolean*/ }> {
    constructor(props) {
        super(props);
        this.state = {
            // visible: false
        };
    }

    public openModal() {
        this.setState({
            visible: true
        });
    }

    public closeModal() {
        this.setState({
            visible: false
        });
    }

    public render() {
        return (
            <Modal
                visible={this.props.visible}
                width="400"
                height="300"
                effect="fadeInUp"
                onClickAway={() => this.closeModal()}
            >
                <div className={styles.modalHeader}>
                    <span id={this.props.id}>{this.props.Title}</span>
                </div>
                <div className={styles.modalBody}>
                    <DefaultButton onClick={this.closeModal} text="Close" />
                    <br></br>
                    <p>{ReactHtmlParser(this.props.html)}</p>
                </div>
            </Modal>
        );
    }
}