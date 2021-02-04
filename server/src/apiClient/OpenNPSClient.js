import got from "got";

const openNPSApiKey = "xKfcRRVNcL6yuzSlTalL0MydKWEKIVJ2W7wslZu3";

class OpenNPSClient {
  static async getNPSData() {
    try {
      const url = `https://developer.nps.gov/api/v1/parks?&api_key=${openNPSApiKey}`;
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default OpenNPSClient;
