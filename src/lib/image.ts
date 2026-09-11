export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB

export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Unsupported file type. Please upload a JPG, PNG or WebP image.";
  }
  if (file.size > MAX_FILE_BYTES) {
    return "That file is larger than 15 MB. Please pick a smaller image.";
  }
  return null;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      // Free the temporary object URL as soon as decoding is done.
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("We couldn't read that image."));
    };
    img.src = url;
  });
}

export type ProcessedImage = {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
  type: string;
};

export async function processImage(
  file: File,
  opts: { width?: number; height?: number; quality?: number; mimeType?: string },
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  const width = Math.max(1, Math.round(opts.width ?? img.naturalWidth));
  const height = Math.max(1, Math.round(opts.height ?? img.naturalHeight));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser can't process images here.");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, width, height);

  const mimeType = opts.mimeType ?? (file.type === "image/png" ? "image/png" : "image/jpeg");
  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Processing failed."))),
      mimeType,
      opts.quality ?? 0.8,
    );
  });

  return {
    blob,
    url: URL.createObjectURL(blob),
    width,
    height,
    size: blob.size,
    type: mimeType,
  };
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
