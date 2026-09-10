"""
Import and clean supply chain CSV datasets into MongoDB using pymongo.
Target database: supply_chain_db
Collections:
  - price_index (from supply_chain_price_index.csv)
  - pantry_inventory (from pantry_ingredients_shelf_life(1).csv)
  - transit_logs (from transit_degradation_logs.csv)
"""

import os
import sys
import csv
import argparse
from datetime import datetime
from pathlib import Path
from pprint import pprint

import pymongo
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, ConnectionFailure

# File definitions: (target_collection_name, [list of possible file names])
DATASETS = [
    {
        "collection": "price_index",
        "filenames": ["supply_chain_price_index.csv", "supply_chain_price_index(1).csv"],
        "cleaner": "clean_price_index"
    },
    {
        "collection": "pantry_inventory",
        "filenames": ["pantry_ingredients_shelf_life(1).csv", "pantry_ingredients_shelf_life.csv"],
        "cleaner": "clean_pantry_inventory"
    },
    {
        "collection": "transit_logs",
        "filenames": ["transit_degradation_logs.csv"],
        "cleaner": "clean_transit_logs"
    }
]


def find_file(filenames, base_dirs=None):
    """Find the first existing file from given candidates across search directories."""
    if base_dirs is None:
        base_dirs = [
            Path.cwd(),
            Path(__file__).parent if "__file__" in globals() else Path.cwd(),
            Path.cwd() / "data",
            (Path(__file__).parent / "data") if "__file__" in globals() else Path.cwd() / "data",
            Path.home() / "Downloads"
        ]
    
    for bdir in base_dirs:
        for fname in filenames:
            candidate = bdir / fname
            if candidate.is_file():
                return candidate
    return None


def clean_price_index(row):
    """Clean and cast supply_chain_price_index row."""
    return {
        "record_id": row["record_id"].strip(),
        "date": datetime.strptime(row["date"].strip(), "%Y-%m-%d"),
        "market": row["market"].strip(),
        "commodity": row["commodity"].strip(),
        "farm_gate_price_inr_per_kg": float(row["farm_gate_price_inr_per_kg"].strip()),
        "wholesale_price_inr_per_kg": float(row["wholesale_price_inr_per_kg"].strip()),
        "retail_price_inr_per_kg": float(row["retail_price_inr_per_kg"].strip()),
        "price_index": float(row["price_index"].strip()),
    }


def clean_pantry_inventory(row):
    """Clean and cast pantry_ingredients_shelf_life row."""
    return {
        "record_id": row["record_id"].strip(),
        "ingredient": row["ingredient"].strip(),
        "quantity": float(row["quantity"].strip()),
        "unit": row["unit"].strip(),
        "storage_condition": row["storage_condition"].strip(),
        "expected_shelf_life_days": int(row["expected_shelf_life_days"].strip()),
        "remaining_shelf_life_days": int(row["remaining_shelf_life_days"].strip()),
    }


def clean_transit_logs(row):
    """Clean and cast transit_degradation_logs row."""
    return {
        "log_id": row["log_id"].strip(),
        "dispatch_date": datetime.strptime(row["dispatch_date"].strip(), "%Y-%m-%d"),
        "route": row["route"].strip(),
        "produce": row["produce"].strip(),
        "transit_duration_hours": int(row["transit_duration_hours"].strip()),
        "avg_temperature_c": float(row["avg_temperature_c"].strip()),
        "avg_humidity_pct": int(row["avg_humidity_pct"].strip()),
        "vibration_index": float(row["vibration_index"].strip()),
        "estimated_damage_pct": float(row["estimated_damage_pct"].strip()),
        "freshness_score": float(row["freshness_score"].strip()),
    }


CLEANERS = {
    "clean_price_index": clean_price_index,
    "clean_pantry_inventory": clean_pantry_inventory,
    "clean_transit_logs": clean_transit_logs
}


def get_mongo_client(uri="mongodb://localhost:27017/", timeout_ms=2500):
    """
    Connect to MongoDB server using pymongo.MongoClient.
    Falls back to mongomock if the local MongoDB daemon is unreachable.
    """
    try:
        client = MongoClient(uri, serverSelectionTimeoutMS=timeout_ms)
        # Test server connectivity
        client.admin.command("ping")
        print(f"[*] Successfully connected to live MongoDB at: {uri}")
        return client, False
    except (ServerSelectionTimeoutError, ConnectionFailure) as err:
        print(f"[!] Warning: Unable to connect to MongoDB server at {uri} ({err})")
        print(f"[*] Falling back to in-memory mongomock client for execution and verification...")
        try:
            import mongomock
            mock_client = mongomock.MongoClient()
            return mock_client, True
        except ImportError:
            print("[X] ERROR: mongomock is not installed. Please start MongoDB or install mongomock.")
            raise err


def import_csv_to_mongo(client, db_name="supply_chain_db"):
    db = client[db_name]
    print(f"\n{'='*70}")
    print(f" DATABASE: '{db_name}'")
    print(f"{'='*70}")

    for dataset in DATASETS:
        col_name = dataset["collection"]
        cleaner_fn = CLEANERS[dataset["cleaner"]]
        filepath = find_file(dataset["filenames"])

        if not filepath:
            print(f"[X] Could not find any of files: {dataset['filenames']}")
            continue

        print(f"\n--> Processing '{filepath.name}' into collection '{col_name}'...")

        cleaned_records = []
        with open(filepath, mode="r", encoding="utf-8-sig") as csv_file:
            reader = csv.DictReader(csv_file)
            for row in reader:
                record = cleaner_fn(row)
                cleaned_records.append(record)

        col = db[col_name]
        # Clear existing records to ensure fresh idempotent run
        col.delete_many({})

        if cleaned_records:
            result = col.insert_many(cleaned_records)
            print(f"    Inserted {len(result.inserted_ids)} documents.")
        else:
            print("    Warning: No records found to insert.")

    # Verification step
    print(f"\n{'='*70}")
    print(f" VERIFICATION & COLLECTION SAMPLES")
    print(f"{'='*70}")

    for dataset in DATASETS:
        col_name = dataset["collection"]
        col = db[col_name]
        count = col.count_documents({})
        sample = col.find_one()

        print(f"\n--- Collection: '{col_name}' ---")
        print(f"Total Document Count: {count}")
        print("Sample Document:")
        pprint(sample)
        
        # Verify types in sample
        if sample:
            print("Field Types in Sample:")
            for k, v in sample.items():
                if k != "_id":
                    print(f"  - {k}: {type(v).__name__} (value: {repr(v)})")


def main():
    parser = argparse.ArgumentParser(description="Import supply chain CSVs into MongoDB.")
    parser.add_argument(
        "--uri",
        default=os.environ.get("MONGO_URI", "mongodb://localhost:27017/"),
        help="MongoDB connection URI (default: mongodb://localhost:27017/ or $MONGO_URI)"
    )
    parser.add_argument(
        "--db",
        default="supply_chain_db",
        help="Database name (default: supply_chain_db)"
    )
    args = parser.parse_args()

    client, is_mock = get_mongo_client(uri=args.uri)
    import_csv_to_mongo(client, db_name=args.db)
    print(f"\n{'='*70}")
    if is_mock:
        print("[*] Completed successfully using in-memory mock MongoDB (mongomock).")
        print("    To run against a live MongoDB server, ensure 'mongod' is running or pass --uri <MONGO_URI>.")
    else:
        print("[*] Completed successfully on live MongoDB server.")
    print(f"{'='*70}\n")


if __name__ == "__main__":
    main()
