/**
 * Define action to draw text
 */
function animation() {
  const animate = function (canvas) {
    window.canvas = canvas;

    const selector = document.querySelector("#selectAnimation");
    const download = document.querySelector("#downloadBtn");

    selector.addEventListener("change", function () {
      const selectedOption = selector.options[selector.selectedIndex];
      const selectedValue = selectedOption.value;
      const attribute = selectedOption.getAttribute("data-attribute");
      const attributeFunctions = {
        fade: fadeOption,
        scale: scaleOption,
        tiltTopV: tiltTopVOption,
        tiltTopH: tiltTopHOption,
        tiltBottomV: tiltBottomVOption,
        tiltBottomH: tiltBottomHOption,
        SlideinRight:SlideinRightOption,
        SlideinLeft:SlideinLeftOption,

      };

      // Call the function associated with the attribute if it exists
      if (attributeFunctions[attribute]) {
        attributeFunctions[attribute](selectedValue);
      }
    });

    function fadeOption(selectedValue) {
      const object = canvas.getActiveObject();
      object.animation = {
        style: "fade",
        delay: selectedValue,
        duration: 800,
      };
      fadeInFromBottom(object); // Adjust duration and delay as needed
    }
    function scaleOption(selectedValue) {
      const object = canvas.getActiveObject();
      object.animation = {
        style: "scale",
        delay: selectedValue,
        duration: 700,
      };
      scaleInCenter(object); // Adjust duration and delay as needed
    }
    function tiltTopVOption(selectedValue) {
      const object = canvas.getActiveObject();
      object.animation = {
        style: "tiltTopV",
        delay: selectedValue,
        duration: 1600,
      };
      tiltInTopV(object); // Adjust duration and delay as needed
    }
    function tiltTopHOption(selectedValue) {
      const object = canvas.getActiveObject();
      object.animation = {
        style: "tiltTopH",
        delay: selectedValue,
        duration: 1600,
      };
      tiltInTopH(object); // Adjust duration and delay as needed
    }
    function tiltBottomVOption(selectedValue) {
      const object = canvas.getActiveObject();
      object.animation = {
        style: "tiltBottomV",
        delay: selectedValue,
        duration: 1600,
      };
      tiltInBottomV(object); // Adjust duration and delay as needed
    }
    function tiltBottomHOption(selectedValue) {
      const object = canvas.getActiveObject();
      object.animation = {
        style: "tiltBottomH",
        delay: selectedValue,
        duration: 1600,
      };
      tiltInBottomH(object); // Adjust duration and delay as needed
    }
    function SlideinLeftOption(selectedValue) {
      const object = canvas.getActiveObject();
      object.animation = {
        style: "SlideinLeft",
        delay: selectedValue,
        duration: 1600,
      };
      SlideinLeft(object); // Adjust duration and delay as needed
    }
    function SlideinRightOption(selectedValue) {
      const object = canvas.getActiveObject();
      object.animation = {
        style: "SlideinRight",
        delay: selectedValue,
        duration: 1600,
      };
      SlideinRight(object); // Adjust duration and delay as needed
    }

    // Animation Functions
    function fadeInFromBottom(object) {
      const originalTop = object.top; // Store the original top value
      const distanceToMove = 70; // Set a fixed distance

      object.opacity = 0;
      object.top -= distanceToMove;

      setTimeout(() => {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: object.animation.duration,
          onChange: function (value) {
            object.opacity = value; // Update the opacity based on the current animation value
            // Calculate the new top position based on the animation progress
            object.top = originalTop + distanceToMove * (1 - value);
            canvas.renderAll();
          },
          onComplete: function () {
            object.top = originalTop; // Restore the original top value after animation
            canvas.renderAll();
          },
          easing: fabric.util.ease.easeInCubic, // This might need to be changed if you want to replicate the exact cubic-bezier curve
        });
      }, object.animation.delay * 1000); // Convert delay from seconds to milliseconds for setTimeout
    }
    function scaleInCenter(object) {
      // Store the original scale, opacity, and origin settings
      const originalScaleX = object.scaleX;
      const originalScaleY = object.scaleY;
      const originalOpacity = object.opacity;
      const originalLeft = object.left;
      const originalTop = object.top;

      // Set the initial states
      object.scaleX = 0;
      object.scaleY = 0;
      object.opacity = 0;

      setTimeout(() => {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: object.animation.duration,
          onChange: function (value) {
            // Adjusting scale and opacity based on the animation value
            if (value <= 0.2) {
              object.scaleX = originalScaleX * value * 2;
              object.scaleY = originalScaleY * value * 2;
              object.opacity = originalOpacity * value * 1;
            } else {
              object.scaleX = originalScaleX * value;
              object.scaleY = originalScaleY * value;
              object.opacity = originalOpacity * value;
            }
            // Adjust the position to create the effect of scaling from the center
            object.left =
              originalLeft - (object.width * object.scaleX - object.width) / 2;
            object.top =
              originalTop - (object.height * object.scaleY - object.height) / 2;

            canvas.renderAll();
          },
          // Easing function
          easing: fabric.util.ease.easeOutQuart,
        });
      }, object.animation.delay * 1000);
    }
    function tiltInTopV(object) {
      // Store original properties
      const originalAngle = object.angle; // equivalent to rotateY in 2D
      const originalTop = object.top;
      const originalSkewY = object.skewY;
      const originalOpacity = object.opacity;

      // Set initial states based on the 0% keyframe
      object.angle = 30; // rotateY(30deg) - in 2D we can just use angle
      object.top = originalTop - 300; // translateY(-300px)
      object.skewY = -30; // skewY(-30deg)
      object.opacity = 0;

      setTimeout(() => {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: object.animation.duration,
          onChange: function (value) {
            object.angle = originalAngle + 30 * (1 - value);
            object.top = originalTop - 300 * (1 - value);
            object.skewY = originalSkewY - 30 * (1 - value);
            object.opacity = originalOpacity + value;

            canvas.renderAll();
          },
          easing: fabric.util.ease.easeOutQuart, // Closest approximation to the provided bezier curve
        });
      }, object.animation.delay * 1000);
    }
    function tiltInTopH(object) {
      // Store original properties
      const originalAngle = object.angle; // equivalent to rotateY in 2D
      const originalTop = object.top;
      const originalSkewY = object.skewY;
      const originalOpacity = object.opacity;

      // Set initial states based on the 0% keyframe
      object.angle = -30; // rotateY(-30deg) - in 2D we can just use angle
      object.top = originalTop - 300; // translateY(-300px)
      object.skewY = 30; // skewY(30deg)
      object.opacity = 0;

      setTimeout(() => {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: object.animation.duration,
          onChange: function (value) {
            object.angle = originalAngle + -30 * (1 - value);
            object.top = originalTop - 300 * (1 - value);
            object.skewY = originalSkewY + 30 * (1 - value);
            object.opacity = originalOpacity + value;

            canvas.renderAll();
          },
          easing: fabric.util.ease.easeOutQuart, // Closest approximation to the provided bezier curve
        });
      }, object.animation.delay * 1000);
    }
    function tiltInBottomH(object) {
      // Store original properties
      const originalAngle = object.angle; // equivalent to rotateY in 2D
      const originalTop = object.top;
      const originalSkewY = object.skewY;
      const originalOpacity = object.opacity;

      // Set initial states based on the 0% keyframe
      object.angle = 30; // rotateY(30deg) - in 2D we can just use angle
      object.top = originalTop + 300; // translateY(300px)
      object.skewY = -30; // skewY(-30deg)
      object.opacity = 0;

      setTimeout(function () {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: object.animation.duration,
          onChange: function (value) {
            object.angle = originalAngle + 30 * (1 - value);
            object.top = originalTop + 300 * (1 - value);
            object.skewY = originalSkewY - 30 * (1 - value);
            object.opacity = originalOpacity + value;

            canvas.renderAll();
          },
          easing: fabric.util.ease.easeOutQuart, // Closest approximation to the provided bezier curve
        });
      }, object.animation.delay * 1000);
    }
    function tiltInBottomV(object) {
      // Store original properties
      const originalAngle = object.angle; // equivalent to rotateY in 2D
      const originalTop = object.top;
      const originalSkewY = object.skewY;
      const originalOpacity = object.opacity;

      // Set initial states based on the 0% keyframe
      object.angle = -30; // rotateY(-30deg) - in 2D we can just use angle
      object.top = originalTop + 300; // translateY(300px)
      object.skewY = 30; // skewY(30deg)
      object.opacity = 0;

      setTimeout(function () {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: object.animation.duration,
          onChange: function (value) {
            object.angle = originalAngle + -30 * (1 - value);
            object.top = originalTop + 300 * (1 - value);
            object.skewY = originalSkewY + 30 * (1 - value);
            object.opacity = originalOpacity + value;

            canvas.renderAll();
          },
          easing: fabric.util.ease.easeOutQuart, // Closest approximation to the provided bezier curve
        });
      }, object.animation.delay * 1000);
    }
    function SlideinRight(object) {
      object.opacity = 0;
      duration: object.animation.duration,
      setTimeout(() => {
        fabric.util.animate({
          startValue: canvas.width - object.width,
          endValue: object.left,
          duration: 300, // Animation duration in milliseconds
          onChange: function (value) {
            object.opacity = value;
            object.set({ left: value }); // Update the left position of the object
            canvas.renderAll(); // Render the canvas to show the updated position
          },
          onComplete: function () {
            console.log("Animation complete");
          },
        });
      }, object.animation.delay * 1000);
    }
    function SlideinLeft(object) {
      duration: object.animation.duration,
      object.opacity = 0;
      setTimeout(() => {
        fabric.util.animate({
          startValue: object.width,
          endValue: object.left,
          duration: 300, // Animation duration in milliseconds
          onChange: function (value) {
            object.opacity = value;
            object.set({ left: value }); // Update the left position of the object
            canvas.renderAll(); // Render the canvas to show the updated position
          },
          onComplete: function () {
            console.log("Animation complete");
          },
        });
      }, object.animation.delay * 1000);
    }
    //Download
    function captureFrame() {
      return new Promise((resolve) => {
        canvas.renderAll(); // Make sure the canvas is rendered before capturing
        const dataURL = canvas.toDataURL({ format: "png" });
        const img = new Image();
        img.src = dataURL;
        img.onload = () => resolve(img);
      });
    }
    download.addEventListener("click", async () => {
      const zip = new JSZip();
      const frameCount = 30;
      const fps = 1000 / 24;
      const animationFunctions = {
        fade: fadeInFromBottom,
        scale: scaleInCenter,
        tiltTopV: tiltInTopV,
        tiltTopH: tiltInTopH,
        tiltBottomV: tiltInBottomH,
        tiltBottomH: tiltInBottomV,
        SlideinRight:SlideinRight,
        SlideinLeft:SlideinLeft,
      };
      canvas.getObjects().forEach((item) => {
        const animFunc = animationFunctions[item?.animation?.style];
        if (animFunc) {
          animFunc(item);
        }
      });
      for (let i = 0; i < frameCount; i++) {
        setTimeout(() => {
          const intervalId = setInterval(fps, 10);
          resolve();
        }, 10);
        const frameImage = await captureFrame(i); // Capture each frame
        const frameDataURL = frameImage.src;
        const fileName = `frame${i}.png`;

        zip.file(fileName, frameDataURL.split(",")[1], { base64: true }); // Add image to zip
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = "animation_frames.zip";
      link.click();
    });
  };

  window.ImageEditor.prototype.initializeAnimation = animate;
}
animation();
