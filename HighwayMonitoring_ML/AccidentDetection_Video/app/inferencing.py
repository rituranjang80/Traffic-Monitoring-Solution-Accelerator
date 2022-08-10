import cv2
import os
from imageai.Prediction.Custom import CustomImagePrediction
from copy import deepcopy
from pathlib import Path

cwd = os.getcwd()


def predict_video(video_path):
    predictor = CustomImagePrediction()
    predictor.setModelPath(
        model_path=os.path.join(cwd, "trafficnet_resnet_model_ex-055_acc-0.913750.h5"))
    predictor.setJsonPath(
        model_json=os.path.join(cwd, "model_class.json"))
    predictor.loadFullModel(num_objects=4)

    cap = cv2.VideoCapture(video_path)

    Id = {"id": "1"}
    camera_id = {"tAcamera_Id": "1"}

    video_id = Path(video_path).stem

    # Empty list and dictionary to store values
    json_dict = {}
    json_list = []

    # calculate duration of the video
    fps1 = cap.get(cv2.CAP_PROP_FPS)

    progress_tracker = 0
    accident = ""
    tAccidentStat = ""
    skip_frame = 1
    

    while cap.isOpened():
        valid, frame = cap.read()

        if valid == True:
            frame_stamp = (cap.get(cv2.CAP_PROP_POS_MSEC)) / 1000

            progress_tracker += 1

            if progress_tracker % skip_frame == 0:
                cv2.imwrite("video_image5.jpg", frame)

            # Predicting each frame of video
            try:
                predictions, probabilities = predictor.classifyImage(
                    image_input="video_image5.jpg", result_count=1)

                if (predictions == ['Accident'] or predictions == ['Fire']) and probabilities[0] >= 60:
                    predictions = "Accident"
                    accident = "{:.2f}".format(probabilities[0])
                    #print(accident)
                    tAccidentStat = accident
                    no_accident = "0"

                elif (predictions == ['Sparse_Traffic'] or predictions == ['Dense_Traffic']) and probabilities[0] < 60:
                    predictions = "No Accident"
                    tAccidentStat = "0.0"
                    no_accident = "0"

                else:
                    predictions = "No Accident"
                    tAccidentStat = "0.0"
                    no_accident = "0"

            except:
                None

            # Dumping all the required values in dictionary
            json_dict.update(Id)
            json_dict.update(camera_id)
            json_dict["taccident"] = int(float(tAccidentStat))
            json_dict['noaccident'] = int(no_accident)
            json_dict["tAccidentStatus"] = int(float(tAccidentStat))
            json_dict["tAccident_percent"] = int(float(tAccidentStat))
            json_dict["TAframe_timestamp "] = int(frame_stamp)
            json_dict["tAvideo_Id"] = int(video_id)

            # Appending the resultant dictionary into list
            json_list.append(deepcopy(json_dict))

        else:
            break

    cap.release()
    cv2.destroyAllWindows()

    # Converting list of dictionary into json
    json_list_final = []
    for i in range(0, len(json_list), int(fps1)):
        k = json_list[i]
        json_list_final.append(k)
    #print(json_list_final)
    return json_list_final
