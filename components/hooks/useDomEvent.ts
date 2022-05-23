import { MutableRefObject, useEffect } from "react";

export default function useDomEvent<E extends HTMLElement, K extends keyof HTMLElementEventMap>(
  handler: (this: E, ev: HTMLElementEventMap[K]) => any,
  domRef: MutableRefObject<E | undefined>,
  event: K,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    if (!domRef.current) return;
    const ele = domRef.current;

    ele.addEventListener(event, handler as any, options);
    return () => ele.removeEventListener(event, handler as any, options);
  }, [domRef, event, handler, options]);
}
