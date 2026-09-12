-- Tesla Cars India Relational Database Schema
-- Compatible with PostgreSQL 14+ / MySQL 8+ / SQLite 3

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'viewer')),
    name VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tesla_models (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    tagline VARCHAR(255),
    category VARCHAR(32) NOT NULL,
    body_type VARCHAR(64) NOT NULL,
    status_label VARCHAR(64) NOT NULL,
    is_officially_available BOOLEAN DEFAULT FALSE,
    data_status VARCHAR(32) DEFAULT 'Estimated',
    starting_price_inr_min BIGINT NOT NULL,
    starting_price_inr_max BIGINT NOT NULL,
    starting_price_display VARCHAR(64) NOT NULL,
    price_note TEXT,
    hero_image TEXT NOT NULL,
    exterior_image TEXT NOT NULL,
    interior_image TEXT NOT NULL,
    overview TEXT NOT NULL,
    indian_market_info TEXT,
    wltp_range_km INTEGER NOT NULL,
    real_world_range_km INTEGER NOT NULL,
    acceleration_0_to_100 NUMERIC(4, 2) NOT NULL,
    top_speed_kmh INTEGER NOT NULL,
    seating_capacity INTEGER NOT NULL,
    drive_type VARCHAR(64) NOT NULL,
    battery_capacity_kwh NUMERIC(5, 2) NOT NULL,
    charging_connector VARCHAR(64) NOT NULL,
    ac_charging_kw NUMERIC(4, 1) NOT NULL,
    dc_fast_charging_kw INTEGER NOT NULL,
    dc_charging_10_to_80_min INTEGER NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    last_updated VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tesla_variants (
    id VARCHAR(64) PRIMARY KEY,
    model_id VARCHAR(64) NOT NULL REFERENCES tesla_models(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    trim VARCHAR(64) NOT NULL,
    price_inr BIGINT NOT NULL,
    price_display VARCHAR(64) NOT NULL,
    data_status VARCHAR(32) DEFAULT 'Estimated',
    acceleration_0_to_100 NUMERIC(4, 2) NOT NULL,
    top_speed_kmh INTEGER NOT NULL,
    range_wltp_km INTEGER NOT NULL,
    battery_kwh NUMERIC(5, 2) NOT NULL,
    drive_type VARCHAR(64) NOT NULL,
    motor_power_hp INTEGER NOT NULL,
    torque_nm INTEGER NOT NULL,
    availability_status VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS specifications (
    id VARCHAR(64) PRIMARY KEY,
    model_id VARCHAR(64) UNIQUE NOT NULL REFERENCES tesla_models(id) ON DELETE CASCADE,
    battery_capacity VARCHAR(128) NOT NULL,
    battery_type VARCHAR(128) NOT NULL,
    claimed_range VARCHAR(128) NOT NULL,
    real_world_est_range VARCHAR(128) NOT NULL,
    motor_configuration VARCHAR(128) NOT NULL,
    power VARCHAR(64) NOT NULL,
    torque VARCHAR(64) NOT NULL,
    acceleration_0_to_100 VARCHAR(64) NOT NULL,
    top_speed VARCHAR(64) NOT NULL,
    ground_clearance VARCHAR(64) NOT NULL,
    length VARCHAR(64) NOT NULL,
    width VARCHAR(64) NOT NULL,
    height VARCHAR(64) NOT NULL,
    wheelbase VARCHAR(64) NOT NULL,
    kerb_weight VARCHAR(64) NOT NULL,
    boot_space VARCHAR(64) NOT NULL,
    frunk_space VARCHAR(64) NOT NULL,
    seating_capacity VARCHAR(32) NOT NULL,
    drive_type VARCHAR(64) NOT NULL,
    charging_connector VARCHAR(64) NOT NULL,
    ac_charging VARCHAR(64) NOT NULL,
    dc_fast_charging VARCHAR(64) NOT NULL,
    suspension VARCHAR(128),
    brakes VARCHAR(128),
    wheels VARCHAR(128)
);

CREATE TABLE IF NOT EXISTS prices (
    id VARCHAR(64) PRIMARY KEY,
    model_id VARCHAR(64) NOT NULL REFERENCES tesla_models(id) ON DELETE CASCADE,
    variant_id VARCHAR(64) REFERENCES tesla_variants(id) ON DELETE CASCADE,
    ex_showroom_inr BIGINT NOT NULL,
    registration_rto_inr BIGINT NOT NULL,
    insurance_inr BIGINT NOT NULL,
    tcs_inr BIGINT NOT NULL,
    fastag_charges_inr BIGINT NOT NULL,
    gst_percent NUMERIC(4, 2) DEFAULT 5.0,
    state_subsidy_inr BIGINT DEFAULT 0,
    estimated_on_road_inr BIGINT NOT NULL,
    customs_duty_note TEXT,
    last_updated VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS charging_stations (
    id VARCHAR(64) PRIMARY KEY,
    city VARCHAR(128) NOT NULL,
    state VARCHAR(128) NOT NULL,
    location_name VARCHAR(255) NOT NULL,
    charger_type VARCHAR(64) NOT NULL,
    charging_speed_kw INTEGER NOT NULL,
    stalls_count INTEGER DEFAULT 2,
    status VARCHAR(64) NOT NULL,
    is_verified_operational BOOLEAN DEFAULT FALSE,
    address TEXT NOT NULL,
    latitude NUMERIC(9, 6) NOT NULL,
    longitude NUMERIC(9, 6) NOT NULL,
    connector_type VARCHAR(64) NOT NULL,
    navigation_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news (
    id VARCHAR(64) PRIMARY KEY,
    headline VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(64) NOT NULL,
    published_date VARCHAR(32) NOT NULL,
    summary TEXT NOT NULL,
    full_content TEXT NOT NULL,
    source_name VARCHAR(128) NOT NULL,
    source_url TEXT,
    verified_status VARCHAR(64) NOT NULL,
    image_url TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS faqs (
    id VARCHAR(64) PRIMARY KEY,
    category VARCHAR(64) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    is_popular BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS comparison_vehicles (
    id VARCHAR(64) PRIMARY KEY,
    brand VARCHAR(128) NOT NULL,
    model VARCHAR(128) NOT NULL,
    variant VARCHAR(128) NOT NULL,
    is_tesla BOOLEAN DEFAULT FALSE,
    price_inr BIGINT NOT NULL,
    price_display VARCHAR(64) NOT NULL,
    range_claimed_km INTEGER NOT NULL,
    range_real_world_km INTEGER NOT NULL,
    battery_kwh NUMERIC(5, 2) NOT NULL,
    acceleration_0_to_100 NUMERIC(4, 2) NOT NULL,
    top_speed_kmh INTEGER NOT NULL,
    dc_fast_charging_time_min VARCHAR(64) NOT NULL,
    safety_rating VARCHAR(64) NOT NULL,
    motor_power_hp INTEGER NOT NULL,
    boot_space_liters INTEGER NOT NULL,
    running_cost_per_km NUMERIC(5, 2) NOT NULL,
    warranty TEXT NOT NULL,
    service_network TEXT NOT NULL,
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS features (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT NOT NULL,
    india_availability_note TEXT NOT NULL,
    icon VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS locations (
    id VARCHAR(64) PRIMARY KEY,
    city VARCHAR(128) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL,
    opening_status VARCHAR(64) NOT NULL,
    is_official_tesla_entity BOOLEAN DEFAULT FALSE,
    address TEXT NOT NULL,
    contact_info VARCHAR(255),
    notes TEXT,
    map_query VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS announcements (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    badge VARCHAR(64) NOT NULL,
    message TEXT NOT NULL,
    cta_text VARCHAR(64),
    cta_link VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for rapid query performance
CREATE INDEX IF NOT EXISTS idx_tesla_models_slug ON tesla_models(slug);
CREATE INDEX IF NOT EXISTS idx_tesla_variants_model ON tesla_variants(model_id);
CREATE INDEX IF NOT EXISTS idx_prices_model ON prices(model_id);
CREATE INDEX IF NOT EXISTS idx_charging_city ON charging_stations(city);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
