import os
import signal

def end_process(pid, sig):
    try:
        match sig:
            case "SIGTERM":
                os.kill(pid, signal.SIGTERM)
            case "SIGKILL":
                os.kill(pid, signal.SIGKILL)
            case _:
                print("Error: Invalid signal")
                return False
    except OSError:
        print("Error: pid not found")
        return False
    else:
        return True
'''
Description:
    Either kills or terminates a process given a process ID and signal
Args:
    pid (int): the process ID
    sig (string): the signal
Return:
    True for success
    False for failure
'''

end_process(320948329, "SIG")