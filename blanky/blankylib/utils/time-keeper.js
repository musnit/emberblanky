function TimeKeeper() {
    this.timePassed = 0;
    this.previousTime = 0;
}  

TimeKeeper.prototype.start = function() {
    this.initialTime = Date.now();
    this.currentTime = 0;
    this.lastTime = 0;
};

TimeKeeper.prototype.pause = function() {
    this.paused = true;
};

TimeKeeper.prototype.play = function() {
    this.paused = false;
};

TimeKeeper.prototype.setTime = function(time) {
  this.timePassed = parseFloat(time);
};

TimeKeeper.prototype.update = function(time) {
    if (!this.paused){
      var timeDiff = time - this.previousTime;
      this.timePassed = this.timePassed + timeDiff;
    }
    this.previousTime = time;
};
export default TimeKeeper;
