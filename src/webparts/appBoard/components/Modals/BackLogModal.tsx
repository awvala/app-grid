import * as React from 'react';
import styles from '../AppBoard.module.scss';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Video } from './Video';
import './BackLogModalStyle.css';  // Import regular stylesheet

export interface IBacklogModalState {
  showModal: boolean;
}

export class BacklogModal extends React.Component<{ Title: string, html: any, id: string, TargetDate: string, Video: string }, IBacklogModalState> {
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
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <header className="modalHeader">
                <h2>{this.props.Title}</h2>
              </header>
            </div>

            <div className="ms-Grid-row">
              <div className="modalBody ms-Grid-col ms-sm12 ms-xl7 ms-xxxl9">
                <div className={`ms-fontSize-s modalDate`}>
                  {this.props.TargetDate ? <Moment format="MM/DD/YY">{this.props.TargetDate}</Moment>
                    : "TBD"
                  }
                </div>
                <div className="modalDescription">
                  {ReactHtmlParser(this.props.html)}
                </div>
              </div>

              {!this.props.Video ? null
                : <div className="modalVideo ms-Grid-col ms-sm12 ms-xl5 ms-xxxl3">
                  <Video
                    Video={this.props.Video}
                  />
                </div>
              }
            </div>

            <div className="ms-Grid-row">
              <footer className="modalFooter">
                <DefaultButton
                  onClick={this._closeModal}
                  text="Close"
                  className="secondaryButton"
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