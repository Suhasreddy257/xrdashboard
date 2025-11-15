import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-webgl',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div class="w-full" style="height: calc(100vh - 100px); min-height: 600px;">
      <div class="w-full flex justify-center items-start" style="height: calc(100vh - 185px); min-height: 500px;">
        <div class="relative w-full flex justify-center items-start" style="height: 100%; min-height: 500px;">
          <iframe 
            [src]="iframeSrc || defaultSrc"
            title="WebGL Demo"
            style="
              border: none;
              width: 100vw;
              max-width: 1600px;
              height: 100%;
              min-height: 500px;
              min-width: 900px;
              background: #fff;
              overflow: auto;
              display: block;
              position: relative;
            "
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  `
})
export class webgl implements OnInit {
  pageTitle: string = 'Interactive Content';
  defaultSrc: SafeResourceUrl;
  iframeSrc: SafeResourceUrl | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.router = inject(Router);
    this.defaultSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      'http://13.204.95.176:6060/images/xrdbc/webgl/easypact/index.html'
    );
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const src = params.get('src');
      const title = params.get('title');
      if (title) {
        this.pageTitle = title;
      }
      if (src) {
        this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(src);
      }
    });
  }
}