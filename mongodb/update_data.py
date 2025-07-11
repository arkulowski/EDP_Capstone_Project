from faker import Faker
import random
import json

fake = Faker('en_US')
used_ids = set()

# Load original data
with open('EDP_Capstone_Data.json', 'r') as file:
    data = json.load(file)

# Assign fake names, phone numbers, and unique employee IDs
for entry in data:
    entry["firstname"] = fake.first_name()
    entry["lastname"] = fake.last_name()
    
    phone_number = f"({fake.random_int(100, 999)}) {fake.random_int(100, 999)}-{fake.random_int(1000, 9999)}"
    entry["phone_number"] = phone_number

    while True:
        employee_id = random.randint(10000, 99999)
        if employee_id not in used_ids:
            entry["employee_id"] = employee_id
            used_ids.add(employee_id)
            break

# Select 600 unique managers randomly
managers = random.sample(data, 600)
manager_ids = [manager["employee_id"] for manager in managers]

# Assign a manager_id to each non-manager entry
for entry in data:
    # Skip assigning manager_id to those who are already selected as managers
    if entry["employee_id"] not in manager_ids:
        entry["manager_id"] = random.choice(manager_ids)

# Save augmented data
with open('Employees.json', 'w') as file:
    json.dump(data, file, indent=4)
