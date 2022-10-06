import { Ref } from "vue";

export function useNetworkImageData(src: Ref<string>) {
  const blob = ref<string | null>(null);
  const responseURL = ref<string | null>(null);
  watch(src, () => {
    if (import.meta.env.SSR) return;
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const url = URL.createObjectURL(this.response);
      blob.value = url;
    };
    xhr.onreadystatechange = function () {
      if (this.readyState === this.DONE) {
        responseURL.value = this.responseURL;
      }
    };
    xhr.open("GET", src.value, true);
    xhr.responseType = "blob";
    xhr.send();
  }, {
    immediate: true,
  })
  return [blob, responseURL] as const;
}


export function useImageColor(src: Ref<string>): Ref<string> {
  const color = ref("rgba(0,0,0,0.5)");
  const [url, _responseURL] = useNetworkImageData(src);

  watch(url, () => {
    if (import.meta.env.SSR) return;
    const img = new Image();
    img.src = url.value!;
    img.setAttribute("crossOrigin", "anonymous");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
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
      color.value = `rgb(${r},${g},${b})`;
    };
  }, {
    immediate: true,
  })
  return color;
}