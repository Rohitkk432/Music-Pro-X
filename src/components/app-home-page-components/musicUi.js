import {React,useEffect,useState} from 'react';
import './musicUi.css';
import Player from './player';
import Queue from './queue';
import FooterPlayer from './footerplayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import SongSearch from './songSearch';
import {getFullQueue} from '../../methods';


function MusicUI (){

    const currentId = localStorage.getItem('id');

    const [isUp, setIsUp] = useState(false);
    const [fullQueue, setFullQueue] = useState([]);
    const [updater, setUpdater] = useState(0);
    const [upd2 , setUpd2] = useState(0);

    useEffect(()=>{
        if(currentId!==null){
            getFullQueue(currentId).then((list)=>{setFullQueue(list)});
        }
    },[currentId]);

    useEffect(()=>{
        setUpdater(u=>u+1)
    },[upd2]);

    return(
        <>  
            <div className={isUp ? "hidden" : ""}>
                <SongSearch upd={[upd2,setUpd2]}  data={[fullQueue, setFullQueue]} />
            </div>
            <div className="musicUi">
                <div className={isUp ? "" : "hidden"}>
                    <div className="music-player">
                        <div className="music-controls">
                            <div onClick={() => setIsUp(!isUp)} className="arrow-down">
                                <FontAwesomeIcon className="arrows" icon={faAngleDown} aria-hidden="true" />
                            </div>
                            <Player updateO={[updater, setUpdater]}  data={[fullQueue, setFullQueue]} />
                        </div>
                        <Queue upd={[upd2,setUpd2]} updateO={[updater, setUpdater]} data={[fullQueue, setFullQueue]} />
                    </div>
                </div>
                <div className={isUp ? "hidden" : ""}>
                    <div className="foot-music-controls">
                        <div onClick={() => setIsUp(!isUp)} className="arrow-up">
                            <FontAwesomeIcon className="arrows" icon={faAngleUp} aria-hidden="true" />
                        </div>
                        <div className="footer-player">
                            <FooterPlayer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MusicUI;
