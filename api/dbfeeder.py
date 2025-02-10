from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from accommodation.model import Accommodation, AccommodationType, ListingType, Photo
from settings import Settings
import random

engine = create_engine(Settings().DATABASE_URL, echo=True)

cities = [
    ("São Paulo", "SP"), ("Rio de Janeiro", "RJ"), ("Belo Horizonte", "MG"),
    ("Porto Alegre", "RS"), ("Salvador", "BA"), ("Curitiba", "PR"),
    ("Fortaleza", "CE"), ("Recife", "PE"), ("Brasília", "DF"), ("Manaus", "AM")
]


titles = {
    AccommodationType.HOUSE: {
        ListingType.SALE: "Casa à venda com excelente localização!",
        ListingType.RENTAL: "Aluguel de casa confortável e espaçosa!"
    },
    AccommodationType.APARTMENT: {
        ListingType.SALE: "Apartamento moderno à venda!",
        ListingType.RENTAL: "Apartamento para aluguel, ótima oportunidade!"
    }
}

def generate_price(listing_type: ListingType):
    if listing_type == ListingType.SALE:
        return round(random.uniform(200000, 1000000), 2)  
    else:
        return round(random.uniform(1000, 5000), 2)  

with Session(engine) as session:
    accommodations = []

    
    photo_index = {
        AccommodationType.HOUSE: 1,
        AccommodationType.APARTMENT: 1
    }
    
    for acc_type in [AccommodationType.HOUSE, AccommodationType.APARTMENT]:
        for acc_listing in [ListingType.SALE, ListingType.RENTAL]:
            for _ in range(7):  
                city, state = random.choice(cities)
                price = generate_price(acc_listing)
                
                accommodation = Accommodation(
                    title=titles[acc_type][acc_listing],
                    price=price,
                    city=city,
                    state=state,
                    street=f"Rua {random.randint(1, 200)}",
                    zip_code=f"{random.randint(10000, 99999)}-{random.randint(100, 999)}",
                    type=acc_type,
                    acc_listing=acc_listing
                )
                session.add(accommodation)
                session.flush() 
                
                photo_name = f"{acc_type.value}-{photo_index[acc_type]}"
                photo = Photo(
                    name=photo_name,
                    url=f"/static/images/{photo_name}.jpg",
                    accommodation_id=accommodation.id
                )
                session.add(photo)
                
                photo_index[acc_type] += 1
 
    session.commit()
print("Data inserted successfully!")
