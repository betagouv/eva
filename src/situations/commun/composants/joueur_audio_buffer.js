export default class JoueurAudioBuffer {
  start (audioBuffer, callbackFin) {
    this.sonEnCours = audioBuffer;
    audioBuffer.start();
    this.timeoutId = setTimeout(callbackFin, audioBuffer.buffer.duration * 1000);
  }

  stop () {
    clearTimeout(this.timeoutId);
    this.sonEnCours.stop();
  }
}
