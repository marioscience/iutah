jQuery(document).ready(function ($) {

    // ****** IMAGE GALLERY BEGINS ********

    // Build the array of images
    var images = new Array();
    var i = 0;
    $('.thumbnail').each(function () {
        images[i] = $(this).attr('src');
        i++;
    });

    // Load first image
    $(".display").attr({'src': images[0]});
    highlightSelected();

    function highlightSelected() {
        var x = 0;
        $(".thumbnail").css({'border': '1px solid #404040'});
        $('.thumbnail').each(function () {
            if ($(this).attr('src') == $('.display').attr('src')) {
                $(this).css({'border': '3px solid #404040' });
            }
        });
    }

    // Next Button handler
    var counter = 0;
    $(".btnNext").click(function next() {
        if (counter < images.length - 1) {
            counter++;
        }
        else {
            counter = 0;
        }
        $(".display").attr({'src': images[counter]});
        highlightSelected();
    })

    // Prev Button trigger
    $(".btnPrev").click(function next() {
        if (counter > 0) {
            counter--;
        }
        else {
            counter = images.length - 1;
        }
        $(".display").attr({'src': images[counter] });
        highlightSelected();
    })

    $(".thumbnail").click(function () {
        $(".thumbnail").css({'border': '1px solid #404040'});
        $(".display").attr({'src': $(this).attr('src') });
        $(this).css({'border': '3px solid #404040' });

        //update counter value
        for (var i = 0; i < images.length; i++) {
            if (images[i] == $(".display").attr('src')) {
                counter = i;
                break;
            }
        }
    })

    // ****** IMAGE GALLERY ENDS ********

    //This function is to solve this problem: when selected the dynamic content (river_info) the home page was selected, because of the similitude of how they work. Thi
    $("#menu_active").ready(function menuActive() {
        if (document.getElementById("menu_active")) {
            $("li.active").addClass("dropdown");
            $("li").removeClass("active");
            var dataLI = $('li:contains("Data")');
            dataLI.addClass("active");
        }
    });

    if (document.URL.indexOf("river_info"))
        drawSeries();


});

function drawSeries() {
    var margin = {top: 3, right: 3, bottom: 3, left: 3},
        width = $("#graph0").width() - margin.left - margin.right,
        height = $("#graph0").height() - margin.top - margin.bottom;

    var parseDate = d3.time.format("%d-%b-%y").parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var line = d3.svg.line()
        .x(function (d) {
            return x(d.index);
        })
        .y(function (d) {
            return y(d.value);
        });

    var myRegexp = new RegExp("river_info/(.[^/]*)/", "g");
    var database = myRegexp.exec(document.URL)[1];

    filenames = {"iUTAH_Logan_OD": "Logan", "iUTAH_Provo_OD": "Provo", "iUTAH_RedButte_OD": "RedButte"};
    var site = filenames[database];

    //console.log("database: " + database + "\n");
    //console.log("site: " + site + "\n");



    $.getJSON("/static/mdfserver/json/" + site + "Site.json").done(function (data) {
        var graphCounter = -1;
        var captureRegex = new RegExp(database + "/(.[^/]*)/", "g");
        d = captureRegex.exec(document.URL)[1];
        //console.log("site:" + d);
        for (var i = 0; i < data[d].vars.length; i++) {
            //console.log(data[d].vars[i]['values']);
            var myData = [];
            var counter = 0;
            data[d].vars[i]['values'].forEach(function (value) {
                myData.push({"value": value, "index": ++counter});
            });

            var svg = d3.select("#graph" + ++graphCounter).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            x.domain(d3.extent(myData, function (d) {
                return d.index;
            }));
            y.domain(d3.extent(myData, function (d) {
                return d.value;
            }));

            svg.append("path")
                .datum(myData)
                .attr("class", "line")
                .attr("d", line);
        }
    });


}









