import * as React from 'react';
import styles from './CardModal.module.scss';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Video } from './Video';

export interface ICardModalProps {
  Title: string;
  html: any; 
  id: string;
  TargetDate: string;
  Video: string;
}

export interface ICardModalState {
  showModal: boolean;
}

export class CardModal extends React.Component<ICardModalProps, ICardModalState> {
  public state: ICardModalState = {
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
          containerClassName={`${styles.modalContainer} ms-slideUpIn20`}
        >
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <header className={`${styles.modalHeader}`}>
                <h2>{this.props.Title}</h2>
              </header>
            </div>

            <div className="ms-Grid-row">
              <div className={!this.props.Video ? "modalBody ms-Grid-col ms-sm12" : "modalBody ms-Grid-col ms-sm12 ms-xxl7"}>
                <div className={`ms-fontSize-s ${styles.modalDate}`}>
                  {this.props.TargetDate ? <Moment format="MM/DD/YY">{this.props.TargetDate}</Moment>
                    : "TBD"
                  }
                </div>
                <div className={`${styles.modalDescription}`}>
                  {ReactHtmlParser(this.props.html)}
                </div>
              </div>

              {!this.props.Video ? null
                : <div className={`${styles.modalVideo} ms-Grid-col ms-sm12 ms-xxl5`}>
                  <Video
                    Video={this.props.Video}
                  />
                </div>
              }
            </div>

            <div className="ms-Grid-row">
              <footer className={`${styles.modalFooter}`}>
                <DefaultButton
                  onClick={this._closeModal}
                  text="Close"
                  className={styles.secondaryButton}
                />
              </footer>
            </div>
          </div>
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