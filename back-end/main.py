import get_processes
from fastapi import FastAPI


app = FastAPI()

x = GetProcesses.process_dict



@app.get("/hello")
def get_processes():
    processes = []
    return {"message": x,
            }


