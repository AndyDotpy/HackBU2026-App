import os
import signal

signal_dict = {
    'SIGTERM': signal.SIGTERM,
    'SIGINT': signal.SIGINT,
}

def send_signal(pid, sig):
    try:
        os.kill(pid, signal_dict[sig])
    except KeyError:
        print("Error: invalid signal")
        return False
    except OSError:
        print("Error: pid does not exist")
        return False
    else:
        return True
'''
Description:
    Sends a signal to an OS given a process ID and signal. Currently supports SIGTERM, SIGINT.
Args:
    pid (int): the process ID
    sig (string): the signal
Return:
    True for success
    False for failure
'''

# send_signal(27656, "SIGTERM")