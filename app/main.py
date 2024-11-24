


from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pymongo.mongo_client import MongoClient
import base64
import json
import pandas as pd
from pymongo.mongo_client import MongoClient
from pydantic import BaseModel

import base64
import json
import pandas as pd
from openai import OpenAI  # Ensure you've configured OpenAI credentials
from passlib.context import CryptContext

from pymongo.mongo_client import MongoClient

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pymongo.mongo_client import MongoClient
from passlib.context import CryptContext
from pydantic import BaseModel
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends




# MongoDB connection
uri = "mongodb+srv://yanis:123@cluster0.x0kah.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client["Cluster0"]
users_collection = db["Users"]





SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")














# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


db = client["Cluster0"]
collection = db["Meal"]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pymongo import MongoClient

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter()







@app.post("/register")
async def register(user: dict):
    existing_user = users_collection.find_one({"username": user["username"]})
    if existing_user:
        return JSONResponse(content={"error": "Username already taken"}, status_code=400)
    
    hashed_password = hash_password(user["password"])
    user_data = {"username": user["username"], "password": hashed_password}
    users_collection.insert_one(user_data)
    return JSONResponse(content={"message": "User registered successfully"}, status_code=201)


@app.post("/login")
async def login(user: dict):
    db_user = users_collection.find_one({"username": user["username"]})
    if not db_user or not verify_password(user["password"], db_user["password"]):
        return JSONResponse(content={"error": "Invalid credentials"}, status_code=401)

    access_token = create_access_token(data={"sub": user["username"]})
    return JSONResponse(content={"access_token": access_token, "token_type": "bearer"})






userinfo_collection = db["UserInfo"]

@app.post("/save_user_info")
async def save_user_info(data: dict, username: str = Depends(get_current_user)):
    age = data.get("age")
    if not age:
        return JSONResponse(content={"error": "Age is required"}, status_code=400)

    # Check if user info already exists
    existing_info = userinfo_collection.find_one({"username": username})
    if existing_info:
        return JSONResponse(content={"error": "User info already exists"}, status_code=400)

    user_info_data = {
        "username": username,
        "age": age,
    }

    userinfo_collection.insert_one(user_info_data)
    return JSONResponse(content={"message": "User information saved successfully"}, status_code=201)







from bson import ObjectId
import json

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)




@app.get("/user/meals", response_class=JSONResponse)
async def get_user_meals(username: str = Depends(get_current_user)):
    try:
        user_info = users_collection.find_one({"username": username})
        if not user_info:
            return JSONResponse(content={"error": "User not found"}, status_code=404)

        # Convert user_info ObjectId to string
        user_info['_id'] = str(user_info['_id'])

        meals = list(collection.find({"username": username}))  

        # Convert meals ObjectIds to strings
        for meal in meals:
            meal['_id'] = str(meal['_id'])

        return JSONResponse(
            content={"user": user_info, "meals": meals}, 
            status_code=200
        )
    except Exception as e:
        return JSONResponse(content={"error": "Failed to fetch data", "details": str(e)}, status_code=500)






from datetime import datetime
from fastapi import Depends
from fastapi.responses import JSONResponse

@app.post("/save-meal", response_class=JSONResponse)
async def save_meal(meal_data: dict, username: str = Depends(get_current_user)):
    try:
        # Add the username to the meal data
        meal_data["username"] = username

        # Add the current date and time (timestamp)
        meal_data["created_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Insert the meal data into the collection
        collection.insert_one(meal_data)

        return JSONResponse(content={"message": "Meal saved successfully"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": "Failed to save meal", "details": str(e)}, status_code=500)



class User(BaseModel):
    username: str
    password: str






client = OpenAI()

df = pd.read_csv('nutrition_data.csv')


import csv

# Load the CSV file and convert all entries to lowercase
def load_csv_data(csv_file_path):
    food_data = {}

    with open(csv_file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            food_name = row["Aliment"].strip().lower()  # Convert food name to lowercase
            food_data[food_name] = {
                "category": row["Catégorie"].strip().lower(),
                "cal": float(row["Calories (kcal/100g)"]),
                "prot": float(row["Protéines (g/100g)"]),
                "glu": float(row["Glucides (g/100g)"]),
                "lip": float(row["Lipides (g/100g)"]),
            }

    return food_data

food_data = load_csv_data("nutrition_data.csv")

def calculer_nutriments(nom, poids, food_data):
    nom = nom.strip().lower()  # Convert input food name to lowercase
    if nom in food_data:
        # Get nutrients per 100g
        categorie = food_data[nom]["category"]
        calories_per_100g = food_data[nom]["cal"]
        proteins_per_100g = food_data[nom]["prot"]
        carbs_per_100g = food_data[nom]["glu"]
        fats_per_100g = food_data[nom]["lip"]
        
        # Calculate total values based on provided weight
        total_calories = (calories_per_100g * poids) / 100
        total_proteins = (proteins_per_100g * poids) / 100
        total_carbs = (carbs_per_100g * poids) / 100
        total_fats = (fats_per_100g * poids) / 100
        
        # Return all calculated nutrients
        return {
            "nom": nom,
            "categorie":categorie,
            "poids (g)": poids,
            "calories": round(total_calories, 2),
            "proteins (g)": round(total_proteins, 2),
            "glucides (g)": round(total_carbs, 2),
            "lipides (g)": round(total_fats, 2)
        }
    else:
        return {
            "nom": nom,
            "error": "Food item not found in database"
        }





def encode_image(image_bytes):
    return base64.b64encode(image_bytes).decode("utf-8")

@app.post("/analyze-image", response_class=JSONResponse)
async def analyze_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    base64_image = encode_image(image_bytes)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": '''Il y a une assiette avec des aliments dans cette image. Retourne-moi une réponse JSON tu listera les aliments qui sont dans lassiette avec une estimation en gramme de chaque un , tu devra reconnaitre les aliments en fonction de cette liste et pas autres chose ( tu ne doit pas donner des noms daliments qui ne figure pas sur cette liste ! )  donc dans ta reponse tu utilise les nom exacte des aliments qui figure dans la liste : 
Pomme, Banane, Orange, Raisin, Fraise, Poire, Ananas, sauce , Pastèque, Myrtille, Kiwi, Poulet, Boeuf, Porc, Dinde, Agneau, Canard, Lapin, Saucisson, Saumon, Thon, Cabillaud, Truite, Maquereau, Sardine, Crevette, Homard, Céréale, Riz, Avoine, Orge, Quinoa, Blé, Sarrasin, Millet, Dattes, Abricots secs, Noisettes, Amandes, Noix de cajou, Noix de pécan, Pistaches, Beurre, Fromage, Lait, Yaourt, Yaourt grec, Crème fraîche, Mozzarella, Parmesan, Oeuf, Jambon, Saucisse, Salami, Bacon, Tomate, Carotte, Laitue, Brocoli, Oignon, Concombre, Pomme de terre, Courgette, Aubergine, Épinards, Chou kale, Choux-fleurs, Navet, Poireau, Bette, Chou de Bruxelles, Artichaut, Pois chiches, Lentilles, Haricots, Soja, Fèves, Tofu, Café, Thé, Jus d'orange, Vin rouge, Coca, Limonade, Cappuccino, Latte, Eau, Huile d'olive, Vinaigre, Ketchup, Moutarde, Sel, Poivre noir, Miel, Confiture, Chocolat noir, Gâteau, Croissant, Pain au chocolat, Tarte aux pommes, Baguette, Pain complet, Biscottes, Gratin dauphinois, Quiche lorraine, Pizza, Lasagne, Ratatouille, Soupe de légumes, Bouillon de poulet, Soupe de tomates, Soupe miso, Spaghetti, Macaroni, Ravioli, Penne, Gnocchi, Pancake, Crêpe, Couscous, Salade verte, Olivier salade, Glace à la vanille, Tiramisu, Mousse au chocolat, Flan, Cupcake, Riz au lait, Salade de fruits, Pâte à tartiner, Chips, Nachos, Oignons frits, Amandes grillées, Beurre de cacahuète, Beurre salé, Couscous cuit, Houmous, Kefir, Pomme de terre cuite, Frites, Pain pita, Tortilla, Omelette, Bacon cuit, Saumon fumé, Crevette cuite, Pizza Margherita, Poulet rôti, Purée de pommes de terre.  et voici a quoi ta reponse devrais resembler : ```json
{
  "aliments": [
    {
      "nom": "Pâtes",
      "estimation_grammes": 200
    },
    {
      "nom": "Fromage",
      "estimation_grammes": 50
    },
    {
      "nom": "Jambon",
      "estimation_grammes": 50
    }
  ]
}
``` ''',
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        },
                    },
                ],
            }
        ],
    )

    json_response = response.choices[0].message.content
    print("Raw JSON Response from OpenAI:", json_response)  # Debugging print

    try:
        data = json.loads(json_response.split("```json")[1].split("```")[0])
        aliments = data.get("aliments", [])

        resultats = []
        total_calories = 0

        for item in aliments:
            nom = item.get("nom")
            poids = item.get("estimation_grammes", 0)
            resultat = calculer_nutriments(nom, poids, food_data)
            if "calories" in resultat:
                total_calories += resultat["calories"]
            resultats.append(resultat)

        final_response = {
            "aliments": resultats,
            "total_calories": round(total_calories, 2)
        }

        
        # Print the final JSON response for debugging
        print("Final JSON Response:", final_response)

        return JSONResponse(content=final_response)
    except json.JSONDecodeError:
        print("Failed to parse JSON response")  # Debugging print
        return JSONResponse(content={"error": "Failed to parse JSON response"}, status_code=500)






