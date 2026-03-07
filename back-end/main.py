import get_processes
from fastapi import FastAPI


app = FastAPI()

x = get_processes.process_dict



@app.get("/processes")
def get_processes():
    processes = []
    return {"message": x}


