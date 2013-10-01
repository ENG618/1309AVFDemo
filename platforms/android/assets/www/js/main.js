// Eric Garcia
// 1309 AVF

// Global Variables
// var destinationType=navigator.camera.DestinationType;

// Global Variables
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var Connection;  // network connection

// Global Functions

// loadImgs Function
var loadImgs = function (results){

    // example HTML for pics
    // <img src='{url}' alt='{username}' /><p>{fullname}, <br/><p>'{cpation}',</p>
    $.each(results.date, function(index, photo) {
        var stRes = photo.images.standard_resolution.url,
        user_id = photo.user.id,
        fullName = photo.user.full_name,
        likes = photo.likes,
        pic = "<li>< img src='" + stRes + "' alt='" + user_id + "' /><h3> Created by: " + fullName + ", Likes: " + likes + "<h3></li>";

        $('#results').append(pic);
    });
};//End loadImgs Function

// Search Function
var searchFn = function(){

    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    // if/else to check network state
    if (states[networkState] === 'No network connection') {
        alert('Please connect to the internet to access this function');
    }else{

        var searchTerm = $('#search').val();
        // if/else to check if search term is blank
        if (searchTerm === "" ){
            alert('I am having trouble finding images of nothing, please try searching for something else');
        }else{
            confirm('Are you sure you want to search for "' + searchTerm + '"');
            var url = 'https://api.instagram.com/v1/tags/' + searchTerm + '/media/recent?callback=?&amp;client_id=bdd3abebae3a4d6385255d64427aeaff';
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'jsonp',
                success: function(received){
                    $('#results li').remove();
                    $.each(received.data, function(index, photo) {
                        var stRes = photo.images.standard_resolution.url,
                        user_id = photo.user.id,
                        fullName = photo.user.full_name,
                        likes = photo.likes,
                        pic = "<li><img src='" + stRes + "' alt='" + user_id + "' /><h3> Created by: " + fullName + ", Likes: " + likes + "<h3></li>";

                        $('#results').append(pic);
                    });
                }
            })
            .done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
            $.getJSON(url, loadImgs);
        }// End if/else to check if search term is blank
    }// End if/else to check network state
};// End Search Function

// Display Popular Photos Function
var popularFn = function(){

    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    // if/else to check network connection
    if (states[networkState] === 'No network connection') {
        alert('Please connect to the internet to access this function');
    }else{
        confirm('Do you want to display all the popular photos?');
        var url = 'https://api.instagram.com/v1/media/popular?callback+?&amp;client_id=bdd3abebae3a4d6385255d64427aeaff';
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            success: function(received){
                console.log=(received);
                $('#results li').remove();
                $.each(received.data, function(index, photo) {
                    var stRes = photo.images.standard_resolution.url,
                    user_id = photo.user.id,
                    fullName = photo.user.full_name,
                    likes = photo.likes,
                    pic = "<li><img src='" + stRes + "' alt='" + user_id + "' /><h3> Created by: " + fullName + ", Likes: " + likes + "<h3></li>";

                    $('#results').append(pic);
                });
            }
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

        $.getJSON(url, loadImgs);
    }// End if/else to check network connection
};// End Display Popular Photos Function


var weatherData = function(recieved){
    alert('yay!!');
};




// Current Weather Function
var currentFn = function(){
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    // Geo Success/Error Functions
    function geoSuccess(position) {

        alert('Current temp: 68.8 degrees');
        var url = 'https://api.weathersource.com/v1/a8136057c6beafe4e9b8/history.json?_callback=geoData&latitude_eq=' + position.coords.latitude + '&longitude_eq=' + position.coords.longitude + '&period=hour&timestamp_eq=2004-02-12T08:00&fields=temp';
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            success: function(received){
                alert('test');
            }
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

        // Need code here to display location based data


    }

    // onError Callback receives a PositionError object
    //
    function geoError(error) {
        alert('message: ' + error.message + '\n');
    }  // End Geo Success/Error Functions

    if (states[networkState] === 'No network connection') {
        alert('Please connect to the internet to access this function');
    }else{
        var zipCode = $('#zipSearch').val();
        if (zipCode === "" ){
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        }else{
            confirm('Please confirm "' + zipCode + '" is the zip code you would like to search for');
            var zipUrl = 'https://api.weathersource.com/v1/a8136057c6beafe4e9b8/history_by_postal_code.json?_callback=weatherData&period=day&postal_code_eq=' + zipCode + '&country_eq=US&timestamp_eq=2012-02-10T00:00:00-05:00&fields=postal_code,country,timestamp,tempMax,tempAvg,tempMin,precip,snowfall,windSpdMax,windSpdAvg,windSpdMin,cldCvrMax,cldCvrAvg,cldCvrMin,dewPtMax,dewPtAvg,dewPtMin,feelsLikeMax,feelsLikeAvg,feelsLikeMin,relHumMax,relHumAvg,relHumMin,sfcPresMax,sfcPresAvg,sfcPresMin,spcHumMax,spcHumAvg,spcHumMin,wetBulbMax,wetBulbAvg,wetBulbMin';
            $.ajax({
                url: zipUrl,
                type: 'GET',
                dataType: 'jsonp',
                success: function(received){
                    alert(received);
                }
            })
            .done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
        }
    }
};// End Current Weather Function

// Weather Function
var weatherData = function(received) {
    console.log(received);
    var zipCode = $('#zipSearch').val();
    console.log(zipCode);
    if (zipCode === "" ){
        alert('Please enter a zip code you would like to know the weather for');
    }else{
        $.each(received, function(index, weather) {
            console.log(weather);
            $('#feelsLikeAvg').html(weather.feelsLikeAvg + ' degrees');
            $('#tempMax').html(weather.tempMax + ' degrees');
            $('#tempMin').html(weather.tempMin + ' degrees');
            $('#tempAvg').html(weather.tempAvg + ' degrees');
            $('#windSpdAvg').html(weather.windSpdAvg + ' MPH');
        });
    }
};// End Weather Function

// Called if something bad happens.
var onFail = function(message) {
  alert('Failed because: ' + message);
};

// Camera Function
var picFn = function(){

    function onSuccess(imageData) {
        var recievedImg = "data:image/jpeg;base64," + imageData;
        var pic = "<li><img src='" + recievedImg + "' alt='userPic' /></li>";
        $('#takenPic').append(pic);
    }

    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
      destinationType: destinationType.DATA_URL });
};// End Camera Function

// Check Connection
var connectionFn = function(){
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
};// End Check Connection

// Check Geo Location
var geoFn = function(){
    function geoSuccess(position) {
        alert(
            'Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
    }
    // onError Callback receives a PositionError object
    //
    function geoError(error) {
        alert('message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);};// Check Geo Location

// Notification function
var notifyFn = function(){
    function alertDismissed() {
        // do something
    }

    navigator.notification.alert(
        'Testing notification services.  I will be linking this to inAppBrowser in the future for a mashup',  // message
        alertDismissed,         // callback
        'Eric Garcia',            // title
        'GO!'                  // buttonName
        );
};

// End Global Functions

function onDeviceReady(){
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;


$("#searchBtn").on("click", searchFn);
$("#popular").on("click", popularFn);
$("#currentBtn").on("click", currentFn);
$("#snapPic").on("click", picFn);
$("#connection").on("click", connectionFn);
$("#geoBtn").on("click", geoFn);
$("#notify").on("click", notifyFn);
}

document.addEventListener("deviceready", onDeviceReady, false);



