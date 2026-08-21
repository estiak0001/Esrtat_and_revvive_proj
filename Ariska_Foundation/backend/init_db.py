"""
Seed the database with initial data from the frontend data/index.ts.
Run once: python init_db.py
"""
from database import engine, SessionLocal
import models
from passlib.context import CryptContext

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")

models.Base.metadata.create_all(bind=engine)

db = SessionLocal()

# ── Admin user ────────────────────────────────────────────────────────────────
if not db.query(models.AdminUser).first():
    db.add(models.AdminUser(
        username="admin",
        password_hash=pwd_ctx.hash("Admin@1234")  # Change after first login
    ))
    db.commit()
    print("Admin user created  →  username: admin  |  password: Admin@1234")

# ── Hero slides ───────────────────────────────────────────────────────────────
if not db.query(models.HeroSlide).first():
    slides = [
        models.HeroSlide(order=0, badge="Legal Consultancy", heading="Your Trusted Partner in",
            highlight="Legal Advisory", sub="Services",
            description="Expert legal guidance, agreement drafting, due diligence, and notarization support for individuals and businesses across Bangladesh.",
            cta_label="Legal Services", cta_href="/services#legal-consultancy"),
        models.HeroSlide(order=1, badge="Property Consultancy", heading="Professional",
            highlight="Property & Land", sub="Registration Support",
            description="Complete property verification, land registration, mutation assistance, and ownership transfer services with trusted expertise.",
            cta_label="Property Services", cta_href="/services#property-consultancy"),
        models.HeroSlide(order=2, badge="Corporate Consultancy", heading="Strategic",
            highlight="Corporate Advisory", sub="& Documentation",
            description="Business registration, trade license, regulatory compliance, and corporate governance support for SMEs and large organizations.",
            cta_label="Corporate Services", cta_href="/services#corporate-consultancy"),
        models.HeroSlide(order=3, badge="Foreign POA & Documentation", heading="Seamless",
            highlight="Foreign Power of Attorney", sub="Services Worldwide",
            description="End-to-end POA preparation, attestation, and execution for Bangladeshi expatriates and overseas clients — hassle-free.",
            cta_label="POA Services", cta_href="/services#foreign-poa"),
    ]
    db.add_all(slides)
    db.commit()
    print("Hero slides seeded.")

# ── Company settings ──────────────────────────────────────────────────────────
if not db.query(models.CompanySetting).first():
    settings = [
        ("name", "ESRAT Associates"), ("tagline", "Skill Is Our Strength."),
        ("phone", "+8801835058471"), ("phoneDisplay", "+880 1835 058471"),
        ("whatsapp", "8801835058471"), ("email", "info@esratassociates.com"),
        ("website", "www.esratassociates.com"), ("address", "Dhaka, Bangladesh"),
        ("foundedPractice", "2013"), ("foundedRegistered", "2021"),
        ("logo_url", ""),
    ]
    db.add_all([models.CompanySetting(key=k, value=v) for k, v in settings])
    db.commit()
    print("Company settings seeded.")

# ── Stats ──────────────────────────────────────────────────────────────────────
if not db.query(models.Stat).first():
    db.add_all([
        models.Stat(order=0, value=13, suffix="+", label="Years of Experience"),
        models.Stat(order=1, value=500, suffix="+", label="Clients Served"),
        models.Stat(order=2, value=6, suffix="", label="Service Areas"),
        models.Stat(order=3, value=100, suffix="%", label="Commitment to Excellence"),
    ])
    db.commit()
    print("Stats seeded.")

# ── Services ───────────────────────────────────────────────────────────────────
if not db.query(models.Service).first():
    services_data = [
        ("legal-consultancy", "Legal Consultancy", "Scale",
         "Comprehensive legal advisory and documentation services for individuals and organizations.",
         ["Legal Advisory Services", "Agreement Drafting and Review", "Legal Documentation Support",
          "Due Diligence Assistance", "Legal Procedure Consultation", "Notarization and Attestation Support",
          "Legal Verification Services"]),
        ("property-consultancy", "Property Consultancy", "Home",
         "End-to-end property verification, registration, and transaction support across Bangladesh.",
         ["Property Verification", "Land Registration Assistance", "Mutation Assistance",
          "Property Documentation", "Deed Verification and Review", "Ownership Transfer Assistance",
          "Property Transaction Support"]),
        ("corporate-consultancy", "Corporate Consultancy", "Building2",
         "Strategic corporate advisory and documentation to keep your business compliant and growing.",
         ["Company Documentation", "Corporate Advisory Services", "Regulatory Compliance Support",
          "Business Documentation Assistance", "Corporate Governance Support",
          "Trade License Assistance", "Business Registration Support"]),
        ("foreign-poa", "Foreign Power of Attorney", "Globe",
         "Complete POA preparation, verification, attestation, and execution for Bangladeshi expatriates worldwide.",
         ["POA Drafting and Preparation", "Attestation and Legalization", "Overseas Client Support",
          "Property-related POA", "Corporate POA Services", "Personal Matter POA",
          "Legal Compliance Verification"]),
        ("bank-loan-documentation", "Bank Loan & Financial Documentation", "Landmark",
         "Full documentation support for home loans, mortgages, and business financing.",
         ["Home Loan Documentation Support", "Mortgage Documentation",
          "Personal and Business Loan Documentation", "Banking Documentation Assistance",
          "Loan Application Preparation", "Financial Compliance Documentation",
          "Liaison with Financial Institutions"]),
        ("documentation-support", "Documentation Support", "FileText",
         "Professional preparation and processing of all legal and corporate documents.",
         ["Document Drafting and Review", "Notarization Services", "Government Document Processing",
          "Affidavit Preparation", "Certificate Attestation", "Document Translation Support",
          "Record Management Assistance"]),
    ]
    for i, (slug, title, icon, desc, items) in enumerate(services_data):
        svc = models.Service(order=i, slug=slug, title=title, icon=icon, description=desc)
        db.add(svc)
        db.flush()
        for j, item in enumerate(items):
            db.add(models.ServiceItem(service_id=svc.id, order=j, item=item))
    db.commit()
    print("Services seeded.")

# ── Why Choose ─────────────────────────────────────────────────────────────────
if not db.query(models.WhyChoose).first():
    items = [
        ("Professional Experience Since 2013", "Award"),
        ("Officially Registered Since 2021", "BadgeCheck"),
        ("Experienced Consultant Team", "Users"),
        ("Trusted by Corporate Clients", "Building2"),
        ("Legal & Property Support", "Scale"),
        ("Corporate Documentation Expertise", "FileText"),
        ("Foreign POA Assistance", "Globe"),
        ("Bank Loan Documentation", "Landmark"),
        ("Transparency & Integrity", "ShieldCheck"),
        ("Client-Centered Approach", "Heart"),
    ]
    db.add_all([models.WhyChoose(order=i, title=t, icon=ic) for i, (t, ic) in enumerate(items)])
    db.commit()
    print("Why Choose seeded.")

# ── Industries ─────────────────────────────────────────────────────────────────
if not db.query(models.Industry).first():
    names = [
        "Real Estate & Property Development", "Corporate Organizations",
        "Small & Medium Enterprises (SMEs)", "Financial Institutions",
        "Travel & Tourism Companies", "Trading & Commercial Businesses",
        "Construction & Development Firms", "Individual Clients",
        "Non-Resident Bangladeshis (NRBs)",
    ]
    db.add_all([models.Industry(order=i, name=n) for i, n in enumerate(names)])
    db.commit()
    print("Industries seeded.")

# ── Core Values ────────────────────────────────────────────────────────────────
if not db.query(models.CoreValue).first():
    values = [
        ("Integrity", "ShieldCheck", "We conduct our business with honesty, accountability, and ethical responsibility."),
        ("Professionalism", "Award", "We maintain the highest standards in every service we provide."),
        ("Excellence", "Star", "We continuously strive to exceed expectations through quality and innovation."),
        ("Trust", "Handshake", "We build long-term relationships through reliability, transparency, and consistent results."),
        ("Commitment", "Target", "We remain dedicated to protecting our clients' interests and achieving successful outcomes."),
    ]
    db.add_all([models.CoreValue(order=i, title=t, icon=ic, desc=d) for i, (t, ic, d) in enumerate(values)])
    db.commit()
    print("Core values seeded.")

# ── Partners ───────────────────────────────────────────────────────────────────
if not db.query(models.Partner).first():
    partners = [
        ("Dutch-Bangla Bank Ltd.", "DBBL", "#005DAA"),
        ("BRAC Bank Limited", "BRAC", "#E30613"),
        ("Eastern Bank Limited", "EBL", "#003087"),
        ("Standard Chartered", "SCB", "#1B7340"),
        ("RAJUK Authority", "RAJUK", "#8B1A1A"),
        ("Bangladesh Bar Council", "BBC", "#1A1A2E"),
        ("National Housing Authority", "NHA", "#2D6A4F"),
        ("Navana Real Estate", "NRE", "#C9A84C"),
        ("City Bank Limited", "CBL", "#6A0572"),
        ("Mutual Trust Bank", "MTB", "#0077B6"),
        ("Islami Bank Bangladesh", "IBBL", "#006633"),
        ("Sonali Bank Limited", "SBL", "#005F6A"),
    ]
    db.add_all([models.Partner(order=i, name=n, initials=ini, color=c) for i, (n, ini, c) in enumerate(partners)])
    db.commit()
    print("Partners seeded.")

db.close()
print("\nDatabase initialization complete.")
