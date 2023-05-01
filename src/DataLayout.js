import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {ShimmerThumbnail} from "react-shimmer-effects";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Layout(items){
    const visibleRef = React.useRef()
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(true);
    const {id} = useParams();
    const trackimg = React.useRef()
    const [inview,setview] = useState(false)

    let callback = (entries, observer) => {
        entries.forEach((entry) => {
          setview(true)
        });
      };

    useEffect(()=>{
        let observer = new IntersectionObserver(callback);
        if(trackimg?.current){
            observer.observe(trackimg.current);
        }

        return ()=>{
            observer.disconnect()
        }
    },[])
    

    const showElement = () => {
        setVisible(true);
        setVisible2(false)
    }

    const hideElement = () => {
        setVisible(false);
        setVisible2(true)
    }

    const LongText = ({content,limit}) => {
        const [showAll, setShowAll] = useState(false);

        const showMore = () => setShowAll(true);
        const showLess = () => setShowAll(false);

        const isvisible = false
        if (content.length <= limit) {
            // there is nothing more to show
            return <div>{content}</div>
        }
        if (showAll) {
            // We show the extended text and a link to reduce it
            return <div> 
            {content} 
            <button onClick={showLess} className="lessbtn"> Read less</button> 
            </div>
        }
        // In the final case, we show a text with ellipsis and a `Read more` button
        const toShow = content.substring(0, limit) + " ...";
        return <div> 
            {toShow} 
            <button onClick={showMore} className="morebtn"></button>
        </div>
    }
   
    return(
        <div className="main_root">
            
            <div className="card_layout">
                
                <div className="card">
                
                    <div className="contents">

                    
                    
                        <div className="imageContainer" onClick={()=>items.mytoggle(items.title,items.logo,items.bgimage,items.episodeCount,items.rating,items.isvisible,items.cast,items.des,items.id,items.seasons,items.episode,items.pic)}>
        
                            {inview ? <div className="imageLogo" onMouseEnter={showElement} onMouseLeave={hideElement}>
                            {!visible && <LazyLoadImage className="logoimg" src={items.logo}/>}
                            
                            {/* <img className="myimg" src={items.bgimage}></img> */}
                             
                             <LazyLoadImage className="myimg" effect="blur" src={items.bgimage}/>

                               
                            </div> : 
                            <div className="imageLogo" onMouseEnter={showElement} onMouseLeave={hideElement}>
                            {/* <img className="logoimg" src={items.logo}></img> */}
                            
                            {/* <img className="myimg" src={items.bgimage}></img> */}
                             
                             <img ref={trackimg}></img>
                             <ShimmerThumbnail height={350}></ShimmerThumbnail>

                               
                            </div>
                            }
                            
                        </div>
                       
                        {visible && <div className="aboutInfo">
                        <div className="heading">
                                <h3>{items.title}</h3>
                                <h5>{items.lang}</h5>
                                {/* <div className="stats">
                                    <p>Episodes {items.episodeCount}</p>
                                    <p>{items.rating}</p>
                                </div> */}
                                
                            {/*<p>{items.cast}</p>*/}
                            <p><LongText content={items.des} limit={100}></LongText></p>
                            </div>
                            
                       </div>}
                        
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}