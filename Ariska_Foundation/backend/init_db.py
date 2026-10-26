"""
Creates all tables (if they don't exist) and seeds them with ARISKA's current
content, plus a default admin user. Safe to re-run: each table is only seeded
if it is currently empty.
"""
import json

from database import engine, SessionLocal
import models
from auth import hash_password

models.Base.metadata.create_all(bind=engine)

db = SessionLocal()


def seed_if_empty(model, rows):
    if db.query(model).count() == 0:
        for i, row in enumerate(rows):
            db.add(model(order=i, **row))
        db.commit()
        print(f"Seeded {model.__tablename__} ({len(rows)} rows)")


# ---------- Admin user ----------
if db.query(models.AdminUser).count() == 0:
    db.add(models.AdminUser(username="admin", password_hash=hash_password("Admin@1234")))
    db.commit()
    print("Seeded admin user -> username: admin / password: Admin@1234 (change after first login)")

# ---------- Company settings ----------
company_defaults = {
    "name": "ARISKA",
    "tagline": "Creating Connections, Building Success",
    "founded": "2024",
    "experience": "15+",
    "phone": "+880 1580-899249",
    "website": "www.ariskabd.com",
    "registeredAddress": "223 Tejgaon I/A, Dhaka-1208, Bangladesh",
    "businessAddress": "House 126, Road 1, Baridhara DOHS, Dhaka-1206, Bangladesh",
    "mission_heading": "Connecting Businesses Through Reliable Solutions",
    "mission_intro": "Our mission is to provide reliable trading, supply, procurement, and export solutions while building strong and lasting relationships with our clients and international business partners.",
    "vision_heading": "Building a Global Business Network from Bangladesh",
    "vision_intro": "Our vision is to develop ARISKA into a trusted international trading and supply company connecting Bangladesh with businesses and markets around the world.",
    "vision_sub": "We aim to continuously expand our product portfolio, international network, and business partnerships while creating new opportunities for our clients, suppliers, and international partners.",
}
if db.query(models.CompanySetting).count() == 0:
    for key, value in company_defaults.items():
        db.add(models.CompanySetting(key=key, value=value))
    db.commit()
    print(f"Seeded company_settings ({len(company_defaults)} rows)")

# ---------- Pillars ----------
seed_if_empty(models.Pillar, [
    {"title": "Supply & Procurement"},
    {"title": "Printing & Packaging"},
    {"title": "Export & Trading"},
    {"title": "Agro"},
])

# ---------- What We Do ----------
seed_if_empty(models.WhatWeDo, [
    {"title": "Supply & Procurement", "description": "B2B supply chain solutions, institutional procurement, and tender contracting for government and private sector projects."},
    {"title": "Printing & Packaging", "description": "End-to-end commercial printing, custom packaging, and fine paper imports backed by an expert design team."},
    {"title": "Export & Trading", "description": "Global commodity export and local wholesale trading of rubber, leather, and raw materials."},
    {"title": "Agro & Fresh Produce", "description": "Large-scale commercial farming and bulk wholesale supply of premium fruits from Modhupur, Tangail."},
])

# ---------- Markets ----------
seed_if_empty(models.Market, [
    {"country": "Indonesia", "description": "Business relationships and trading activities with partners in Indonesia."},
    {"country": "China", "description": "Business connections supporting sourcing and international trade activities."},
    {"country": "Sri Lanka", "description": "Business relationships supporting cross-border commercial opportunities."},
])

# ---------- Journey ----------
seed_if_empty(models.Journey, [
    {"value": "15+ Years", "label": "Team's combined business experience"},
    {"value": "2024", "label": "ARISKA began its journey"},
    {"value": "3+ Markets", "label": "Current business connections with Indonesia, China and Sri Lanka"},
    {"value": "Growing Network", "label": "Expanding our international business relationships"},
])

# ---------- Mission points ----------
seed_if_empty(models.MissionPoint, [
    {"text": "Understanding our clients' requirements"},
    {"text": "Providing dependable sourcing and supply solutions"},
    {"text": "Maintaining quality and professional standards"},
    {"text": "Building transparent and trustworthy relationships"},
    {"text": "Connecting businesses across international markets"},
    {"text": "Creating long-term value for our clients and partners"},
])

# ---------- Vision future ----------
seed_if_empty(models.VisionFuture, [
    {"title": "Expand Markets", "description": "Develop business relationships in additional countries."},
    {"title": "Strengthen Partnerships", "description": "Build long-term relationships with international buyers, suppliers, and businesses."},
    {"title": "Expand Products", "description": "Introduce new product categories according to market demand."},
    {"title": "Grow Internationally", "description": "Increase the presence of Bangladeshi products in international markets."},
])

# ---------- Team values ----------
seed_if_empty(models.TeamValue, [
    {"title": "Integrity", "description": "We believe in honest and transparent business."},
    {"title": "Reliability", "description": "We strive to be a dependable business partner."},
    {"title": "Professionalism", "description": "We maintain professional standards in every business relationship."},
    {"title": "Commitment", "description": "We take responsibility for our commitments and client requirements."},
    {"title": "Partnership", "description": "We believe long-term success is built through strong relationships."},
])

# ---------- Why Ariska ----------
seed_if_empty(models.WhyAriska, [
    {"title": "Experience", "description": "Our team brings more than 15 years of business experience."},
    {"title": "Growing International Network", "description": "We currently have business connections with Indonesia, China, and Sri Lanka, with plans for further expansion."},
    {"title": "Reliable Supply", "description": "We focus on dependable sourcing and supply according to client requirements."},
    {"title": "Diverse Capabilities", "description": "Our activities cover supply & procurement, printing and packaging, export & trading, and agro production."},
    {"title": "Business Relationships", "description": "We focus on developing long-term relationships with clients, suppliers, and international partners."},
    {"title": "Bangladesh Advantage", "description": "Our local market knowledge and supplier network help connect international businesses with opportunities and products from Bangladesh."},
])

# ---------- Business values ----------
seed_if_empty(models.BusinessValue, [
    {"title": "Integrity", "description": "Honesty and transparency are at the heart of our business relationships."},
    {"title": "Quality", "description": "We aim to provide products and solutions that meet agreed requirements."},
    {"title": "Reliability", "description": "We strive to deliver dependable service and maintain our commitments."},
    {"title": "Partnership", "description": "We believe successful business is built through mutual trust and long-term cooperation."},
    {"title": "Growth", "description": "We continuously seek opportunities to improve, expand, and create greater value."},
])

# ---------- Clients ----------
seed_if_empty(models.Client, [
    {"name": "Globe Soft Drinks Ltd.", "category": "Beverage & Pharmaceuticals"},
    {"name": "AST Beverage Ltd.", "category": "Beverage & Pharmaceuticals"},
    {"name": "Globe Pharmaceuticals Ltd.", "category": "Beverage & Pharmaceuticals"},
    {"name": "Concord Real Estate", "category": "Real Estate & Building Materials"},
    {"name": "Mirpur Ceramics", "category": "Real Estate & Building Materials"},
    {"name": "Khadim Ceramics", "category": "Real Estate & Building Materials"},
    {"name": "Baridhara DOHS", "category": "Institutional Projects"},
    {"name": "Mirpur DOHS", "category": "Institutional Projects"},
])

# ---------- Team members (sample placeholders) ----------
seed_if_empty(models.TeamMember, [
    {"name": "Rashed Karim", "role": "Managing Director", "color": "bg-teal-700", "photo_url": None},
    {"name": "Nusrat Jahan", "role": "Head of Supply & Procurement", "color": "bg-amber-500", "photo_url": None},
    {"name": "Imran Hossain", "role": "Export & Trading Manager", "color": "bg-sky-500", "photo_url": None},
    {"name": "Farhana Akter", "role": "Agro Operations Lead", "color": "bg-emerald-500", "photo_url": None},
])

# ---------- Services ----------
if db.query(models.Service).count() == 0:
    services_seed = [
        {
            "slug": "supply-procurement",
            "title": "Supply & Corporate Procurement",
            "tagline": "B2B Supply Chain & Institutional Procurement",
            "intro": "Specializing in B2B supply chain solutions, institutional procurement, and selective participation in government and private sector tenders.",
            "groups": [
                {
                    "heading": "Services",
                    "items": [
                        {"title": "Government & Private Tender Contracting", "description": "Turnkey procurement and supply services for public and private sector projects."},
                        {"title": "Corporate & Industrial Supply Solutions", "description": "Institutional bulk supply for manufacturing, beverage, pharmaceutical, and construction industries."},
                        {"title": "Residential & Institutional Community Supplies", "description": "Direct procurement services for key residential defense societies."},
                    ],
                },
            ],
            "clientGroups": [
                {"category": "Beverage & Pharmaceuticals", "names": ["Globe Soft Drinks Ltd.", "AST Beverage Ltd.", "Globe Pharmaceuticals Ltd."]},
                {"category": "Real Estate & Building Materials", "names": ["Concord Real Estate", "Mirpur Ceramics", "Khadim Ceramics"]},
                {"category": "Institutional Projects", "names": ["Baridhara DOHS", "Mirpur DOHS"]},
            ],
        },
        {
            "slug": "printing-packaging",
            "title": "Printing, Packaging & Paper Solutions",
            "tagline": "End-to-End Commercial Printing & Packaging",
            "intro": "End-to-end commercial printing, high-volume custom packaging, and raw material imports backed by advanced machinery and an expert design team.",
            "groups": [
                {
                    "heading": "Industrial & Commercial Packaging",
                    "items": [
                        {"title": "Custom Packaging Boxes", "description": "Corrugated boxes, rigid gift boxes, product cartons, and industrial packaging solutions."},
                        {"title": "Custom Premium Shopping Bags", "description": "Branded paper shopping bags and customized carry bags."},
                    ],
                },
                {
                    "heading": "Corporate & Commercial Printing Services",
                    "items": [
                        {"title": "Corporate Publications", "description": "Annual reports, corporate directories, souvenirs, and books."},
                        {"title": "Promotional & Marketing Materials", "description": "High-impact banners, posters, brochures, and marketing displays."},
                        {"title": "Business Stationery", "description": "Customized name cards/business cards, letterheads, and corporate presentation folders."},
                    ],
                },
                {
                    "heading": "Paper Import & Raw Material Trading",
                    "items": [
                        {"title": "Direct Fine Paper Imports", "description": "Premium grade paper sourced and imported directly from Indonesia and China."},
                    ],
                },
            ],
            "clientGroups": None,
        },
        {
            "slug": "export-trading",
            "title": "Export & Commodity Trading",
            "tagline": "Global Commodity Export & Local Trade",
            "intro": "Global commodity export, international trade distribution, and local wholesale market operations.",
            "groups": [
                {
                    "heading": "Commodity Exports",
                    "items": [
                        {"title": "Raw Rubber Export", "description": "High-grade raw natural rubber exported directly to Sri Lanka and international markets."},
                        {"title": "Leather Goods Export", "description": "Export-quality finished leather products and materials for global trade."},
                    ],
                },
                {
                    "heading": "Local Trading & Wholesale",
                    "items": [
                        {"title": "Local Leather Trade", "description": "Finished leather supply and distribution for the domestic wholesale market."},
                        {"title": "Raw Material Trading", "description": "Industrial materials and commodity sourcing for local enterprises."},
                    ],
                },
            ],
            "clientGroups": None,
        },
        {
            "slug": "agro",
            "title": "Agro & Fresh Produce",
            "tagline": "Large-Scale Farming & Bulk Wholesale Supply",
            "intro": "Large-scale commercial farming and bulk wholesale supply operating across 100+ acres of agricultural land in Modhupur, Tangail — the Pineapple Capital of Bangladesh.",
            "groups": [
                {
                    "heading": "Fresh Produce Portfolio",
                    "items": [
                        {"title": "Premium Modhupur Pineapples", "description": "Fresh, high-grade bulk pineapple supply."},
                        {"title": "Fresh Dragon Fruit", "description": "Commercial plantation-yield dragon fruit."},
                        {"title": "Commercial Bananas", "description": "High-volume wholesale banana crops."},
                        {"title": "Farm-Fresh Papayas", "description": "Fresh harvest distribution for markets and corporate clients."},
                        {"title": "Guavas", "description": "Bulk high-yield guava crops."},
                    ],
                },
                {
                    "heading": "Agro Services",
                    "items": [
                        {"title": "Bulk Seasonal Fruit Supply", "description": "Mass distribution of seasonal fruits directly from farms to national wholesale markets and corporate clients."},
                        {"title": "Contract Farming & Large-Scale Agro Supply", "description": "Targeted crop production and bulk supply contracts for large enterprises."},
                    ],
                },
            ],
            "clientGroups": None,
        },
    ]
    for i, svc in enumerate(services_seed):
        db.add(models.Service(
            order=i,
            slug=svc["slug"],
            title=svc["title"],
            tagline=svc["tagline"],
            intro=svc["intro"],
            groups_json=json.dumps(svc["groups"]),
            client_groups_json=json.dumps(svc["clientGroups"]) if svc["clientGroups"] else None,
        ))
    db.commit()
    print(f"Seeded services ({len(services_seed)} rows)")

# ---------- Products (real items, multi-image galleries — admin can add more) ----------
if db.query(models.Product).count() == 0:
    products_seed = [
        {"slug": "modhupur-pineapple", "title": "Premium Modhupur Pineapples", "category": "Agro & Fresh Produce", "summary": "Fresh, high-grade bulk pineapple supply from Modhupur, Tangail.", "description": "Grown across 100+ acres of agricultural land in Modhupur, Tangail — the Pineapple Capital of Bangladesh — our pineapples are supplied fresh in bulk for wholesale and corporate clients.", "images": ["/uploads/pineapple.jpg"]},
        {"slug": "dragon-fruit", "title": "Fresh Dragon Fruit", "category": "Agro & Fresh Produce", "summary": "Commercial plantation-yield dragon fruit.", "description": "Fresh dragon fruit sourced from our commercial plantation operations in Modhupur, Tangail, supplied in bulk to wholesale markets and corporate clients.", "images": ["/uploads/dragonfruit.jpg"]},
        {"slug": "bananas", "title": "Commercial Bananas", "category": "Agro & Fresh Produce", "summary": "High-volume wholesale banana crops.", "description": "High-volume banana crops grown and distributed through our agro operations, supplied fresh for national wholesale markets.", "images": ["/uploads/banana.jpg"]},
        {"slug": "papayas", "title": "Farm-Fresh Papayas", "category": "Agro & Fresh Produce", "summary": "Fresh harvest distribution for markets and corporate clients.", "description": "Farm-fresh papayas harvested and distributed directly to national wholesale markets and corporate clients.", "images": ["/uploads/papaya.jpg"]},
        {"slug": "guavas", "title": "Guavas", "category": "Agro & Fresh Produce", "summary": "Bulk high-yield guava crops.", "description": "High-yield guava crops supplied in bulk as part of our seasonal fresh produce portfolio.", "images": ["/uploads/guava.jpg"]},
        {"slug": "natural-rubber", "title": "Raw Natural Rubber", "category": "Export & Commodity Trading", "summary": "High-grade raw natural rubber exported to Sri Lanka and international markets.", "description": "We export high-grade raw natural rubber sourced from Bangladesh directly to Sri Lanka and other international markets, supporting industrial and manufacturing requirements.", "images": ["/uploads/rubber-tapping.jpg"]},
        {"slug": "leather-goods", "title": "Leather Goods", "category": "Export & Commodity Trading", "summary": "Export-quality finished leather products and materials for global trade.", "description": "Export-quality finished leather products and materials, supplied for both international export and local wholesale trade.", "images": ["/uploads/leather.jpg"]},
    ]
    for i, p in enumerate(products_seed):
        db.add(models.Product(
            order=i,
            slug=p["slug"],
            title=p["title"],
            category=p["category"],
            summary=p["summary"],
            description=p["description"],
            images_json=json.dumps(p["images"]),
            active=True,
        ))
    db.commit()
    print(f"Seeded products ({len(products_seed)} rows)")

# ---------- Highlights (real, fact-based entries — admin adds real updates over time) ----------
if db.query(models.Highlight).count() == 0:
    highlights_seed = [
        {
            "slug": "ariska-begins-its-journey",
            "title": "ARISKA Begins Its Journey",
            "date_label": "2024",
            "cover_image": "/uploads/team-meeting.jpg",
            "summary": "ARISKA began its journey in 2024, built on more than 15 years of combined business experience in trading, sourcing, and supply.",
            "content": "While the ARISKA name is relatively new, our team has been involved in business, trading, sourcing, and supply activities for more than 15 years. This experience has helped us develop valuable knowledge, business relationships, and an understanding of different markets as we build ARISKA into a modern, internationally connected trading company from Bangladesh.",
            "images": ["/uploads/team-meeting.jpg"],
        },
        {
            "slug": "growing-our-international-network",
            "title": "Growing Our International Network",
            "date_label": "2024 – Present",
            "cover_image": "/uploads/jute-field.jpg",
            "summary": "We are building an expanding international network, with current business connections in Indonesia, China, and Sri Lanka.",
            "content": "ARISKA continues to develop its international network, currently maintaining business connections with partners in Indonesia, China, and Sri Lanka. We are exploring opportunities to establish relationships in additional countries as we expand our presence across international markets.",
            "images": ["/uploads/jute-field.jpg"],
        },
    ]
    for i, h in enumerate(highlights_seed):
        db.add(models.Highlight(
            order=i,
            slug=h["slug"],
            title=h["title"],
            date_label=h["date_label"],
            cover_image=h["cover_image"],
            summary=h["summary"],
            content=h["content"],
            images_json=json.dumps(h["images"]),
            active=True,
        ))
    db.commit()
    print(f"Seeded highlights ({len(highlights_seed)} rows)")

db.close()
print("Database ready.")
