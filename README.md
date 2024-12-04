# Chicago 3D Building Visualization

This project visualizes various data attributes of buildings in Chicago as a 3D model using Three.js and Flask. Each building is represented as a bar, where the bar's height indicates the Site EUI (Energy Use Intensity) and the color represents GHG (Greenhouse Gas) Intensity.

## Project Setup

### Prerequisites

- Python 3.8 or higher
- Node.js (for any npm packages that may be used)
- A modern web browser that supports ES6 modules

### Installation

1. **Clone the Repository**

    ```
    git clone https://github.com/tej-kodur/Chicago-buildings-energy-consumption.git
    cd chicago-3d-visualization
    ```

2. **Set Up Python Virtual Environment**

    For Windows:
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```

    For macOS/Linux:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install Flask**

    ```bash
    pip install Flask
    ```

4. **Install Additional Python Packages (if necessary)**

    ```bash
    pip install -r requirements.txt
    ```

5. **Start the Flask Application**

    ```bash
    python app.py
    ```

    This will start the Flask server on `http://127.0.0.1:5000/`.

### Project Structure

- `app.py`: The Flask application.
- `templates/`: Contains HTML files.
  - `index.html`: The main page template which loads the Three.js visualization.
- `static/`: Contains static files such as JavaScript, CSS, and images.
  - `js/`: JavaScript files.
    - `main.js`: Three.js setup and animation logic.

### Contributing

To contribute to this project, please fork the repository and submit a pull request.

1. **Fork the Repository**
   - Click on the 'Fork' button at the top right of the page.

2. **Clone your forked repository**
   ```bash
   git clone https://github.com/tej-kodur/forked-chicago-3d-visualization.git