import React, { useState, useEffect } from "react";

/**
 * 获取图片的平均颜色
 * @param src {string}
 */
export function useImageColor(src: string): string {
  const [color, setColor] = useState("");
  const [url] = useNetworkImageData(src);
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
  return color;
}

/**
 * @param src {string}
 */
export function useNetworkImageData(src: string) {
  const [blob, setBlob] = useState(null);
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const url = URL.createObjectURL(this.response);
      setBlob(url);
    };
    xhr.open("GET", src, true);
    xhr.responseType = "blob";
    xhr.send();
  }, [src]);
  return [blob];
}
