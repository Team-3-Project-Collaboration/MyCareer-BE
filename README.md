# Getting Started

To get started with the project, follow these steps:

### Clone project (SSH)

```bash
git clone git@github.com:Team-3-Project-Collaboration/MyCareer-BE.git
```
OR

### Clone project (HTTPS)

```bash
git clone https://github.com/Team-3-Project-Collaboration/MyCareer-BE.git
```

Get into project folder
```bash
cd MyCareer-BE
```

Install depedency
```bash
npm install
```

Create Database with this name
```bash
careerDB
```

Create .env file
```bash
cp .env.example .env
```

Setting your database in .env file
```bash
DATABASE_URL="mysql://YOUR_USERNAME:YOUR_PASSWORD@localhost:3306/careerDB"
```

Create database table
```bash
npx prisma migrate dev
```

## Run the development server

Run project
```bash
npm run dev
```
