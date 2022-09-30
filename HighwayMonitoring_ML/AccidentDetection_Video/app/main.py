from fastapi import FastAPI, UploadFile, File
from inferencing import predict_video
import shutil
import requests
import json
import os
import yaml
app = FastAPI()


@app.post('/')
async def root(file: UploadFile = File(...)):
    with open(f'{file.filename}', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
        pre = predict_video(video_path=file.filename)  
        #api_url = "https://highwaymonitoringwebapi.azurewebsites.net/api/TrafficAnalysis"
        dir_root = os.path.dirname(os.path.abspath(__file__))
        
        with open(dir_root+ "/config.yaml", "r") as yamlfile:
            config = yaml.load(yamlfile, Loader=yaml.FullLoader)
        json_data = json.dumps(pre)
 

        headers = {
            "content-type": "application/json",
            "cache-control": "no_cache"
        }

        response = requests.request("POST", config['Traffic_acc_url'], data=json_data, headers=headers)
    return "Done"
