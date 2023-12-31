# Class Information Extractor

Extracts timetable information for a subject from the FPT University Academic Portal.

## Installation

[Install this script](https://github.com/iamSlightlyWind/classInformationExtractor/raw/csv_extractor/script.user.js) using [TamperMonkey](https://www.tampermonkey.net/) or any compatible user script manager.

1. Select a class to move out on [FAP/Move out class](https://fap.fpt.edu.vn/FrontOffice/Courses.aspx).
2. Choose the first class in the class list.
3. The script will iterate through all classes, and once it reaches the last class, a CSV file containing the timetable for each class will be downloaded.

## Usage Example
The CSV file can be oppened with Microsoft Excel, Google Sheet or any alternative.
 
Here is a sample timetable and how to interpret it:
```
ClassName | Day/Slot | Day/Slot

SE1806 | Tue1 | Thu2
```
## Disclaimer

- FPT is a registered trademark of FPT Corporation.
- Due to the nature of FAP, it is not possible to retrieve a full list of all classes, only those with available slot(s) in that specific subject. Additionally, it is not possible to determine the number of available slots.
