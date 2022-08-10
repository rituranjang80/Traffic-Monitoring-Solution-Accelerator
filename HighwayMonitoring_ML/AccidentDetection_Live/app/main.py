from fastapi import FastAPI, UploadFile, File, Form, Depends, Request
from img_inference import run_predict
import shutil
import requests
import json
import io
import PIL.Image as Image
import base64
app = FastAPI()


@app.post("/files/")
#async def root( img:str=Form(defult=1),  camera_id: str=Form(default=1), Id:str=Form(default=1)):
async def root(request:Request):
    result = await request.json()
    res = result['image']
    res = bytes(res, 'utf-8')
    #print(res)
    image_64_decode = base64.decodestring(res) 
    #image = Image.open(io.BytesIO(img))
    image_result = open('temp.jpg', 'wb')
    image_result.write(image_64_decode)
    #image.save('temp.jpg')
    camera_id = result['camera_id']
    Id = result['Id']
    run_predict(camera_id, Id, img_path='temp.jpg')

   
    

