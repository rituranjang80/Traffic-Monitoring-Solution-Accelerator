async function fetchAsyncGet (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }
  let data=fetchAsyncGet('https://highwaymonitoringwebapi.azurewebsites.net/api/USCity/GetAllState');
  
  let v='https://highwaymonitoringwebapi.azurewebsites.net/api/USCity/GetCity'
  
  var city=fetchAsyncPost(v,'Alabama')
  function fetchAsyncPost (url,postObj) {
      let xhr = new XMLHttpRequest()
      let post = JSON.stringify(postObj)
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
  xhr.send(postObj);
  
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
   
  const url ='https://highwaymonitoringwebapi.azurewebsites.net/api/Camera/GetAllCameraDetails' ;
  var city=fetchAsyncPost(v,post);
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
  
          console.log("Post successfully created!") ;
      }
  
  }}
  
  
           var map;
           var pinInfobox;
      function GetMap() {
          
          var pushpinInfos = [];
          pushpinInfos[0] = { 'redirectUrl':'./#/Dashboard/41','lat': 35.59000000, 'lng': -87.92000000, 'title': 'Camera 1', 'description': 'Tennessee', 'icon' :'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/24/Map-Marker-Marker-Outside-Chartreuse-icon.png' };
          pushpinInfos[1] = {'redirectUrl':'/#/Dashboard/40', 'lat': 33.59000000, 'lng': -86.92000000, 'title': 'Camera 2', 'description': 'Birmingham', 'icon' :'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/24/Map-Marker-Marker-Outside-Chartreuse-icon.png' };      
        
          var infoboxLayer = new Microsoft.Maps.EntityCollection();
          var pinLayer = new Microsoft.Maps.EntityCollection();
          var apiKey = 'AuU1ciWa-v2D4MXrLhXxgbVY6676TOmemFJ3LpCO52P5Mnx8_KIdez1M7G2j0ZIN';
          var curPos = new Microsoft.Maps.Location(35.24761672238248,   -87.22187500000001);
          var mapOptions = {
            credentials: 'AuU1ciWa-v2D4MXrLhXxgbVY6676TOmemFJ3LpCO52P5Mnx8_KIdez1M7G2j0ZIN',
            center: curPos,
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            zoom: 7,
            disableScrollWheelZoom:true
        };
          var map = new window.Microsoft.Maps.Map('#myMap',mapOptions);
          //var map = new Microsoft.Maps.Map(document.getElementById("myMap"), { credentials: apiKey });
          // Create the info box for the pushpin
          pinInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false });
          infoboxLayer.push(pinInfobox);
           var locs = [];
          ShowCameraonMap(map);
          map.entities.push(infoboxLayer);
          var bestview = Microsoft.Maps.LocationRect.fromLocations(locs);
          map.setView({ center: bestview.center, zoom: 6 });
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
       // Dynamic load the Bing Maps Key and Script
        // Get your own Bing Maps key at https://www.microsoft.com/maps
        (async () => {
            let script = document.createElement("script");
            let bingKey ='AuU1ciWa-v2D4MXrLhXxgbVY6676TOmemFJ3LpCO52P5Mnx8_KIdez1M7G2j0ZIN'// await fetch("https://samples.azuremaps.com/api/GetBingMapsKey").then(r => r.text()).then(key => { return key });
            script.setAttribute("src", `https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=${bingKey}`);
            document.body.appendChild(script);
        })();
       

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
       document.getElementById('cameradetails').style.visibility = "hidden";

    function refreshIframe() {
        let CameraDetails=JSON.parse(getCookie('CameraDetails'));
        document.getElementById("iframeid").src ='http://20.241.224.236:5000/id='+CameraDetails.cameraId;
        document.getElementById("iframeChart").src = '/#/Livevideo/'+CameraDetails.cameraId
        
}
