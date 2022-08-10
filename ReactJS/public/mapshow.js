let CityList=[];
let cityLatLong={};
var map;
var pinInfobox;
let baseURL=window.baseURL;//'https://highwaymonitoringwebapi.azurewebsites.net/api/';
//baseURL = 'https://localhost:5001/api/';
let MLAPI=window.MLAPI;//'http://20.241.205.191:5000/'
let ZoomLevel=window.ZoomLevel;//11;
let lat1=window.window.lat1;// 40.7260080136994;
let long1=window.long1;//-73.94835013587952;
let StateName=window.StateName;//,//'New York';
let CityName=window.CityName; //'New York';

let pageload=1;
        // function loadDeferredIframe() {
        //     let paramsURL = (new URL(document.location)).searchParams;
        //     let params = paramsURL.get("id");

        //     if(params){
                
                
               
        //         var srclive='';
        //             if(params=='40'){  
        //                 ShowCameraDetails();                  
        //                 srclive='http://20.102.33.84:5000/'
        //             }
        //             else if(params=='41'){    
        //                 ShowCameraDetails();                
        //                 srclive='http://localhost/index41.html'
        //             }    
        //             else{
        //                 document.getElementById("cameradetails").style.display = "hide";
        //                 srclive='http://localhost/index0.html'
        //             }
        //         document.getElementById("iframeid").src=srclive
           
        //     }
        // }

        function ShowCameraDetails(){            
            let CameraDetails=JSON.parse(getCookie('CameraDetails'));
                document.getElementById("latitude").innerHTML =CameraDetails.latitude;
                document.getElementById("longitude").innerHTML =CameraDetails.longitude;
                document.getElementById("description").innerHTML =CameraDetails.description;
                document.getElementById("title").innerHTML =CameraDetails.title;
                document.getElementById("cameradetails").style.visibility = "visible";
               
        }

function getCookie(name) {
   var cookieName = name + "="
   var docCookie = document.cookie
   var cookieStart
   var end

   if (docCookie.length>0) {
      cookieStart = docCookie.indexOf(cookieName)
      if (cookieStart != -1) {
         cookieStart = cookieStart + cookieName.length
         end = docCookie.indexOf(";",cookieStart)
         if (end == -1) {
            end = docCookie.length
         }
         return unescape(docCookie.substring(cookieStart,end))
      }
   }
   return false
}
       // window.onload = loadDeferredIframe;
      // document.getElementById('cameradetails').style.visibility = "hidden";

    function refreshIframe() {
        window.lastcurrenttimestamp=null;
        localStorage.removeItem("lastcurrenttimestamp");
       // localStorage.setItem("lastcurrenttimestamp", 0);
        let CameraDetails=JSON.parse(getCookie('CameraDetails'));
        setCookie('selectedcamera',CameraDetails.cameraId,null)		  
        document.getElementById("iframeChart").src = '/#/Livevideo/'+CameraDetails.cameraId
        setInterval(function () {  
            document.getElementById("iframeChart").src = '/#/Livevideo/'+CameraDetails.cameraId
        }, 150000);
        document.getElementById("iframeid").src =MLAPI+CameraDetails.cameraId;

       
        
}

function GetCityMap() {
        
   
    var Obj=CityList.find(o => o.city === document.getElementById("ddlCity").value);


    cityLatLong.lat1=Obj.latitude;
    cityLatLong.long1=Obj.longitude;
   

    GetMap();
    
}

async function fetchAsyncGet (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}



async function FilldropdownState (url) {
    let customerslist=await fetchAsyncGet(baseURL+'USCity/GetAllState');
    let statelist=customerslist.usStateList;
    var ddlstate = document.getElementById("ddlstate");
    Filldropdown(ddlstate,statelist) 
    if(pageload==1){ 
        // pageload=0;
        pageloadState();
    
    }
   // await GetCity();        
}
    
 function Filldropdown (dropdown,data) {
    var option = document.createElement("OPTION");    
    option.innerHTML = 'Select';
    dropdown.options.add(option);
       // dropdown.se
    for (var i = 0; i < data.length; i++) {
               var option = document.createElement("OPTION");
               //Set Customer Name in Text part.
               option.innerHTML = data[i];
               //Set CustomerId in Value part.
               option.value = data[i];
               //Add the Option element to DropDownList.
               dropdown.options.add(option);
           }
}
    
   
function FilldropdownCity (dropdown,data) {
    
    for (var i = 0; i < data.length; i++) {
               var option = document.createElement("OPTION");
               //Set Customer Name in Text part.
               option.innerHTML = data[i];
               //Set CustomerId in Value part.
               option.value = data[i];
               //Add the Option element to DropDownList.
               dropdown.options.add(option);
           }
}
async function GetCity() {
    let ddlstate = document.getElementById("ddlstate").value;
    let url=baseURL+'USCity/GetCity';
    var cityList= await getHTML(url,ddlstate);
    let ddlCity = document.getElementById("ddlCity");//.value;
    debugger;
    if(pageload==1){
        pageload = 0;
        selectElement('ddlCity',CityName)
        ddlCity.onchange()   
      
        //pageloadCity()
    }
}



function getHTML(url,postObj) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        //xhr.open('get', url, true);
        //xhr.responseType = 'document';
        let post = JSON.stringify(postObj)
        xhr.open('POST', url, true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')

        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                let dropdown = document.getElementById("ddlCity");//.value;
                document.getElementById("ddlCity").innerHTML = null;
                CityList=JSON.parse(xhr.response);
                for (var i = 0; i < CityList.length; i++) {
               var option = document.createElement("OPTION");
               //Set Customer Name in Text part.
               option.innerHTML = CityList[i].city;
               //Set CustomerId in Value part.
               option.value = CityList[i].city;
               //Add the Option element to DropDownList.
               dropdown.options.add(option);
           }
           if(pageload==1){
            pageload = 0;
            selectElement('ddlCity',CityName)
            ddlCity.onchange()   
          
            //pageloadCity()
        }
               // return pushpinInfos;

            } else {
                reject(status);
            }
        };
        xhr.send(post);
    });
}



function fetchAsyncPost (url,postObj) {
    let xhr = new XMLHttpRequest()
    let post = JSON.stringify(postObj)
xhr.open('POST', url, true)
xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
xhr.send(post);

xhr.onload = function () {
    if(xhr.status === 201) {
        console.log("Post successfully created!") 
    }
    if(xhr.status === 200) {
        var pushpinInfos=JSON.parse(xhr.response);
        return pushpinInfos;
    }
}
}



function ShowCameraonMap(map){
let postObj = {'PAGE_NUMBER': 1, 'PAGE_SIZE': 10};

let post = JSON.stringify(postObj)
 
const url =baseURL+'Camera/GetAllCameraDetails' ;
var city=fetchAsyncPost(url,post)
let xhr = new XMLHttpRequest()
 
xhr.open('POST', url, true)
xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
xhr.send(post);
 
xhr.onload = function () {
    if(xhr.status === 201) {
        console.log("Post successfully created!") 
    }
    if(xhr.status === 200) {
        var pushpinInfos=JSON.parse(xhr.response);
        var locs = [];
        var pinLayer = new Microsoft.Maps.EntityCollection();
        for (var i = 0 ; i < pushpinInfos.length; i++) {
            locs[i] = new Microsoft.Maps.Location(pushpinInfos[i].latitude, pushpinInfos[i].longitude);
            
            pushpinInfos[i].icon='./redCamera.png'
            if(pushpinInfos[i].iP_Address){
                pushpinInfos[i].icon='./greenCamera.png';
            }
            var pin = new Microsoft.Maps.Pushpin(locs[i], {icon: pushpinInfos[i].icon, width:'20px', height:'20px'});
            pin.Title = pushpinInfos[i].cameraIp;
            pin.Description = pushpinInfos[i].remark;
			//pin.redirectUrl = pushpinInfos[i].redirectUrl;
            pin.cameraId=pushpinInfos[i].cameraId
            pinLayer.push(pin); 
            Microsoft.Maps.Events.addHandler(pin, 'click', displayInfobox);
        }
        map.entities.push(pinLayer);
    //     var bestview = Microsoft.Maps.LocationRect.fromLocations(locs);
    //    map.setView({ center: bestview.center, zoom: 6 });
        console.log("Post successfully created!") ;
    }

}}


// function MapPositionShow3(cityLatLong,pinNumber) {
//     let lat=cityLatLong.lat1;let lon= cityLatLong.long1;
//     let locs = new Microsoft.Maps.Location(cityLatLong.lat1, cityLatLong.long1);
//     var pinLocation = new Microsoft.Maps.Location(locs);

//     var pin = new Microsoft.Maps.Pushpin(locs, {icon: './Mylocation.png', width:'20px', height:'20px'});

//     pinInfobox = new Microsoft.Maps.Infobox(pinLocation,
//             { title: 'Details',
//                 description: 'Latitude: ' + lat.toString() + ' Longitude: ' + lon.toString(),
//                 offset: new Microsoft.Maps.Point(0, 15)
//             });


//     map.entities.push(pinInfobox);
//     map.entities.push(pin);

//     pin.setLocation(pinLocation);
//     map.setView({ center: pinLocation});
// }


function MapPositionShow(cityLatLong,map){
    var locs = [];
     locs[0] = new Microsoft.Maps.Location(cityLatLong.lat1, cityLatLong.long1);
        var pinLayer = new Microsoft.Maps.EntityCollection();
	var pin = new Microsoft.Maps.Pushpin(locs[0], {icon: './Mylocation.png', width:'20px', height:'20px'});
    pinLayer.push(pin);    
    map.entities.push(pin);
    // var bestView = Microsoft.Maps.LocationRect.fromLocations(locs[0]);

    // setTimeout((function () {
    //     map.setView({ bounds: bestView });
    // }).bind(this), 1000);

    // pin.setLocation(locs[0]);
    // map.setView({ center: pinLocation});
   

}
        
    function GetMap() {
        
        var pushpinInfos = [];
       
		var infoboxLayer = new Microsoft.Maps.EntityCollection();
        var pinLayer = new Microsoft.Maps.EntityCollection();
        //var apiKey = 'AuU1ciWa-v2D4MXrLhXxgbVY6676TOmemFJ3LpCO52P5Mnx8_KIdez1M7G2j0ZIN';
        if(cityLatLong.lat1){
            lat1=cityLatLong.lat1; 
            long=cityLatLong.long1;
        }
        else{
            cityLatLong.lat1=lat1; 
            long=cityLatLong.long1=long1;

        }
        var curPos = new Microsoft.Maps.Location(lat1,   long1);
        var mapOptions={};
         mapOptions = {
          credentials: window.bingMapKey,//'AuU1ciWa-v2D4MXrLhXxgbVY6676TOmemFJ3LpCO52P5Mnx8_KIdez1M7G2j0ZIN',
          center: curPos,
          mapTypeId: Microsoft.Maps.MapTypeId.road,
          zoom: ZoomLevel,
          disableScrollWheelZoom:false
      };
        var map = new window.Microsoft.Maps.Map('#myMap',mapOptions);
        //var map = new Microsoft.Maps.Map(document.getElementById("myMap"), { credentials: apiKey });
        // Create the info box for the pushpin
        pinInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false });
        infoboxLayer.push(pinInfobox);
         var locs = [];
        ShowCameraonMap(map);
        MapPositionShow(cityLatLong,map);
        map.entities.push(infoboxLayer);
        
       
    }
    function setCookie(name,value,expires){
        document.cookie = name + "=" + value + ((expires==null) ? "" : ";expires=" + expires.toGMTString())
    }

    function displayInfobox(e) {
            let CameraDetails={};
            CameraDetails['longitude']=e.location.longitude
            CameraDetails['latitude']=e.location.latitude
            CameraDetails['description']=e.target.Description
            CameraDetails['title']=e.target.Title;
            CameraDetails['cameraId']=e.target.cameraId
            let jsonstring=JSON.stringify(CameraDetails);
            var expirydate=new Date();
            expirydate.setTime( expirydate.getTime()+(100*60*60*24*100) )
            
            setCookie('CameraDetails',jsonstring,expirydate)		  
            ShowCameraDetails();
            //window.open(e.target.redirectUrl,"_self")
            pinInfobox.setOptions({ title: e.target.Title, description: e.target.Description, visible: true, offset: new Microsoft.Maps.Point(0, 25) });
            pinInfobox.setLocation(e.target.getLocation());
    }
    function hideInfobox(e) {
        pinInfobox.setOptions({ visible: false });
    }



    
        function disableScroll() {
            // Get the current page scroll position
            scrollTop = 
              window.pageYOffset || document.documentElement.scrollTop;
            scrollLeft = 
              window.pageXOffset || document.documentElement.scrollLeft,
  
                // if any scroll is attempted,
                // set this to the previous value
                window.onscroll = function() {
                    window.scrollTo(scrollLeft, scrollTop);
                };
        }
  
        function enableScroll() {
            window.onscroll = function() {};
        }
       // disableScroll();

       function selectElement(id, valueToSelect) {    
        let element = document.getElementById(id);
        element.value = valueToSelect;
    }
   
    window.onload = ()=>{
        FilldropdownState();
        setTimeout(
            
            11000);
    
            
            
           

    }
      
      

   
      

      function pageloadState(){  
        console.log("sdkfljsdf")      
        selectElement('ddlstate',StateName);
        ddlstate.onchange();     
        

    }

    
    function pageloadCity(){        
        selectElement('ddlCity',CityName)
        ddlCity.onchange()   
        

    }



    function onReady(callback) {
        var intervalID = window.setInterval(checkReady, 1000);
    
        function checkReady() {
            if (document.getElementsByTagName('body')[0] !== undefined) {
                window.clearInterval(intervalID);
                callback.call(this);
            }
        }
    }
    
    function show(id, value) {
        document.getElementById(id).style.display = value ? 'block' : 'none';
    }
    
    onReady(function () {
       // show('page', true);
        show('loading', false);
    });