import psutil
import time

def get_process_dict():
    current_time = time.time()

    process_dict = dict()
    for proc in psutil.process_iter():
        temp_proc = proc.as_dict(attrs=['pid', 'name', 'create_time', 'memory_info', 'cpu_percent'])
        uptime = current_time - temp_proc['create_time']
        temp_proc.update({'uptime': uptime})
        process_dict.update({proc.pid: temp_proc})
    return process_dict
'''
Description:
    Gets the current running processes as a dictionary, adds an 'uptime' key to them, then stores them in a separate
    dictionary of processes with pids as keys. Finally, it returns that dictionary. 
    
    As of writing, each process has keys of: pid, name, create_time (since epoch, seconds), memory_info 
    (which is a tuple, bytes), cpu_percent (cpu utilisation in %), uptime (current_time - create_time, seconds).
      
    Note that memory_info is a tuple containing rss, the Resident Set Size (Physical), and the vms, the Virtual Memory Size.
Args:
    None
Returns:
    Dictionary of current running processes
'''






