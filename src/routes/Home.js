import { React, useEffect, useState }  from 'react';
import { dbService, storageService } from 'fbase';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory'
const Home = ({ userObj }) => {
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

    return (
    <div>
        <NweetFactory userObj={userObj}/>
        <div>
            {nweets.map(nweet => 
                <Nweet id={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
            )}
        </div>
    </div>
    )
}
export default Home;