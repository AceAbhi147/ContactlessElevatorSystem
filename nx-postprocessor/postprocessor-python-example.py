import csv
import os
import sys
import socket
import signal
import csv

# Add the sclbl-utilities python utilities
script_location = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.join(script_location, "../sclbl-utilities/python-utilities"))
import communication_utils

# The name of the postprocessor.
# This is used to match the definition of the postprocessor with routing.
Postprocessor_Name = "Python-Example-Postprocessor"

# The socket this postprocessor will listen on.
# This is always given as the first argument when the process is started
# But it can be manually defined as well, as long as it is the same as the socket path in the runtime settings
Postprocessor_Socket_Path = "/tmp/python-example-postprocessor.sock"

item_to_data = {
    "person": [3, 7],
    "potted plant": [1, 10],
    "chair": [3, 9],
    "refrigerator": [2, 7],
    "microwave": [7, 10]
}

# Data Types
# 1:  //FLOAT
# 2:  //UINT8
# 3:  //INT8
# 4:  //UINT16
# 5:  //INT16
# 6:  //INT32
# 7:  //INT64
# 8:  //STRING
# 9:  //BOOL
# 11: //DOUBLE
# 12: //UINT32
# 13: //UINT64

csv_filepath = '/mnt/c/Abhishek/Nx/ContactlessElevatorSystem/resources/analytics.csv'

def main():
    # Start socket listener to receive messages from NXAI runtime
    server = communication_utils.startUnixSocketServer(Postprocessor_Socket_Path)
    # Wait for messages in a loop
    while True:
        # Wait for input message from runtime
        try:
            input_message, connection = communication_utils.waitForSocketMessage(server)
        except socket.timeout:
            # Request timed out. Continue waiting
            continue

        print("EXAMPLE PLUGIN: Received input message: ", input_message)

        # Parse input message
        input_object = communication_utils.parseInferenceResults(input_message)

        print("Unpacked ", input_object)

        create_CSV_File(input_object)

        print("Packing ", input_object)

        # Write object back to string
        output_message = communication_utils.writeInferenceResults(input_object)

        # Send message back to runtime
        communication_utils.sendMessageOverConnection(connection, output_message)


def create_CSV_File(input_object):
    timestamp = input_object["Timestamp"]
    data = []
    for obj in input_object["BBoxes_xyxy"]:
        if obj in item_to_data:
            data.append({
                "Timestamp": timestamp,
                "Source Floor": item_to_data[obj][0],
                "Destination Floor": item_to_data[obj][1]
            })

        print("Data created " + str(data))
        try:
            file_exists = os.path.isfile(csv_filepath)

            with open(csv_filepath, 'a', newline='') as csvfile:
                csv_writer = csv.DictWriter(csvfile, fieldnames=["Timestamp", "Source Floor",
                                                                 "Destination Floor"] if data else [])

                if not file_exists:
                    csv_writer.writeheader()
                for row in data:
                    csv_writer.writerow(row)
                csvfile.close()
        except Exception as e:
            print("Error while writing to csv file at location: " + csv_filepath, e)

def signalHandler(sig, _):
    print("EXAMPLE PLUGIN: Received interrupt signal: ", sig)
    sys.exit(0)


if __name__ == "__main__":
    print("EXAMPLE PLUGIN: Input parameters: ", sys.argv)
    # Parse input arguments
    if len(sys.argv) > 1:
        Postprocessor_Socket_Path = sys.argv[1]
    # Handle interrupt signals
    signal.signal(signal.SIGINT, signalHandler)
    # Start program
    main()
