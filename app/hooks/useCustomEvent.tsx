export const enum EVENT_NAMES {
  TEST = "test"
}

export function useCustomEvent() {
  // listen
  function subscribe(eventName: string, listener: () => void) {
    document.addEventListener(eventName, listener);
  }

  // remove
  function unsubscribe(eventName: string, listener: () => void) {
    document.removeEventListener(eventName, listener);
  }

  // emit
  function publish(eventName: string, data?: {}) {
    const event = new CustomEvent(eventName, { detail: data });
    
    document.dispatchEvent(event);
  }

  return {
    subscribe,
    unsubscribe,
    publish,
  }
}
