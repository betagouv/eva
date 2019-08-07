export default class MockAudioNode {
  constructor (son) {
    this.src = son;
    this.buffer = { duration: 0 };
  }

  start () {}

  stop () {}
}
