import { EVENT_TYPES } from "../types";

export function useCustomEvent() {
  function listen(eventName: EVENT_TYPES, callback: (detail?: any) => void) {
    document.addEventListener(eventName, callback);
  }

  function remove(eventName: EVENT_TYPES, callback: (detail?: any) => void) {
    document.removeEventListener(eventName, callback);
  }

  function dispatch(eventName: EVENT_TYPES, data?: {}) {
    const event = new CustomEvent(eventName, { detail: data });
    
    document.dispatchEvent(event);
  }

  return {
    listen,
    remove,
    dispatch,
  }
}
