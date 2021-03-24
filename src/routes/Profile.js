import { authService, dbService } from 'fbase';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const Profile = () => <span>Profile</span>;

export default ({ userObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/")
    }
    const getMyNweets = async () => {
        const nweets = await dbService
        .collection("nweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt")
        .get();
        console.log(nweets.docs)
    }
    useEffect(() => {
        getMyNweets();
    }, [])
    return (
        <>
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}