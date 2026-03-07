import psutil
from fastapi import FastAPI


app = FastAPI()


@app.get("/hello")
def say_hello():
    return {"message": "Hello from the backend!"}


