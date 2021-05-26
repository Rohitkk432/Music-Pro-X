import {React,useState,useMemo} from 'react';
import './songSearch.css';
import { Scrollbars } from 'react-custom-scrollbars';
import songsList from "../../songinfo.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import SearchResult from './search-result';


function SongSearch(){

    const [search, setSearch] = useState("");

    const songs = useMemo(() => {
        if (!search) return songsList;

        return songsList.filter((_song) => {
            return (
                _song.title.toLowerCase().includes(search.toLowerCase()) ||
                _song.singer.toLowerCase().includes(search.toLowerCase())
            );
        });
    }, [search]);

    // console.log(songs);

    return(
        <div className="search-container">
            <div className="searchbar">
                <FontAwesomeIcon className="search-icon" icon={faSearch} aria-hidden="true" />
                <input 
                type="text" 
                placeholder="Search"
                className="search-bar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            
            <div className="result-container">
                <Scrollbars style={{ width:"70vw", height: "71vh", color:"white" }}>
                    {songs.map((song, idx) => (
                        <SearchResult {...song} key={idx} />
                    ))}
                </Scrollbars>
            </div>
        </div>
    );
}

export default SongSearch;

