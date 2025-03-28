# 📌 Crimes Report System

A **Crimes Report System** is a software application designed to facilitate the reporting, tracking, and management of criminal activities. It serves law enforcement agencies, government bodies, and the general public by providing a digital platform for crime documentation, investigation, and analysis.

🔗 **Live Demo:** [Click here](https://crs-oman.netlify.app)

## 🚀 Features

- **🗺️ Crime Tracking on Map** – Real map crime tracking.
- **📝 Crime Reporting** – Allows citizens and law enforcement officers to report crimes online.
- **📂 Case Management** – Enables authorities to track cases, assign officers, and update investigation statuses.
- **📱 PWA Support** – Installable as a Progressive Web App (PWA) for better accessibility and offline functionality.

## 🛠 Development Tools

- **Framework:** [Angular](https://angular.io/)
- **Development Server:** [json-server](https://github.com/typicode/json-server)
- **Component Library:** [ng-zorro-antd](https://ng.ant.design/)
- **Mapping Library:** [ol (OpenLayers)](https://openlayers.org/)

## 📜 Installation

### Run using Docker

1. Clone the repository:
   ```sh
   git clone https://github.com/nawaf91maqbali/rihal-codestacker-fe.git
   ```
2. Navigate to the Docker setup directory:
   ```sh
   cd rihal-codestacker-fe/docker-example
   ```
3. Run the application using Docker Compose:
   ```sh
   docker-compose up -d
   ```

   > ⚠️ **Warning:** If you changed the `crs_api` service port, you must update the `ApiUrl` port in the `environment.ts` file in the project before running the `docker-compose up -d` command.
   
   > ⚠️ **Warning:** Do not change the location of the `docker-compose.yml` file, otherwise running `docker-compose up -d` will not work.
   
   > ℹ️ **Info:** After running `docker-compose up -d`, if you want to check the API, visit: `http://localhost:crs_api_port` (e.g., in my case, `http://localhost:3333`).
   
### Run Manually

1. Clone the repository:
   ```sh
   git clone https://github.com/nawaf91maqbali/rihal-codestacker-fe.git
   ```
2. Navigate to the project directory:
   ```sh
   cd rihal-codestacker-fe
   ```
3. Install dependencies:
   ```sh
   npm install  # Install frontend dependencies
   npm install -g json-server  # Install JSON Server globally
   ```
4. Configure environment variables and database settings.
5. Start the application:
   ```sh
   json-server --watch src/data/db.json  # Start JSON Server for development
   ng serve  # Start Angular frontend
   ```

## 🚀 Deployment

### Deploy on Windows IIS

1. **Install IIS**:
   - Open **Control Panel** > **Programs and Features** > **Turn Windows Features on or off**.
   - Ensure **Internet Information Services (IIS)** is checked.

2. **Install .NET Core Hosting Bundle**:
   - Download and install the [Microsoft .NET Core Hosting Bundle](https://dotnet.microsoft.com/download/dotnet).

3. **Publish Your Application**:
   ```sh
   ng build --prod --output-path dist/crimes-report
   ```

4. **Configure IIS**:
   - Open **IIS Manager**.
   - Create a new site pointing to the `dist/crimes-report` folder.
   - Set up proper MIME types for Angular files (e.g., `.json`, `.js`, `.css`).

5. **Start the Application**:
   - Restart IIS and navigate to the application URL.

### Deploy on Linux using Docker

1. **Install Docker**:
   ```sh
   sudo apt update
   sudo apt install docker.io -y
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

2. **Clone the Repository**:
   ```sh
   git clone https://github.com/your-username/crimes-report-system.git
   cd crimes-report-system
   ```

3. **Build and Run the Docker Container**:
   ```sh
   docker build -t crimes-report .
   docker run -d -p 4100:4100 crimes-report
   ```

4. **Verify Deployment**:
   - Open a web browser and visit `http://your-server-ip/`.


## 📝 Note

> 🚩 **Note:** The `db.json` you provided is missing one property (`national_id`), which is required when creating a new report.

   ## 🎥 Demo

You can check out a demo of the Crimes Report System below:

### Dashbard Page
![Dashboard](demo/dashboard.png)

### Filter Crimes
![Search](demo/search.gif)

### Dashbard Page
![Create](demo/create.gif)

### Filter Crimes
![About](demo/about.png)

🔗 **Live Demo:** [Click here](https://crs-oman.netlify.app)
