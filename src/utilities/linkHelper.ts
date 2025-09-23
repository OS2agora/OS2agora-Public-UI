import env from "@beam-australia/react-env";

function downloadFileFromUrl(url: string, fileName: string) {
  let localUrl = url;
  if (!localUrl) {
    return;
  }

  const xApiHeader = env("X_API_HEADER");
  if (typeof xApiHeader !== "undefined") {
    localUrl += `?apiKey=${xApiHeader}`;
  }

  const a = document.createElement("a");

  a.style.display = "none";
  a.href = localUrl;
  a.download = fileName;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export { downloadFileFromUrl };
