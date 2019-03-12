import * as React from 'react';
import styles from '../AppBoard.module.scss';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Modal } from 'office-ui-fabric-react/lib/Modal';

// export const BacklogModal = props => {

//     return (

//         <div>
//             <Modal
//             modalKey=
//             modalState={ui.Modal}
//             >
//                 <div className={styles.modalHeader}>
//                     <span id={props.id}>{props.title}</span>
//                 </div>
//                 <div className={styles.modalBody}>
//                     <DefaultButton onClick={this._CloseModal} text="Close" />
//                     <br></br>
//                     <p>{ReactHtmlParser(props.html)}</p>
//                 </div>
//             </Modal>
//         </div>
//     );
// };


export interface IModalBasicExampleState {
    showModal: boolean;
  }
  
  export class ModalBasicExample extends React.Component<{Title: string, html: any, id: string}, IModalBasicExampleState> {
    public state: IModalBasicExampleState = {
      showModal: false
    };

// Use getId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings without getId() and manually ensure uniqueness.)
  private _titleId: string = getId('title');
  private _subtitleId: string = getId('subText');

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Modal" onClick={this._showModal} text="Open Modal" />
        <Modal
          titleAriaId={this.props.id}
          subtitleAriaId={this._subtitleId}
          isOpen={this.state.showModal}
          onDismiss={this._closeModal}
          isBlocking={false}
          containerClassName="ms-modalExample-container"
        >
          <header className="ms-modalExample-header">
            <h2>{this.props.Title}</h2>
          </header>
          <div id={this._subtitleId} className="ms-modalExample-body">
            <p>{ReactHtmlParser(this.props.html)}</p>
          </div>
          <footer className="footerPlaceholder">
            <DefaultButton onClick={this._closeModal} text="Close" />
          </footer>
        </Modal>
      </div>
    );
  }

  private _showModal = (): void => {
    this.setState({ showModal: true });
  }

  private _closeModal = (): void => {
    this.setState({ showModal: false });
  }
}