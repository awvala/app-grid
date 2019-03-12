import * as React from 'react';
import styles from '../AppBoard.module.scss';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import './BackLogModal.css';  // Import regular stylesheet

export interface IBacklogModalState {
  showModal: boolean;
}

export class BacklogModal extends React.Component<{ Title: string, html: any, id: string }, IBacklogModalState> {
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
          containerClassName={`modalContainer ms-slideUpIn20"`}
        >
          <header className="modalHeader">
            <h2>{this.props.Title}</h2>
          </header>
          <div className="modalBody">
            <p>{ReactHtmlParser(this.props.html)}</p>
          </div>
          <footer className="modalFooter">
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