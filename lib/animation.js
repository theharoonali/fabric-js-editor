/**
 * Define action to draw text
 */
function animation() {
  const animate = function (canvas) {
    window.canvas = canvas;

    let maxDelay = 0;
    const selector = document.querySelector("#selectAnimation");
    const delay = document.querySelector("#anim-delay");
    const duration = document.querySelector("#anim-duration");
    const download = document.querySelector("#downloadBtn");
    const preview = document.querySelector("#previewBtn");
    const writtenText = document.querySelector("#fileName");

    // Animation Functions
    const fadeInFromBottom = (object) => {
      const originalTop = object.top; // Store the original top value
      const distanceToMove = 70; // Set a fixed distance

      object.opacity = 0;
      object.top -= distanceToMove;

      setTimeout(() => {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: object.animation.duration * 1000,
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
    const scaleInCenter = (object) => {
      const originalScaleX = object.scaleX;
      const originalScaleY = object.scaleY;
      const originalLeft = object.left;
      const originalTop = object.top;
      const scaleXDiff = (object.width * (originalScaleX - 1)) / 2;
      const scaleYDiff = (object.height * (originalScaleY - 1)) / 2;
      object.scaleX = 0;
      object.scaleY = 0;
      object.opacity = 0;
      setTimeout(() => {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: object.animation.duration * 1000,
          onChange: function (value) {
            object.scaleX = originalScaleX * value;
            object.scaleY = originalScaleY * value;
            object.opacity = value;
            const adjustedScaleXDiff = (object.width * (object.scaleX - 1)) / 2;
            const adjustedScaleYDiff =
                (object.height * (object.scaleY - 1)) / 2;
            object.left = originalLeft - adjustedScaleXDiff + scaleXDiff;
            object.top = originalTop - adjustedScaleYDiff + scaleYDiff;
            canvas.renderAll();
          },
          // Easing function
          easing: fabric.util.ease.easeOutQuart,
        });
      }, object.animation.delay * 1000);
    }
    const tiltInTopV = (object) => {
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
          duration: object.animation.duration * 1000,
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
    const tiltInTopH = (object) => {
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
          duration: object.animation.duration * 1000,
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
    const tiltInBottomH = (object) => {
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
          duration: object.animation.duration * 1000,
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
    const tiltInBottomV = (object) => {
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
          duration: object.animation.duration * 1000,
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
    const SlideinRight = (object) => {
      object.opacity = 0;
      setTimeout(() => {
        fabric.util.animate({
          startValue: canvas.width - object.width,
          endValue: object.left,
          duration: object.animation.duration * 1000,
          onChange: function (value) {
            object.opacity = 0.04;
            object.set({ left: value }); // Update the left position of the object
            canvas.renderAll(); // Render the canvas to show the updated position
          },
          onComplete: function () {
            object.opacity = 1;
            canvas.renderAll();
          },
        });
      }, object.animation.delay * 1000);
    }
    const SlideinLeft = (object) => {
      (object.opacity = 0),
          setTimeout(() => {
            fabric.util.animate({
              startValue: object.width,
              endValue: object.left,
              duration: object.animation.duration * 1000,
              onChange: function (value) {
                object.set({ left: value }); // Update the left position of the object
                object.opacity = 0.4;
                canvas.renderAll(); // Render the canvas to show the updated position
              },
              onComplete: function () {
                object.opacity = 1;
                canvas.renderAll();
              },
            });
          }, object.animation.delay * 1000);
    }
    const ScaleVericalBottom = (object) => {
      // Store the original scale, opacity, and position settings
      const originalScaleY = object.scaleY;
      const originalOpacity = object.opacity;
      const originalTop = object.top;

      // Set the initial states
      object.scaleY = 0;
      object.opacity = 0;

      setTimeout(() => {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: object.animation.duration * 1000,
          onChange: function (value) {
            object.scaleY = originalScaleY * value;
            object.opacity = originalOpacity * value;
            const newTop =
                originalTop + object.height * (originalScaleY - object.scaleY);
            object.top = newTop;
            canvas.renderAll();
          },
          // Easing function
          easing: fabric.util.ease.easeOutQuart,
        });
      }, object.animation.delay * 1000);
    }
    const ScaleVericalTop = (object) => {
      // Store the original scale, opacity, and origin settings
      const originalScaleY = object.scaleY;
      const originalOpacity = object.opacity;
      const originalTop = object.top;

      // Set the initial states
      object.scaleY = 0;
      object.opacity = 0;

      setTimeout(() => {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: object.animation.duration * 1000,
          onChange: function (value) {
            // Adjusting scale and opacity based on the animation value
            object.scaleY = originalScaleY * value;
            object.opacity = originalOpacity * value;
            // Adjust the position to create the effect of scaling from the center

            object.top = originalTop;

            canvas.renderAll();
          },
          // Easing function
          easing: fabric.util.ease.easeOutQuart,
        });
      }, object.animation.delay * 1000);
    }
    const ScaleHorizontal = (object) => {
      const originalScaleX = object.scaleX;
      const originalOpacity = object.opacity;
      const originalTop = object.top;
      object.scaleX = 0;
      object.opacity = 0;

      setTimeout(() => {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: object.animation.duration * 1000,
          onChange: function (value) {
            object.scaleX = originalScaleX * value;
            object.opacity = originalOpacity * value;
            object.top = originalTop;
            canvas.renderAll();
          },
          easing: fabric.util.ease.easeOutQuart,
        });
      }, object.animation.delay * 1000);
    }

    const animationFunctions = {
      fade: fadeInFromBottom,
      scale: scaleInCenter,
      tiltTopV: tiltInTopV,
      tiltTopH: tiltInTopH,
      tiltBottomV: tiltInBottomH,
      tiltBottomH: tiltInBottomV,
      SlideinRightV: SlideinRight,
      SlideinLeftV: SlideinLeft,
      ScaleVericalTopV: ScaleVericalTop,
      ScaleVericalBottomV: ScaleVericalBottom,
      ScaleHorizontalV: ScaleHorizontal,
    };

    const callAnimationOnChange = ({delay = 0.5,duration= 0.8}) => {
      const selectedOption = selector.options[selector.selectedIndex];
      const attribute = selectedOption.getAttribute("data-attribute");
      const object = canvas.getActiveObject();
      if(!attribute || !object) return
      object.animation = {
        style: attribute,
        delay: delay,
        duration: duration,
      };
      const animFunc = animationFunctions[object?.animation?.style];
      if (animFunc) animFunc(object)
    }

    const animatingObjects = () => {
      canvas.getObjects().forEach((item) => {
        const animDelay = item?.animation?.delay || 0; // Get the animation delay or default to 0
        if (animDelay > maxDelay) {
          maxDelay = animDelay; // Update maxDelay if the current delay is greater
        }
        const animFunc = animationFunctions[item?.animation?.style];
        if (animFunc) animFunc(item)
      });
    }

    const delayChange = (e) => {
      const selectedValue = parseFloat(e.target.value);
      e.target.nextSibling.textContent = selectedValue.toString();
      callAnimationOnChange({delay:selectedValue,duration:parseFloat(duration.value)})
    }
    const durationChange = (e) => {
      const selectedValue = parseFloat(e.target.value);
      e.target.nextSibling.textContent = selectedValue.toString();
      callAnimationOnChange({delay:parseFloat(delay.value),duration:selectedValue})
    }

    selector.addEventListener("change",  () => {
      callAnimationOnChange({delay : parseFloat(delay.value), duration : parseFloat(duration.value)})
    });
    delay.addEventListener("change",delayChange);
    duration.addEventListener("change",durationChange);

    //Download
    const captureFrame = async () => {
      return new Promise((resolve) => {
        canvas.renderAll();
        const dataURL = canvas.toDataURL({ format: "png" });
        const img = new Image();
        img.src = dataURL;
        img.onload = () => resolve(img);
      });
    }
    const downloadZip = async (progressCallback) => {
      const zip = new JSZip();
      const fps = 1000 / 24;
      animatingObjects();
      const totalseconds = maxDelay * 1000;
      const newFrameCount = (totalseconds / 1000) * 24;
      let newFrame;
      if (newFrameCount < 30) {
        newFrame = 30;
      } else {
        newFrame = newFrameCount;
      }
      for (let i = 0; i < newFrame; i++) {
        await new Promise((resolve) => setTimeout(resolve, 42));
        const frameImage = await captureFrame(i);
        const frameDataURL = frameImage.src;
        const fileName = `frame${i}.png`;
        zip.file(fileName, frameDataURL.split(",")[1], { base64: true });
        const percentComplete = (i / newFrame) * 100;
        progressCallback(percentComplete);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      const fileName =
          (writtenText.value && writtenText.value.trim()) || "animation_frames";
      link.download = `${fileName}.zip`;
      link.click();
    }

    download.addEventListener("click", async () => {
      $('.downloadbtn').addClass("loading").removeClass("finished");
      await downloadZip((progress) => {
        // Update the width of the loading bar
        document.querySelector('.downloadbtn.loading').style.setProperty('--loader-width', `${progress}%`);
      });
      $(".downloadbtn")
          .removeClass("loading")
          .addClass("finished disabled")
          .html("Complete");
    });
    preview.addEventListener("click", async () => {
      $('.downloadbtn').removeClass("finished disabled").html("SEKVENS");
      animatingObjects();
    });


  };

  window.ImageEditor.prototype.initializeAnimation = animate;
}
animation();
