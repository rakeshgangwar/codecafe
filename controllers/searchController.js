app.controller('searchController', ['$scope', 'codeFactory',
            function ($scope, codeFactory) {
        $scope.loading = false;
        $scope.imageLoading = true;
        $scope.codeList = [], $scope.filteredCodeList = [], $scope.currentPage = 1, $scope.numPerPage = 10, $scope.maxSize = 5;
        codeFactory.getCodeList()
            .success(function (data) {
                $scope.codeList = data.websites;
                $scope.stats = {
                    'top_5_languages_used': _.countBy(data.websites, function (website) { return website.language }),
                    'top_2_submissions_attempted': _.countBy(data.websites, function (website) { return website.title }),
                    'submissions_per_level': _.countBy(data.websites, function (website) { return website.metadata.level }),
                    'total_submissions': data.websites.length
                }
                $scope.loading=true;
                $scope.imageLoading=false;
            })
            .error(function (error) {
                console.error(error);
            });
        $scope.compareValues = function(value, searchValue) {
            if(searchValue === "") {
                return true;
            }
            else {
                return angular.equals(value, searchValue);
            }
        }
    }])