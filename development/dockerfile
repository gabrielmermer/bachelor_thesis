# Use official Python slim image
FROM python:3.11-slim

# Install dependencies for Tailscale if needed
RUN apt-get update && apt-get install -y curl iproute2 && rm -rf /var/lib/apt/lists/*

# Install Tailscale
RUN curl -fsSL https://tailscale.com/install.sh | sh

# Set working directory
WORKDIR /app

# Copy FastAPI backend
COPY mvp/ ./mvp
COPY requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy frontend
COPY game/ ./game

# Expose port FastAPI will run on
EXPOSE 8000

# Command to run FastAPI
CMD ["uvicorn", "mvp.main:app", "--host", "0.0.0.0", "--port", "8000"]
