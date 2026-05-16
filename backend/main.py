from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# DB接続
conn = sqlite3.connect("attendance.db", check_same_thread=False)
cursor = conn.cursor()

# テーブル作成
cursor.execute("""
CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clock_in_time TEXT,
    clock_out_time TEXT
)
""")
conn.commit()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/clockin")
def clock_in():

    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute(
        "INSERT INTO attendance (clock_in_time) VALUES (?)",
        (now,)
    )

    conn.commit()

    return {
        "message": f"出勤記録完了: {now}"
    }

@app.get("/records")
def get_records():

    cursor.execute(
        "SELECT * FROM attendance"
    )

    records = cursor.fetchall()

    return {
        "records": records
    }

@app.post("/clockout")
def clock_out():

    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute("""
        UPDATE attendance
        SET clock_out_time = ?
        WHERE id = (
            SELECT id
            FROM attendance
            WHERE clock_out_time IS NULL
            ORDER BY id DESC
            LIMIT 1
        )
    """, (now,))

    conn.commit()

    return {
        "message": f"退勤記録完了: {now}"
    }