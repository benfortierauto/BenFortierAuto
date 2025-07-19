from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os
import logging

logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
contact_submissions = db.contact_submissions
car_inquiries = db.car_inquiries
testimonials = db.testimonials
vehicles = db.vehicles

async def init_database():
    """Initialize database with indexes and seed data"""
    try:
        # Create indexes
        await contact_submissions.create_index([("submitted_at", -1)])
        await contact_submissions.create_index([("status", 1)])
        
        await car_inquiries.create_index([("submitted_at", -1)])
        await car_inquiries.create_index([("status", 1)])
        await car_inquiries.create_index([("car_id", 1)])
        
        await testimonials.create_index([("is_approved", 1)])
        await testimonials.create_index([("created_at", -1)])
        
        await vehicles.create_index([("category", 1)])
        await vehicles.create_index([("is_available", 1)])
        await vehicles.create_index([("is_featured", 1)])
        await vehicles.create_index([("brand", 1)])
        await vehicles.create_index([("year", -1)])
        
        logger.info("Database indexes created successfully")
        
        # Seed initial data if collections are empty
        await seed_initial_data()
        
    except Exception as e:
        logger.error(f"Error initializing database: {e}")

async def seed_initial_data():
    """Seed database with initial mock data"""
    try:
        # Seed testimonials if empty
        if await testimonials.count_documents({}) == 0:
            testimonials_data = [
                {
                    "id": "test-1",
                    "name": "Sarah L.",
                    "email": "sarah.l@example.com",
                    "image": "https://images.unsplash.com/photo-1494790108755-2616b152c5d6?w=200&h=200&fit=crop&crop=face",
                    "rating": 5,
                    "quote": "Working with Ben was a game-changer. He listened to my needs and found the exact car I wanted without any pressure. Highly recommend!",
                    "car_purchased": "2024 BMW X5",
                    "is_approved": True,
                    "created_at": datetime.utcnow(),
                    "approved_at": datetime.utcnow()
                },
                {
                    "id": "test-2",
                    "name": "Mark T.",
                    "email": "mark.t@example.com",
                    "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
                    "rating": 5,
                    "quote": "The process was incredibly smooth from start to finish. Ben is knowledgeable, professional, and genuinely cares about his customers.",
                    "car_purchased": "2023 Mercedes C-Class",
                    "is_approved": True,
                    "created_at": datetime.utcnow(),
                    "approved_at": datetime.utcnow()
                },
                {
                    "id": "test-3",
                    "name": "Jessica R.",
                    "email": "jessica.r@example.com",
                    "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
                    "rating": 5,
                    "quote": "I've bought several cars over the years, and this was by far the best experience. Transparent pricing and excellent follow-up.",
                    "car_purchased": "2024 Audi Q7",
                    "is_approved": True,
                    "created_at": datetime.utcnow(),
                    "approved_at": datetime.utcnow()
                },
                {
                    "id": "test-4",
                    "name": "David M.",
                    "email": "david.m@example.com",
                    "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
                    "rating": 5,
                    "quote": "Ben made car buying stress-free. His expertise and honest approach helped me make the right decision with confidence.",
                    "car_purchased": "2024 Porsche 911",
                    "is_approved": True,
                    "created_at": datetime.utcnow(),
                    "approved_at": datetime.utcnow()
                },
                {
                    "id": "test-5",
                    "name": "Lisa K.",
                    "email": "lisa.k@example.com",
                    "image": "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face",
                    "rating": 5,
                    "quote": "Exceptional service from start to finish. Ben went above and beyond to ensure I got exactly what I was looking for.",
                    "car_purchased": "2023 Lexus RX",
                    "is_approved": True,
                    "created_at": datetime.utcnow(),
                    "approved_at": datetime.utcnow()
                }
            ]
            await testimonials.insert_many(testimonials_data)
            logger.info("Testimonials seeded successfully")
        
        # Seed vehicles if empty
        if await vehicles.count_documents({}) == 0:
            vehicles_data = [
                # New Cars
                {
                    "id": "new-1",
                    "year": 2025,
                    "brand": "Mercedes-Benz",
                    "model": "S-Class",
                    "type": "Luxury Sedan",
                    "category": "new",
                    "image_url": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop",
                    "features": "Cutting-edge technology, unparalleled comfort, dynamic performance",
                    "price": "Starting at $115,000",
                    "description": "Experience the pinnacle of luxury with the 2025 Mercedes-Benz S-Class, featuring advanced driver assistance and premium amenities.",
                    "is_available": True,
                    "is_featured": True,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                },
                {
                    "id": "new-2",
                    "year": 2025,
                    "brand": "BMW",
                    "model": "iX",
                    "type": "Electric SUV",
                    "category": "new",
                    "image_url": "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=400&fit=crop",
                    "features": "Zero emissions, spacious interior, advanced safety suite",
                    "price": "Starting at $87,500",
                    "description": "The future of sustainable luxury driving with the BMW iX, combining electric performance with premium comfort.",
                    "is_available": True,
                    "is_featured": True,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                },
                {
                    "id": "new-3",
                    "year": 2025,
                    "brand": "Porsche",
                    "model": "911 Turbo",
                    "type": "Sports Coupe",
                    "category": "new",
                    "image_url": "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=600&h=400&fit=crop",
                    "features": "Exhilarating speed, precision handling, iconic design",
                    "price": "Starting at $174,300",
                    "description": "Unleash pure performance with the legendary Porsche 911 Turbo, engineered for driving enthusiasts.",
                    "is_available": True,
                    "is_featured": False,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                },
                {
                    "id": "new-4",
                    "year": 2025,
                    "brand": "Audi",
                    "model": "A8",
                    "type": "Executive Sedan",
                    "category": "new",
                    "image_url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
                    "features": "Advanced quattro all-wheel drive, premium materials, innovative technology",
                    "price": "Starting at $96,500",
                    "description": "Sophisticated luxury meets cutting-edge innovation in the 2025 Audi A8.",
                    "is_available": True,
                    "is_featured": False,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                },
                # Used Cars
                {
                    "id": "used-1",
                    "year": 2022,
                    "brand": "BMW",
                    "model": "5 Series",
                    "type": "Premium Sedan",
                    "category": "used",
                    "image_url": "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
                    "mileage": "35,000 km",
                    "features": "One owner, full service history, luxurious interior",
                    "price": "$52,900",
                    "description": "Meticulously maintained BMW 5 Series with complete service records and premium features.",
                    "is_available": True,
                    "is_featured": True,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                },
                {
                    "id": "used-2",
                    "year": 2021,
                    "brand": "Audi",
                    "model": "Q5",
                    "type": "Compact SUV",
                    "category": "used",
                    "image_url": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop",
                    "mileage": "50,000 km",
                    "features": "Fuel-efficient, versatile, perfect for city driving",
                    "price": "$41,500",
                    "description": "Reliable and efficient Audi Q5, ideal for both urban commuting and weekend adventures.",
                    "is_available": True,
                    "is_featured": False,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                },
                {
                    "id": "used-3",
                    "year": 2020,
                    "brand": "Mercedes-Benz",
                    "model": "C 43 AMG",
                    "type": "Performance Sedan",
                    "category": "used",
                    "image_url": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
                    "mileage": "28,000 km",
                    "features": "Certified pre-owned, sport package, pristine condition",
                    "price": "$48,750",
                    "description": "Certified pre-owned AMG with sport package, delivering performance and luxury in perfect harmony.",
                    "is_available": True,
                    "is_featured": True,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                },
                {
                    "id": "used-4",
                    "year": 2021,
                    "brand": "Lexus",
                    "model": "RX 350",
                    "type": "Luxury SUV",
                    "category": "used",
                    "image_url": "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&h=400&fit=crop",
                    "mileage": "42,000 km",
                    "features": "Hybrid efficiency, premium interior, advanced safety features",
                    "price": "$45,200",
                    "description": "Premium Lexus RX 350 combining luxury comfort with exceptional reliability and fuel efficiency.",
                    "is_available": True,
                    "is_featured": False,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                }
            ]
            await vehicles.insert_many(vehicles_data)
            logger.info("Vehicles seeded successfully")
            
    except Exception as e:
        logger.error(f"Error seeding initial data: {e}")

async def close_db_connection():
    """Close database connection"""
    client.close()