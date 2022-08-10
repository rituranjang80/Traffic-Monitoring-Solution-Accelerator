from fastapi import FastAPI, UploadFile, File
from inferencing import predict_video
import shutil
import requests
import json

app = FastAPI()


@app.post('/')
async def root(file: UploadFile = File(...)):
    with open(f'{file.filename}', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
        pre = predict_video(video_path=file.filename)  
        api_url = "https://highwaymonitoringwebapi.azurewebsites.net/api/TrafficAnalysis"
        json_data = json.dumps(pre)
        print(json_data)
        # print(json_data)

        headers = {
            "content-type": "application/json",
            "cache-control": "no_cache"
        }

        response = requests.request("POST", api_url, data=json_data, headers=headers)
    return "Done"
