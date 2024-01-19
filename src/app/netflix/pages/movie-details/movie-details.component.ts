import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { VideoContent, VideoLinks } from '../../shared/models/video-content.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, forkJoin, map, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  userImage = "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=800";
  movie!: VideoContent;
  destroy$ = new Subject<void>();
  key: string | null = null;
  loading=false;
  videoUrl = '';
  // videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}`)


  bannerVideoNotifier = new Subject<any>();

  movies: VideoContent[] = [];
  tvShows: VideoContent[] = [];
  nowPlayingMovies: VideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getNowPlayingMovies(),
  ];

  bannerVideo$ = this.bannerVideoNotifier.asObservable().pipe(
    switchMap((id) => this.movieService.getBannerVideo(id)),
  )
  constructor(private movieService: MovieService, private sanitizer: DomSanitizer) { }
  ngOnDestroy(): void {
    this.destroy$.next()
  }

  ngOnInit(): void {
   const data = this.movieService.retrieveSelectedMovie() as string;
    this.movie = JSON.parse(data);
    this.bannerVideoNotifier.next(this.movie.id);
    this.bannerVideo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: VideoLinks) => {
        this.loading = false;
        this.key = data.results[0].key;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}`) as string;
      })


    forkJoin(this.sources)
      .pipe(
        tap((res: any) => console.log('all data', res)),
        map(([movies, tvShows, nowPlaying]) => {
          return { movies, tvShows, nowPlaying}
        })
      ).subscribe((res: any) => {
        this.movies = res.movies.results as VideoContent[];
        this.tvShows = res.tvShows.results as VideoContent[];
        this.nowPlayingMovies = res.nowPlaying.results as VideoContent[];
      })
  }


  playVideo(): void {
    this.loading = true;
    this.bannerVideoNotifier.next(this.movie.id);
  }

}
