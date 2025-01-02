import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import styles from './GitTracker.module.css'; // Importing CSS Module

const restEndpoint = "https://api.github.com/repos/ragulnathMB/hacker-dashboard/commits";

const callRestApi = async () => {
    const response = await fetch(restEndpoint);
    const jsonResponse = await response.json();

    // Create a styled list of commit records
    const arrayOfLists = jsonResponse.map(
        record => (
            <li className={styles.commitItem} key={record.commit.author.date}>
                <div className={styles.commitContent}>
                    <div>
                    <div><FontAwesomeIcon className={styles.bellIcon} icon={faBell} title="Notify about this activity" /></div>
                        <strong>Author:</strong> {record.commit.author.name} <br />
                        <strong>Message:</strong> "{record.commit.message}" <br />
                        <strong>Time:</strong> {new Date(record.commit.author.date).toLocaleString()}
                    </div>
                </div>
            </li>
        )
    );

    // disregard old commit items
    let maxLength = 4;
    let length = Object.keys(arrayOfLists).length;
    if (Object.keys(arrayOfLists).length > maxLength) {
        for(let i = maxLength-1; i < length; i++) {
            delete arrayOfLists[Object.keys(arrayOfLists)[i]];
        }
    }
    return arrayOfLists;
};

function RenderResult() {
    const [apiResponse, setApiResponse] = useState(<p>*** now loading ***</p>);

    useEffect(() => {
        callRestApi().then(result => setApiResponse(result));
    }, []);

    return (
        <div className={styles.resultsContainer}>
            <ul className={styles.commitList}>{apiResponse}</ul>
        </div>
    );
}

const GitTracker = () => {
    return (
        <div className={styles.gitTrackerContainer}>
            <header className={styles.trackerHeader}>
                <h1>GitHub RepoTracker</h1>
            </header>
            <div><p>Recent Activities</p></div>
            <RenderResult />
        </div>
    );
};

export default GitTracker;
