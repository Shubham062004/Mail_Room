from pymongo import MongoClient
from datetime import datetime, timedelta
import random

# Sample data
vendor_data = [
    {
        "name": "Laxmi Narayan",
        "website_url": "https://meet.google.com",
        "email": "raturianiket@gmail.com",
        "phone": "9315485935",
        "spoc_person": "Mukul",
        "address_line1": "123 Main St",
        "address_line2": "Suite 100",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pin_code": "400001",
        "nutrition_info": "Organic products",
        "calories": "N/A",
        "protein": "High",
        "packaging_type": "Eco-friendly",
        "dimensions": "10x10x5",
        "weight": "2kg"
    },
    {
        "name": "Himesh",
        "website_url": "http://meet.google.com",
        "email": "malad@gmail.com",
        "phone": "9315485678",
        "spoc_person": "Ramesh",
        "address_line1": "456 Park Ave",
        "address_line2": "",
        "city": "Delhi",
        "state": "Delhi",
        "pin_code": "110001",
        "nutrition_info": "Fresh produce",
        "calories": "Low",
        "protein": "Medium",
        "packaging_type": "Standard",
        "dimensions": "15x15x10",
        "weight": "5kg"
    },
    {
        "name": "Silverline Electric",
        "website_url": "https://www.youtube.com",
        "email": "mumbai@gmail.com",
        "phone": "9315485955",
        "spoc_person": "Sunya",
        "address_line1": "789 Tech Park",
        "address_line2": "Building B",
        "city": "Bangalore",
        "state": "Karnataka",
        "pin_code": "560001",
        "nutrition_info": "N/A",
        "calories": "N/A",
        "protein": "N/A",
        "packaging_type": "Heavy-duty",
        "dimensions": "20x20x15",
        "weight": "10kg"
    },
    {
        "name": "Express Logistics",
        "website_url": "https://expresslogistics.com",
        "email": "info@expresslogistics.com",
        "phone": "9876543210",
        "spoc_person": "Rahul",
        "address_line1": "101 Delivery Lane",
        "address_line2": "Floor 3",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "pin_code": "600001",
        "nutrition_info": "N/A",
        "calories": "N/A",
        "protein": "N/A",
        "packaging_type": "Premium",
        "dimensions": "Various",
        "weight": "Various"
    }
]

# Package types
package_types = ["Express", "Standard", "Classified", "DOC"]

# Recipients
recipients = ["Rama", "Aman", "Nirmala", "Asagar", "Sagar", "Munni", "Rajesh", "Priya", "Vikram", "Sunita"]

# Entities
entities = ["Rise", "Bhukad", "External", "High", "Amazon", "Nuani", "Internal", "Priority"]

def random_date(start_date, end_date):
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    return start_date + timedelta(days=random_number_of_days)

def seed_database():
    # Connect to MongoDB
    client = MongoClient('mongodb://localhost:27017/')
    db = client['logistics_db']
    
    # Clear existing data
    db.vendors.delete_many({})
    db.inbound_packages.delete_many({})
    db.outbound_packages.delete_many({})
    
    # Add vendors
    vendors = []
    for vendor_info in vendor_data:
        start_date = random_date(datetime.now(), datetime.now() + timedelta(days=365))
        end_date = start_date + timedelta(days=365)
        
        vendor = {
            "name": vendor_info["name"],
            "website_url": vendor_info["website_url"],
            "email": vendor_info["email"],
            "phone": vendor_info["phone"],
            "spoc_person": vendor_info["spoc_person"],
            "agreement_start": start_date,
            "agreement_end": end_date,
            "address_line1": vendor_info["address_line1"],
            "address_line2": vendor_info["address_line2"],
            "city": vendor_info["city"],
            "state": vendor_info["state"],
            "pin_code": vendor_info["pin_code"],
            "nutrition_info": vendor_info["nutrition_info"],
            "calories": vendor_info["calories"],
            "protein": vendor_info["protein"],
            "packaging_type": vendor_info["packaging_type"],
            "dimensions": vendor_info["dimensions"],
            "weight": vendor_info["weight"]
        }
        vendor_id = db.vendors.insert_one(vendor).inserted_id
        vendors.append({"_id": vendor_id, **vendor})
    
    # Add inbound packages
    for i in range(10):
        vendor = random.choice(vendors)
        receiving_date = random_date(datetime.now() - timedelta(days=30), datetime.now() + timedelta(days=30))
        collected_on = receiving_date + timedelta(days=random.randint(1, 5))
        
        inbound = {
            "vendor_id": vendor["_id"],
            "recipient": random.choice(recipients),
            "sender": random.choice(recipients),
            "mobile": f"98{random.randint(10000000, 99999999)}",
            "awb_number": f"AW{random.randint(0, 9)}-{random.randint(10000000, 99999999)}",
            "company": f"{random.choice(['ABC', 'XYZ', 'PQR'])} {random.choice(['Corp', 'Ltd', 'Inc'])}",
            "address_line1": f"{random.randint(100, 999)} {random.choice(['Main St', 'Park Ave', 'Broadway'])}",
            "address_line2": f"Suite {random.randint(100, 999)}" if random.choice([True, False]) else "",
            "state": random.choice(["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu"]),
            "city": random.choice(["Mumbai", "New Delhi", "Bangalore", "Chennai"]),
            "pin_code": f"{random.randint(100000, 999999)}",
            "unit": str(random.choice([10, 100, 200, 500])),
            "department_id": f"D{random.randint(100, 999)}",
            "collected_on": collected_on,
            "entity": random.choice(entities),
            "package_type": random.choice(package_types),
            "receiving_date": receiving_date,
            "nutrition_info": random.choice(["Perishable goods", "Dry goods", "N/A"]),
            "calories": random.choice(["High", "Low", "N/A"]),
            "protein": random.choice(["High", "Medium", "Low", "N/A"]),
            "packaging_type": random.choice(["Standard", "Insulated", "Heavy-duty"]),
            "dimensions": f"{random.randint(10, 20)}x{random.randint(10, 20)}x{random.randint(5, 15)}",
            "weight": f"{random.randint(1, 10)}kg"
        }
        db.inbound_packages.insert_one(inbound)
    
    # Add outbound packages
    for i in range(10):
        vendor = random.choice(vendors)
        sending_date = random_date(datetime.now(), datetime.now() + timedelta(days=30))
        
        outbound = {
            "vendor_id": vendor["_id"],
            "recipient": random.choice(recipients),
            "sender": random.choice(recipients),
            "phone_no": f"92{random.randint(10000000, 99999999)}",
            "package_type": random.choice(package_types),
            "unit": str(random.choice([10, 100, 200, 500])),
            "department": f"D{random.randint(100, 999)}",
            "entity": random.choice(entities),
            "address_line1": f"{random.randint(100, 999)} {random.choice(['Main St', 'Park Ave', 'Broadway'])}",
            "address_line2": f"Suite {random.randint(100, 999)}" if random.choice([True, False]) else "",
            "state": random.choice(["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu"]),
            "city": random.choice(["Mumbai", "New Delhi", "Bangalore", "Chennai"]),
            "pin_code": f"{random.randint(100000, 999999)}",
            "sending_date": sending_date,
            "nutrition_info": random.choice(["Perishable goods", "Dry goods", "N/A"]),
            "calories": random.choice(["High", "Low", "N/A"]),
            "protein": random.choice(["High", "Medium", "Low", "N/A"]),
            "packaging_type": random.choice(["Standard", "Insulated", "Heavy-duty"]),
            "dimensions": f"{random.randint(10, 20)}x{random.randint(10, 20)}x{random.randint(5, 15)}",
            "weight": f"{random.randint(1, 10)}kg"
        }
        db.outbound_packages.insert_one(outbound)
    
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()