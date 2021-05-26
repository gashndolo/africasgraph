var literacy = {
    "algeria" : 81,
    "angola" : 71, 
    "benin": 43,
    "botswana": 89,
    "burkinafaso": 41,
    "burundi" : 68, 
    "cameroon": 77,
    "centralafricanrepublic": 37,
    "chad": 22,
    "comoros": 59,
    "congo": 80,
    "cotedivoire": 47,
    "djibouti": 53,
    "drcongo": 77,
    "egypt": 71,
    "equatorialguinea": 95,
    "eritrea" : 77,
    "eswatini": 88,
    "ethiopia": 52,
    "gabon" : 85,
    "gambia": 51,
    "ghana": 79,
    "guinea": 32,
    "guineabissau": 46,
    "kenya": 82,
    "lesotho": 77,
    "liberia": 48,
    "libya": 91,
    "madagascar": 75,
    "malawi": 62,
    "mali": 35,
    "mauritania": 53,
    "morocco": 73,
    "mozambique": 61,
    "namibia": 92,
    "niger": 30,
    "nigeria": 75,
    "rwanda": 72,
    "saotome": 93,
    "senegal": 52,
    "sierraleone": 43,
    "somalia": 37,    
    "southafrica": 87,
    "southsudan": 26,
    "sudan": 61,
    "tanzania": 78,
    "togo": 64,
    "tunisia": 82,
    "uganda": 77,
    "westernsahara": 0,
    "zambia": 87,
    "zimbabwe": 89
}
var gdp = {
    "algeria" : 147,
    "angola" : 62,
    "benin": 15,
    "botswana": 15,
    "burkinafaso": 16,
    "burundi" : 3, 
    "cameroon": 39,
    "centralafricanrepublic": 2.22,
    "chad": 10.510,
    "comoros": 1.2,    
    "congo": 45, 
    "cotedivoire": 61.502,
    "djibouti": 3.4,
    "drcongo": 46.6,
    "egypt": 374,
    "equatorialguinea": 10.028,
    "eritrea" : 2.075,
    "eswatini": 3.848,
    "ethiopia": 95.588,
    "gabon" : 15.145,
    "gambia": 0,
    "ghana": 73.594,
    "guinea": 12.5,
    "guineabissau": 1.392, 
    "kenya": 101.048, 
    "lesotho": 1.906,
    "liberia": 3.068,
    "libya": 21.805,
    "madagascar": 14.19,
    "malawi": 8.330,
    "mali": 17.685,
    "mauritania": 7.482,
    "morocco": 112.220,
    "mozambique": 14.557,
    "namibia": 10.252,
    "niger": 12.971, 
    "nigeria": 466.88,
    "rwanda": 10.428,
    "saotome": 0.417,
    "senegal": 24.409,
    "sierraleone": 4.140,
    "somalia": 4.9180,  
    "southsudan": 317.19,
    "southafrica": 4.177,
    "southsudan": 32.576,
    "sudan": 64.123,
    "tanzania": 1.806,
    "togo": 5.719,
    "tunisia": 39.226,
    "uganda": 37.733,
    "westernsahara": 0,
    "zambia": 18.909,
    "zimbabwe": 14.002
}

var gdppercapita = {
    "algeria" : 12019,
    "angola" : 6779,
    "benin": 3432,
    "botswana": 18552,
    "burkinafaso": 2274,
    "burundi" : 784, 
    "cameroon": 3803,
    "centralafricanrepublic": 987,
    "chad": 1649,
    "comoros": 3194,    
    "congo": 3835, 
    "cotedivoire": 5443,
    "djibouti": 5779,
    "drcongo": 1146,
    "egypt": 12283,
    "equatorialguinea": 19379,
    "eritrea" : 1625,
    "eswatini": 9003,
    "ethiopia": 2319,
    "gabon" : 15611,
    "gambia": 0,
    "ghana": 6990,
    "guinea": 2675,
    "guineabissau": 2077, 
    "kenya": 4521, 
    "lesotho": 2824,
    "liberia": 1491,
    "libya": 15845,
    "madagascar": 1719,
    "malawi": 1106,
    "mali": 2424,
    "mauritania": 5427,
    "morocco": 7826,
    "mozambique": 1338,
    "namibia": 10063,
    "niger": 1278, 
    "nigeria": 5362,
    "rwanda": 2325,
    "saotome": 4145,
    "senegal": 3545,
    "sierraleone": 1784,
    "somalia": 0,  
    "southsudan": 1234,
    "southafrica": 13934,
    "southsudan": 1234,
    "sudan": 4122,
    "tanzania": 2770,
    "togo": 1667,
    "tunisia": 11231,
    "uganda": 2284,
    "westernsahara": 3624,
    "zambia": 3624,
    "zimbabwe": 2961
}
var status = ""
var unit = ""
var userIndicator = {};
function getFormData() {
    var elements = document.getElementById("my-form").elements;
    for (var i = 0, element; element = elements[i++];) {
        if (element.type === "text" && element.name != "width") {
            var stat = document.getElementById(element.id).value;
            var entry = String(element.id);
            entry = entry.slice(0, -5);
            userIndicator[entry] = parseInt(stat)
        }
    }
    
    var width = document.getElementById("width").value;
    upper = 0
    width = parseInt(width)

    var hex = document.getElementById("favcolor").value;
    const r = parseInt(hex.substr(1,2), 16)
    const g = parseInt(hex.substr(3,2), 16)
    const b = parseInt(hex.substr(5,2), 16)
    console.log(userIndicator)
    createMap(userIndicator, r, g, b, width, upper, 0)
    document.getElementById("statshead").innerHTML = "";
    return false
}


function createMap(indicator, r, g, b, round_up, upper_range_all, lower_range_all) {
    console.log(indicator)

    if (upper_range_all == 0) { 
        upper_range_all = indicator[Object.keys(indicator).reduce((a,b) => indicator[a] > indicator[b] ? a : b)]; 
    } 
    lower_range_all = indicator[Object.keys(indicator).reduce((a,b) => indicator[a] < indicator[b] ? a : b)];
    upper_range_all_rounded = Math.round(upper_range_all / round_up) * round_up
    if (upper_range_all_rounded < upper_range_all) {
        upper_range_all_rounded += round_up
    }
    document.getElementById("statshead").innerHTML = status + ' ' + unit;


    document.getElementById("statscountry").innerHTML = "";
    document.getElementById("mainstat").innerHTML = "";
    document.getElementById("key").innerHTML = "";
    classes = 0
    
    for (var i = 0; i < upper_range_all; i += round_up) {        
        opac = (i + round_up) / upper_range_all_rounded
        var new_key = document.createElement("P");
        new_key.innerHTML =  "" + i + '-' + (i + round_up);
        
        new_key.style.backgroundColor = 'rgb(' + [r,g,b,opac].join(',') + ')';
        new_key.style.padding= "5px"; 
        new_key.style.margin = "3px";
        new_key.style.color = "white";
        new_key.style.width = "max-content";
        new_key.style.textAlign = "center";
        document.getElementById("key").appendChild(new_key);
        classes += 1
        
    }

    for (country in indicator) {
        val_rounded = Math.round(indicator[country] / round_up) * round_up
        if (val_rounded < indicator[country]) {
            val_rounded += round_up
        }
        position = val_rounded / upper_range_all_rounded
        var elem  = document.getElementById(country);
        elem.style.fill = 'rgb(' + [r,g,b,position].join(',') + ')';
    } 
}


function expound(country) {
    if (document.getElementById("statshead").innerHTML == "") {
        
    } else {
        document.getElementById("statscountry").innerHTML = country;
        document.getElementById("mainstat").innerHTML = window[status][country]; 
    }
    
}


function fetchStats(indicator) { 
    if (indicator == gdp) {
        status = 'gdp';
        unit = ' (Billion USD)';
        createMap(gdp, 0, 100, 0, 50, 0, 0) //green
    } else if (indicator == literacy) {
        status = 'literacy';
        unit = ' (%)';
        createMap(literacy, 128, 0, 128, 10, 100, 0) //purple
    } else if (indicator == gdppercapita) {
        status = 'gdppercapita';
        unit = ' USD';
        createMap(gdppercapita, 128, 0, 28, 1000, 0, 0) //red
    }   
}


/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
  
/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


 /* ---- */
 $(".exportImageButton").on("click", function() {
    var svg = document.querySelector("svg");
    var svgData = new XMLSerializer().serializeToString(svg);
    var canvas = document.createElement("canvas");
    var svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width * 4;
    canvas.height = svgSize.height * 4;
    canvas.style.width = svgSize.width;
    canvas.style.height = svgSize.height;
    var ctx = canvas.getContext("2d");
    ctx.scale(3, 3);
    var img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      var canvasdata = canvas.toDataURL("image/png", 1);
  
      var pngimg = '<img src="' + canvasdata + '">';
      d3.select("#pngdataurl").html(pngimg);
  
      var a = document.createElement("a");
      a.download = "map" + ".png";
      a.href = canvasdata;
      document.body.appendChild(a);
      a.click();
    };
    function downloadURI(uri, name) {
        var link = document.createElement("a");
    
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();   
        //after creating link you should delete dynamic link
        //clearDynamicLink(link); 
    }
    function DownloadAsImage() {
        var element = $("#key")[0];
        html2canvas(element).then(function (canvas) {
            var myImage = canvas.toDataURL();
            downloadURI(myImage, "key.png");
        });
    }
    DownloadAsImage();
  })

 