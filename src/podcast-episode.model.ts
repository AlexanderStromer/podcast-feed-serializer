import { Moment } from 'moment';

export class PodcastEpisode {
  constructor(x?: Partial<PodcastEpisode>) {
    Object.assign(this, x);
  }

  title: string | null = null;
  episodeUrl: string | null = null;
  length: number | null = null;
  fileType: string | null = null;
  guid: string | null = null;
  publicationDate: Moment | null = null;
  description: string | null = null;
  duration: number | null = null;
  imageUrl: string | null = null;
  explicit: boolean | null = null;
  titleDisplay: string | null = null;
  episode: number | null = null;
  season: number | null = null;
  episodeType: string | null = null;
  block: boolean | null = null;
  episodeSiteUrl: string | null = null;
}
