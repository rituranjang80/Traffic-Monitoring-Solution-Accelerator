# Deployment Guide


## 	Pre-Requisite: 
		
	1. Docker should be installed on machine used to create Docker image
	   Download from following path: https://docs.docker.com/engine/install/
	2. Az client (Azure CLI) must be installed.
	     Download from following path: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli
	3. Kubectl Utility must be installed
		 Download from following path: https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/
		        OR 
		 If curl is installed, use this command: curl -LO "https://dl.k8s.io/release/v1.25.0/bin/windows/amd64/kubectl.exe"
		

## Step 1. Download Files
To start, clone or download this repository and navigate to the project's root directory.

## Step 2. Create Azure resources using Azure Resource Manager (ARM) templates.

If your environment meets the prerequisites and you're familiar with using ARM templates, select below buttbon to create  Azure resources for website and database

[![Deploy web site and DB to Azure 0](/Media/deploy-to-azure.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Frituranjang80%2FTraffic-Monitoring-Solution-Accelerator%2Fmain%2FARMTemplate%2FARMTemplate_mspoc_MainResourceGroup.json)


select below buttbon to create  Azure resources for Azure Kubernetes services (AKS)

[![Deploy AKS to Azure 1](/Media/deploy-to-azure.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Frituranjang80%2FTraffic-Monitoring-Solution-Accelerator%2Fmain%2FARMTemplate%2FARMTemplate_mspoc_AKSResourceGroup.json
)

Note:Steps below will refer and use Azure resources created in this step

## Step 3. Setup site and  Databases
	
	* Create a SQL Server instance or use existing SQL server instance 
        * Run the SQL script (1-SQL/MPOCSchemascript.sql 2- MPOCInsertScript.sql) on SQL instance   
    
## Step  4 Setup configuration for Ml models

		##	Edit config file at Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring_ML/TrafficMonitoring_Stream/app 
		
		*      Cosmos db connetion
		
			Account: <Enter the URI of cosmodb>
			Key: <Enter PRIMARY KEY of cosmodb>
			DatabaseName: "HighwayMonitoringSystem2"
			containerName: "VehicleTrendingLive" 
			
			Note: To fetch the comsoDb Details go through below points.
			    (a). Go to azure CosmosDb account created in step2.
			    (c). Select "Key" option on left.
			    (c). Go to Read-write Keys section.
			    (d). Copy account URI and PRIMARY KEY and fill into above Cosmo db connection.
		
		*      sql Connection string
		        'DRIVER={ODBC Driver 17 for SQLServer};SERVER=<Server Name>;
		                 DATABASE=<Catalog>;UID=<user ID>;PWD=<Password>'
			database = 'MicrosoftTrafficMgmt'
			
			 To fetch SQL sever Server details 
			    (a). Select your SQL database(MicrosoftTrafficMgmt) in azure portal.
			    (b). Click on overview (by default overview is loaded) and click on connection strings 
			    (c). Copy the server name,DATABASE/Catalog name, User ID and fill into above SQL Connection string
			    (d). Enter the password of sql server


		
		##	Edit Config file at Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring_ML/TrafficMonitoring_Video/app 
		
		*       Blob Storage Connection
			azure_storage_connectionstring: <Enter azure storage connection string for blob storage>;
			process_container_name: "processvideo"
			Traffic_mon_url: <web API URL> + "/Vehicletrend" 
			
			To fetch web API URL
			     (a). Go to azure app service and select Web API (Note: ARMS template creates 2 app services - one to be used as WEB API and Other as Web 					UI. Once decided which one is WEB API, use that app service for all steps applicable to WEB API and similarly for WEB UI)
			     (b). Select "Overview" option on left
			     (c). Copy URL from page
			
			Note: To fetch Blob storage connection string go through below points
			     (a). Go to Blob storage account
			     (b). Select "Access Keys" option on left
			     (c). Copy Connection string from key1 section

		##	Edit Config file at  Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring_ML/AccidentDetection_Live/app 
		
		*       Cosmos db Connection
			Account: <Enter the URI for cosmo db>
			Key: <Enter the Primary Key of cosmo db>
			DatabaseName: "HighwayMonitoringSystem2"
			containerName: "VehicleAccidentLive"	
			
			Note: To fetch the comsoDb Details go through below points.
			    (a). Go to azure CosmosDb account
			    (c). Select "Key" option on left
			    (c). Go to Read-write Keys
			    (d). Copy account URI and PRIMARY KEY and fill into above Cosmo db connection
		
		##	Edit Config file at  Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring_ML/AccidentDetection_Video/app 
		*       Front end api url 
		
			Traffic_accident_url: <web api url> + "/TrafficAnalysis" 
			
			To fetch web API URL
			  (a). Go to azure app service (web API)
			  (b). Select "Overview" option on left
			  (c). Copy URL from page
			
			
## Step 5 Deploy ML Models.             
		
		
	# Setup kuberentes with gpu nodes
		1. Open command prompt and navigate to root directory (Where repo code is downloaded/cloned).
                    
                   steps to connect with Kubernetes service ( Created above in ARM Template)
		       (a). open command prompt/terminal and run this below commnad
		            command: az login 
			    Note: This command will connect to browser and would ask for login. Verify your azure portal credentials. 
		       (b). Access Azure Kubernetes Service (AKS) on azure portal
		       (c). Select kubernetes service (created above in ARM Template)
		       (d). Select "Connect" option at top.
		       (e). Run below commands (below commands are to be copied from from connect page on AKS service)
		          az account set --subscription <....>
		          az aks get-credentials --resource-group <resource group name> --name <AKS service name> 
		
		2. Create a namespace for NVIDIA GPU RESOURCES by using below command.
		   Command:  kubectl create namespace gpu-resources
		3. Install the NVIDIA device plugin by using yamlfile.
		   Command: kubectl apply -f nvidia-device-plugin-ds.yaml (the file is present in root folder i.e. Traffic-Monitoring-Solution-Accelerator) 
		4. To check kubernetes node are up and running,run below command.
		   Command: Kubectl get nodes
		   Note: Check kubernetes pod is up or not.
		5. Now create the docker-registry secrets in the cluster by using below command.
		   Command:     kubectl create secret docker-registry <any name for secrets> \
                                 --namespace default \
                                 --docker-server= <docker server name in ACR access keys> \
                                 --docker-username= <docker username in ACR access keys>\
                                 --docker-password= <docker paasword  in ACR access Keys>
                   (Note: above 5 lines are single command, '\' is used to indicate continuation)
		   
		   To fetch azure container registry(ACR):
		         (a) Go to azure container registry resource.
			 (b) Select access keys
			 (c) Copy login Server, username, password and fill into above (docker-server, docker-username and docker paasword.)
		   Note: Plz note down secret name as should be same as one in yaml files. No need to change in yaml file if secret name 
		         is  "vechicle"
			 
		# Prerequisites for deploying Machine learning models.
		 (a). Create a empty folder with the name of 'videos' at below loaction in cloned repository
		        (Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring_ML/TrafficMonitoring_video/app)
			
		 (b). Add 'yolov4 weights' in below locations in cloned repository
		        (Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring_ML/TrafficMonitoring_video/app)
		        (Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring_ML/TrafficMonitoring_stream/app)
			
		 (c). Add 'trafficnet_resnet_model_ex-055_acc-0.913750.h5' weigths in below locations in cloned repository
		        (Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring_ML/AccidentDetection_Video/app)
			( Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring_ML/AccidentDetection_Live/app)
		      

		# Perform below steps for each of 4 models/folders in folder highwaymonitoring_ML. 
		
		1.	Open terminal/ command prompt 
		2.	Select folder containing docker file (e.g. TrafficMonitoring_Video)
		3.	Build Docker image by using Dockerfile. 
		        Command: docker build -t [<azure container registry name>.azurecr.io/<Image Name>: <Tag>] . 
		        (e.g. mspoccrdemo.azurecr.io/traffic_monitoring:0.1)
			
		4.	login to azure container registry
		        command: az acr login -n <azure container registry name>
		5.      Push image in azure container registry. 
			Command: docker push [<azure container registry name>.azurecr.io/<Image Name>: <Tag>]
		        Note: If we gets unauthorized error please perform previous step(login to azure container registory.)
		6.      Edit secrets name in yaml file.
		        Note: please edit the last line of yaml file with name of secrets that we created above.     
		7.      Edit image name in yaml file that you build in above step.
		        Example: <mspoccr.azurecr.io/vehicle_monitoring:2.1>
		8.	Deploy traffic monitoring model on Kubernetes cluster using yml file.
		        Command: Kubectl apply -f [<yml file Name>] 
		        Note: (Yaml file name as in folder)
		9.      kubectl expose create service by using below commands.
		        command: kubectl expose deploy <deploymentname> --type LoadBalancer --name <servicename> --port <portnumber>
		        Note: Deploymentname and portnumber should be same as in yaml file. Servicename can be anything of our choice. 
			
## Step 6A. Set up  configuration (/Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring/HighwayMonitoringWebAPI/appsetting.json) in web API
        
        * Enter the SQL sever connection strings details       
            "DefaultConnection": "Server=*************;Initial Catalog=<Catalog>;Persist Security Info=False;User 			ID=****************;Password=***********;MultipleActiveResultSets=False;TrustServerCertificate=False;"				
			Note: To fetch SQL sever Server details 
			  (a). Select your SQL database(MicrosoftTrafficMgmt) in azure portal.
		          (b). Click on overview and click on connection strings 
			  (c). Copy the server name,DATABASE/Catalog name, User ID and fill into above SQL Connection string
			  (d). Enter the password of sql server

        
       * Enter the Blob connection strings & Access key (Storage account & Access Keys) 
			 "BlobConnectionString": "<connection string>",       
			 "BlobstoraccountKey": "<key>",
			 
		Note: To fetch connection string and key
			(a). Go to azure access Blob storage account
			(b). Select "Access Keys" option on left
			(c). Copy Key and Connection string from key1 section
			
        * Enter the Blob BlobContainer Name  
             "BlobContainerNameProcessvideo": "processvideo",
             "BlobContainerNameUnProcessvideo": "unprocessvideo",
			
        * Enter the Model APIs path  
              "ML_VechileDetection_API": "http://<Vehicle API IP: Port>/",
              "ML_Accident_API": "http://<Accident API IP: Port>/",
		(run command "kubectl get svc" to get Vehicle Detection and Accident APIs IP & Port        
		
		* Enter the SAS URL expiry year  
              "SASURLValidYear": "2",
			 
		* Enter the web API URL (As mentione in Step 4, 2 app services created by ARM template, one is set up as web API and other as web UI)
			 "BaseURL":"<web API URL>" + “/api/”
		Note: fetch web API URL
			(a). Go to azure app service (web API)
			(b). Select "Overview" option on left
			(c). Copy URL value from page 

         Enter the CosmosDb details
    "CosmosDb": {
            "Account": "<Keys  URI>",
            "Key": "<Keys  Primary Key > ",
            "DatabaseName": "<Database Name>"                
            }
		Note: To fetch the comsoDb Details go through below points.
			    (a). Go to azure CosmosDb account created in step2.
			    (c). Select "Key" option on left.
			    (c). Go to Read-write Keys section.
			    (d). Copy account URI and PRIMARY KEY and fill into above Cosmo db connection.		

## Step 6B. Deploy the WebAPI

		* open the solution(/Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring/HighwayMonitoringWebAPI/HighwayMonitoringWebAPI.sln) in visual studio
		* Get the publish settings file from azure portal app service (WebAPI)
		   Note: To Get publish profile file
				(a). Go to azure app service (web API) (There are 2 app services created, one is set up as webAPI and other is web UI))
				(b). Select "Overview" option on left
				(c). click on Get publish profile file on top right top side 
		* In the visual studio solution right click the project 
		(WebAPI)->publish->new->Import profile->browse the publish settings file->click ok ->click publish

## Step 7A. Set up  configuration Reactjs public/Config.js in HighwayMonitoring      


     * Enter the Web API URL (There are 2 app services created, one is set up as webAPI and other is web UI))     
        window.baseURL="<app service (web API) URL>" + "/api/"			
	    Note:  fetch web API URL
			(a). Go to azure app service (web API)
			(b). Select "Overview" option on left
			(c). Copy URL from page
	   
	* Enter the bing Map Key (Need to create account at Bing Map to get key)       
       * window.bingMapKey="<bingMapKey>"
	    Follow these steps for creating Bing map account key
			https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key
	* Enter the Live Stream ML API URL      
       * window.MLAPI=<bingMapKey>

## Step 7B. Set up  configuration Reactjs public/Index.js in HighwayMonitoring 
	
	*Replace bingmapkey value at 2 places below
		
		<script type='text/javascript' src='https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key="<bingMapKey>"&cp=47.621065~-122.352534&style=o&lvl=14&trfc=1' async defer></script>
		 
		 var mapOptions = {
          credentials:"<bingMapKey>"
          center: curPos,
          mapTypeId: Microsoft.Maps.MapTypeId.road,
          zoom: 9
      };
     
		   
## Step 7C. Deploy the ReactJS	
		
		* Open the React JS folder/application(/Traffic-Monitoring-Solution-Acceleraton/ReactJS) in Visual studio code	
		* Install the project library run the command (npm install --legacy-peer-deps) in terminal
		* Create the build run the command (npm run build)
		
		   (a). Select app service  Web UI on azure (There are 2 app services created, one is set up as webAPI and other is web UI)
		   (b). Select "Deployment Center" option on left than click ftp credentials on top			 
		   (c). copy the FTPS endpoint,User name, Password
		   (d). Open the FTP server enter the ftp endpoint, user name, Password Upload all the files from(/Traffic-Monitoring-Solution-Acceleraton/ReactJS/build)

On Succcesfull execution of all steps, access the Traffic Monitoring website on browser using WEB UI URL (Web UI app service URL)
		
## Appendix - Use of azure media service for Live video/stream .
			
			 
			1) Create a media service in azure portal
			2) Open the Media Service->Overview->Encoding->uploading a video
			3) After video upload select the file than click on add job 
				a) Job page open enter the details
				a) check the option encoding
				b) Built in present name (select the option-> H264MultipleBitrate1080P)
			4) Open the new created encoding video file 
			5) Click on new streaming locator
			6) A new streaming locator window opened, enter the expiry date (current date+2 years or which you want)
			8) if stream end point not start then start. now encoded video show on portal
			9) click on streaming URL under section Streaming locators (1)
			10) A new popup Streaming URLs window open, copy the HLS URL from show advance section 
			11) Open the Traffic Monitoring website and while adding/editing a camera, paste HLS URL in endpoint field on screen and save



# Congratulations
You have completed this Traffic Monitoring solution accelerator 
