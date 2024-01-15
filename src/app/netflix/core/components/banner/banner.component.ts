import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnChanges, OnInit {
  @Input() bannerTitle: string | undefined = '';
  @Input() bannerOverview: string | undefined = '';
  @Input() key = 'r_pUE7OcN8w';
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`)

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key']) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
    }
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
