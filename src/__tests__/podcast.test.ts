import moment from "moment";
import { PodcastEpisode } from "../podcast-episode.model";
import { Podcast } from "../podcast.model"

test('Podcast sorting', () => {
    const podcast: Podcast = new Podcast({
        episodes: [
            new PodcastEpisode({ publicationDate: moment("03-01-2020", "MM-DD-YYYY") }),
            new PodcastEpisode({ publicationDate: moment("03-01-2021", "MM-DD-YYYY") })
        ]
    })
    podcast.sortEpisodesDescending();
    expect(podcast.episodes[0].publicationDate?.year() ?? 1).toBe(2021);
});