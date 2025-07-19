from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timedelta

# Import models and database
from models import (
    ContactSubmission, ContactSubmissionCreate, ContactSubmissionUpdate,
    CarInquiry, CarInquiryCreate, CarInquiryUpdate,
    Testimonial, TestimonialCreate, TestimonialApprove,
    Vehicle, VehicleCreate, VehicleUpdate, VehicleCategory,
    DashboardStats
)
from database import (
    init_database, close_db_connection,
    contact_submissions, car_inquiries, testimonials, vehicles
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="Ben Fortier Car Sales API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Health check
@api_router.get("/")
async def root():
    return {"message": "Ben Fortier Car Sales API", "status": "operational"}

# Contact Endpoints
@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(contact_data: ContactSubmissionCreate):
    """Submit a new contact form"""
    try:
        contact_dict = contact_data.dict()
        contact_obj = ContactSubmission(**contact_dict)
        
        await contact_submissions.insert_one(contact_obj.dict())
        
        logger.info(f"New contact submission from {contact_obj.email}")
        return contact_obj
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contacts(
    status: Optional[str] = None,
    limit: int = Query(50, le=100)
):
    """Get contact submissions (admin endpoint)"""
    try:
        filter_dict = {}
        if status:
            filter_dict["status"] = status
            
        contacts = await contact_submissions.find(filter_dict).sort("submitted_at", -1).limit(limit).to_list(limit)
        return [ContactSubmission(**contact) for contact in contacts]
    except Exception as e:
        logger.error(f"Error retrieving contacts: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve contacts")

@api_router.put("/contact/{contact_id}", response_model=ContactSubmission)
async def update_contact(contact_id: str, update_data: ContactSubmissionUpdate):
    """Update contact status (admin endpoint)"""
    try:
        update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
        
        result = await contact_submissions.find_one_and_update(
            {"id": contact_id},
            {"$set": update_dict},
            return_document=True
        )
        
        if not result:
            raise HTTPException(status_code=404, detail="Contact not found")
            
        return ContactSubmission(**result)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating contact: {e}")
        raise HTTPException(status_code=500, detail="Failed to update contact")

# Car Inquiry Endpoints
@api_router.post("/inquiries", response_model=CarInquiry)
async def submit_inquiry(inquiry_data: CarInquiryCreate):
    """Submit a car inquiry"""
    try:
        inquiry_dict = inquiry_data.dict()
        inquiry_obj = CarInquiry(**inquiry_dict)
        
        await car_inquiries.insert_one(inquiry_obj.dict())
        
        logger.info(f"New car inquiry for {inquiry_obj.car_id} from {inquiry_obj.customer_email}")
        return inquiry_obj
    except Exception as e:
        logger.error(f"Error submitting car inquiry: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit inquiry")

@api_router.get("/inquiries", response_model=List[CarInquiry])
async def get_inquiries(
    status: Optional[str] = None,
    car_id: Optional[str] = None,
    limit: int = Query(50, le=100)
):
    """Get car inquiries (admin endpoint)"""
    try:
        filter_dict = {}
        if status:
            filter_dict["status"] = status
        if car_id:
            filter_dict["car_id"] = car_id
            
        inquiries = await car_inquiries.find(filter_dict).sort("submitted_at", -1).limit(limit).to_list(limit)
        return [CarInquiry(**inquiry) for inquiry in inquiries]
    except Exception as e:
        logger.error(f"Error retrieving inquiries: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve inquiries")

# Testimonial Endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(approved_only: bool = True):
    """Get testimonials (public endpoint)"""
    try:
        filter_dict = {"is_approved": True} if approved_only else {}
        testimonials_list = await testimonials.find(filter_dict).sort("created_at", -1).to_list(100)
        return [Testimonial(**testimonial) for testimonial in testimonials_list]
    except Exception as e:
        logger.error(f"Error retrieving testimonials: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve testimonials")

@api_router.post("/testimonials", response_model=Testimonial)
async def submit_testimonial(testimonial_data: TestimonialCreate):
    """Submit a new testimonial"""
    try:
        testimonial_dict = testimonial_data.dict()
        testimonial_obj = Testimonial(**testimonial_dict)
        
        await testimonials.insert_one(testimonial_obj.dict())
        
        logger.info(f"New testimonial submitted by {testimonial_obj.email}")
        return testimonial_obj
    except Exception as e:
        logger.error(f"Error submitting testimonial: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit testimonial")

@api_router.put("/testimonials/{testimonial_id}/approve", response_model=Testimonial)
async def approve_testimonial(testimonial_id: str, approval_data: TestimonialApprove):
    """Approve/disapprove testimonial (admin endpoint)"""
    try:
        update_dict = {"is_approved": approval_data.is_approved}
        if approval_data.is_approved:
            update_dict["approved_at"] = datetime.utcnow()
        
        result = await testimonials.find_one_and_update(
            {"id": testimonial_id},
            {"$set": update_dict},
            return_document=True
        )
        
        if not result:
            raise HTTPException(status_code=404, detail="Testimonial not found")
            
        return Testimonial(**result)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating testimonial: {e}")
        raise HTTPException(status_code=500, detail="Failed to update testimonial")

# Vehicle Endpoints
@api_router.get("/vehicles", response_model=List[Vehicle])
async def get_vehicles(
    category: Optional[VehicleCategory] = None,
    available_only: bool = True,
    featured_only: bool = False,
    limit: int = Query(50, le=100)
):
    """Get vehicles"""
    try:
        filter_dict = {}
        if category:
            filter_dict["category"] = category.value
        if available_only:
            filter_dict["is_available"] = True
        if featured_only:
            filter_dict["is_featured"] = True
            
        vehicles_list = await vehicles.find(filter_dict).sort("created_at", -1).limit(limit).to_list(limit)
        return [Vehicle(**vehicle) for vehicle in vehicles_list]
    except Exception as e:
        logger.error(f"Error retrieving vehicles: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve vehicles")

@api_router.get("/vehicles/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: str):
    """Get specific vehicle"""
    try:
        vehicle = await vehicles.find_one({"id": vehicle_id})
        if not vehicle:
            raise HTTPException(status_code=404, detail="Vehicle not found")
        return Vehicle(**vehicle)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving vehicle: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve vehicle")

@api_router.post("/vehicles", response_model=Vehicle)
async def create_vehicle(vehicle_data: VehicleCreate):
    """Create new vehicle (admin endpoint)"""
    try:
        vehicle_dict = vehicle_data.dict()
        vehicle_obj = Vehicle(**vehicle_dict)
        
        await vehicles.insert_one(vehicle_obj.dict())
        
        logger.info(f"New vehicle created: {vehicle_obj.year} {vehicle_obj.brand} {vehicle_obj.model}")
        return vehicle_obj
    except Exception as e:
        logger.error(f"Error creating vehicle: {e}")
        raise HTTPException(status_code=500, detail="Failed to create vehicle")

# Dashboard Stats
@api_router.get("/dashboard/stats", response_model=DashboardStats)
async def get_dashboard_stats():
    """Get dashboard statistics (admin endpoint)"""
    try:
        today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        
        total_contacts = await contact_submissions.count_documents({})
        total_inquiries = await car_inquiries.count_documents({})
        total_testimonials = await testimonials.count_documents({"is_approved": True})
        total_vehicles = await vehicles.count_documents({"is_available": True})
        pending_testimonials = await testimonials.count_documents({"is_approved": False})
        new_contacts_today = await contact_submissions.count_documents({"submitted_at": {"$gte": today}})
        new_inquiries_today = await car_inquiries.count_documents({"submitted_at": {"$gte": today}})
        
        return DashboardStats(
            total_contacts=total_contacts,
            total_inquiries=total_inquiries,
            total_testimonials=total_testimonials,
            total_vehicles=total_vehicles,
            pending_testimonials=pending_testimonials,
            new_contacts_today=new_contacts_today,
            new_inquiries_today=new_inquiries_today
        )
    except Exception as e:
        logger.error(f"Error retrieving dashboard stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve dashboard stats")

# Include the router in the main app
app.include_router(api_router)

# Startup and shutdown events
@app.on_event("startup")
async def startup_event():
    await init_database()
    logger.info("Ben Fortier Car Sales API started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    await close_db_connection()
    logger.info("Database connection closed")