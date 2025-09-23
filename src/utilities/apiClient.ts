import axios, { AxiosInstance } from "axios";
import env from "@beam-australia/react-env";

function isUrlValid(string) {
  try {
    const url = new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

class ApiClient {
  apiClient: AxiosInstance;

  withCredentials: boolean;

  constructor(withCredentials = true) {
    this.withCredentials = withCredentials;
    this.apiClient = this.createApiClient();
  }

  createApiClient() {
    const apiUrl = env("API_URL");
    const xApiHeader = env("X_API_HEADER");

    if (typeof apiUrl === "undefined") {
      console.warn(
        "There was no url set for base api so no calls to the api will succeed. Did you forget to set the NEXT_PUBLIC_EXT_API_URL in .env.local?"
      );
    } else if (!isUrlValid(apiUrl)) {
      console.warn(`The base url of the api is not a valid url. Are you sure this is the right url? '${apiUrl}'`);
    }

    const localApiClient = axios.create({
      baseURL: apiUrl,
      withCredentials: this.withCredentials, // send cookies with request
      headers:
        typeof xApiHeader !== "undefined"
          ? {
              common: {
                "x-api-key": xApiHeader,
              },
            }
          : {},
    });

    return localApiClient;
  }
}

interface DataWrapper {
  isDataEmpty: boolean;
  getStaticPropsMode: boolean;
  data: any;
}

const callApi = async (promise: Promise<any>, getStaticPropsMode: boolean): Promise<DataWrapper> => {
  // The API can respond with data equal to null or a list with no entries.
  // That either means that the data isn't there, or we do not have access to view it.
  // If we request the data inside 'GetStaticProps' then we can't ask the user to login, and have to treat the response as undecided.
  // If we request the data client side, we can ask the user to login, and then if the data is still not there, or if data did indeed require a login.
  // This wrapper helps us distinguish between the scenarios.
  const data = await promise;
  const isDataEmpty = data === null || data.length === 0;

  return {
    data,
    isDataEmpty,
    getStaticPropsMode,
  };
};

export { ApiClient, callApi };
