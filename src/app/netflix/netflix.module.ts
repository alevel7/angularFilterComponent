import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/components/header/header.component';
import { BannerComponent } from './core/components/banner/banner.component';
import { RouterModule } from '@angular/router';
import { BrowseComponent } from './pages/browse/browse.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MovieCarouselComponent } from './shared/components/movie-carousel/movie-carousel.component';
import { DescriptionPipe } from './shared/pipes/description.pipe';
import { ImageTransformPipe } from './shared/pipes/image-transform.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
    BrowseComponent,
    MovieCarouselComponent,
    DescriptionPipe,
    ImageTransformPipe
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: BrowseComponent },
    ]),
  ]
})
export class NetflixModule { }
