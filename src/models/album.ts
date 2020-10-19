import { ImageDetails } from './imageDetails';
import { ArtistDetails } from './artistDetails';
export interface Album
{
            album_type: string;
            artists: ArtistDetails[];
            available_markets: string[];
            external_urls: {
                spotify: string;
            },
            href: string;
            id: string;
            images: ImageDetails[];
            name: string;
            release_date: string;
            release_date_precision: string;
            total_tracks: number;
            type: string;
            uri: string;
        }
    
