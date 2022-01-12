export default class JoueurAudioBuffer {
  start (audioBuffer, callbackFin) {
    this.sonEnCours = audioBuffer;
    this.sonEnCours.start();
    this.timeoutId = setTimeout(callbackFin, this.sonEnCours.buffer.duration * 1000);
  }

  stop () {
    if (this.sonEnCours) {
      clearTimeout(this.timeoutId);
      this.sonEnCours.stop();
      this.sonEnCours = null;
    }
  }
}
