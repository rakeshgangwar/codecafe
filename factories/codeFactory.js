/**
 * Code Factory Service
 *
 * AngularJS factory service responsible for all API communications.
 * This service handles fetching code submissions from the HackerEarth API.
 *
 * @factory codeFactory
 * @requires $http - AngularJS HTTP service for making API requests
 */
app.factory('codeFactory', ['$http', function ($http) {

    /**
     * Fetches the list of code submissions from HackerEarth API
     *
     * Makes a GET request to retrieve coding submissions with their details
     * including title, language, status, source code, and metadata.
     *
     * @function getCodeList
     * @returns {Promise} Promise object containing the HTTP response
     *                    Success response contains a 'websites' array with submission objects
     * @example
     * codeFactory.getCodeList()
     *   .success(function(data) {
     *     console.log(data.websites); // Array of submission objects
     *   })
     *   .error(function(error) {
     *     console.error('Failed to fetch submissions:', error);
     *   });
     */
    function getCodeList() {
        return $http.get('http://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_submissions&page=1')
    }

    // Expose public API
    return {
        getCodeList: getCodeList
    }
}])