import psutil
import time

def get_process_dict():
    current_time = time.time()
    process_dict = dict()

    for proc in psutil.process_iter(['pid', 'name', 'create_time', 'memory_info', 'memory_percent', 'cpu_percent']):
        try:
            proc_dict = proc.info

            #uptime takes max of the two, in case uptime rounds down to 0
            uptime = max(current_time - proc_dict['create_time'], 0.001)

            physical_mem = proc.memory_info().rss
            proc_dict['physical_mem'] = physical_mem

            try:
                # get bytes per second, used in severity_score()
                io = proc.io_counters()
                bytes_per_second = (io.read_bytes + io.write_bytes) / uptime
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.TimeoutExpired, psutil.Error, ZeroDivisionError, AttributeError):
                bytes_per_second = 0

            cpu = proc_dict['cpu_percent'] or 0
            memory = proc_dict['memory_percent'] or 0


            severity = severity_score(cpu, memory, bytes_per_second)

            # add uptime and severity, then add to dictionary
            proc_dict['uptime'] = uptime
            proc_dict['severity'] = severity
            process_dict[proc_dict['pid']] = proc_dict
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.TimeoutExpired, psutil.Error):
            pass
    return process_dict
'''
Description:
    Gets the current running processes as dictionaries, adds 'uptime' and 'severity' attributes to them, then stores them in 
    a separate dictionary of processes with pids as keys. Finally, it returns that dictionary. 
    
    As of writing, each process has: pid, name, create_time (since epoch, seconds), memory_info 
    (which is a tuple, bytes), cpu_percent (cpu utilisation in %), uptime (current_time - create_time, seconds), and 
    severity (calculated in severity_score()).
      
    Note that memory_info is a tuple containing rss, the Resident Set Size (Physical), and the vms, the Virtual Memory Size.
Args:
    None
Return:
    Dictionary of current running processes
'''

def severity_score(c, m, b):
    # cpu, memory, bytes per second normalized
    cpu = c / 100
    memory = m / 100
    bps = min(b / 10000000, 1)

    # weighted score
    score = cpu*0.35 + memory*0.45 + bps*0.2
    return score
'''
Description:
    Outputs a severity score based on CPU Utilisation, memory utilisation ,and bytes per second.
Args:
    c (float): process's cpu utilisation percentage
    m (float): process's memory utilisation percentage
    b (float): process's bytes per second
Return:
    score (float)
'''







