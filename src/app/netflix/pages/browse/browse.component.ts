import { Component, Inject, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { VideoContent } from '../../shared/models/video-content.interface';
import { Observable, Subject, concat, concatAll, forkJoin, map, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  userImage = "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=800";
  bannerDetailNotifier = new Subject<any>();
  bannerVideoNotifier = new Subject<any>();
  bannerDetail$ = this.bannerDetailNotifier.asObservable().pipe(
    switchMap((id ) => this.movieService.getBannerDetail(id)),
  );
  bannerVideo$ = this.bannerVideoNotifier.asObservable().pipe(
    switchMap((id ) => this.movieService.getBannerVideo(id)),
  )

  movies: VideoContent[] = [];
  tvShows: VideoContent[] = [];
  ratedMovies: VideoContent[] = [];
  nowPlayingMovies: VideoContent[] = [];
  popularMovies: VideoContent[] = [];
  topRatedMovies: VideoContent[] = [];
  upcomingMovies: VideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getRatedMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {

    forkJoin(this.sources)
      .pipe(
        tap( (res: any) => console.log('all data', res)),
        map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated]) => {
          this.bannerDetailNotifier.next(movies.results[1].id);
          this.bannerVideoNotifier.next(movies.results[1].id);
          return { movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated }
        })
      ).subscribe((res: any) => {
        this.movies = res.movies.results as VideoContent[];
        this.tvShows = res.tvShows.results as VideoContent[];
        this.ratedMovies = res.ratedMovies.results as VideoContent[];
        this.nowPlayingMovies = res.nowPlaying.results as VideoContent[];
        this.upcomingMovies = res.upcoming.results as VideoContent[];
        this.popularMovies = res.popular.results as VideoContent[];
        this.topRatedMovies = res.topRated.results as VideoContent[];
        this.getMovieKey();
      })
  }

  getMovieKey() {
    // this.movieService.getBannerVideo(this.movies[0].id)
    //   .subscribe((res:any) => {
    //     // console.log(res);
    //   })
  }

  preview(movie: VideoContent) {
    this.bannerDetailNotifier.next(movie.id);
    this.bannerVideoNotifier.next(movie.id);
  }

}
