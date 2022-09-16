# Deployment Guide


## 	Pre-Requisite: 
		
	1. Docker should be installed on machine used to create Docker image
	2. Azure  Container Registry (ACR) is created on Azure (Created by ARMS Template above)
	3. Azure Kubernetes Service (AKS) is created on Azure (Created by ARMS Template above)
	4. Az client (Azure CLI) must be installed.
	     Download from following path: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli
	5. Kubectl Utility must be installed
		 Download from following path: https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/
		        OR 
		 if curl is installed, use this command: curl -LO "https://dl.k8s.io/release/v1.25.0/bin/windows/amd64/kubectl.exe"
		

## Step 1. Download Files
To start, clone or download this repository and navigate to the project's root directory.

## Step 2. Create Azure resources using Azure Resource Manager (ARM) templates.

If your environment meets the prerequisites and you're familiar with using ARM templates, select below buttbon to create  Azure resources for website and database

[![Deploy web site and DB to Azure 0](/Media/deploy-to-azure.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Frituranjang80%2FTraffic-Monitoring-Solution-Accelerator%2Fmain%2FARMTemplate%2FARMTemplate_mspoc_MainResourceGroup.json)


select below buttbon to create  Azure resources for Azure Kubernetes services (AKS)

[![Deploy AKS to Azure 1](/Media/deploy-to-azure.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Frituranjang80%2FTraffic-Monitoring-Solution-Accelerator%2Fmain%2FARMTemplate%2FARMTemplate_mspoc_AKSResourceGroup.json
)
## Step 3. Setup site and  Databases
	
	* Create a SQL Server instance or use exciting SQL server instance 
        * Run the SQL script (1-SQL/MPOCSchemascript.sql 2- MPOCInsertScript.sql) SQL instance   
    
## Step  4 Setup configuration for Ml models

		#	Edit config file for TrafficMonitoring_Live model
		#       Cosmos db connetion
		
			Account: <Enter the account name for cosmo db>
			Key: <Enter Key of cosmodb>
			DatabaseName: <Enter Database Name>
			containerName: <Enter container Name> (container name for process video)
		
		#       sql Connection string
		        'DRIVER={ODBC Driver 17 for SQLServer};SERVER=<Server Name>;
		                 DATABASE=<Data Name>;UID=<user ID>;PWD=<Password>'

		
		#	Edit Config file for TrafficMonitoring_Video model
		#       Blob Storage Connection
			azure_storage_connectionstring: <Enter azure storage connection string for blob storage>;
			AccountName = <Enter blob storage Account name> 
			AccountKey = <Enter Account key of blob storage"
			process_container_name: "Enter process video container name"
			Traffic_mon_url: <web api url> + "/Vehicletrend" 

		#	Edit Config file for AccidentDetection_Live Model
		#       Cosmos db Connection
			Account: <Enter the account name for cosmo db>
			Key: <Enter the key of cosmo db>
			DatabaseName: <Enter Database Name>
			containerName: <Enter container Name> 		
		
		#	Edit Config file for AccidentDetection_Video Model
		#       Front end api url 
		
			Traffic_accident_url: <web api url> + "/TrafficAnalysis" 
			
## Step 5 Deploy ML Models.
		
		
		# Setup kuberentes with gpu nodes
		1. Open command prompt and connect with Kubernetes service ( Created above in ARM Template)
		    Kubernetes Service --> Connect 
		    Run below commands (copy from connect page)
		    az account set --subscription <....>
		    az aks get-credentials --resource-group <resource group name> --name <AKS service name> 
		
		2. When need to check all gpu nodes are up and running,run below command.
		   Command: Kubectl get nodes
		3. Create a namespace for NVIDIA GPU RESOURCES by using below command.
		   Command:  kubectl create namespace gpu-resources
		4. Install the NVIDIA device plugin by using yamlfile.
		   Command: kubectl apply -f nvidia-device-plugin-ds.yaml (the file is present in main repository) 
		5. Now create the docker-registry secrets in the cluster by using below command.
		   Command:     kubectl create secret docker-registry <any name for secrets> \
                                 --namespace default \
                                 --docker-server= <docker server name in ACR access keys> \
                                 --docker-username= <docker username in ACR access keys>\
                                 --docker-password= <docker paasword  in ACR access Keys>
		 
		# Perform below steps for each of 4 models in folder highwaymonitoring_ML. 
		
		1.	Open terminal/ command prompt 
		2.	Select folder containing docker file (e.g. TrafficMonitoring_Video)
		3.	Build Docker image by using Dockerfile. 
			Command: docker build -t [<container_registry_name>.azurecr.io/<Image Name>: <Tag>] (e.g.                                mspoccrdemo.azurecr.io/traffic_monitoring:0.1)
		4.	login to azure container registry
		        command: az acr login -n <container registry name>
		
		5. Push image in azure container registry. 
			Command: docker push [<container_registry_name>.azurecr.io/<Image Name>: <Tag>]
		6.	Deploy traffic monitoring model on Kubernetes cluster using yml file.
			Command: Kubectl apply -f [<yml file Name>] 
			Note: (Yaml file name as in folder)
			
			


## Step 6A. Set up  configuration appsetting.json in HighwayMonitoringWebAPI
        
        * Enter the SQL sever connection strings        
           * "ConnectionStrings": {  "XXXXXXXXXXXX" },
        
       * Enter the Blob connection strings & Access key (Storage account  Access Keys)  
			* "BlobConnectionString": "<connection string>",
			* "blobstoraccountKey": "<key>",
 
        * Enter the Blob BlobContainer Name  
            * "BlobContainerNameProcessvideo": "processvideo",
            * "BlobContainerNameUnProcessvideo": "unprocessvideo",
        * Enter the AI ML API path  
             * "ML_VechileDetection_API": "****",
             * "ML_Accident_API": "******",

        * Enter the SAS URL expiry year  
             * "SASURLValidYear": "2",
		* Enter the web API URL
			* "BaseURL":"<web API URL>" + “/api/”

        * Enter the CosmosDb details
    "CosmosDb": {
            "Account": "<Keys  URI>",
            "Key": "<Keys  Primary Key > ",
            "DatabaseName": "<Database Name>"                
            }
	

## Step 6B. Deploy the WebAPI

		* open the solution(/Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring/HighwayMonitoringWebAPI) in visual studio
		* Get the publish settings file from azure portal app service (Website)
		* In the visual studio solution right click the project (HighwayMonitoringWebAPI)->publish->new->Import profile->browse the publish settings file->click ok ->click publish

## Step 7A. Set up  configuration Reactjs public/Config.js in HighwayMonitoring      


     * Enter the Web API URL        
       * window.baseURL=”<HighwayMonitoringWebAPIdemo URL>” + “/api/”
	   
	* Enter the bing Map Key (Need to create account at Bing Map to get key)       
       * window.bingMapKey='***************************
	    Follow these steps for creating Bing map account key
			https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key
	* Enter the Live Stream ML API URL      
       * window.MLAPI='*****************


		   
## Step 7B. Deploy the ReactJS	
		
		* Open the React JS folder/appliction(/Traffic-Monitoring-Solution-Acceleraton/ReactJS) in Visual studio code	
		* Install the project library run the (npm install --legacy-peer-deps) in terminal
		* Create the build  run the command  (npm run build)
		* Select appservice (HighwayMonitoringdemo) Deployment Centre  FTPS credentials Use username & password and FTP endpoint
			Upload all the files from(/Traffic-Monitoring-Solution-Acceleraton/ReactJS/build) to FTP end point(host) using username & password

		
## Appendix - Use of media service for Live stream .
			
		 Create a media service in azure portal( see the video https://www.youtube.com/watch?v=8SndwAymPes)
			1) Media Services  
			2) Open the Media Service->Overview->Enconding->uploading a video
			3) After video upload click on job fill the form and 
				a) check the option encoding
				b) Bulit in present name-> H265SingleBitrate720p
			4) Create a stream locator 
			5) Run the stream endpoint from media service page
				6) open the enconding video from browse assets then go to stream URL
			7) Copy the stram hls URL path -> Add the hls URL path to web application  camera configuration page.





# Congratulations
You have completed this solution accelerator and should now have a report to explore the personalized recommendations:

