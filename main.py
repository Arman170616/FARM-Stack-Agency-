from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conn = sqlite3.connect('agency.db', check_same_thread=False)
cursor = conn.cursor()

# Create table

cursor.execute('''CREATE TABLE IF NOT EXISTS services
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)''')
cursor.execute('''CREATE TABLE IF NOT EXISTS portfolio
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, project_name TEXT, client_name TEXT, description TEXT)''')
cursor.execute('''CREATE TABLE IF NOT EXISTS testimonials
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, client_name TEXT, testimonial TEXT)''')

class Service(BaseModel):
    name: str
    description: str

class Portfolio(BaseModel):
    project_name: str
    client_name: str
    description: str

class Testimonial(BaseModel):
    client_name: str
    testimonial: str


@app.post("/services/")
def create_service(service: Service):
    conn = sqlite3.connect('agency.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO services (name, description) VALUES (?, ?)",
                   (service.name, service.description))
    conn.commit()
    conn.close()
    return {"message": "Service created successfully"}

@app.get("/services/")
def get_services():
    cursor.execute("SELECT * FROM services")
    services = cursor.fetchall()
    return services

@app.get("/services/{service_id}/")
def get_service(service_id: int):
    cursor.execute(f"SELECT * FROM services WHERE id = {service_id}")
    service = cursor.fetchone()
    if service:
        return service
    raise HTTPException(status_code=404, detail="Service not found")

@app.put("/services/{service_id}/")
def update_service(service_id: int, service: Service):
    cursor.execute(f"UPDATE services SET name = '{service.name}', description = '{service.description}' WHERE id = {service_id}")
    conn.commit()
    return {"message": "Service updated successfully"}

@app.delete("/services/{service_id}/")
def delete_service(service_id: int):
    cursor.execute(f"DELETE FROM services WHERE id = {service_id}")
    conn.commit()
    return {"message": "Service deleted successfully"}



# Portfolio
@app.post("/portfolio/")
def create_portfolio(portfolio: Portfolio):
    conn = sqlite3.connect('agency.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO portfolio (project_name, client_name, description) VALUES (?, ?, ?)",
                   (portfolio.project_name, portfolio.client_name, portfolio.description))
    conn.commit()
    conn.close()
    return portfolio


@app.get("/portfolio/")
def get_portfolio():
    cursor.execute("SELECT * FROM portfolio")
    portfolio = cursor.fetchall()
    return portfolio

@app.get("/portfolio/{portfolio_id}/")
def get_portfolio(portfolio_id: int):
    cursor.execute(f"SELECT * FROM portfolio WHERE id = {portfolio_id}")
    portfolio = cursor.fetchone()
    if portfolio:
        return portfolio
    raise HTTPException(status_code=404, detail="Portfolio not found")

@app.put("/portfolio/{portfolio_id}/")
def update_portfolio(portfolio_id: int, portfolio: Portfolio):
    cursor.execute(f"UPDATE portfolio SET project_name = '{portfolio.project_name}', client_name = '{portfolio.client_name}', description = '{portfolio.description}' WHERE id = {portfolio_id}")
    conn.commit()
    return portfolio

@app.delete("/portfolio/{portfolio_id}/")
def delete_portfolio(portfolio_id: int):
    cursor.execute(f"DELETE FROM portfolio WHERE id = {portfolio_id}")
    conn.commit()
    return {"message": "Portfolio deleted successfully"}



# Testimonials
@app.post("/testimonials/")
def create_testimonial(testimonial: Testimonial):
    conn = sqlite3.connect('agency.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO testimonials (client_name, testimonial) VALUES (?, ?)",
                   (testimonial.client_name, testimonial.testimonial))
    conn.commit()
    conn.close()
    return testimonial


@app.get("/testimonials/")
def get_testimonials():
    cursor.execute("SELECT * FROM testimonials")
    testimonials = cursor.fetchall()
    return testimonials

@app.get("/testimonials/{testimonial_id}/")
def get_testimonial(testimonial_id: int):
    cursor.execute(f"SELECT * FROM testimonials WHERE id = {testimonial_id}")
    testimonial = cursor.fetchone()
    if testimonial:
        return testimonial
    raise HTTPException(status_code=404, detail="Testimonial not found")

@app.put("/testimonials/{testimonial_id}/")
def update_testimonial(testimonial_id: int, testimonial: Testimonial):
    cursor.execute(f"UPDATE testimonials SET client_name = '{testimonial.client_name}', testimonial = '{testimonial.testimonial}' WHERE id = {testimonial_id}")
    conn.commit()
    return testimonial

@app.delete("/testimonials/{testimonial_id}/")
def delete_testimonial(testimonial_id: int):
    cursor.execute(f"DELETE FROM testimonials WHERE id = {testimonial_id}")
    conn.commit()
    return {"message": "Testimonial deleted successfully"}







if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)