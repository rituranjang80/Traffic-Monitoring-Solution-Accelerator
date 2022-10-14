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
## Step 3. Setup site and  Databases
	
	* Create a SQL Server instance or use existing SQL server instance 
        * Run the SQL script (1-SQL/MPOCSchemascript.sql 2- MPOCInsertScript.sql) on SQL instance   
    
## Step  4 Setup configuration for Ml models

		##	Edit config file for TrafficMonitoring_Live model
		
		*      Cosmos db connetion
		
			Account: <Enter the URI cosmodb>
			Key: <Enter PRIMARY KEY of cosmodb>
			DatabaseName: "HighwayMonitoringSystem2"
			containerName: "VehicleTrendingLive" 
			
			Note: To fetch the comsoDb Details go through below points.
			    (a). Go to azure CosmosDb account.
			    (c). Select "Key" option on left.
			    (c). Go to Read-write Keys.
			    (d). Copy account URI and PRIMARY KEY and fill into above Cosmo db connection.
		
		##      sql Connection string
		        'DRIVER={ODBC Driver 17 for SQLServer};SERVER=<Server Name>;
		                 DATABASE=<Data Name>;UID=<user ID>;PWD=<Password>'

		
		##	Edit Config file for TrafficMonitoring_Video model
		
		*       Blob Storage Connection
			azure_storage_connectionstring: <Enter azure storage connection string for blob storage>;
			process_container_name: "processvideo"
			Traffic_mon_url: <web api url> + "/Vehicletrend" 
			
			Note: To fetch Blob storage connection string go through below points.
			     (a) Go to Blob storage account
			     (b) Select "Access Keys" option on left
			     (c) Copy Connection string from key1 section

		##	Edit Config file for AccidentDetection_Live Model
		
		*       Cosmos db Connection
			Account: <Enter the account name for cosmo db>
			Key: <Enter the key of cosmo db>
			DatabaseName: "HighwayMonitoringSystem2"
			containerName: "VehicleAccidentLive"	
			
			Note: To fetch the comsoDb Details go through below points.
			    (a) Go to azure CosmosDb account.
			    (c) Select "Key" option on left.
			    (c) Go to Read-write Keys.
			    (d) Copy account URI and PRIMARY KEY and fill into above Cosmo db connection.
		
		##	Edit Config file for AccidentDetection_Video Model
		*       Front end api url 
		
			Traffic_accident_url: <web api url> + "/TrafficAnalysis" 
			
## Step 5 Deploy ML Models.                
		
		
	# Setup kuberentes with gpu nodes
		1. Open command prompt and navigate to root directory (Where repo code is downloaded/cloned).
                    
                   steps to connect with Kubernetes service ( Created above in ARM Template)
		       (a). Access Kubernetes Service on azure portal
		       (b). Select kubernetes service (created above in ARM Template)
		       (c). Select "Connect" option at top.
		       (d). Run below commands (copy from connect page)
		          az account set --subscription <....>
		          az aks get-credentials --resource-group <resource group name> --name <AKS service name> 
		
		2. Create a namespace for NVIDIA GPU RESOURCES by using below command.
		   Command:  kubectl create namespace gpu-resources
		3. Install the NVIDIA device plugin by using yamlfile.
		   Command: kubectl apply -f nvidia-device-plugin-ds.yaml (the file is present in main repository) 
		4. To check kubernetes node are up and running,run below command.
		   Command: Kubectl get nodes
		   Note: Check kubernetes pod is up or not.
		5. Now create the docker-registry secrets in the cluster by using below command.
		   Command:     kubectl create secret docker-registry <any name for secrets> \
                                 --namespace default \
                                 --docker-server= <docker server name in ACR access keys> \
                                 --docker-username= <docker username in ACR access keys>\
                                 --docker-password= <docker paasword  in ACR access Keys>

		   Note: Plz note down secret name as should be same as one in yaml files. No need to change in yaml file if secret name 
		         is  "vechicle"

		# Perform below steps for each of 4 models in folder highwaymonitoring_ML. 
		
		1.	Open terminal/ command prompt 
		2.	Select folder containing docker file (e.g. TrafficMonitoring_Video)
		3.	Build Docker image by using Dockerfile. 
		        Command: docker build -t [<container_registry_name>.azurecr.io/<Image Name>: <Tag>] . 
		        (e.g. mspoccrdemo.azurecr.io/traffic_monitoring:0.1)
			
		4.	login to azure container registry
		        command: az acr login -n <container registry name>
		5.      Push image in azure container registry. 
			Command: docker push [<container_registry_name>.azurecr.io/<Image Name>: <Tag>]
		        Note: If we gets unauthorized error please perform previous step(login to azure container registory.)
		6.      Edit secrets name in yaml file.
		        Note: please edit the last line of yaml file with name of secrets that we created above.     
		7.      Edit image name in yaml file that you build in above step.
		        Example: <mspoccr.azurecr.io/vehicle_monitoring:2.1>
		8.	Deploy traffic monitoring model on Kubernetes cluster using yml file.
		        Command: Kubectl apply -f [<yml file Name>] 
		        Note: (Yaml file name as in folder)
		9.      kubectl expose create service.
		        command: kubectl expose deploy <deploymentname> --type LoadBalancer --name <servicename> --port <portnumber>
		        Note: Deploymentname and portnumber should be same as in yaml file. Servicename can be anything of our choice. 
			
## Step 6A. Set up  configuration appsetting.json in web API
        
        * Enter the SQL sever connection strings details       
            "DefaultConnection": "Server=*************;Initial Catalog=MicrosoftTrafficMgmt;Persist Security Info=False;User ID=****************;Password=***********;MultipleActiveResultSets=False;TrustServerCertificate=False;"				
			To fetch SQL sever Server details 
			  (a). Go to SQL database in azure portal
			  (b). Click on your databasename in my case MicrosoftTrafficMgmt
			  (c). Click on overview then click on connection strings 
			  (d). Copy the server name,catalog name user 
			  (e). Enter the password of sql server

        
       * Enter the Blob connection strings & Access key (Storage account & Access Keys) 
			 "BlobConnectionString": "<connection string>",       
			 "BlobstoraccountKey": "<key>",
		To fetch connection string and key
			(a). Go to azure access Blob storage account
			(b). Select "Access Keys" option on left
			(c). Copy Key and Connection string from key1 section
			
        * Enter the Blob BlobContainer Name  
             "BlobContainerNameProcessvideo": "processvideo",
             "BlobContainerNameUnProcessvideo": "unprocessvideo",
			
        * Enter the Model APIs path  
              "ML_VechileDetection_API": "http://<API IP: Port>/",
              "ML_Accident_API": "http://<API IP: Port>/",
		(run command "kubectl get svc" to get Model APIs IP & Port        
		
		* Enter the SAS URL expiry year  
              "SASURLValidYear": "2",
			 
		* Enter the web API URL
			 "BaseURL":"<web API URL>" + “/api/”
		To fetch web API URL
			(a). Go to azure app service (web API)
			(b). Select "Overview" option on left
			(c). Copy URL value from page 

         Enter the CosmosDb details
    "CosmosDb": {
            "Account": "<Keys  URI>",
            "Key": "<Keys  Primary Key > ",
            "DatabaseName": "<Database Name>"                
            }
		To fetch web CosmosDb details
			(a). Go to azure CosmosDb service.
			(b). Select "Overview" option on left
			(c). Copy the database under container section
			(d). Select "Key" option on left under settings section
			(e). Copy URI,PRIMARY KEY, and PRIMARY CONNECTIONSTRING 


## Step 6B. Deploy the WebAPI

		* open the solution(/Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring/HighwayMonitoringWebAPI/HighwayMonitoringWebAPI.sln) in visual studio
		* Get the publish settings file from azure portal app service (WebAPI)
			 * To Get publish profile file
				(a). Go to azure app service (web API)
				(b). Select "Overview" option on left
				(c). click on Get publish profile file on top right top side 
		* In the visual studio solution right click the project 
		(WebAPI)->publish->new->Import profile->browse the publish settings file->click ok ->click publish

## Step 7A. Set up  configuration Reactjs public/Config.js in HighwayMonitoring      


     * Enter the Web API URL        
        window.baseURL="<app service (web API) URL>" + "/api/"			
	 * To fetch web API URL
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
	
	*Change the bing map key & credentials to new bing map key
		
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
		
			(a). Select app service  Web UI on azure
			(b). Select "Deployment Center" option on left than click ftp credentials on top			 
		    (c). copy the FTPS endpoint,User name, Password
			(d). Open the FTP server enter the ftp endpoint, user name, Password Upload all the files from(/Traffic-Monitoring-Solution-Acceleraton/ReactJS/build)
			
		
## Appendix - Use of media service for Live stream .
			
			 see the video https://www.youtube.com/watch?v=o2uiYLT6KU8 
			1) Create a media service in azure portal
			2) Open the Media Service->Overview->Encoding->uploading a video
			3) After video upload click on job fill the form and 
				a) check the option encoding
				b) Bulit in present name
			4) Create a stream locator 
			5) Run the stream endpoint from media service page
				6) open the enconding video from browse assets then go to stream URL
			7) Copy the stream HLS URL path -> Add the HLS URL path to web application  camera configuration page.





# Congratulations
You have completed this solution accelerator and should now have a report to explore the personalized recommendations:

