import get_processes

x = get_processes.process_dict
for pid in x:
    print(x[pid])