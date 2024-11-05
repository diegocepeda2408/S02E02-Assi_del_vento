import { useEffect, useState } from "react";
import { clouds, thunderstorm, drizzle, rain, snow, mist, clear } from "../backgrounds/videos";

function VideoBackground({videoName}){
    const [video, setVideo] = useState('');

    {/*Type of videos*/}
    const videoItems = {
        thunderstorm,
        drizzle,
        rain,
        snow,
        mist,
        clear,
        clouds
    };

    {/*Weather condition codes*/}
    const groups = [
        {thunderstorm : [200, 201, 202, 210, 211, 212, 221, 230 ,231 ,232]},
        {drizzle : [300, 301, 302, 310, 311, 312, 313, 314, 321]},
        {rain : [500,501, 502, 503, 504, 511, 520, 521, 522, 531]},
        {snow : [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]},
        {mist : [701, 711, 721, 731, 741, 751, 761, 762, 771, 781]},
        {clear : [800]},
        {clouds : [801, 802, 803, 804]}
    ]

    {/*Calling the code for bringing the video link*/}
    useEffect(()=>{

        if (videoName){
            for(let i = 0; i < groups.length; i++){
                for(let weather in groups[i]){
                    for(let j = 0; j < groups[i][weather].length; j++){
                        if (groups[i][weather][j] === videoName){
                            setVideo(videoItems[weather])
                        }
                    }
                }
            }
        }
    },[videoName]);

    return(
        <>
            {/* Background video */}
            <video key={video} autoPlay loop muted playsInline className="background-video">
                <source src={video} type="video/mp4"/>
            </video>
        </>
    )

}

export default VideoBackground;