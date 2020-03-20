import { ipcRenderer } from 'electron';

export default class Client {
  constructor(emitter) {
    this.emitter = emitter;
    this.ipc = ipcRenderer;
    this.ipcListener = this.ipcListener.bind(this);
    if (window.__rpcId) {
      setTimeout(() => {
        this.id = window.__rpcId;
        this.ipc.on(this.id, this.ipcListener);
      }, 0);
    } else {
      this.ipc.on('init', (e, uid) => {
        window.__rpcId = uid;
        this.id = uid;
        this.ipc.on(this.id, this.ipcListener);
        this.emitter.emit('ready');
      });
    }
  }

  ipcListener(ev, { ch, data }) {
    this.emitter.emit(ch, data);
  }

  on(ev, fn) {
    this.emitter.on(ev, fn);
  }

  emit(ev, data) {
    if (!this.id) {
      throw new Error('Not ready');
    }
    this.ipc.send(this.id, { ev, data });
  }
}
