import { ApiClient } from "./apiClient";

async function convertDataUrlToFile(url: string, fileName: string, fileType: string) {
  const { apiClient } = new ApiClient();

  if (typeof url === "undefined") {
    return undefined;
  }

  const { data } = await apiClient.get(url, {
    responseType: "blob",
  });
  const file = new File([data], fileName, { type: fileType });
  return file;
}

function validateFileSize(maxSize: number, minSize = 0): (file: File) => boolean {
  return (file: File): boolean => {
    return file.size > 0 && file.size >= minSize && file.size <= maxSize;
  };
}

export { convertDataUrlToFile, validateFileSize };
