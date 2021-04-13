import moment = require('moment');
import { PodcastEpisode } from './podcast-episode.model';

export class Podcast {
  constructor(x?: Partial<Podcast>) {
    Object.assign(this, x);
  }

  title: string | null = null;
  description: string | null = null;
  author: string | null = null;
  website: string | null = null;
  email: string | null = null;
  language: string | null = null;
  explicit: boolean | null = null;
  imageUrl: string | null = null;
  category: string | null = null;
  titleDisplay: string | null = null;
  subCategory: string | null = null;
  type: string | null = null;
  copyright: string | null = null;
  newFeedUrl: string | null = null;
  block: boolean | null = null;
  complete: boolean | null = null;
  episodes: PodcastEpisode[] = [];

  sortEpisodesDescending() {
    this.episodes = this.episodes.sort((a, b) => {
      const aDate = a.publicationDate?.toDate ?? new Date();
      const bDate = b.publicationDate?.toDate ?? new Date();

      return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
    });
  }
}
