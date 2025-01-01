import React, { useState, useEffect } from 'react';

const restEndpoint = "https://api.github.com/repos/ragulnathMB/hacker-dashboard/commits";

const callRestApi = async () => {
    const response = await fetch(restEndpoint);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    // return JSON.stringify(jsonResponse);

    const arrayOfLists = jsonResponse.map(
        record => <li key={record.commit.author.date}>author: {record.commit.author.name}, <br />message: "{record.commit.message}", <br />time: {record.commit.author.date}</li>
    )
    return arrayOfLists;
};




function RenderResult() {
    const [apiResponse, setApiResponse] = useState("*** now loading ***");

    useEffect(() => {
        callRestApi().then(
            result => setApiResponse(result));
    }, []);

    return (
        <div>
            <p>{apiResponse}</p>
        </div>
    );
};

const GitTracker = () => {
    return (
        <>
            <RenderResult />
        </>


    )
};

export default GitTracker;