import get_processes
from fastapi import FastAPI
import time


app = FastAPI()



@app.get("/processes")
def read_processes():
    x = get_processes.get_process_dict()
    return {"message": x}


#class Message(BaseModel):
#    text: str

#@app.post("/send")
#def get_request(msg: str):
    #print("Recieved _" + "_ from frontend")

    #return{
        #"status": "Received!!",
        #"Received": msg.text,
    #}
