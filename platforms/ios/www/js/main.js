/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// Eric Garcia
// 1309 AVF

// Global Functions

// loadImgs Function
var loadImgs = function (results){
    alert ('loadImgs function working');
    console.log(results);

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
    var searchTerm = $('#search').val();
    console.log(searchTerm);
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
                console.log(received);
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
    }
};// End Search Function

// Display Popular Photos Function
var popularFn = function(){
    confirm('Do you want to display all the popular photos?');
    var url = 'https://api.instagram.com/v1/media/popular?callback+?&amp;client_id=bdd3abebae3a4d6385255d64427aeaff';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        success: function(received){
            console.log=('received');
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
}; // End Display Popular Photos Function

// Current Weather Function
var currentFn = function(){
    var zipCode = $('#zipSearch').val();
    console.log(zipCode);
    if (zipCode === "" ){
        alert('Please enter a zip code you would like to know the weather for');
    }else{
        confirm('Please confirm "' + zipCode + '" is the zip code you would like to search for');
        var url = 'https://api.weathersource.com/v1/a8136057c6beafe4e9b8/history_by_postal_code.json?_callback=weatherData&period=day&postal_code_eq=' + zipCode + '&country_eq=US&timestamp_eq=2012-02-10T00:00:00-05:00&fields=postal_code,country,timestamp,tempMax,tempAvg,tempMin,precip,snowfall,windSpdMax,windSpdAvg,windSpdMin,cldCvrMax,cldCvrAvg,cldCvrMin,dewPtMax,dewPtAvg,dewPtMin,feelsLikeMax,feelsLikeAvg,feelsLikeMin,relHumMax,relHumAvg,relHumMin,sfcPresMax,sfcPresAvg,sfcPresMin,spcHumMax,spcHumAvg,spcHumMin,wetBulbMax,wetBulbAvg,wetBulbMin';
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            success: function(received){
                console.log(received);
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
};// End Current Weather Function

// Weather Function
var weatherData = function (received) {
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

//Global Functions

    $("#searchBtn").on("click", searchFn);
    $("#popular").on("click", popularFn);
    $("#currentBtn").on("click", currentFn);

