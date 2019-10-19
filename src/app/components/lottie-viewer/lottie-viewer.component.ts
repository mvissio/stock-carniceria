import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-lottie-viewer',
    templateUrl: './lottie-viewer.component.html',
    styleUrls: ['./lottie-viewer.component.scss']
})
export class LottieViewerComponent implements OnInit {
    private anim: any;
    private animationSpeed = 1;
    @Input() width;
    @Input() height;
    @Input() path: string;
    lottieConfig: Object;

    constructor() {
    }

    ngOnInit() {
        this.lottieConfig = {
            path: this.path,
            autoplay: true,
            loop: true
        };
    }


    handleAnimation(anim: any) {
        this.anim = anim;
    }

    stop() {
        this.anim.stop();
    }

    play() {
        this.anim.play();
    }

    pause() {
        this.anim.pause();
    }

    setSpeed(speed: number) {
        this.animationSpeed = speed;
        this.anim.setSpeed(speed);
    }
}
