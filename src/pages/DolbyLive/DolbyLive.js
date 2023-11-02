import { useEffect, useState } from "react"
import DemoHeader from "../../components/DemoHeader/DemoHeader"
import { Director, View } from "@millicast/sdk"
import styles from './styles.module.css'
import SimpleButton from "../../components/SimpleButton/SimpleButton"

const DolbyLive = () => {

    const [joined, setJoined] = useState(false)

    const tokenGenerator = () => Director.getSubscriber({
        streamName: process.env.REACT_APP_STREAM_NAME,
        streamAccountId: process.env.REACT_APP_STREAM_ACCOUNT_ID,
    })

    const viewer = new View(process.env.REACT_APP_STREAM_NAME, tokenGenerator)

    const mediaStream = new MediaStream()

    viewer.on ("broadcastEvent", async (event) => {

        let videoMediaId, videoTrackId

        if (event.name == "active"){
            
            const trackVideo = event.data.tracks?.find(({ media }) => media === 'video')

            if (trackVideo) {
                const videoTransceiver = await viewer.addRemoteTrack('video', [mediaStream])
                videoMediaId = videoTransceiver?.mid ?? undefined;
                videoTrackId = trackVideo.trackId;
            }
            console.log(mediaStream)
            let videoElement = document.getElementById("live")
            videoElement.srcObject = mediaStream

            const mapping = []

            mapping.push({
                media: 'video',
                trackId: videoTrackId,
                mediaId: videoMediaId,
            })

            await viewer.project(null, mapping)

        }
    })

    const onJoinLive = () => {
        viewer.connect({
            events:["active", "inactive"]
        })

        setJoined(true)

        let videoElement = document.getElementById("live")
        videoElement.play()
    }

    return (
        <div>
            <DemoHeader title="Dolby live" logo="dolby"/>
            <div className={styles.container}>
                <video className={styles.video} controls={false} id="live" style={{display: joined ? "block" : "none"}}/>
                {!joined && <SimpleButton label="Join live" onClick={onJoinLive}/>}
            </div>
        </div>
    )
}

export default DolbyLive