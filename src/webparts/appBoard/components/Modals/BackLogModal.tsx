import * as React from 'react';
import styles from '../AppBoard.module.scss';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import './BackLogModalStyle.css';  // Import regular stylesheet

export interface IBacklogModalState {
  showModal: boolean;
}

export class BacklogModal extends React.Component<{ Title: string, html: any, id: string, TargetDate: string }, IBacklogModalState> {
  public state: IBacklogModalState = {
    showModal: false
  };

  public render(): JSX.Element {
    return (
      <div>
        <PrimaryButton
          className={`${styles.cardButton} ms-slideUpIn20`}
          data-automation-id={this.props.id}
          secondaryText="See additional app information"
          text="Read More"
          onClick={this._showModal}
          allowDisabledFocus={true}
        />
        <Modal
          titleAriaId={this.props.id}
          isOpen={this.state.showModal}
          onDismiss={this._closeModal}
          isBlocking={false}
          containerClassName={`modalContainer ms-slideUpIn20`}
        >
          <header className="modalHeader">
            <h2>{this.props.Title}</h2>
          </header>
          <div className={`ms-fontSize-s modalDate`}>
            {this.props.TargetDate ? <Moment format="MM/DD/YY">{this.props.TargetDate}</Moment>
              : "TBD"
            }
          </div>
          <div className="modalBody">
            {ReactHtmlParser(this.props.html)}
          </div>
          <footer className="modalFooter">
            <DefaultButton
              onClick={this._closeModal}
              text="Close"
              className="secondaryButton"
            />
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