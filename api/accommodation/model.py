from sqlalchemy import ForeignKey
from enum import Enum
from sqlalchemy.orm import Mapped, mapped_column, registry, relationship


table_registry = registry()

class AccommodationType(str, Enum):
    HOUSE = 'Casa'
    APARTMENT = 'Apartamento'
    
class ListingType(str, Enum):
    RENTAL = 'Aluguel'
    SALE = 'Venda'

@table_registry.mapped_as_dataclass
class Accommodation:
    __tablename__ = 'accommodations'
    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    title: Mapped[str]
    price: Mapped[float]
    city: Mapped[str]
    state: Mapped[str]
    street: Mapped[str]
    zip_code: Mapped[str]
    type: Mapped[AccommodationType]
    acc_listing: Mapped[ListingType]
    photos: Mapped[list['Photo']] = relationship(init=False, back_populates='accommodation', cascade="all, delete-orphan")

@table_registry.mapped_as_dataclass
class Photo:
    __tablename__ = "photos"
    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    name: Mapped[str]
    url: Mapped[str]
    accommodation_id: Mapped[int] = mapped_column(ForeignKey('accommodations.id'))
    accommodation: Mapped[Accommodation] = relationship(init=False, back_populates='photos')
