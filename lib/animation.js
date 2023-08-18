/**
 * Define action to draw text
 */
function animation() {
  const animate = function (canvas) {
    window.canvas = canvas;

    const selector = document.querySelector("#selectAnimation");
    const download = document.querySelector("#downloadBtn");
    const preview = document.querySelector("#previewBtn");
    const writtenText = document.querySelector("#fileName");

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
        SlideinRightV:SlideinRightOption,
        SlideinLeftV:SlideinLeftOption,
        ScaleVericalTopV: ScaleVericalTopOption,
        ScaleVericalBottomV:ScaleVericalBottomOption,
        ScaleHorizontalV:ScaleHorizontalOption,

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
        style: "SlideinLeftV",
        delay: selectedValue,
        duration: 1600,
      };
      SlideinLeft(object); // Adjust duration and delay as needed
    }
    function SlideinRightOption(selectedValue) {
      const object = canvas.getActiveObject();
      object.animation = {
        style: "SlideinRightV",
        delay: selectedValue,
        duration: 1600,
      };
      SlideinRight(object); // Adjust duration and delay as needed
    }
    function ScaleVericalTopOption(selectedValue) {
      const object = canvas.getActiveObject();
      object.animation = {
        style: "ScaleVericalTopV",
        delay: selectedValue,
        duration: 1600,
      };
      ScaleVericalTop(object); // Adjust duration and delay as needed
    }    
    function ScaleVericalBottomOption(selectedValue) {
      const object = canvas.getActiveObject();
      object.animation = {
        style: "ScaleVericalBottomV",
        delay: selectedValue,
        duration: 1600,
      };
      ScaleVericalBottom(object); // Adjust duration and delay as needed
    }    
    function ScaleHorizontalOption(selectedValue) {
      const object = canvas.getActiveObject();
      object.animation = {
        style: "ScaleHorizontalV",
        delay: selectedValue,
        duration: 1600,
      };
      ScaleHorizontal(object); // Adjust duration and delay as needed
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
          duration: object.animation.duration,
          onChange: function (value) {
            object.scaleX = originalScaleX * value;
            object.scaleY = originalScaleY * value;
            object.opacity = value;
            const adjustedScaleXDiff = (object.width * (object.scaleX - 1)) / 2;
            const adjustedScaleYDiff = (object.height * (object.scaleY - 1)) / 2;
            object.left = originalLeft - adjustedScaleXDiff + scaleXDiff;
            object.top = originalTop - adjustedScaleYDiff + scaleYDiff;
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
      setTimeout(() => {
        fabric.util.animate({
          startValue: canvas.width - object.width,
          endValue: object.left,
          duration: 400, // Animation duration in milliseconds
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
    function SlideinLeft(object) {
      object.opacity = 0,
      setTimeout(() => {
        fabric.util.animate({
          startValue: object.width,
          endValue: object.left,
          duration: 400, // Animation duration in milliseconds
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
    function ScaleVericalBottom(object) {
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
       duration: 800,
       onChange: function (value) {
         object.scaleY = originalScaleY * value;
         object.opacity = originalOpacity * value;
         const newTop = originalTop + object.height * (originalScaleY - object.scaleY);
         object.top = newTop;
         canvas.renderAll();
       },
       // Easing function
       easing: fabric.util.ease.easeOutQuart,
     });
   }, object.animation.delay * 1000);
 }

    function ScaleVericalTop(object) {
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
          duration: 800,
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
    function ScaleHorizontal(object) {
      const originalScaleX = object.scaleX;
      const originalOpacity = object.opacity;
      const originalTop = object.top;
      object.scaleX = 0;
      object.opacity = 0;

      setTimeout(() => {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: 800,
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
    //Download
    function captureFrame() {
      return new Promise((resolve) => {
        canvas.renderAll();
        const dataURL = canvas.toDataURL({ format: "png" });
        const img = new Image();
        img.src = dataURL;
        img.onload = () => resolve(img);
      });
    }
    function getAnimationFunctions() {
      return {
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
    } 
    let maxDelay = 0;
    download.addEventListener("click", async () => {
      const zip = new JSZip();
      const fps = 1000 / 24;
      const animationFunctions = getAnimationFunctions();
      canvas.getObjects().forEach((item) => {
        const animDelay = item?.animation?.delay || 0; // Get the animation delay or default to 0
        if (animDelay > maxDelay) {
          maxDelay = animDelay; // Update maxDelay if the current delay is greater
        }
        const animFunc = animationFunctions[item?.animation?.style];
        if (animFunc) {
          animFunc(item);
        }
      });
      const totalseconds = (maxDelay * 1000);
      const newFrameCount = (totalseconds/1000) * 24; 
      let newFrame;
      if (newFrameCount < 30) {
        newFrame = 30;
      } else {
        newFrame = newFrameCount;
      }
      for (let i = 0; i < newFrame; i++) {
        await new Promise(resolve => setTimeout(resolve, 42));
        const frameImage = await captureFrame(i);
        const frameDataURL = frameImage.src;
        const fileName = `frame${i}.png`;
        zip.file(fileName, frameDataURL.split(",")[1], { base64: true });
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      const fileName = (writtenText.value && writtenText.value.trim()) || "animation_frames";
      link.download = `${fileName}.zip`;
      link.click();
    });

    preview.addEventListener("click", async () => {
      const animationFunctions = getAnimationFunctions();
      canvas.getObjects().forEach((item) => {
        const animDelay = item?.animation?.delay || 0; 
        if (animDelay > maxDelay) {
          maxDelay = animDelay;
        }
        const animFunc = animationFunctions[item?.animation?.style];
        if (animFunc) {
          animFunc(item);
        }
      });
    });
  };

  window.ImageEditor.prototype.initializeAnimation = animate;
}
animation();
