import axios from 'axios';
export default async (tracks: any, access_token: string) => {
    try {
        const track_ids = tracks.map((track: any) => track.id).join();

        const afresponse = await axios.get(`https://api.spotify.com/v1/audio-features`, {
            params: { ids: track_ids },
            headers: { Authorization: 'Bearer ' + access_token },
        });
        const audioFeatures = afresponse.data;

        const tracksWithAudioFeatures = tracks.map((track: any) => {
            const af = audioFeatures.audio_features.find((audio_f: any) => audio_f.id === track.id);
            return {
                ...track,
                audio_feature: af,
            };
        });

        return tracksWithAudioFeatures;
    } catch (err) {
        console.log(err);
        return null;
    }
};
