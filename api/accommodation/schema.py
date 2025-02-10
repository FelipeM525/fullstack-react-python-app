
from pydantic import BaseModel

from accommodation.model import AccommodationType, ListingType, Photo

class PhotoSchema(BaseModel):
    id: int
    name: str
    url: str

class AccommodationSchema(BaseModel):
    id: int
    title: str
    price: float
    city: str
    state: str
    street: str
    zip_code: str
    type: AccommodationType
    acc_listing: ListingType
    photos: list[PhotoSchema]

class AccommodationList(BaseModel):
    accommodations: list[AccommodationSchema]

class FilterPage(BaseModel):
    offset: int = 0
    limit: int = 100

class FilterAccommodation(FilterPage):
    min_price: float | None = None
    max_price: float | None = None
    city: str | None = None
    state: str | None = None
    type: AccommodationType | None = None
    acc_listing: ListingType | None = None
    

class Message(BaseModel):
    message: str
