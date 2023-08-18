/**
 * Define action to draw text
 */
function override() {
    fabric.Textbox.prototype._renderBackground = function(ctx) {
        if (!this.backgroundColor && !this.fill) return;
    
        var dim = this._getNonTransformedDimensions();
        if (this.group && this.group.type === 'path-group') {
            ctx.translate(-this.width / 2, -this.height / 2);
        }
    
        ctx.fillStyle = this.backgroundColor;
    
        // Check if rx and ry properties are set, otherwise fallback to 0 (no rounded corners)
        var rx = this.rx || 0;
        var ry = this.ry || 0;
    
        // Draw a rounded rectangle as the background
        this._createPath(ctx, dim, rx, ry);
        ctx.fill();
    
          
          // if there is background color no other shadows
          // should be casted
          this._removeShadow(ctx);
    };
    
    fabric.Textbox.prototype._createPath = function(ctx, dim, rx, ry) {
        // This function draws a rounded rectangle using the given dimensions and corner radii
        var x = -dim.x / 2, y = -dim.y / 2, w = dim.x, h = dim.y;
    
        ctx.beginPath();
        ctx.moveTo(x + rx, y);
        ctx.lineTo(x + w - rx, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + ry);
        ctx.lineTo(x + w, y + h - ry);
        ctx.quadraticCurveTo(x + w, y + h, x + w - rx, y + h);
        ctx.lineTo(x + rx, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - ry);
        ctx.lineTo(x, y + ry);
        ctx.quadraticCurveTo(x, y, x + rx, y);
        ctx.closePath();
    };
    
  }
  override();
  