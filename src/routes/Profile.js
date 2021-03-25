import Nweet from 'components/Nweet';
import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const Profile = () => <span>Profile</span>;

export default ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/")
    }
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    }
    const getMyNweets = async () => {
        const nweets = await dbService
        .collection("nweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt")
        .get();
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log("onSubmit", newDisplayName)
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName
            })
            console.log("updateProfile", userObj.displayName)
            refreshUser()
        }
    }
    useEffect(() => {
        getMyNweets();
    }, [])
    return (
        <>
        <form onSubmit={onSubmit}>
            <input 
                onChange={onChange}
                type="text" 
                placeholder="Display name"
                value={newDisplayName}
            />
            <input type="submit" value="Update Profile"/>
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}