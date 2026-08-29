import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Video } from '../../../core/models/video';
import { DANCE_VIDEOS } from '../../../data/dance-videos';
import { SITE } from '../../../data/site';

/** A video plus the handful of strings the template would otherwise recompute. */
interface VideoView extends Video {
  readonly watchUrl: string;
  readonly thumbnail: string;
  readonly fallbackThumbnail: string;
  readonly meta: string;
}

function toView(video: Video): VideoView {
  return {
    ...video,
    watchUrl: `https://www.youtube.com/watch?v=${video.id}`,
    // The only 16:9 still YouTube generates. Older or lower-resolution uploads
    // don't have one, hence the fallback below.
    thumbnail: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    // 4:3 with the video letterboxed inside it — always present, and the
    // object-cover crop takes the bars back off.
    fallbackThumbnail: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    meta: video.partner
      ? `${video.event} ${video.year} · with ${video.partner}`
      : `${video.event} ${video.year}`,
  };
}

@Component({
  selector: 'app-dance-videos',
  imports: [],
  templateUrl: './dance-videos.html',
  styleUrl: './dance-videos.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DanceVideos {
  protected readonly site = SITE;

  /**
   * Newest first, so the featured frame is always the latest video. Sort is
   * stable, which leaves same-day uploads in the order the data file lists
   * them — the ordering never depends on remembering to hand-sort that file.
   */
  private readonly videos = [...DANCE_VIDEOS]
    .sort((a, b) => b.published.localeCompare(a.published))
    .map(toView);

  /** Undefined only if the data file is emptied, in which case the band is skipped. */
  protected readonly featured: VideoView | undefined = this.videos[0];
  protected readonly reel = this.videos.slice(1);

  protected onThumbnailError(event: Event, video: VideoView): void {
    const image = event.target as HTMLImageElement;
    if (image.src !== video.fallbackThumbnail) {
      image.src = video.fallbackThumbnail;
    }
  }
}
