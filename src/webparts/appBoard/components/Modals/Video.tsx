import * as React from 'react';
import styles from '../AppBoard.module.scss';
import ReactPlayer from 'react-player';


export const Video = props => {
        return (
            <div className={styles.playerWrapper}>
                <ReactPlayer
                    className={styles.reactPlayer}
                    url={props.Video}
                    width='100%'
                    height='100%'
                />
            </div>
        );
    };

