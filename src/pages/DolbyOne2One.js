import { useEffect, useState } from "react"
import DemoHeader from "../components/DemoHeader/DemoHeader"
import SimpleButton from "../components/SimpleButton/SimpleButton"
import LocalPlayer from "../components/LocalPlayer/LocalPlayer"
import styles from './styles.module.css'
import VoxeetSDK from "@voxeet/voxeet-web-sdk"

const DolbyOne2One = () => {

    const [connected, setConnected] = useState(false)

    const initializeToken = () => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkb2xieS5pbyIsImlhdCI6MTY5ODMxMTIxNywic3ViIjoicUpZMXBMLUlDOWZqbEYwYzhMYmpZQT09IiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiJdLCJ0YXJnZXQiOiJzZXNzaW9uIiwib2lkIjoiZWQyYjY5MDctYWIwYS00YzA2LTk1ODItMDE4YzJmMjE0ZGMyIiwiYWlkIjoiMTYyMjQzYmUtYzMyZC00MWYzLTkyNTktMjNmYzkyYWY3OWM2IiwiYmlkIjoiOGEzNjhjMWY4NDYxYzAzYTAxODQ4NmFlNjYzMTY0NjUiLCJleHAiOjE2OTgzOTc2MTd9.vZ-vU0-tEIk3SVNmJuiQYX6dW03CztQlTECcoKwcEuP8p_U26cmMNWjJtzI8G9AwwyQ72rOnLB2qrawhB0v95w"
        VoxeetSDK.initializeToken(token, () => new Promise((resolve) => resolve(token)));
        console.log("Web SDK initialized")
        return token;
    } 

    const openSession = async (sessionName) => {
        try {
            await VoxeetSDK.session.open({ name: sessionName });
            console.log("Session opened")

            VoxeetSDK.conference.on('streamAdded', (participant, stream) => {
                if (stream.type === 'Camera') {
                    shareVideo(participant, stream);
                }
            });

            VoxeetSDK.conference.on('streamUpdated', (participant, stream) => {
                if (stream.type === 'Camera' && stream.getVideoTracks().length) {
                    shareVideo(participant, stream);
                }
            });
            
        } catch (error) {
            console.log("Error open session")
        }
    }

    const shareVideo = async (participant, stream) => {
        console.log(VoxeetSDK.session.participant.id, participant.id)

        var videoContainer = null

        if (VoxeetSDK.session.participant.id == participant.id) {
            videoContainer = document.getElementById("local_player");
        } else {
            videoContainer = document.getElementById("other_player");
        }
    

        let videoNode = document.getElementById(`video-${participant.id}`);
        if (!videoNode) {
            videoNode = document.createElement("video");

            videoNode.setAttribute("id", `video-${participant.id}`);
            videoNode.setAttribute("height", "100%");
            videoNode.setAttribute("width", "100%");
        
            videoNode.muted = true;
            videoNode.autoplay = true;
            videoNode.playsinline = true;
        }

        videoContainer.lastElementChild.replaceWith(videoNode);

        navigator.attachMediaStream(videoNode, stream);

        
    }

    const createAndJoinConference = async (conferenceAlias, participantName) => {
        if (!VoxeetSDK.session.isOpen()) { await openSession(participantName); };
        
        const conferenceOptions = {
            alias: conferenceAlias
        }
        const joinOptions = {
            constraints: { audio: true, video: true }
        };
    
        try {
            const conference = await VoxeetSDK.conference.create(conferenceOptions);
            await VoxeetSDK.conference.join(conference, joinOptions);
            console.log(`Step 3: Conference '${conferenceAlias}' created and joined.`);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        initializeToken()
        openSession()
    }, [])

    const startSession = async () => {
        setConnected(true)
        
        const queryParams = new URLSearchParams(window.location.search);
        const name = queryParams.get('name')
        const room = queryParams.get('room')

        await createAndJoinConference(room, name)
    }

    const leaveSession = async () => {
        setConnected(false)
    }

    return (
        <div>
            <DemoHeader title="One to one demonstration" logo='dolby'/>
            <div className={styles.content}>
                {!connected && <SimpleButton onClick={connected ? leaveSession : startSession} label={connected ? 'Leave session' : 'Join session'} />}
            </div>
            <LocalPlayer/>
        </div>
    )
}

export default DolbyOne2One