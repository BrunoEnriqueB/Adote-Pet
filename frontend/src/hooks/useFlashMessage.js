import bus from '../utils/bus';

export function UseFlashMessage() {
  function setFlashMessage(msg, type) {
    bus.emit('flash', {
      message: msg,
      type: type
    })
  }

  return { setFlashMessage }
}