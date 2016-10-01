app.factory('codeFactory', ['$http', function ($http) {
    function getCodeList() {
        return $http.get('http://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_submissions&page=1')
    }

    return {
        getCodeList: getCodeList
    }
}])