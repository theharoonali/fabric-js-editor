/**
 * Define action to draw text
 */
function drawingtext() {
  const textBoxDrawing = function (canvas) {
    let isDrawingText = false,
      textboxRect,
      origX,
      origY,
      pointer;
    window.canvas = canvas;
    console.log(canvas);
    canvas.on("mouse:down", (o) => {
      if (!canvas.isDrawingTextMode) return;

      isDrawingText = true;
      pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      textboxRect = new fabric.Rect({
        left: origX,
        top: origY,
        width: pointer.x - origX,
        height: pointer.y - origY,
        strokeWidth: 1,
        stroke: "#C00000",
        fill: "rgba(192, 0, 0, 0.2)",
        transparentCorners: false,
      });
      canvas.add(textboxRect);
    });

    canvas.on("mouse:move", (o) => {
      if (!isDrawingText) return;

      pointer = canvas.getPointer(o.e);

      if (origX > pointer.x) {
        textboxRect.set({
          left: Math.abs(pointer.x),
        });
      }

      if (origY > pointer.y) {
        textboxRect.set({
          top: Math.abs(pointer.y),
        });
      }

      textboxRect.set({
        width: Math.abs(origX - pointer.x),
      });
      textboxRect.set({
        height: Math.abs(origY - pointer.y),
      });

      canvas.renderAll();
    });

    canvas.on("mouse:up", () => {
      if (!isDrawingText) return;

      isDrawingText = false;

      // get final rect coords and replace it with textbox
      let textbox = new fabric.Textbox("Skriv tekst her...", {
        left: textboxRect.left,
        top: textboxRect.top,
        width: textboxRect.width < 80 ? 80 : textboxRect.width,
        fontSize: 18,
        //  fontFamily: "'Open Sans', sans-serif",
        fontFamily: "'Myriad Pro', sans-serif",
        fill: "white",
        backgroundColor: "black",
      });
      canvas.remove(textboxRect);
      canvas.add(textbox).setActiveObject(textbox);
      textbox.setControlsVisibility({
        mb: false,
      });
      canvas.trigger("object:modified");
    });
    let selectorAnimation = document.getElementById("selectAnimation");

       function loadAnimationSelector() {
        const selector = document.getElementById("selectAnimation");

        selector.addEventListener("change", function () {
          const selectedOption = selector.options[selector.selectedIndex];
          const selectedValue = selectedOption.value;

          switch (selectedValue) {
            case "fade-in-05":
              option1Function();
              selectorAnimation.value = "none";
              break;
            case "fade-in-10":
              option2Function();
              selectorAnimation.value = "none";
              break;
            case "fade-in-15":
              option3Function();
              break;
            default:
              break;
          }
        });

        function option1Function() {
          let a = canvas.getActiveObject();
          a.animation = { style: "fade", duration: 800, delay: 100 };
          fadeInFromBottom(a.animation.duration, a.animation.delay, a); // Adjust duration and delay as needed
        }

        function option2Function() {
          let a = canvas.getActiveObject();
          a.animation = { style: "fade", duration: 800, delay: 100 };
          fadeInFromBottom(a.animation.duration, a.animation.delay, a); 
        }

        function option3Function() {
          console.log("You selected Option 3");
        }
        function captureFrame() {
          return new Promise((resolve) => {
            canvas.renderAll(); // Make sure the canvas is rendered before capturing
            const dataURL = canvas.toDataURL({ format: "png" });
            const img = new Image();
            img.src = dataURL;
            img.onload = () => resolve(img);
          });
        }
        document
          .getElementById("downloadBtn")
          .addEventListener("click", async () => {
            const zip = new JSZip();
            const frameCount = 30;
            const fps = 1000 / 24;
            canvas.getObjects().forEach((item) => {
              if (item.animation)
                fadeInFromBottom(
                  item.animation.duration,
                  item.animation.delay,
                  item
                );
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
      }

      loadAnimationSelector();

      function fadeInFromBottom(duration, delay, textObject) {
        var originalTop = textObject.top; // Store the original top value
        var distanceToMove = originalTop - (textObject.top + 70); // Calculate the distance to move
    
        textObject.opacity = 0;
        textObject.top += 70;
    
        fabric.util.animate({
            startValue: 0,
            endValue: 1,
            duration: duration,
    
            onChange: function (value) {
              textObject.opacity = 0.5;
              textObject.opacity = 0.7;
                textObject.opacity = value;
    
                // Calculate the new top position based on the animation progress
                textObject.top = originalTop - (distanceToMove * (1 - value));
    
                canvas.renderAll();
            },
            onComplete: function () {
                // Restore the original top value
                textObject.top = originalTop;
                canvas.renderAll();
            },
            easing: fabric.util.ease.easeInCubic,
            delay: delay,
        });
    }
    canvas.renderAll();
  };

  window.ImageEditor.prototype.initializeTextBoxDrawing = textBoxDrawing;
}
drawingtext();
