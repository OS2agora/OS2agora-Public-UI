import { ENV_VARIABLE } from "./constants/environmentVariables";
import { readEnvironmentVariable } from "./environmentHelper";

function downloadFileFromUrl(url: string, fileName: string) {
  let localUrl = url;
  if (!localUrl) {
    return;
  }

  const xApiHeader = readEnvironmentVariable(ENV_VARIABLE.X_API_HEADER);
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

function validateLink(text?: string | null): boolean {
  // eslint-disable-next-line no-useless-escape
  const linkRegEx = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  return linkRegEx.test(text || "");
}

export { downloadFileFromUrl, validateLink };
