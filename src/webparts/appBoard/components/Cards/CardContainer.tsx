import * as React from 'react';
import styles from '../AppBoard.module.scss';

export const CardContainer = props =>
  <div className={`${styles.viewContainer} ms-slideLeftIn20`}>
    {props.children}
  </div>;