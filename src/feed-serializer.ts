import { Podcast } from './podcast.model';
import { PodcastEpisode } from './podcast-episode.model';

import { parseString } from 'xml2js';
import { Moment } from 'moment';
import moment from 'moment';

const xml2js: any = import('xml2js');

export class FeedSerializer {
  loadFeed(feedXml: string): Promise<Podcast> {
    return new Promise<Podcast>((x) => {
      const instance: FeedSerializer = this;
      parseString(feedXml, (err: any, result: any) =>
        x(new Podcast(instance.translateJsToNative(result.rss.channel[0]))),
      );
    });
  }

  isValidForSave(podcast: Podcast) {
    return (
      this.isWriteStringValid(podcast.title) &&
      this.isWriteStringValid(podcast.description) &&
      this.isWriteStringValid(podcast.imageUrl) &&
      this.isWriteStringValid(podcast.language) &&
      this.isWriteStringValid(podcast.category) &&
      this.isWriteStringValid(podcast.author) &&
      this.isWriteStringValid(podcast.website) &&
      this.isWriteStringValid(podcast.email) &&
      podcast.episodes.length > 0
    );
  }

  saveFeed(podcast: Podcast) {
    return new xml2js.Builder().buildObject(this.translateNativeToJs(podcast));
  }

  translateJsToNative(js: any): Podcast {
    const native: Podcast = new Podcast();
    native.title = js.title ? js.title[0] : null;
    native.description = js.description ? js.description[0] : null;
    native.author = js['itunes:author'] ? js['itunes:author'][0] : null;
    native.website = js.link ? js.link[0] : null;
    native.email =
      js['itunes:owner'] && js['itunes:owner'][0]['itunes:email'] ? js['itunes:owner'][0]['itunes:email'][0] : null;
    native.language = js.language ? js.language[0] : null;
    native.explicit = js['itunes:explicit'] ? js['itunes:explicit'][0] === 'true' : false;
    native.imageUrl =
      js['itunes:image'] && js['itunes:image'][0].$ && js['itunes:image'][0].$.href
        ? js['itunes:image'][0].$.href
        : null;
    native.category =
      js['itunes:category'] && js['itunes:category'][0].$ && js['itunes:category'][0].$.text
        ? js['itunes:category'][0].$.text
        : null;
    native.titleDisplay = js['itunes:title'] ? js['itunes:title'][0] : null;
    native.subCategory =
      js['itunes:category'] &&
      js['itunes:category'][0]['itunes:category'] &&
      js['itunes:category'][0]['itunes:category'][0].$ &&
      js['itunes:category'][0]['itunes:category'][0].$.text
        ? js['itunes:category'][0]['itunes:category'][0].$.text
        : null;
    native.type = js['itunes:type'] ? js['itunes:type'][0] : null;
    native.copyright = js.copyright ? js.copyright[0] : null;
    native.newFeedUrl = js['itunes:new-feed-url'] ? js['itunes:new-feed-url'][0] : null;
    native.block = js['itunes:block'] ? js['itunes:block'][0] === 'true' : false;
    native.complete = js['itunes:complete'] ? js['itunes:complete'][0] === 'true' : false;
    native.episodes = js.item ? js.item.map((x: any) => this.translateEpisodeJsToNative(x)) : [];

    return native;
  }

  translateEpisodeJsToNative(js: any): PodcastEpisode {
    const native: PodcastEpisode = new PodcastEpisode();
    native.title = js.title ? js.title[0] : null;
    native.episodeUrl = js.enclosure && js.enclosure[0].$ && js.enclosure[0].$.url ? js.enclosure[0].$.url : null;
    native.length = js.enclosure && js.enclosure[0].$ && js.enclosure[0].$.length ? js.enclosure[0].$.length : null;
    native.fileType = js.enclosure && js.enclosure[0].$ && js.enclosure[0].$.type ? js.enclosure[0].$.type : null;
    native.guid = js.guid ? js.guid[0] : null;
    native.publicationDate = js.pubDate ? moment(js.pubDate[0]) : null;
    native.description = js.description ? js.description[0] : null;
    native.duration = js['itunes:duration'] ? js['itunes:duration'][0] : null;
    native.episodeSiteUrl = js.link ? js.link[0] : null;
    native.imageUrl =
      js['itunes:image'] && js['itunes:image'][0].$ && js['itunes:image'][0].$.href
        ? js['itunes:image'][0].$.href
        : null;
    native.explicit = js['itunes:explicit'] ? js['itunes:explicit'][0] === 'true' : false;
    native.titleDisplay = js['itunes:title'] ? js['itunes:title'][0] : null;
    native.episode = js.episode ? js.episode[0] : null;
    native.season = js.season ? js.season[0] : null;
    native.episodeType = js['itunes:episodeType'] ? js['itunes:episodeType'][0] : null;
    native.block = js['itunes:block'] ? js['itunes:block'][0] === 'true' : false;

    return native;
  }

  translateNativeToJs(native: Podcast) {
    const js: any = {
      rss: {
        $: {
          version: '2.0',
          'xmlns:itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
        },
        channel: {
          title: { _: native.title },
          description: { _: native.description },
          'itunes:image': { $: { href: native.imageUrl } },
          language: { _: native.language },
          'itunes:category': { $: { text: native.category } },
          'itunes:explicit': native.explicit ? 'true' : false,
          'itunes:author': { _: native.author },
          link: { _: native.website },
          'itunes:owner': {
            'itunes:name': native.author,
            'itunes:email': native.email,
          },
        },
      },
    };
    const channel: any = js.rss.channel;

    if (this.isWriteStringValid(native.subCategory))
      channel['itunes:category']['itunes:category'] = {
        $: { text: native.subCategory },
      };

    if (this.isWriteStringValid(native.titleDisplay)) channel['itunes:title'] = { _: native.titleDisplay };
    if (this.isWriteStringValid(native.type)) channel['itunes:type'] = { _: native.type };
    if (this.isWriteStringValid(native.copyright)) channel.copyright = { _: native.copyright };
    if (this.isWriteStringValid(native.newFeedUrl)) channel['itunes:new-feed-url'] = { _: native.newFeedUrl };
    if (native.block)
      channel['itunes:block'] = {
        _: native.block ? 'true' : 'false',
      };
    if (native.complete)
      channel['itunes:complete'] = {
        _: native.complete ? 'true' : 'false',
      };
    if (native.episodes && native.episodes.length > 0)
      channel.item = native.episodes.map((x) => this.translateEpisodeNativeToJs(x));

    return js;
  }

  translateEpisodeNativeToJs(native: PodcastEpisode): any {
    const js: any = {
      title: native.title,
      enclosure: {
        $: {
          url: native.episodeUrl,
          length: native.length,
          type: native.fileType,
        },
      },
    };
    if (this.isWriteStringValid(native.guid)) js.guid = { _: native.guid };
    if (this.isWriteDateValid(native.publicationDate))
      js.pubDate = { _: (native.publicationDate as Moment).format('ddd, DD MMM YYYY HH:mm:ss ZZ') };
    if (this.isWriteStringValid(native.description)) js.description = { _: native.description };
    if (this.isWriteNumberValid(native.duration)) js['itunes:duration'] = { _: native.duration };
    if (this.isWriteStringValid(native.episodeSiteUrl)) js.link = { _: native.episodeSiteUrl };
    if (this.isWriteStringValid(native.imageUrl)) js['itunes:image'] = { $: { href: native.imageUrl } };
    if (native.explicit) js['itunes:explicit'] = { _: native.explicit ? 'true' : 'false' };
    if (this.isWriteStringValid(native.titleDisplay)) js['itunes:title'] = { _: native.titleDisplay };
    if (this.isWriteNumberValid(native.episode)) js.episode = { _: native.episode };
    if (this.isWriteNumberValid(native.season)) js.season = { _: native.season };
    if (this.isWriteStringValid(native.episodeType)) js['itunes:episodeType'] = { _: native.episodeType };
    if (native.block)
      js['itunes:block'] = {
        _: native.block ? 'true' : 'false',
      };

    return js;
  }

  isWriteStringValid(value: string | null): boolean {
    return !!value && value !== '';
  }

  isWriteDateValid(value: Moment | null): boolean {
    return !!value ? true : false;
  }

  isWriteNumberValid(value: number | null): boolean {
    return !!value && value !== 0;
  }
}
