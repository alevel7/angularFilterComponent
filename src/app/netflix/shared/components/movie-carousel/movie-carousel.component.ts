import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { VideoContent } from '../../models/video-content.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/netflix/core/services/movie.service';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MovieCarouselComponent implements OnInit, AfterViewInit {
  @Input() movies: VideoContent[] = [];
  @Input() title!: string;
  @Output() selectedMovie = new EventEmitter<VideoContent>();
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null | undefined;

  constructor(private router: Router, private movieService: MovieService) { }
  ngAfterViewInit(): void {
    this.initSwiper()
  }

  ngOnInit(): void {
  }

  private initSwiper() {
    return new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 10,
      // centeredSlides: true,
      loop: true,
      // Responsive breakpoints
     breakpoints: {
       1024: {
         slidesPerView: 6,
         spaceBetween: 10
       },
       768: {
         slidesPerView: 5,
         spaceBetween: 10
       },
       640: {
         slidesPerView: 4,
         spaceBetween: 5
       },
       320: {
         slidesPerView: 1,
         spaceBetween: 10
       }
     }
  })

}

  setHoverMovie(movie: VideoContent) {
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverMovie() {
    this.selectedContent = null;
  }

  preview(movie:VideoContent) {
    // this.selectedMovie.emit(movie)
    this.movieService.storeSelectedMovie(movie)
    this.router.navigate(['/movie-details', movie.id])
  }

}
