(function () {
    "use strict";
    /* getJSON function - Standard */
    function getJSON(url, successHandler, errorHandler) {
        var xhr = new XMLHttpRequest();
        var status, data;
        xhr.onload = function () {
            status = xhr.status;
            if (status === 200) {
                successHandler(xhr.response);
            }
            else {
                errorHandler(status);
            }
        };
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.send();
    }
    /* Get JSON url, then success handler func, then error handler func */
    getJSON("./local_db/db.json", function (data) {
        //        console.log(data);
    }, function (status) {
        //        console.log(status);
    });
}());
/*



*/
(function () {
    "use strict";
    /*getJson function - With Promise */
    function getJSON(url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var status = xhr.status;
                if (status === 200) {
                    resolve(xhr.response);
                }
                else {
                    reject(status);
                }
            };
            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.send();
        });
    }
    var successHandler = function (data) {
        console.log(data);
    };
    var errorHandler = function (status) {
        console.log('Error Statuscode: ' + status);
    };
    getJSON('./local_db/db.json').then(successHandler, errorHandler);
}());