


import base64
import json
from openai import OpenAI

client = OpenAI()

# Function to encode the image
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

# Path to your image
image_path = "f3.jpg"

# Getting the base64 string
base64_image = encode_image(image_path)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": '''Il y a une assiette avec des aliments dans cette image. Retourne-moi une réponse JSON tu listera les aliments qui sont dans lassiette avec une estimation en gramme de chaque un , tu devra reconnaitre les aliments en fonction de cette liste et pas autres chose donc dans ta reponse tu utilise les nom exacte des aliments qui figure dans la liste : # Pomme, Banane, Orange, Raisin, Fraise, Poire, Ananas, Pastèque, Myrtille, Kiwi, Poulet, Boeuf, Porc, Dinde, Agneau, Canard, Lapin, Saucisson, Saumon, Thon, Cabillaud,
#  Truite, Maquereau, Sardine, Crevette, Homard, Céréale, Riz, Avoine, Orge, Quinoa, Blé, Sarrasin, Millet, Dattes, Abricots secs, Noisettes, Amandes,
#  Noix de cajou, Noix de pécan, Pistaches, Beurre, Fromage, Lait, Yaourt, Yaourt grec, Crème fraîche, Mozzarella, Parmesan, Oeuf, Jambon, Saucisse, Salami, Bacon, Tomate,
#  Carotte, Laitue, Brocoli, Concombre, Pomme de terre, Courgette, Aubergine, Épinards, Chou kale, Choux-fleurs, Navet, Poireau, Bette, Chou de Bruxelles, Artichaut, Pois chiches,
#  Lentilles, Haricots, Soja, Fèves, Tofu, Café, Thé, Jus d'orange, Vin rouge, Coca, Limonade, Cappuccino, Latte, Eau, Huile d'olive, Vinaigre, Ketchup, Moutarde, Sel, Poivre noir, Miel, 
# Confiture, Chocolat noir, Gâteau, Croissant, Pain au chocolat, Tarte aux pommes, Baguette, Pain complet, Biscottes, Gratin dauphinois, Quiche lorraine, Pizza, Lasagne, Ratatouille, Soupe de légumes,
#  Bouillon de poulet, Soupe de tomates, Soupe miso, Spaghetti, Macaroni, Ravioli, Penne, Gnocchi, Pancake, Crêpe, Couscous, Salade verte, Olivier salade, Glace à la vanille, Tiramisu, Mousse au chocolat,
#  Flan, Cupcake, Riz au lait, Salade de fruits, Pâte à tartiner, Chips, Nachos, Oignons frits, Amandes grillées.  ''',
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

# Extract the JSON from the assistant's response
json_response = response.choices[0].message.content

# Parse the JSON content
try:
    data = json.loads(json_response.split("```json")[1].split("```")[0])
    print(data)
except json.JSONDecodeError:
    print("Failed to parse JSON response:", json_response)







#dataset : 

# Pomme, Banane, Orange, Raisin, Fraise, Poire, Ananas, Pastèque, Myrtille, Kiwi, Poulet, Boeuf, Porc, Dinde, Agneau, Canard, Lapin, Saucisson, Saumon, Thon, Cabillaud,
#  Truite, Maquereau, Sardine, Crevette, Homard, Céréale, Riz, Avoine, Orge, Quinoa, Blé, Sarrasin, Millet, Dattes, Abricots secs, Noisettes, Amandes,
#  Noix de cajou, Noix de pécan, Pistaches, Beurre, Fromage, Lait, Yaourt, Yaourt grec, Crème fraîche, Mozzarella, Parmesan, Oeuf, Jambon, Saucisse, Salami, Bacon, Tomate,
#  Carotte, Laitue, Brocoli, Concombre, Pomme de terre, Courgette, Aubergine, Épinards, Chou kale, Choux-fleurs, Navet, Poireau, Bette, Chou de Bruxelles, Artichaut, Pois chiches,
#  Lentilles, Haricots, Soja, Fèves, Tofu, Café, Thé, Jus d'orange, Vin rouge, Coca, Limonade, Cappuccino, Latte, Eau, Huile d'olive, Vinaigre, Ketchup, Moutarde, Sel, Poivre noir, Miel, 
# Confiture, Chocolat noir, Gâteau, Croissant, Pain au chocolat, Tarte aux pommes, Baguette, Pain complet, Biscottes, Gratin dauphinois, Quiche lorraine, Pizza, Lasagne, Ratatouille, Soupe de légumes,
#  Bouillon de poulet, Soupe de tomates, Soupe miso, Spaghetti, Macaroni, Ravioli, Penne, Gnocchi, Pancake, Crêpe, Couscous, Salade verte, Olivier salade, Glace à la vanille, Tiramisu, Mousse au chocolat,
#  Flan, Cupcake, Riz au lait, Salade de fruits, Pâte à tartiner, Chips, Nachos, Oignons frits, Amandes grillées.