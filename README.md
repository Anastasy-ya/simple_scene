# Three.js app

_The app includes a 3D box rendered in a Three.js scene with a form that allows users to adjust the dimensions of the box. Additionally, the project implements a dark mode switch that affects both the form and the 3D scene._

### Project Overview
#### Features

1. 3D Box with Adjustable Dimensions: The user can modify the box's length, width, and height via a form, and the changes are applied in real-time.

2. Three.js: The 3D box is rendered using Three.js with BufferGeometry. 

3. React & TypeScript: The frontend is built with React and written entirely in TypeScript.

4. Ant Design: The form is built using components from Ant Design, and its fields are customized with CSS, including handling non-default states (like focus).
5. Client-Server Communication: The form submits the box parameters to the backend and takes parameters back.
6. Dark Mode: The user can toggle between light and dark mode, which affects both the form and the 3D scene.

### Technology Stack

#### Frontend
- React (with TypeScript)
- Three.js
- Ant Design (for form components)
- CSS (for custom styling)

#### Backend

Node.js with Express

### Installation and Setup
Prerequisites
Node.js installed on your system.
npm or yarn for package management.

#### Frontend Setup

Clone the repository:

```
git clone https://github.com/yourusername/web-developer-test.git
```
```
cd web-developer-test
```
```
npm install
```
```
npm start
```

This will launch the React app on http://localhost:3000

#### Backend Setup

Navigate to the server folder:

```
cd server
```
```
npm install
```
```
npm start
```
The backend will run on http://localhost:5000. You can use this server to handle requests from the frontend for box triangulation.

### API Endpoints

POST /triangulate
_This endpoint receives the dimensions of the box and returns the vertices of the triangulated box_

#### Request Body:

```
{
  "length": 10,
  "width": 5,
  "height": 5
}
```

#### Response:

```
{
  "vertices": [
    [0, 0, 0], [10, 0, 0], [10, 5, 0], ... // Array of vertices
  ]
}
```
