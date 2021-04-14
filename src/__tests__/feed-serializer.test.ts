import { Podcast } from "../podcast.model"
import { FeedSerializer } from "../feed-serializer"

test('Serializer saveFeed', () => {
    const podcastSerialized: string = new FeedSerializer().saveFeed(new Podcast({
        title: 'test',
        description: 'test description',
        imageUrl: 'http://someurl.png',
        language: 'en',
        category: 'somecategory',
        explicit: false,
        author: 'Me',
        website: 'http://a.com',
        email: 'a@b.c',
    }));

    const expectedSerialized: string = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>test</title>
    <description>test description</description>
    <itunes:image href="http://someurl.png"/>
    <language>en</language>
    <itunes:category text="somecategory"/>
    <itunes:explicit>false</itunes:explicit>
    <itunes:author>Me</itunes:author>
    <link>http://a.com</link>
    <itunes:owner>
      <itunes:name>Me</itunes:name>
      <itunes:email>a@b.c</itunes:email>
    </itunes:owner>
  </channel>
</rss>`
    expect(podcastSerialized).toBe(expectedSerialized);
});