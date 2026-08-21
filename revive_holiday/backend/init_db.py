"""Create tables and seed initial admin user + content."""
from database import Base, engine, SessionLocal
import models
from auth import hash_password

Base.metadata.create_all(bind=engine)

db = SessionLocal()

# ── Admin user ───────────────────────────────────────────────────────────────
if not db.query(models.AdminUser).filter(models.AdminUser.username == "admin").first():
    db.add(models.AdminUser(username="admin", password_hash=hash_password("ChangeMe123!")))
    print("Created admin user 'admin' with password 'ChangeMe123!' — change this after first login.")

# ── Site settings ────────────────────────────────────────────────────────────
site_settings = {
    "hero_headline": "Explore the World with Confidence",
    "hero_subtext": "Your trusted partner for unforgettable journeys.",
    "tagline": "Your Journey, Our Passion",
    "strength": "Skill Is Our Strength",
    "address": "[Your Office Address]",
    "phone": "[Your Phone Number]",
    "whatsapp": "[Your WhatsApp Number]",
    "email": "[Your Email Address]",
    "website": "[Your Website]",
    "hours_weekdays": "Saturday – Thursday, 10:00 AM – 7:00 PM",
    "hours_friday": "Friday: Closed",
    # Stock placeholder banner/hero images — replace with real photos via
    # Admin -> Site Settings whenever you're ready.
    "hero_home_image": "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80&auto=format&fit=crop",
    "about_banner": "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1600&q=80&auto=format&fit=crop",
    "about_mission_image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80&auto=format&fit=crop",
    "destinations_banner": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&q=80&auto=format&fit=crop",
    "corporate_banner": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80&auto=format&fit=crop",
    "visa_banner": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80&auto=format&fit=crop",
    "contact_banner": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80&auto=format&fit=crop",
}
if db.query(models.SiteSetting).count() == 0:
    for key, value in site_settings.items():
        db.add(models.SiteSetting(key=key, value=value))
    print(f"Seeded {len(site_settings)} site settings.")

# ── Services ─────────────────────────────────────────────────────────────────
services = [
    ("Globe", "International Tour Packages", "Discover the world's most breathtaking destinations through expertly crafted travel packages."),
    ("MapPin", "Domestic Holidays", "Explore the beauty, culture, and heritage of your own country with customized local tours."),
    ("Plane", "Flight Reservations", "Access competitive airfares and seamless booking services worldwide."),
    ("Hotel", "Hotel Reservations", "Choose from premium hotels, resorts, villas, and apartments across the globe."),
    ("Stamp", "Visa Assistance", "Professional support for tourist, business, and family visit visa applications."),
    ("Heart", "Honeymoon Packages", "Romantic escapes designed to create unforgettable moments."),
    ("Users", "Family Vacations", "Stress-free family trips with carefully planned itineraries and accommodations."),
    ("Briefcase", "Corporate Travel Management", "Efficient travel solutions for businesses, conferences, and executive travelers."),
    ("UsersRound", "Group Tours", "Special arrangements for educational, leisure, religious, and incentive groups."),
    ("Moon", "Umrah & Religious Tours", "Comfortable and spiritually fulfilling pilgrimage arrangements."),
    ("ShieldCheck", "Travel Insurance", "Comprehensive protection for a worry-free journey."),
    ("Car", "Airport Transfers", "Safe and convenient transportation services worldwide."),
]
if db.query(models.Service).count() == 0:
    for order, (icon, title, desc) in enumerate(services):
        db.add(models.Service(order=order, icon=icon, title=title, description=desc))
    print(f"Seeded {len(services)} services.")

# ── Destinations ─────────────────────────────────────────────────────────────
destinations = [
    ("Europe", "Experience timeless history, stunning architecture, and vibrant cultures.",
     "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&h=1100&fit=crop&q=80"),
    ("United Kingdom", "Discover iconic landmarks, prestigious universities, and rich heritage.",
     "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&h=1100&fit=crop&q=80"),
    ("Turkey", "Explore the perfect blend of East and West through unforgettable experiences.",
     "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=900&h=1100&fit=crop&q=80"),
    ("Dubai", "Luxury shopping, world-class attractions, and modern architectural wonders.",
     "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&h=1100&fit=crop&q=80"),
    ("Thailand", "Beautiful beaches, vibrant nightlife, and cultural treasures.",
     "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=900&h=1100&fit=crop&q=80"),
    ("Malaysia", "A perfect mix of modern cities and tropical escapes.",
     "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=900&h=1100&fit=crop&q=80"),
    ("Indonesia", "Breathtaking islands, unique traditions, and world-famous hospitality.",
     "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=900&h=1100&fit=crop&q=80"),
    ("Singapore", "A global city offering innovation, entertainment, and luxury.",
     "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&h=1100&fit=crop&q=80"),
    ("Maldives", "The ultimate paradise for relaxation and romance.",
     "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&h=1100&fit=crop&q=80"),
]
if db.query(models.Destination).count() == 0:
    for order, (name, desc, image) in enumerate(destinations):
        db.add(models.Destination(order=order, name=name, description=desc, image_url=image))
    print(f"Seeded {len(destinations)} destinations.")

# ── Core Values ──────────────────────────────────────────────────────────────
core_values = [
    ("Award", "Excellence", "Delivering superior service at every stage of the travel experience."),
    ("Handshake", "Integrity", "Operating with honesty, transparency, and professionalism."),
    ("Lightbulb", "Innovation", "Continuously improving travel solutions through modern technology and creative planning."),
    ("HeartHandshake", "Customer First", "Putting our clients' needs at the center of everything we do."),
    ("ShieldCheck", "Reliability", "Providing dependable services that travelers can trust."),
]
if db.query(models.CoreValue).count() == 0:
    for order, (icon, title, desc) in enumerate(core_values):
        db.add(models.CoreValue(order=order, icon=icon, title=title, description=desc))
    print(f"Seeded {len(core_values)} core values.")

# ── Why Choose Us ────────────────────────────────────────────────────────────
why_choose = [
    "Professional Travel Consultants", "Customized Travel Packages", "Worldwide Destination Network",
    "Competitive Pricing", "Visa & Documentation Support", "Corporate Travel Solutions",
    "24/7 Customer Assistance", "Reliable & Transparent Services", "Trusted Travel Partner",
    "Hassle-Free Travel Planning",
]
if db.query(models.WhyChoose).count() == 0:
    for order, text in enumerate(why_choose):
        db.add(models.WhyChoose(order=order, text=text))
    print(f"Seeded {len(why_choose)} why-choose-us items.")

# ── Corporate Services ───────────────────────────────────────────────────────
corporate_services = [
    "Corporate Flight Reservations", "Executive Travel Planning", "Conference & Event Travel",
    "Group Travel Management", "Hotel & Transportation Arrangements", "Business Visa Assistance",
    "Travel Expense Optimization",
]
if db.query(models.CorporateService).count() == 0:
    for order, text in enumerate(corporate_services):
        db.add(models.CorporateService(order=order, text=text))
    print(f"Seeded {len(corporate_services)} corporate services.")

# ── Visa Support ─────────────────────────────────────────────────────────────
visa_support = [
    "Tourist Visas", "Business Visas", "Family Visit Visas",
    "Conference & Event Travel Visas", "Documentation Review", "Travel Consultation",
]
if db.query(models.VisaSupport).count() == 0:
    for order, text in enumerate(visa_support):
        db.add(models.VisaSupport(order=order, text=text))
    print(f"Seeded {len(visa_support)} visa support items.")

# ── Albums (sample gallery) ──────────────────────────────────────────────────
albums = [
    ("Dubai Desert Safari & City Tour", "Skyscrapers, desert dunes, and luxury shopping — a taste of modern Arabia.", [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1200&q=80&auto=format&fit=crop",
    ]),
    ("Bali & Indonesia Island Escape", "Lush rice terraces, temple sunsets, and turquoise island waters.", [
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=80&auto=format&fit=crop",
    ]),
    ("Thailand Beach Getaway", "White-sand beaches, night markets, and unforgettable island hopping.", [
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80&auto=format&fit=crop",
    ]),
    ("Turkey Heritage & Culture Tour", "Ancient bazaars, coastal towns, and centuries of East-meets-West history.", [
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&q=80&auto=format&fit=crop",
    ]),
    ("Maldives Honeymoon Retreat", "Overwater villas and crystal-clear lagoons for the ultimate romantic escape.", [
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80&auto=format&fit=crop",
    ]),
    ("Singapore City Lights", "Futuristic skylines, gardens, and world-class dining in the Lion City.", [
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=1200&q=80&auto=format&fit=crop",
    ]),
    ("Malaysia Adventure Trip", "Twin towers, rainforest canopies, and vibrant street food culture.", [
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&q=80&auto=format&fit=crop",
    ]),
    ("European Grand Tour", "Cobblestone streets, historic landmarks, and unforgettable city hopping across Europe.", [
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80&auto=format&fit=crop",
    ]),
    ("United Kingdom Heritage Tour", "Royal palaces, university towns, and timeless British countryside.", [
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80&auto=format&fit=crop",
    ]),
    ("Umrah & Religious Pilgrimage", "A spiritually fulfilling journey arranged with comfort and care.", [
        "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80&auto=format&fit=crop",
    ]),
    ("Family Vacation Package", "Stress-free itineraries designed for travelers of every age.", [
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80&auto=format&fit=crop",
    ]),
    ("Corporate MICE & Conference Trip", "Seamless group travel and event logistics for business teams.", [
        "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=80&auto=format&fit=crop",
    ]),
    ("Group Tour Celebration", "Special group departures for leisure, educational, and incentive travel.", [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80&auto=format&fit=crop",
    ]),
]
if db.query(models.Album).count() == 0:
    for order, (title, note, photos) in enumerate(albums):
        album = models.Album(order=order, title=title, short_note=note, cover_image_url=photos[0], active=True)
        db.add(album)
        db.flush()  # get album.id
        for p_order, url in enumerate(photos):
            db.add(models.AlbumPhoto(album_id=album.id, order=p_order, image_url=url))
    print(f"Seeded {len(albums)} sample albums.")

db.commit()
db.close()
print("Done.")
