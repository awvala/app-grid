import * as React from 'react';
import styles from '../AppBoard.module.scss';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';

export interface IBacklogModalState {
    showModal: boolean;
  }
  
  export class BacklogModal extends React.Component<{Title: string, html: any, id: string}, IBacklogModalState> {
    public state: IBacklogModalState = {
      showModal: false
    };

  public render(): JSX.Element {
    return (
      <div>
        <PrimaryButton
            className={styles.cardButton}
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
          containerClassName="ms-modalExample-container"
        >
          <header className="ms-modalExample-header">
            <h2>{this.props.Title}</h2>
          </header>
          <div className="ms-modalExample-body">
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