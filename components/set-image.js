/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 800}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
        if(current[data.src.split('-')[1]] != null) {

            // Fade out image.
            //document.querySelector('#image-current').emit('transition');
            //document.querySelector('#image-' + data.src.split('-')[1]).emit('transition');
            data.target.emit('set-image-fade');
            console.log(data);
            console.log(el);
            // Wait for fade to complete.
            setTimeout(function () {
            // Set image.
                data.target.setAttribute('material', 'src', current[data.src.split('-')[1]].img);
                //data.target.setAttribute('material', 'opacity', 1);
                //data.target.setAttribute('visible', false);

                //
                // document.querySelector('#image-' + data.src.split('-')[1]).setAttribute('visible', false);
                // document.querySelector('#image-' + data.src.split('-')[1]).setAttribute('material', 'opacity', 0);

                var previous = current;
                current = current[data.src.split('-')[1]];

                if(current.right == null) {
                    document.querySelector('#goRightLink').setAttribute("visible", false);
                    //document.querySelector('#right-image').setAttribute("src", "assets/arrow.png");
                    //console.log(document.querySelector('#image-right'));
                } else {
                    document.getElementById('goRightLink').setAttribute("visible", true);
                    //document.querySelector('#right-image').setAttribute("src", current['right'].img);
                    //console.log(document.querySelector('#image-right'));
                }
                if(current.left == null) {
                    document.getElementById('goLeftLink').setAttribute("visible", false);
                    //document.querySelector('#image-left').setAttribute("material", "src", "assets/arrow.png");
                } else {
                    document.getElementById('goLeftLink').setAttribute("visible", true);
                    //document.querySelector('#image-left').setAttribute("material", "src", current['left'].img);
                }
                if(current.forward == null) {
                    document.getElementById('goForwardLink').setAttribute("visible", false);
                    //document.querySelector('#image-forward').setAttribute("material", "src", "assets/arrow.png");
                } else {
                    document.getElementById('goForwardLink').setAttribute("visible", true);
                    //document.querySelector('#image-forward').setAttribute("material", "src", current['forward'].img);
                }
                if(current.backward == null) {
                    document.getElementById('goBackwardLink').setAttribute("visible", false);
                    //document.querySelector('#image-backward').setAttribute("material", "src", "assets/arrow.png");
                } else {
                    document.getElementById('goBackwardLink').setAttribute("visible", true);
                    //document.querySelector('#image-backward').setAttribute("material", "src", current['backward'].img);
                }
            }, data.dur);
        }
    });
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#888'
    });
  }
});
