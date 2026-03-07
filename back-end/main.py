import GetProcesses
from fastapi import FastAPI


app = FastAPI()

x = GetProcesses.process_dict



@app.get("/processes")
def get_processes():
    processes = []
    return {"message": x}


