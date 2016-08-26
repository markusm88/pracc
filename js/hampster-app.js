(function () {
    'use strict';
    
    /* Global variables */
    var navBtns, mainContent;
    
    /* Global functions */
    var getId = function (id) {
        return document.getElementById(id);
    };
    var getSelectors = function (elements) {
        return document.querySelectorAll(elements);
    };
    /*edit every element in class array by calling editbtns and passing one of three arguments (el, index, array);*/
    var editSelector = function(elements, editfn) {
        var arrClass = document.querySelectorAll(elements);
        arrClass.forEach(editfn);
    }; 
    /* Create "a-links" with eventlistener */
    function a(obj, filename, type) {
        type = type || 'html';
        obj.addEventListener('click', function () {
            getRequest(type, filename);
         /*   if (this.parentNode.nodeName.toLowerCase() == 'li') {
                editSelector('.btnz', function (el) {
                    el.parentNode.className = ' ';
                });
                this.parentNode.className = 'active';
            };*/
        });
    };
    
    
    /* Set Objects */
    var setObjects = function() {
        mainContent = getId("content");
        navBtns = getSelectors(".btnz");
    };
    
    
    /*Set Events*/
    var setEvents = function() {
        a(navBtns[0], 'main');
        a(navBtns[1], 'about');
        a(navBtns[2], 'db', 'json');
    };
    
    
    /* Setup actual XHR-request */
    function getRequestSetup(url, type) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.responseType = type;
            xhr.onload = function () {
                var status = xhr.status;
                status === 200 ? resolve(xhr.response) : reject(status);
                //Above code is same as under  
               /* if (status === 200) {
                    resolve(xhr.response);
                }else {
                    reject(status);
                }*/
            };
            xhr.send();
        });
    };
    
    
    /* Setup getRequest-Handler for diff types */
    // 'getRequest' accepts two string argument 'filetype' and 'filename': no suffix 
    function getRequest(type, filename) {
        var filetype, path, responstype;
        if (type === 'json') {
            path = 'local_db';
            filetype = '.json';
            responstype = 'json';
        }
        if (type === 'html') {
            path = 'views';
            filetype = '.html';
            responstype = 'text';
        }
        return getRequestSetup('./' + path + '/' + filename + filetype, responstype).then(successHandler.bind(this, type), errorHandler);
    };
    
    
    /* Promise handlers */
    var successHandler = function (type, data) {
        if (type === 'json') {
            displayJSON(data);
        }
        if (type === 'html') {
            mainContent.innerHTML = data;
        }
    };
    var errorHandler = function (status) {
        console.log("Error result with status: " + status);
    };
    
    
    /* Format and display Hamster.json data */
    var displayJSON = function (data) {
        var hamsters = data.hamsters;
        var content = [];
        hamsters.forEach(function (el, i, array) {
            var hId = el.id, 
                hName = el.name,
                hDesc = el.desc,
                hSrc = el.imgUrl;
            
            var hamster = createHtml(hName, 'h3');
            hamster += createHtml(hSrc, 'img', 'img-responsive', null, hName);
            hamster += createHtml(hId, 'p', 'red');
            hamster += createHtml(hDesc, 'p');
            
            var col = createHtml(hamster, 'article', 'col-xs-4 col-sm-4 col-md-4 col-lg-4');
            
            content.push(col); 
        });
        
        /* IMPORTANT to add join when passing array to dom, else comma/ ',' vil show*/
        mainContent.innerHTML = content.join("");
        
    };
    
    
    /* Assemble HTML */
    var createHtml = function (data, elType, elClass, elHref, elAlt) {
        var _class, _href;
        /* Check for class, then add */
        if (elClass) {
            _class = " class=" + "'" + elClass + "'";
        }
        else {
            _class = "";
        }
        
        /* Asseble the HTML based on element type parameter passed in */
        
        // Switch - Case this
        if (elType === 'img') {
            return "<" + elType + _class + " src='" + data + "' alt='" + elAlt + "' />";
        }
        else if (elType === 'href') {
            return "<" + elType + _class + "href='" + elHref + "'>" + data + "</" + elType + ">";
        }
        else {
            return "<" + elType + _class + ">" + data + "</" + elType + ">";
            
        }
    };
    
    /* Initialize functions */
    var init = function () {
        setObjects();
        setEvents();
        getRequest('html', 'main');
    }();
    
    
}());