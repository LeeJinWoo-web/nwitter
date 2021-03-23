import { React, useEffect, useState }  from 'react';
import { dbService, storageService } from 'fbase';
import {v4 as uuid} from "uuid";
import Nweet from 'components/Nweet';
const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();

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
        let attachmentUrl = "";
        if(attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuid()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,            attachmentUrl
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    }

    const onChange = (event) => {
        const { target:{ value }, } = event; 
        setNweet(value);
    }

    const onFileChange = (event) => {
        const {
            target:{files},
        } = event;
        const theFile = files[0]
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: {result},
        } = finishedEvent
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => {
        setAttachment(null);
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
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value="Nweet"/>
            {attachment && 
                <div>
                    <img src={attachment} width="50px" height="50px"/>
                    <button onClick={onClearAttachment}>Clear Image</button>
                </div>
            }
        </form>
        {nweets.map(nweet => 
            <Nweet id={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
        )}
    </div>
    )
}
export default Home;