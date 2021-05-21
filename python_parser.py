import sys
import csv
import json


# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):

    # create a dictionary
    data = {}

    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)

        # Convert each row into a dictionary and add it to data
        for row in csvReader:

            # If 'Date' column exists
            if ('Date' in row and 'Time' in row):
                # Drop number of seconds
                time = ':'.join(row['Time'].split(':')[:2])
                row['Time'] = time
                # This filter doesn't seem to be needed
                # split_date = row['Date'].split('/')
                # if len(split_date) < 3 or split_date[2] < '2021':
                #     continue
                # Create key
                key = row['Date'] + ", " + time
                data[key] = row

            # If no 'Date' then checks for 'Datetime'
            elif ('Datetime' in row):
                split_datetime = row['Datetime'].split(' ')
                # Reorder date to match dd/mm/yyyy format
                split_date = split_datetime[0].split('/')
                date = '/'.join(split_date[::-1])
                # Drop number of seconds
                time = ':'.join(split_datetime[1].split(':')[:2])
                # This filter doesn't seem to be needed
                # if len(split_date) < 3 or split_date[2] < '2021':
                #     continue
                # Create key
                key = date + ", " + time
                # Add new date and time fields
                row['Date'] = date
                row['Time'] = time
                data[key] = row

            else:
                print('No Date or Datetime column found')
                return

    # Open a json writer, and use the json.dumps() function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))


if __name__ == '__main__':

    if len(sys.argv) != 3:
        print('Input csv and json filenames as arguments')
        print('Ex: python_parser.py file.csv file.json')

    else:
        # Set file paths (note assumed target directories)
        csvFilePath = f'./data/csv/{sys.argv[1]}'
        jsonFilePath = f'./data/{sys.argv[2]}'

        # Call the make_json function
        make_json(csvFilePath, jsonFilePath)
