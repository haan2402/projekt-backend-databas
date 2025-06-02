## Projekt - REST-webbtjänst
Denna del av projektet har jag skapat en REST-webbtjänst som innehåller funktioner som att logga in en behörig användare, lägga till, ändra eller radera en maträtt.
Webbtjänsten har stöd för CRUUD(Create, Read, Update och Delete), och använder JWT för skyddade delar av webbplatsen.

## Installation
API:et använder MongoDB Atlas som databas, och har använt mig av följande för att genomföra uppgiften:
-	Express
-	Mongoose
-	Jsonwebtoken
-	Cors
-	Dotenv
-	Bcrypt

För att komma igång med projektet körde jag följande kommando:
```bash
npm install
```

Kommando för att starta servern:
```bash
npm run start
```

## Funktioner
- Hämta och läsa ut en meny
- Lägga till ny maträtt
- Redigera en befintlig maträtt
- Radera en maträtt ur listan
- Inloggning av en användare med hjälp av JWT
- Validering vid inloggning

## Skapa en ny maträtt
För att skapa en ny maträtt som lagras i databasen gör man på följande sätt:
- Method: POST
- Data:
``` 
{
  "name": "Sorbet",
  "description": "Egengjord sorbet efter säsongens smaker, fråga efter kvällens variant",
  "price": 95,
  "category": "Efterrätt"
}
``` 
Svar vid giltig inmatning:
- 201
``` 
{
    "message": "Ny maträtt tillagd i menyn!"
}
``` 
Svar vid ogiltig inmatning:
- 400 
``` 
{
    "error": "Inmatning ogiltig, alla fält måste fyllas i!"
}
``` 

## Redigera en maträtt
För att redigera en befintlig maträtt ur listan:
- Method: PUT
- Data:
``` 
{
  "name": "Sorbet",
  "description": "Egengjord sorbet med jordgubbssmakt",
  "price": 105,
  "category": "Efterrätt"
}
``` 
Svar vid giltig inmatning:
``` 
{
    "message": "Maträtt är uppdaterad!"
}
``` 
Svar vid ogiltig inmatning:
- 500 
``` 
{
    "error": "Gick inte att ändra maträtt.."
}
``` 

## Inloggning
För att logga in en behörig användare:
- Method: POST
- Data:

``` 
{
    "username": "användarnamn",
    "password": "lösenord"
}
``` 
Svar:
- 201
``` 
{
    "message": "Användare inloggad!"
}
``` 
- 400
``` 
{
    "error": "Inmatning ogiltig, användarnamn/lösenord måste fyllas i"
}
``` 

## Struktur på mina js filer
- middleware: gör en validering av token.
- models: innehåller mongoose schema för användare och rätter i menyn.
- routes: CRUD-operationer för användare och maträtter.
- server.js: ansluter till databasen och startar själva applikationen.
