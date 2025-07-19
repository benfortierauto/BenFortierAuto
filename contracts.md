# Backend Integration Contracts - Ben Fortier Car Sales Website

## Overview
This document outlines the API contracts, data models, and integration points needed to transform the frontend mock implementation into a fully functional full-stack application.

## Current Mock Data (frontend/src/data/mock.js)
- `testimonials` - Customer reviews and testimonials
- `newCars` - New vehicle inventory
- `usedCars` - Used vehicle inventory  
- `contactInfo` - Business contact information
- `aboutInfo` - Personal information about Ben Fortier

## Required Data Models

### 1. ContactSubmission
```python
{
  "id": str (auto-generated),
  "full_name": str,
  "email": str,
  "phone": str (optional),
  "message": str,
  "submitted_at": datetime,
  "status": str (new, contacted, closed),
  "notes": str (optional, for follow-up)
}
```

### 2. CarInquiry
```python
{
  "id": str (auto-generated),
  "car_id": str,
  "car_type": str (new/used),
  "customer_name": str,
  "customer_email": str,
  "customer_phone": str (optional),
  "inquiry_type": str (details, test_drive, purchase),
  "message": str (optional),
  "submitted_at": datetime,
  "status": str (new, contacted, scheduled, closed)
}
```

### 3. Testimonial
```python
{
  "id": str (auto-generated),
  "name": str,
  "email": str,
  "image_url": str (optional),
  "rating": int (1-5),
  "quote": str,
  "car_purchased": str (optional),
  "purchase_date": date (optional),
  "is_approved": bool (default: False),
  "created_at": datetime,
  "approved_at": datetime (optional)
}
```

### 4. Vehicle (combined new/used)
```python
{
  "id": str (auto-generated),
  "year": int,
  "brand": str,
  "model": str,
  "type": str (sedan, suv, coupe, etc.),
  "category": str (new/used),
  "image_url": str,
  "features": str,
  "description": str,
  "price": str,
  "mileage": str (for used cars),
  "is_available": bool (default: True),
  "is_featured": bool (default: False),
  "created_at": datetime,
  "updated_at": datetime
}
```

## Required API Endpoints

### Contact & Inquiries
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)
- `PUT /api/contact/{id}` - Update contact status (admin)

- `POST /api/inquiries` - Submit car inquiry
- `GET /api/inquiries` - Get all inquiries (admin)
- `PUT /api/inquiries/{id}` - Update inquiry status (admin)

### Testimonials/Reviews
- `GET /api/testimonials` - Get approved testimonials (public)
- `POST /api/testimonials` - Submit new testimonial
- `GET /api/testimonials/all` - Get all testimonials (admin)
- `PUT /api/testimonials/{id}/approve` - Approve testimonial (admin)
- `DELETE /api/testimonials/{id}` - Delete testimonial (admin)

### Vehicle Inventory
- `GET /api/vehicles?category=new` - Get new cars
- `GET /api/vehicles?category=used` - Get used cars
- `GET /api/vehicles/{id}` - Get specific vehicle
- `POST /api/vehicles` - Add new vehicle (admin)
- `PUT /api/vehicles/{id}` - Update vehicle (admin)
- `DELETE /api/vehicles/{id}` - Delete vehicle (admin)

### Admin Dashboard (future enhancement)
- `GET /api/dashboard/stats` - Get summary statistics
- `GET /api/dashboard/recent-activity` - Get recent submissions

## Frontend Integration Points

### Pages requiring backend integration:

#### 1. Contact Page (/contact)
- **Current**: Mock form submission with success message
- **Backend**: POST to `/api/contact` endpoint
- **Changes**: Remove mock submission, add real API call with error handling

#### 2. Reviews Page (/reviews)
- **Current**: Static testimonials from mock data
- **Backend**: GET from `/api/testimonials` endpoint
- **Changes**: Replace mock data with API call, add loading states

#### 3. New Cars Page (/new-cars)
- **Current**: Static inventory from mock data
- **Backend**: GET from `/api/vehicles?category=new`
- **Changes**: Replace mock data, add "Inquire Now" functionality

#### 4. Used Cars Page (/used-cars)
- **Current**: Static inventory from mock data  
- **Backend**: GET from `/api/vehicles?category=used`
- **Changes**: Replace mock data, add "Inquire Now" functionality

#### 5. Car Inquiry Functionality (all inventory pages)
- **Current**: Buttons are placeholders
- **Backend**: POST to `/api/inquiries` endpoint
- **Changes**: Add inquiry modal/form, API integration

### Form Handling Updates Needed:

#### Contact Form (Contact.jsx)
```javascript
// Replace mock submission with:
const response = await axios.post(`${API}/contact`, formData);
```

#### Car Inquiry Forms (NewCars.jsx, UsedCars.jsx)
```javascript
// Add inquiry functionality to "Inquire Now" buttons:
const response = await axios.post(`${API}/inquiries`, inquiryData);
```

#### Testimonial Submission (Reviews.jsx)
```javascript
// Add real testimonial submission:
const response = await axios.post(`${API}/testimonials`, testimonialData);
```

## Data Migration Plan

### Step 1: Initialize Database with Mock Data
- Create vehicles collection with mock cars data
- Create testimonials collection with mock testimonials (all approved)
- Seed data on server startup

### Step 2: API Implementation Priority
1. Contact form submission (highest priority)
2. Vehicle inventory management
3. Car inquiry system
4. Testimonial management

### Step 3: Frontend Integration
1. Update Contact page
2. Update inventory pages (New/Used Cars)
3. Add inquiry functionality
4. Update Reviews page
5. Add loading states and error handling

## Error Handling Strategy
- Form validation on frontend and backend
- User-friendly error messages
- Loading states for all API calls
- Graceful degradation if API fails

## Security Considerations
- Input validation and sanitization
- Rate limiting on form submissions
- Basic admin authentication for management endpoints
- CORS properly configured

## Testing Requirements
- Test all form submissions
- Test inventory loading and filtering
- Test inquiry functionality
- Test error handling scenarios
- Test responsive design remains intact