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
      if (!a.publicationDate || !b.publicationDate) {
        return !a.publicationDate && !b.publicationDate ? 0 : !a.publicationDate ? 1 : -1;
      }

      return a.publicationDate > b.publicationDate ? -1 : a.publicationDate < b.publicationDate ? 1 : 0;
    });
  }
}
