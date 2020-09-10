import React, { useState, useEffect, useCallback } from "react";

/**
 * 获取图片的平均颜色
 * @param src {string}
 */
export function useImageColor(src: string): string {
  const [color, setColor] = useState("rgba(0,0,0,0.5)");
  const [url, responseURL] = useNetworkImageData(src);
  const [colorCache, setColorCache] = useLocalStorage<
    { src: string; color: string }[]
  >("COLOR_CACHE", []);

  useEffect(() => {
    if (responseURL && !colorCache?.find?.(one => one.color === color)) {
      if (colorCache.length > 20) {
        colorCache.shift();
      }
      setColorCache(
        colorCache.concat({
          src: responseURL,
          color,
        })
      );
    }
  }, [color]);

  useEffect(() => {
    if (!(colorCache instanceof Array)) {
      setColorCache([]);
    }
  }, [colorCache]);

  useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.src = url;
    img.setAttribute("crossOrigin", "anonymous");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    img.onload = function () {
      [canvas.height, canvas.width] = [img.height, img.width];
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const rgba = [0, 0, 0, 0];

      imageData.data.forEach((value, index) => {
        rgba[index % 4] = rgba[index % 4] + value;
      });
      const r = rgba[0] / (img.width * img.height);
      const g = rgba[1] / (img.width * img.height);
      const b = rgba[2] / (img.width * img.height);
      setColor(`rgb(${r},${g},${b})`);
    };
  }, [url]);
  return color || colorCache.find?.(one => one.src === responseURL)?.color;
}

/**
 * @param src {string}
 */
export function useNetworkImageData(src: string) {
  const [blob, setBlob] = useState(null);
  const [responseURL, setResponseURL] = useState(null);
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const url = URL.createObjectURL(this.response);
      setBlob(url);
    };
    xhr.onreadystatechange = function () {
      if (this.readyState === this.DONE) {
        setResponseURL(this.responseURL);
      }
    };
    xhr.open("GET", src, true);
    xhr.responseType = "blob";
    xhr.send();
  }, [src]);
  return [blob, responseURL];
}

/**
 * @param key {string}
 * @param defaultValue
 */
export function useLocalStorage<T = any>(
  key: string,
  defaultValue?: T
): [T, Function] {
  const [storageValue, setStorageValue] = useState(null);
  useEffect(() => {
    setStorageValue(window.localStorage.getItem(key));
  }, []);

  const setValue = useCallback((value: T) => {
    let stringifiedValue: string = value as any;
    try {
      stringifiedValue = JSON.stringify(value);
    } catch (e) {
      stringifiedValue = value as any;
    }
    setStorageValue(stringifiedValue);
    window.localStorage.setItem(key, stringifiedValue);
  }, []);

  let parsedValue: T = storageValue as any;
  try {
    parsedValue = JSON.parse(storageValue);
  } catch (e) {
    parsedValue = storageValue as any;
  }
  return [parsedValue ?? defaultValue, setValue];
}
