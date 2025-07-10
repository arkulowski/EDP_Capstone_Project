from faker import Faker
import random
import json

fake = Faker('en_US')
used_ids = set()

with open('EDP_Capstone_Data.json', 'r') as file:
    data = json.load(file)

for entry in data:
    entry["firstname"] = fake.first_name() 
    entry["lastname"] = fake.last_name()
    
    
    phone_number = f"({fake.random_int(100, 999)}) {fake.random_int(100, 999)}-{fake.random_int(1000, 9999)}"
    entry["phone_number"] = phone_number

    while True:
        employee_id = random.randint(10000, 99999) 
        if employee_id not in used_ids:
            entry['employee_id'] = employee_id
            used_ids.add(employee_id)
            break

with open('Augmented_EDP_Data.json', 'w') as file:
    json.dump(data, file, indent=4)
