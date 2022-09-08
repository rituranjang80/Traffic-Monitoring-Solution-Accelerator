# Deployment Guide

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
    

## Step 4A. Set up  configuration appsetting.json in HighwayMonitoringWebAPI
        
        * Enter the SQL sever connection strings        
           * "ConnectionStrings": {  "XXXXXXXXXXXX" },
        
        * Enter the Blob connection strings  
           * "BlobConnectionString": "XXXXXXXXXXXXXXXXXX",
        
        * Enter the Blob BlobContainer Name  
            * "BlobContainerNameProcessvideo": "processvideo",
            * "BlobContainerNameUnProcessvideo": "unprocessvideo",
        * Enter the AI ML API path  
             * "ML_VechileDetection_API": "****",
             * "ML_Accident_API": "******",

        * Enter the SAS URL expiry year  
             * "SASURLValidYear": "2",
		* Enter the web API URL
			* "BaseURL":"***************"
        * Enter the CosmosDb details
        "CosmosDb": {
                "Account": "**********//",
                "Key": "************************",
                "DatabaseName": "********"                
                }
## Step 4B. Deploy the WebAPI

		* open the solution(/Traffic-Monitoring-Solution-Accelerator/HighwayMonitoring/HighwayMonitoringWebAPI) in visual studio
		* Get the publish settings file from azure portal app service (Website)
		* In the visual studio solution right click the project (HighwayMonitoringWebAPI)->publish->new->Import profile->browse the publish settings file->click ok ->click publish

## Step 5A. Set up  configuration Reactjs public/Config.js in HighwayMonitoring      


        * Enter the Web API URL        
           * window.baseURL='*********************
		   
		* Enter the bing Map Key        
           * window.bingMapKey='***************************
		   
		* Enter the   Live Stream API      
           * window.MLAPI='*****************
		   
## Step 5B. Deploy the ReactJS	
		
		* Open the React JS folder/appliction(/Traffic-Monitoring-Solution-Acceleraton/ReactJS) in Visual studio code	
		* Install the project library run the (npm install) in terminal
		* Create the build  run the command  (npm run build)
		* Upload all the files from(/Traffic-Monitoring-Solution-Acceleraton/ReactJS/build) to websever using FTP
			
## Step 6 Deploy ML Models.
		
		# Deployment of 4 Traffic Monitoring ML Models under folder “HighwayMonitoring_ML”
		Pre-Requisite: 
		
		1. Docker should be installed on machine used to create Docker image
		2. Azure  Container Registry (ACR) is created on Azure (Created by ARMS Template)
		3. Azure Kubernetes Service (AKS) is created on Azure (Created by ARMS Template)
		4. Az client must be installed and mapped with container registry
		5. Kubectl Utility must be installed 
		 
		#Perform below steps for each 4 model 
		
		1.	Open terminal/ command prompt 
		2.	Select folder containing docker file (e.g. TrafficMonitoring_Video)
		3.	Build Docker image by using Dockerfile. 
		o	Command: docker build -t [<container_registry_name>.azurecr.io/<Image Name>: <Tag>] (e.g. mspoccr.azurecr.io/traffic_monitoring:0.1)
		4.	Push image in azure container registry. 
		o	Command: docker push [<container_registry_name>.azurecr.io/<Image Name>: <Tag>]
		5.	Deploy traffic monitoring model on Kubernetes cluster using yml file.
		o	 Command: Kubectl apply -f [<yml file Name>]

		## Step  7 Setup configuration for Ml models

		#	Edit config file for TrafficMonitoring_Stream model
		#       cosmo db connetion
		
		1.	Account: <Enter the account name for cosmo db>
		2.	Key: <Enter Key of cosmodb>
		3.	DatabaseName: <Enter Database Name>
		4.	containerName: <Enter container Name>
		#       sql Connection string
		1.      'DRIVER={ODBC Driver 17 for SQLServer};SERVER=<Server Name>;
		                 DATABASE=<Data Name>;UID=<user ID>;PWD=<Password>'

		
		#	Edit Config file for TrafficMonitoring_Video model
		
		1.	azure_storage_connectionstring: <Enter azure storage connection string for blob storage>;
		2.	AccountName = <Enter blob storage Account name> 
		3.	AccountKey = <Enter Account key of blob storage"
		4.	process_container_name: "Enter process video container name"
		5.	Traffic_mon_url: <Enter the traffic monitoring frontend api url for video>

		#	Edit Config file for AccidentDetection_Live Model
		
		1.	Account: <Enter the account name for cosmo db>
		2.	Key: <Enter the key of cosmo db>
		3.	DatabaseName: "Enter Database Name"
		4.	containerName: "Enter container Name"

		#	Edit Config file for AccidentDetection_Video Model
		
		1.	Traffic_accident_url: < Enter the accident detection frontend api url for video>




# Congratulations
You have completed this solution accelerator and should now have a report to explore the personalized recommendations:

