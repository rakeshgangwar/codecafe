/**
 * Search Controller
 *
 * Main controller for the Code Cafe application that handles:
 * - Loading and displaying code submissions
 * - Search and filter functionality
 * - Statistical analysis of submissions
 * - UI state management (loading indicators)
 *
 * @controller searchController
 * @requires $scope - AngularJS scope for data binding
 * @requires codeFactory - Service for fetching code submissions from API
 */
app.controller('searchController', ['$scope', 'codeFactory',
            function ($scope, codeFactory) {

        // Initialize loading states
        // loading: Controls visibility of main content (shows when data is loaded)
        // imageLoading: Controls visibility of loading spinner
        $scope.loading = false;
        $scope.imageLoading = true;

        // Initialize data arrays and pagination variables
        // codeList: Complete list of code submissions from API
        // filteredCodeList: Filtered subset based on search/filter criteria
        // currentPage, numPerPage, maxSize: Pagination configuration (prepared for future use)
        $scope.codeList = [], $scope.filteredCodeList = [], $scope.currentPage = 1, $scope.numPerPage = 10, $scope.maxSize = 5;

        /**
         * Fetch code submissions from API on controller initialization
         * Processes the response to populate code list and generate statistics
         */
        codeFactory.getCodeList()
            .success(function (data) {
                // Store the complete list of submissions
                $scope.codeList = data.websites;

                /**
                 * Generate statistics from the submissions data
                 * Uses Lodash's countBy function to aggregate data
                 *
                 * @property {Object} stats - Container for all statistical data
                 * @property {Object} stats.top_5_languages_used - Count of submissions per language
                 * @property {Object} stats.top_2_submissions_attempted - Count of attempts per problem
                 * @property {Object} stats.submissions_per_level - Count of submissions per difficulty level
                 * @property {number} stats.total_submissions - Total number of submissions
                 */
                $scope.stats = {
                    'top_5_languages_used': _.countBy(data.websites, function (website) { return website.language }),
                    'top_2_submissions_attempted': _.countBy(data.websites, function (website) { return website.title }),
                    'submissions_per_level': _.countBy(data.websites, function (website) { return website.metadata.level }),
                    'total_submissions': data.websites.length
                }

                // Update UI state to show content and hide loading spinner
                $scope.loading = true;
                $scope.imageLoading = false;
            })
            .error(function (error) {
                // Log any errors that occur during API fetch
                console.error(error);
            });

        /**
         * Custom comparison function for search filtering
         *
         * This function enables case-sensitive exact matching for the search filter.
         * When the search value is empty, all items are shown.
         * Otherwise, only exact matches are displayed.
         *
         * @function compareValues
         * @param {*} value - The value from the data object to compare
         * @param {string} searchValue - The search term entered by the user
         * @returns {boolean} True if the item should be displayed, false otherwise
         *
         * @example
         * // Returns true for empty search
         * compareValues('Python', '') // true
         *
         * // Returns true for exact match
         * compareValues('Python', 'Python') // true
         *
         * // Returns false for non-match
         * compareValues('Python', 'python') // false (case-sensitive)
         */
        $scope.compareValues = function(value, searchValue) {
            if(searchValue === "") {
                return true;
            }
            else {
                return angular.equals(value, searchValue);
            }
        }
    }])