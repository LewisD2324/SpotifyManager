import { ImageDetails } from './imageDetails';
export interface Artist {
    external_urls: {
        spotify: string;
      },
      followers: {
        href: string | null;
        total: number;
      },
      genres: string[];
      href: string;
      id: string;
      images: ImageDetails[];
      name: string;
      popularity: number;
      type: string;
      uri: string;
}