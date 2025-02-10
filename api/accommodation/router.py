from http import HTTPStatus
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import select

from accommodation.schema import AccommodationList, AccommodationSchema, FilterAccommodation
from accommodation.model import Accommodation
from database import get_session



router = APIRouter(prefix='/acomodacoes', tags=['accommodation'])



@router.get('/', response_model=AccommodationList)
def get_all_accommodations(filter: Annotated[FilterAccommodation, Query()], session: Session = Depends(get_session)):
    query = select(Accommodation)  
    conditions = []

    if filter.city:
        conditions.append(Accommodation.city.ilike(f"%{filter.city}%"))
        
    if filter.state:
        conditions.append(Accommodation.state.ilike(f"%{filter.state}%"))
        
    if filter.type:
        conditions.append(Accommodation.type == filter.type)
        
    if filter.acc_listing:
        conditions.append(Accommodation.acc_listing == filter.acc_listing)

    if filter.min_price is not None:
        conditions.append(Accommodation.price >= filter.min_price)

    if filter.max_price is not None:
        conditions.append(Accommodation.price <= filter.max_price)

    if conditions:
        query = query.where(*conditions)

    accommodations = session.scalars(query.offset(filter.offset).limit(filter.limit)).all()
    
    if not accommodations:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Nenhuma Acomodação encontrada!")

       
    
    return {'accommodations': accommodations}
    

@router.get('/{accommodation_id}', response_model= AccommodationSchema)
def get_accomodation_by_id(accommodation_id: int, session: Session = Depends(get_session)):
    accommodation = session.scalar(select(Accommodation).where(Accommodation.id == accommodation_id))
    
    if not accommodation:
        raise HTTPException(status_code= HTTPStatus.NOT_FOUND, detail='Acomodação não encontrada!')
   
    return accommodation
