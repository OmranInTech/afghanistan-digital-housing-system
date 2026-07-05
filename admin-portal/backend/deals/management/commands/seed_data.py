import random
from django.core.management.base import BaseCommand
from django.db import transaction
from datetime import date, timedelta

from citizens.models import Citizen
from properties.models import Property
from deals.models import Deal, DealParty
from verification.models import Verification

class Command(BaseCommand):
    help = "Seeds the digital housing ledger with mock Afghan records for frontend integration"

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting database seeding sequence...")
        
        # Guard clause: Clear old testing records cleanly to prevent duplicate primary key conflicts
        Verification.objects.all().delete()
        DealParty.objects.all().delete()
        Deal.objects.all().delete()
        Property.objects.all().delete()
        Citizen.objects.all().delete()

        first_names = ["Ahmad", "Mohammad", "Zalmay", "Mustafa", "Faisal", "Sahar", "Mariam", "Lina"]
        last_names = ["Ahmadzai", "Popal", "Karimi", "Wardak", "Sadat", "Durrani", "Stanikzai"]
        provinces = ["Kabul", "Kandahar", "Herat", "Balkh", "Nangarhar"]
        districts = ["District 1", "District 4", "District 10", "Mir Bacha Kot", "Deh Sabz"]

        created_citizens = []
        created_properties = []

        try:
            with transaction.atomic():
                # 1. Seed Citizens Layout
                self.stdout.write("Generating mock citizen registries...")
                for i in range(10):
                    f_name = random.choice(first_names)
                    l_name = random.choice(last_names)
                    citizen = Citizen.objects.create(
                        national_id=f"NID-{100000 + i}",
                        first_name=f_name,
                        last_name=l_name,
                        father_name=random.choice(first_names),
                        gender="MALE" if i % 2 == 0 else "FEMALE",
                        phone=f"+93700{random.randint(100000, 999999)}",
                        email=f"{f_name.lower()}.{l_name.lower()}@example.af",
                        province=random.choice(provinces),
                        district=random.choice(districts),
                        current_address="Street " + str(random.randint(1, 12)) + ", Residential Block",
                        is_verified=True if i % 3 == 0 else False
                    )
                    created_citizens.append(citizen)

                # 2. Seed Real Estate Properties Layout
                self.stdout.write("Generating mock land registry assets...")
                for i in range(5):
                    prop = Property.objects.create(
                        registration_number=f"REG-KBL-{500000 + i}",
                        property_type=random.choice(["RESIDENTIAL", "COMMERCIAL", "AGRICULTURAL"]),
                        total_area=random.randint(150, 1200),
                        province="Kabul",
                        district=random.choice(districts),
                        custom_address="Sector " + str(i + 1) + ", New Town Developments",
                        verification_status="PENDING" if i % 2 == 0 else "VERIFIED"
                    )
                    created_properties.append(prop)

                # 3. Seed Transactions (Deals), Bind Parties, & Mount Verification Tickets
                self.stdout.write("Weaving transactions and ledger tickets...")
                
                # Deal 1: Rental Operation Setup
                deal1 = Deal.objects.create(
                    property=created_properties[0],
                    deal_type="RENTAL",
                    status="PENDING",
                    transaction_amount=24000.00
                )
                DealParty.objects.create(deal=deal1, citizen=created_citizens[0], role="OWNER")
                DealParty.objects.create(deal=deal1, citizen=created_citizens[1], role="RENTER")
                Verification.objects.create(deal=deal1, id_database_match="PENDING", property_boundary_match="PENDING")

                # Deal 2: Direct Sale Operation Setup (Partially Verified)
                deal2 = Deal.objects.create(
                    property=created_properties[1],
                    deal_type="SALE",
                    status="PENDING",
                    transaction_amount=4500000.00
                )
                DealParty.objects.create(deal=deal2, citizen=created_citizens[2], role="OWNER")
                DealParty.objects.create(deal=deal2, citizen=created_citizens[3], role="BUYER")
                Verification.objects.create(deal=deal2, id_database_match="PASSED", property_boundary_match="PENDING")

                # Deal 3: Mortgage Operation Setup
                deal3 = Deal.objects.create(
                    property=created_properties[2],
                    deal_type="MORTGAGE",
                    status="PENDING",
                    transaction_amount=1800000.00
                )
                DealParty.objects.create(deal=deal3, citizen=created_citizens[4], role="OWNER")
                DealParty.objects.create(deal=deal3, citizen=created_citizens[5], role="LENDER")
                Verification.objects.create(deal=deal3, id_database_match="PENDING", property_boundary_match="PENDING")

            self.stdout.write(self.style.SUCCESS("Ledger database seeded successfully with mock data matrix!"))
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Seeding operation failure: {str(e)}"))