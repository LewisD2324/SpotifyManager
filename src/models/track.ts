import { ArtistDetails } from './artistDetails';
import { AudioFeature } from './audioFeature';
import { ImageDetails } from './imageDetails';


export interface Track  {
    album : {
        album_type: string;
        artists : ArtistDetails[];
        available_markets: string[];
        external_urls: {
            spotify: string
        },
        href: string;
        id: string;
        images: ImageDetails[] ;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
    },
    artists : ArtistDetails[];
    available_markets: string[];
    disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: {
            isrc: string;
        },
        external_urls: {
            spotify: string;
        },
        href: string;
        id: string;
        is_local: boolean;
        name: string;
        popularity: number;
        preview_url: string | null;
        track_number: number;
        type: string;
        uri: string;
        audio_feature: AudioFeature
    }
