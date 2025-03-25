let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const moveHandler = (e) => {
      if (!this.holdingPaper) return;
      const event = e.touches ? e.touches[0] : e;

      this.mouseX = event.clientX;
      this.mouseY = event.clientY;

      if (!this.rotating) {
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }

      if (this.rotating) {
        const dx = this.mouseX - this.mouseTouchX;
        const dy = this.mouseY - this.mouseTouchY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        this.rotation = (360 + Math.round(angle)) % 360;
      }

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      requestAnimationFrame(() => {
        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
      });
    };

    const startHandler = (e) => {
      if (this.holdingPaper) return;
      const event = e.touches ? e.touches[0] : e;

      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.mouseTouchX = this.mouseX = event.clientX;
      this.mouseTouchY = this.mouseY = event.clientY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      if (e.type === "mousedown" && e.button === 2) {
        this.rotating = true;
      }
    };

    const endHandler = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("touchmove", moveHandler, { passive: true });
    paper.addEventListener("mousedown", startHandler);
    paper.addEventListener("touchstart", startHandler, { passive: true });
    window.addEventListener("mouseup", endHandler);
    window.addEventListener("touchend", endHandler);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".paper").forEach((paper) => {
    new Paper().init(paper);
  });
});
