class Swiper {
  constructor(container, /* btnLeft, btnRight, markersColl, currentMarkerClass */) {
    this.container = container;
    this.stack = container.firstElementChild;

    this.touchFrom = this.touchCurrent = 0;
    this.mouseFrom = this.mouseCurrent = 0;
    this.mouseDown = false;

    this.currentSlide = 0;
    this.active = true;
    this.setSizes();

    window.addEventListener('resize', () => this.setSizes());
    this.stack.addEventListener('transitionend', () => this.unlock());

    this.container.addEventListener('touchstart', e => this.touchStart(e));
    this.container.addEventListener('touchmove', e => this.touchMove(e));
    this.container.addEventListener('touchend', () => this.touchEnd());

    // this.container.addEventListener('mousedown', e => this.mouseStart(e));
    // this.container.addEventListener('mousemove', e => this.mouseMove(e));
    // this.container.addEventListener('mouseup', e => this.mouseEnd());
    // this.container.addEventListener('mouseout', e => this.mouseEnd());

    // this.btnLeft = btnLeft;
    // this.btnRight = btnRight;
    // this.markersColl = markersColl;
    // this.currentMarkerClass = currentMarkerClass;

    // this.btnRight.addEventListener('click', () => this.moveTo(this.currentSlide + 1));
    // this.btnLeft.addEventListener('click', () => this.moveTo(this.currentSlide - 1));
  }



  touchStart (e) {
    this.touchFrom = this.touchCurrent = e.changedTouches[0].clientX;
  }

  touchMove (event) {
    if (this.active) {
      const offset = parseInt(this.stack.style.marginLeft) + event.changedTouches[0].clientX - this.touchCurrent;

      if (offset <= this.maxOffset) this.stack.style.marginLeft = this.maxOffset + 'px';

      else if (offset >= 0) this.stack.style.marginLeft = '0px';

      else {
        this.stack.style.marginLeft = offset + 'px';
        this.touchCurrent = event.changedTouches[0].clientX;

        if (this.touchFrom - this.touchCurrent > this.limit) this.moveTo(this.currentSlide + 1);

        else if (this.touchFrom - this.touchCurrent < -this.limit) this.moveTo(this.currentSlide - 1);
      }
    }
  }

  touchEnd () {
    if (this.active) {
      this.moveTo(this.currentSlide, '0.1s');
      setTimeout(() => this.unlock(), 100);
    }
    this.touchFrom = this.touchCurrent = 0;
  }


/*
  mouseStart (event) {
    this.mouseFrom = this.mouseCurrent = event.layerX;
    this.mouseDown = true;
  }

  mouseMove (event) {
    if (this.mouseDown && this.active) {
      const offset = parseInt(this.stack.style.marginLeft) + event.layerX - this.mouseFrom;

      if (offset <= this.maxOffset) this.stack.style.marginLeft = this.maxOffset + 'px';

      else if (offset >= 0) this.stack.style.marginLeft = '0px';

      else {
        this.stack.style.marginLeft = offset + 'px';
        this.mouseCurrent = event.layerX;

        if (this.mouseFrom - this.mouseCurrent > this.limit) this.moveTo(this.currentSlide + 1);

        else if (this.mouseFrom - this.mouseCurrent < -this.limit) this.moveTo(this.currentSlide - 1);
      }
    }
  }

  mouseEnd () {
    if (this.active) {
      this.moveTo(this.currentSlide, '0.2s');
      setTimeout(() => this.unlock(), 200);
    }
    this.mouseFrom = this.mouseCurrent = 0;
    this.mouseDown = false;
  }
*/


  unlock() {
    this.stack.style.transition = '';
    this.active = true;
  }

  moveTo(slide, time = '0.5s') {
    this.active = false;
    this.mouseDown = false;
    this.currentSlide = slide;
    this.stack.style.transition = time;
    this.stack.style.marginLeft = this.slideWidth * slide + 'px';
    // this.toggleMarker();
  }

  setSizes() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.slideWidth = -this.container.offsetWidth;
      this.slidesCount = this.stack.childElementCount - 1;
    }
    else if (window.matchMedia('(max-width: 1023px)').matches) {
      this.slideWidth = Math.round(this.container.offsetWidth * -52) / 100;
      this.slidesCount = this.stack.childElementCount - 2;
    }
    else {
      this.slideWidth = Math.round(this.container.offsetWidth * -34) / 100;
      this.slidesCount = this.stack.childElementCount - 3;
    }

    this.maxOffset = this.slideWidth * this.slidesCount;
    this.limit = Math.round(this.container.offsetWidth * 0.125);
    if (this.limit > 80) this.limit = 80;

    this.touchFrom = this.touchCurrent = 0;
    this.mouseFrom = this.mouseCurrent = 0;

    this.stack.style.marginLeft = '0px';
    this.currentSlide = 0;
    this.active = true;
    // this.toggleMarker();
  }
/*
  toggleMarker() {
    for (let elem of this.markersColl) { elem.classList.remove(this.currentMarkerClass) }

    this.markersColl[this.currentSlide].classList.add(this.currentMarkerClass);

    if (this.currentSlide === 0) {
      this.btnLeft.disabled = true;
      this.btnRight.disabled = false;
    }
    else if (this.currentSlide === this.slideCount) {
      this.btnLeft.disabled = false;
      this.btnRight.disabled = true;
    }
    else this.btnLeft.disabled = this.btnRight.disabled = false;
  }
*/
}



let gal = new Swiper(
  document.getElementsByClassName('gal')[0],
  // document.getElementsByClassName('controls__btn-left')[0],
  // document.getElementsByClassName('controls__btn-right')[0],
  // document.getElementsByClassName('controls__marker'),
  // 'controls__marker_current'
);
