import json
import os

class DummyDB:

   def __init__(self, filename):

      self.filename = filename

      if not os.path.isfile(filename):

         with open(self.filename, 'w') as f:

            json.dump([], f)


   def saveRecord(self, record):

      all = self.readAllRecords()

      all.append(record)

      with open(self.filename, 'w') as f:

         json.dump(all, f)


   def readAllRecords(self):

      with open(self.filename, 'r') as f:

         return json.load(f)