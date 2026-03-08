import get_processes
from fastapi import FastAPI, HTTPException
import send_sig
import psutil
import time


app = FastAPI()



@app.get("/processes")
def read_processes():
    x = get_processes.get_process_dict()
    return {"message": x}


@app.post("/kill/{pid}")
def kill_process(pid: int):
    try:
        send_sig.send_signal(pid, "SIGTERM")
        return {"status": "success", "pid": pid}

    except psutil.NoSuchProcess:
        raise HTTPException(status_code=404, detail="Process not found")

    except psutil.AccessDenied:
        raise HTTPException(status_code=403, detail="Permission denied")
