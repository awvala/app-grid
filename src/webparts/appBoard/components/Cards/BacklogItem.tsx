import * as React from 'react';
import styles from '../AppBoard.module.scss';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ModalBasicExample } from './BacklogModal';
// mport Modal from 'react-awesome-modal';

export const BacklogItem = props => {
    
    // declare variable and store string with HTML to convert with the ReactHTMLParse module.
    const html = props.description;

    return (
        <div className={`${styles.card} `}>
            <header className={`ms-font-l ${styles.cardHeader}`}>
                {props.title}
            </header>
            <div className={`${styles.dateContainer}`}>
                {props.targetdate ? <Moment format="MM/DD/YY">{props.targetdate}</Moment>
                    : "TBD"
                }
            </div>
            <p className={`ms-fontSize-sPlus ${styles.cardDescription}`}>{ReactHtmlParser(html)}</p>
            <PrimaryButton
                className={styles.cardButton}
                data-automation-id={props.id}
                secondaryText="See additional app information"
                text="Read More"
                onClick={props._ShowModal}
                allowDisabledFocus={true}
            />
            <ModalBasicExample
                Title = {props.title}
                id = {props.id}
                html = {html}
            />
            {/* <Modal
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
            </Modal> */}
        </div>
    );
};

// export interface IModalBasicExampleState {
//     showModal: boolean;
//   }
  
//   export class ModalBasicExample extends React.Component<{}, IModalBasicExampleState> {
//     public state: IModalBasicExampleState = {
//       showModal: false
//     };

//     public openModal() {
//         this.setState({
//             visible: true
//         });
//     }

//     public closeModal() {
//         this.setState({
//             visible: false
//         });
//     }

//     public render() {
//         return (
//             <Modal
//                 visible={this.props.visible}
//                 width="400"
//                 height="300"
//                 effect="fadeInUp"
//                 onClickAway={() => this.closeModal()}
//             >
//                 <div className={styles.modalHeader}>
//                     <span id={this.props.id}>{this.props.Title}</span>
//                 </div>
//                 <div className={styles.modalBody}>
//                     <DefaultButton onClick={this.closeModal} text="Close" />
//                     <br></br>
//                     <p>{ReactHtmlParser(this.props.html)}</p>
//                 </div>
//             </Modal>
//         );
//     }
// }

