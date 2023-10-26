
import VoxeetSDK from "@voxeet/voxeet-web-sdk"

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkb2xieS5pbyIsImlhdCI6MTY5ODMxMTIxNywic3ViIjoicUpZMXBMLUlDOWZqbEYwYzhMYmpZQT09IiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiJdLCJ0YXJnZXQiOiJzZXNzaW9uIiwib2lkIjoiZWQyYjY5MDctYWIwYS00YzA2LTk1ODItMDE4YzJmMjE0ZGMyIiwiYWlkIjoiMTYyMjQzYmUtYzMyZC00MWYzLTkyNTktMjNmYzkyYWY3OWM2IiwiYmlkIjoiOGEzNjhjMWY4NDYxYzAzYTAxODQ4NmFlNjYzMTY0NjUiLCJleHAiOjE2OTgzOTc2MTd9.vZ-vU0-tEIk3SVNmJuiQYX6dW03CztQlTECcoKwcEuP8p_U26cmMNWjJtzI8G9AwwyQ72rOnLB2qrawhB0v95w"

const useDolby = () => {
 
    const initialize = () => {
        VoxeetSDK.initializeToken(token, () => new Promise((resolve) => resolve(token)))
    }

    const openSession = async (sessionName) => {
        await VoxeetSDK.session.open({ name: sessionName });
    }

    const createConference = async (conferenceAlias, participantName) => {
  
        const conferenceOptions = {
            alias: conferenceAlias
        }

        const joinOptions = {
            constraints: { audio: true, video: true }
        }
    
        try {
            const conference = await VoxeetSDK.conference.create(conferenceOptions)
            await VoxeetSDK.conference.join(conference, joinOptions)

            return new Promise((resolve) => {
                resolve(conference)
                return conference
            })


        } catch (error) {
        }
    };

    const leaveSession = async () => {
        try {
            await VoxeetSDK.conference.leave()
            await VoxeetSDK.session.close();
        } catch (error) {
        }
    }

    return {
        initialize,
        openSession,
        createConference,
        leaveSession
    }
    
}

export default useDolby