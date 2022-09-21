# Traffic-Monitoring-Solution-Accelerator

![Traffic-Monitoring-Solution-Accelerator](/Media/TSMA.jpg)

This solution will enable state DOT/City to deliver geospatial visualizations of road network performance and demand, travel time delay, non-recurring congestion events. Record, analysis, and dispatch crew for pavement repair, and other hazardous conditions. 


    Ability to upload a video.  
    Classify vehicles based on vehicle type (Car, Pickup Truck, Bus and Motorbike ) 
    Count vehicles for each vehicle type 
    Identify if there is any incident/ accident and notify the user (configurable email address) 
    User interface will allow users to visualize the camera locations on the map (if the video has geo information) 
    User can select any camera on the map to get the further details about the location.
    The UI will allow users to interface with the video and review the identified features.  
    The system will store inference data to Azure based on predefined frequency. 

 

## About this repository
This accelerator was built to provide developers with all of the resources needed to build a solution to....


## Getting Started 
Start by deploying the resources needed for this solution: 


1. Clone this repository and navigate to the root of the directory  
2. Go to the [Deployment Guide](./DEPLOY.MD) for the steps you need to take to deploy this solution 

## Prerequisites
In order to successfully complete your solution, you will need to have access to and or provisioned the following:

* Deploy the Azure resource manger from deployment guide.
* Set up the configuration as per deployment guide


## Azure Platform
The directions provided for this repository assume fundamental working knowledge of 
 
* API Connection
  * Azure Blob
* App Services
  * Blob operations
  * CosmosDb  
  * Web API & Web App(UI)
* App Service Plan
* Storage Account
  * Storage for process video
  * Storage for unprocess video
* kubernetes
* Python
* AI ML Tools like CVAT


For additional training and support, please see:
 1. item 1
 2. item 2
 3. item 3

## Process Overview  


## License
Copyright (c) Microsoft Corporation

All rights reserved.

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ""Software""), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE


## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
