/**
 * Thanks to
 * https://blog.bearer.sh/api-client-library-node-js/
 */


const constants = require('./constants');
const querystring = require('querystring');
const fetch = require('isomorphic-unfetch');


/**
 * Sample Authorization request for Ed-fi ODS
 *
 * curl 'https://sdcoeapi.nearshoredevs.com/oauth/token' \
 * -H 'authority: sdcoeapi.nearshoredevs.com' \
 * -H 'pragma: no-cache' \
 * -H 'cache-control: no-cache' \
 * -H 'sec-ch-ua: "Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"' \
 * -H 'accept: application/json, text/plain, * /*' \
 * -H 'x-requested-with: XMLHttpRequest' \
 * -H 'sec-ch-ua-mobile: ?0' \
 * -H 'authorization: Basic {base64(clientId+":"+secret)' \
 * -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36' \
 * -H 'content-type: application/x-www-form-urlencoded' \
 * -H 'origin: https://sdcoedocs.nearshoredevs.com' \
 * -H 'sec-fetch-site: same-site' \
 * -H 'sec-fetch-mode: cors' \
 * -H 'sec-fetch-dest: empty' \
 * -H 'referer: https://sdcoedocs.nearshoredevs.com/' \
 * -H 'accept-language: en-US,en;q=0.9' \
 * --data-raw 'grant_type=client_credentials' \
 * --compressed
 *
 *
 * Sample Resource Request
 *
 * curl 'https://sdcoeapi.nearshoredevs.com/composites/v1/SDCOE/Transcript/EducationOrganizationHierarchies?offset=0&limit=25' \
 * -H 'authority: sdcoeapi.nearshoredevs.com' \
 * -H 'pragma: no-cache' \
 * -H 'cache-control: no-cache' \
 * -H 'sec-ch-ua: "Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"' \
 * -H 'accept: application/json' \
 * -H 'authorization: Bearer {bearer token here}' \
 * -H 'sec-ch-ua-mobile: ?0' \
 * -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36' \
 * -H 'origin: https://sdcoedocs.nearshoredevs.com' \
 * -H 'sec-fetch-site: same-site' \
 * -H 'sec-fetch-mode: cors' \
 * -H 'sec-fetch-dest: empty' \
 * -H 'referer: https://sdcoedocs.nearshoredevs.com/' \
 * -H 'accept-language: en-US,en;q=0.9' \
 * --compressed
 */

class CompositeApi {
  constructor(config) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.baseUrl = config.baseUrl;
  }

  authorize() {
    console.debug('Authorizing to ' + this.baseUrl);
    const base64AuthString = Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64');
    const headers = {
      'authorization': 'Basic ' + base64AuthString,
      'Content-type': 'application/x-www-form-urlencoded'
    };

    const body = 'grant_type=client_credentials';

    return fetch(
      this.baseUrl + constants.TOKEN_ENDPOINT,
      { 'method': 'POST', 'body': body, 'headers': headers }
    ).then(res => res.json())
      .then(json => json['access_token']);
  }

  getResourceUrl(resourceEndpoint) {
    return constants.API_SUFFIX + resourceEndpoint;
  }

  request(endpoint = '', method = 'GET') {
    return this.authorize().then((bearer) => {
      if (!bearer)
        throw new Error('Could not authorize');
      else
        console.debug('Authorized to ' + this.baseUrl);

      let config = {
        'method': method,
        'headers': {
          'Authorization': 'Bearer ' + bearer
        }
      };

      const fetchThis = this.baseUrl + endpoint;

      console.debug('Fetching ' + fetchThis);
      return fetch(fetchThis, config)
        .then(r => {
          if (r.ok)
            return r.json();

          throw new Error(JSON.stringify(r) + ' ' + r.status);
        });
    });
  }

  queryComposite(resource_path, queryParams = {}) {
    let url = this.getResourceUrl(resource_path);
    let qs = (queryParams && Object.keys(queryParams).length > 0) ? '?' + querystring.stringify(queryParams) : '';

    return this.request(url + qs);
  }
}

module.exports = { CompositeApi };
