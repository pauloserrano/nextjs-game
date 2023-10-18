export function useCustomEvent() {
  function listen(eventName: string, callback: (detail?: any) => void) {
    document.addEventListener(eventName, callback);
  }

  function remove(eventName: string, callback: (detail?: any) => void) {
    document.removeEventListener(eventName, callback);
  }

  function dispatch(eventName: string, data?: {}) {
    const event = new CustomEvent(eventName, { detail: data });
    
    document.dispatchEvent(event);
  }

  return {
    listen,
    remove,
    dispatch,
  }
}
