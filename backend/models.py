from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid
from enum import Enum

# Enums
class ContactStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    CLOSED = "closed"

class InquiryStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    SCHEDULED = "scheduled"
    CLOSED = "closed"

class InquiryType(str, Enum):
    DETAILS = "details"
    TEST_DRIVE = "test_drive"
    PURCHASE = "purchase"

class VehicleCategory(str, Enum):
    NEW = "new"
    USED = "used"

# Contact Models
class ContactSubmissionCreate(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    message: str = Field(..., min_length=1, max_length=2000)

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: str
    phone: Optional[str] = None
    message: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: ContactStatus = ContactStatus.NEW
    notes: Optional[str] = None

class ContactSubmissionUpdate(BaseModel):
    status: Optional[ContactStatus] = None
    notes: Optional[str] = None

# Car Inquiry Models
class CarInquiryCreate(BaseModel):
    car_id: str
    car_type: VehicleCategory
    customer_name: str = Field(..., min_length=1, max_length=100)
    customer_email: EmailStr
    customer_phone: Optional[str] = Field(None, max_length=20)
    inquiry_type: InquiryType
    message: Optional[str] = Field(None, max_length=1000)

class CarInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    car_id: str
    car_type: VehicleCategory
    customer_name: str
    customer_email: str
    customer_phone: Optional[str] = None
    inquiry_type: InquiryType
    message: Optional[str] = None
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: InquiryStatus = InquiryStatus.NEW

class CarInquiryUpdate(BaseModel):
    status: Optional[InquiryStatus] = None

# Testimonial Models
class TestimonialCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    image_url: Optional[str] = None
    rating: int = Field(..., ge=1, le=5)
    quote: str = Field(..., min_length=10, max_length=1000)
    car_purchased: Optional[str] = Field(None, max_length=100)
    purchase_date: Optional[datetime] = None

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    image_url: Optional[str] = None
    rating: int
    quote: str
    car_purchased: Optional[str] = None
    purchase_date: Optional[datetime] = None
    is_approved: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    approved_at: Optional[datetime] = None

class TestimonialApprove(BaseModel):
    is_approved: bool

# Vehicle Models
class VehicleCreate(BaseModel):
    year: int = Field(..., ge=1990, le=2030)
    brand: str = Field(..., min_length=1, max_length=50)
    model: str = Field(..., min_length=1, max_length=50)
    type: str = Field(..., max_length=50)  # sedan, suv, coupe, etc.
    category: VehicleCategory
    image_url: str
    features: str = Field(..., max_length=500)
    description: str = Field(..., max_length=1000)
    price: str = Field(..., max_length=50)
    mileage: Optional[str] = Field(None, max_length=20)  # for used cars
    is_featured: bool = False

class Vehicle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    year: int
    brand: str
    model: str
    type: str
    category: VehicleCategory
    image_url: str
    features: str
    description: str
    price: str
    mileage: Optional[str] = None
    is_available: bool = True
    is_featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class VehicleUpdate(BaseModel):
    year: Optional[int] = Field(None, ge=1990, le=2030)
    brand: Optional[str] = Field(None, min_length=1, max_length=50)
    model: Optional[str] = Field(None, min_length=1, max_length=50)
    type: Optional[str] = Field(None, max_length=50)
    category: Optional[VehicleCategory] = None
    image_url: Optional[str] = None
    features: Optional[str] = Field(None, max_length=500)
    description: Optional[str] = Field(None, max_length=1000)
    price: Optional[str] = Field(None, max_length=50)
    mileage: Optional[str] = Field(None, max_length=20)
    is_available: Optional[bool] = None
    is_featured: Optional[bool] = None

# Dashboard Models
class DashboardStats(BaseModel):
    total_contacts: int
    total_inquiries: int
    total_testimonials: int
    total_vehicles: int
    pending_testimonials: int
    new_contacts_today: int
    new_inquiries_today: int