[![npm version](https://badge.fury.io/js/podcast-feed-serializer.svg)](https://badge.fury.io/js/podcast-feed-serializer)

[![NPM](https://nodei.co/npm/podcast-feed-serializer.png)](https://nodei.co/npm/podcast-feed-serializer/)

# podcast-feed-serializer

A simple (de)-serializer for Apple-based podcast RSS (XML) feed definitions, which is the de-facto industry-standard anyway.

## Usage
It sports 3 main classes (`Podcast`, `PodcastEpisode` & `FeedSerializer`).

```ts
const myPodcast: Podcast = new Podcast({ title: 'Hello world' });
myPodcast.episodes.push(new PodcastEpisode({ title: 'Episode 1' }))
...

// to construct xml from objects
if (new FeedSerializer().isValidForSave(myPodcast)) {
    var podcastXml: string = new FeedSerializer().saveFeed(myPodcast)

    // to construct objects from xml
    new FeedSerializer().loadFeed(x).then(myPodcastAgain => {
        console.log(myPodcastAgain.title)
    });
}

```

## Validation / Requirements
The validation is aimed for meeting Apple's requirements to publish a podcast through their service, which in turn will open the door to other podcast services as well.

Overview: https://podcasters.apple.com/support/823-podcast-requirements

Deep Dive: https://help.apple.com/itc/podcasts_connect/#/itcb54353390

In a nutshell, ensure that the following `Podcast` fields are filled
1. Title
2. Description
3. ImageUrl
4. Language
5. Category
6. Author
7. Website
8. Email

and at least 1 `PodcastEpisode` exists.

## Browser-based
If you have a scenario where you want to input/output the XML to the user you might find upload/download useful.
1. Reading files can be achieved with the native `FileReader` interface (https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
```ts
// Angular way of retrieving a file from a input[type=file]
var file = this.file.nativeElement.files[0]

var reader = new FileReader();
reader.onload = function(e: any) {
    var podcastXml = reader.result.toString();
};
reader.readAsText(file);
```
2. Writing files can be done with libraries like `file-saver` (https://www.npmjs.com/package/file-saver)
```ts
import { saveAs } from "file-saver";
...

saveAs(new Blob([podcastXml], {type: 'application/xml'}), "feed.xml");
```