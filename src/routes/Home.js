import {React, useEffect, useState}  from 'react';
import { dbService } from 'fbase';
import Nweet from 'components/Nweet';
const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // const getNweets = async() => {
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach(document => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         }
    //         setNweets((prev) => [nweetObject, ...prev])
    //     })
    // }
    useEffect(() => {
        dbService.collection("nweets").onSnapshot((sanpShot) => {
            const nweetArray = sanpShot.docs.map((docs) => ({
                id: docs.id,
                ...docs.data()
            }));
            setNweets(nweetArray)
        })
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid     
        });
        setNweet("");
    }

    const onChange = (event) => {
        const { target:{ value }, } = event; 
        setNweet(value);
    }

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input 
            value={nweet}
            type="text" 
            placeholder="what's on your mind?" 
            maxLength={120} 
            onChange={onChange}
            />
            <input type="submit" value="Nweet"/>
        </form>
        {nweets.map(nweet => 
            <Nweet id={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
        )}
    </div>
    )
}
export default Home;