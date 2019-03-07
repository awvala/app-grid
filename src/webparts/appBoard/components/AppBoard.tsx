import * as React from 'react';
import styles from './AppBoard.module.scss';
import { IAppBoardProps } from './IAppBoardProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class AppBoard extends React.Component<IAppBoardProps, {}> {
  public render(): React.ReactElement<IAppBoardProps> {
    return (
      <div className={ styles.appBoard }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
