export function readFileAsDataUrl(file: File): Promise<{ mimeType: string; dataURL: string }> {
  return new Promise((res, rej) => {
    const fr = new FileReader();

    fr.onerror = (e) => rej(e.target!.error);
    fr.onload = (e) =>
      res({
        mimeType: file.type,
        dataURL: e.target!.result as string,
      });

    fr.readAsDataURL(file);
  });
}

